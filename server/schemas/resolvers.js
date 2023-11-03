const { AuthenticationError } = require('apollo-server-express');
const { User, Friend, Thought, ReThought, Liked, Blocked, Pending } = require("./../models");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
    //STATUS: WORKING
    me: async (parent, args, context ) => {

      return await User.findByPk((context.user) ? context.user.id : 1);
    },

    //STATUS: WORKING
    getUser: async (parent, { userId }, context) => {
      return await User.findByPk(userId);

    },

    //STATUS: WORKING
    getAllUsers: async (parent, args, context) => {
      return await User.findAll();
    },

    //STATUS: WORKING
    getFriends: async (parent, { userId }, context) => {
      let userFriends = await User.findByPk(userId, {
	include: { model: User,
		   as: "friendshipUser",
		   through: "friend" }})
      return userFriends.friendshipUser;
    },

    //STATUS: WORKING
    getMyThoughts: async (parent, args, context) => {
      //return await Thought.findAll({ where: { userId: context.user.id }});
      const thought = await Thought.findAll({ where: { userId: context.user.id }});
      console.log(thought[0].userId);
      return thought;
    },

    //STATUS: WORKING
    getThought: async(parent, { id }, context) => {
      return await Thought.findByPk(id);
    },

    //STATUS: WORKING
    //Display descending
    getAllThoughts: async(parent, args, context) => {
      return await Thought.findAll({ include: { model: User},
					     order: [["createdAt", "DESC"]]});
    },

    //STATUS: WORKING
    getUserThoughts: async (parent, { userId }, context) => {
      return await Thought.findAll({where: {userId: userId} });

    },

    //STATUS: PENDING
    getReplys: async (parent, args, context) => {
    },

    //STATUS: PENDING
    getReThoughts: async (parent, args, context) => {
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
    deleteUser: async (parent, { id }, context) => {
      if (context.user) {
	return (await User.destroy({where: {id}}) === 1);
      } else {
        throw new AuthenticationError("You need to be signed in!");
      }
    },

    //STATUS: WORKING
    //Need to update in future to check if userId is valid
    addFriend: async (parent, { userId, friendId }, context) => {      
      // making two entries so only one column needs to be quired
      // when collecting all of a user's friends
      return (await Friend.create({userId, friendId}) &&
	      await Friend.create({userId: friendId, friendId: userId}));
    },

    //STATUS: PENDING
    removeFriend: async (parent, { userId, friendId }, context) => {
      return await Friend.destroy({id});
    },

    //STATUS: PENDING
    updateFriendship: async (parent, args, context) => {
    },

    //STATUS: WORKING
    addThought: async (parent,{ content, thoughtReplyOfId }, context) =>{ 
      if (context.user) {
	return await Thought.create( {userId: context.user.id, content, thoughtReplyOfId});
      } else {
	//Need to replace with different error
	throw new AuthenticationError("You are not this thought's owner");
      }
      throw new AuthenticationError("You are not logged in");
    },

    //STATUS: WORKING
    updateThought: async (parent, { thoughtId, content }, context) => {
      const thought = await Thought.findByPk(thoughtId);
      if (context.user.id === thought.userId) {
	await Thought.update({ ...content },
			     {where: { id: thoughtId }});
	return await Thought.findByPk(thoughtId);
      } else {
	//Ned to replace with different error
	throw new AuthenticationError("You are not this thought's owner");
      }
    },

    //STATUS: WORKING
    removeThought: async (parent, { id }, context) => {
      if (context.user) {
	return (await Thought.destroy({where: {id}}) === 1);
      } else {
        throw new Error("You can not delete this thought!");
      }
    },

    //STATUS: WORKING
    addLiked: async (parent, { thoughtId }, context) => {
      if (context.user) {
	const liked = await Liked.create({thoughtId, likedByUserId: context.user.id})
	console.log(liked);
	return liked;
      } else {
	throw new AuthenticaitonErro("You need to be logged in to like a thought!");
      }
    },

    //STATUS: PENDING
    removeLiked: async (parent, args, context) => {
    },

    //STATUS: PENDING
    replayToThought: async (parent, args, context) => {
    },

    //STATUS: PENDING
    reThought: async (parent, args, context) => {
    },    
  }
};

module.exports = resolvers;
