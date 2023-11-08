const { AuthenticationError } = require('apollo-server-express');
const { User, Friend, Thought, ReThought, Liked, Blocked, Pending } = require("./../models");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
   
    //STATUS: WORKING
    getMe: async (parent, args, context ) => {
      console.log("Here");
      return await User.findByPk((context.user) ? context.user.id : 1);
    },

    //STATUS: WORKING
    getAllUsers: async (parent, args, context) => {
      return await User.findAll();
    },

    //STATUS: WORKING
    getUser: async (parent, { userId }, context) => {
      return await User.findByPk(userId);

    },

    //STATUS: WORKING
    getMyFriends: async (parent, args, context) => {
      let userFriends = await User.findByPk(context.user.id, {
	include: { model: User,
		   as: "friendshipUser",
		   through: "friend" }})
      return userFriends.friendshipUser;
    },
    
    //STATUS: WORKING
    getUserFriends: async (parent, { userId }, context) => {
      let userFriends = await User.findByPk(userId, {
	include: { model: User,
		   as: "friendshipUser",
		   through: "friend" }})
      return userFriends.friendshipUser;
    },

    //STATUS: WORKING
    getMyThoughts: async (parent, args, context) => {
      //return await Thought.findAll({ where: { userId: context.user.id }});
      return await Thought.findAll({ where: { userId: context.user.id }});
    },

    //STATUS: WORKING
    //Display descending
    getAllThoughts: async (parent, args, context) => {
      return await Thought.findAll({ include: { model: User},
					     order: [["createdAt", "DESC"]]});
    },

    //STATUS: WORKING
    getAllLiked: async (parent, args, context) => {
      return await Liked.findAll({where: { likedByUserId: context.user.id }});
				  
    },
    
    //STATUS: WORKING
    getThought: async(parent, { thoughtId }, context) => {
      return await Thought.findByPk(thoughtId, { include: User});
    },

    //STATUS: WORKING
    getThoughtLikes: async (parent, { thoughtId }, context) => {
      let thoughtLikes = await Thought.findByPk(thoughtId, {
	include: { model: User,
		   as: "thoughtLikes",
		   through: "liked" }});
      return thoughtLikes.thoughtLikes;
    },

    //STATUS: WORKING
    getUserThoughts: async (parent, { userId }, context) => {
      return await Thought.findAll({where: {userId: userId} });

    },

    //STATUS: WORKING
    getReplys: async (parent, { thoughtReplyOfId }, context) => {
      return await Thought.findAll({ where: { thoughtReplyOfId },
						  include: { model: User }});
    },

    //STATUS: PENDING
    getReThoughts: async (parent, { originalThoughtId }, context) => {
    },
  },
  Mutation: {

    //STATUS: WORKING
    login: async (parent, {email, password}, context) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new AuthenticationError("There is no user of that email");
      }
      const correctPw = await user.checkPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Password is incorecct");
      }
      const token = signToken(user);
      return { token, user };
    },

    //STATUS: WORKING
    //args = {userName, handle, first/lastName, email, password}
    addUser: async (parent, args, context) => {
      const newUser = await User.create({ ...args });
      const token = signToken(newUser);
      return { token, user: newUser };
    },

    //STATUS: WORKING
    //args = {userName, handle, first/lastName, email, password}
    updateUser: async (parent, args, context) => {
      const userUpdate = await User.update({ ...args   },
					   {where: { id: args.userId}});
      const user = await User.findByPk(args.userId);
      const token = signToken(user);
      return { token, user };				
    },

    //STATUS: WORKING
    deleteUser: async (parent, { userId }, context) => {
      if (context.user.id === userId) {
	return (await User.destroy({where: {id: userId}}) === 1);
      } else {
        throw new AuthenticationError("You need to be signed in!");
      }
    },

    //STATUS: WORKING
    //Need to update in future to check if userId is valid
    addFriend: async (parent, { friendId }, context) => {      
      // making two entries so only one column needs to be quired
      // when collecting all of a user's friends
      return (await Friend.create({userId: context.user.id, friendId}) &&
	      await Friend.create({userId: friendId, friendId: context.user.id}));
    },

    //STATUS: WORKING
    removeFriend: async (parent, { friendId }, context) => {
      return ((await Friend.destroy({where: { userId: context.user.id,
					      friendId }})
	       &&
	       await Friend.destroy({where: { userId: friendId,
					      friendId: context.user.id }})) === 1);
	      
    },

    //STATUS: PENDING
    updateFriend: async (parent, { userId, friendId }, context) => {
    },

    //STATUS: WORKING
    addThought: async (parent,{ content, thoughtReplyOfId }, context) =>{ 
      if (context.user) {
	let thought =  await Thought.create({ userId: context.user.id,
					      content,
					      thoughtReplyOfId,
					    });
	return await Thought.findByPk(thought.id,
				      { include: { model: User }});
				     
      } else {
	//Need to replace with different error
	throw new Error("Something went wrong");
      }
      throw new AuthenticationError("You are not logged in");
    },

    //STATUS: WORKING
    updateThought: async (parent, { thoughtId, content }, context) => {
      const thought = await Thought.findByPk(thoughtId);
      if (context.user.id === thought.userId) {
	await Thought.update({ ...content },
			     {where: { id: thoughtId }});
	return await Thought.findByPk(thoughtId, { include: { model: User }});
      } else {
	//Ned to replace with different error
	throw new AuthenticationError("You are not this thought's owner");
      }
    },

    //STATUS: WORKING
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
	return (await Thought.destroy({ where: { id: thoughtId }}) === 1);
      } else {
        throw new Error("You can not delete this thought!");
      }
    },

    //STATUS: WORKING
    addLiked: async (parent, { thoughtId }, context) => {
      if (context.user) {
	return await Liked.create({thoughtId, likedByUserId: context.user.id});
      } else {
	throw new AuthenticaitonErro("You need to be logged in to like a thought!");
      }
    },

    //STATUS: WORKING
    removeLiked: async (parent, { thoughtId }, context) => {
      return (await Liked.destroy({ where: { thoughtId,
					     likedByUserId: context.user.id }}) === 1);
    },
    
    //STATUS: WORKING
    replyToThought: async (parent, { content, thoughtReplyOfId}, context) => {
      let thoughtReply =  await Thought.create({ userId: context.user.id,
						  content,
						 thoughtReplyOfId });
      
      return await Thought.findByPk(thoughtReply.id, { include: { model: User }});;
    },

    //STATUS: PENDING
    addReThought: async (parent, { originalThoughtId, additionalThought }, context) => {
      let thought = null;
      if (context.user) {
	if (additionalThought !== null) {
	  thought = await Thought.create({ userId: context.user.id,
					   content: additionalThought,
					 });
	}
	const reThought = await ReThought.create({ reThoughtByUserId: context.user.id,
						   originalThoughtId,
						   additionalThoughtId: (thought === null) ? null : thought.id
						 });
	console.log(reThought);
	
	const user = await User.findByPk(context.user.id);
	const reThoughtInfo = { reThought, thought, user };
	console.log("RETHOGUHTINFO:",reThoughtInfo);

	return reThoughtInfo;
      } else {
	throw new AuthenticationError("You can not reThought unless your logged in");
      }
      
    }
  }
};

module.exports = resolvers;
