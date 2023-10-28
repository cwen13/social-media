const { AuthenticationError } = require('apollo-server-express');
const { User, Friend, Thought, ReThought, Liked } = require("./../models");
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

    //STATUS: PENDING
    getFriends: async (parent, { userId }, context) => {
      let friends = await Friend.findAll({ where: { userId }, include: { model: User, through: {attribute:"friendships"} } });
      return friends
      //      return await Friend.findAll({ where: { userId } } );

      
    },

    //STATUS: PENDING
    getFriendStatus: async (parent, { userId, friendId }, context) => {
      return await Friend.findOne( { where: userId, friendId});
    },    

    //STATUS: WORKING
    getMyThoughts: async (parent, args, context) => { 
      return  await Thought.findAll({ where: { userId: context.user.id }});
    },

    //STATUS: PENDING
    getThought: async(parent, { id }, context) => {
      return await Thought.findByPk({ id });
    },

    //STATUS: working
    getAllThoughts: async(parent, args, context) => {
      let thoughts = await Thought.findAll({include: { model: User}});
      return thoughts;
    },

    //STATUS: PENDING
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

    //STATUS: PENDING
    addUser: async (parent, { userName, firstName, lastName, email, password }, context) => {
      const update = await User.create(
	{
	  userName,
	  firstName,
	  lastName,
	  email,
	  password
	},
	{
	  returning: true,
	});
      const token = signToken(update);
      return { token, update };
    },

    //STATUS: PENDING
    updateUser: async (parent, { userName, firstName, lastName, email, password}, context) => {
      return await User.update({where: { id: context.user.id},
				variables: { userName,
					     firstName,
					     lastName,
					     email,
					     password
					   }});
    },

    //STATUS: PENDING
    deleteUser: async (parent, {id}, context) => {
      return await User.destroy({where: {id}});
    },

    //STATUS: PENDING
    addFriend: async (parent, {userId, friendId, sent}, context) => {
      return await Friend.create({userId, friendId, sent});
    },

    //STATUS: PENDING
    removeFriend: async (parent, {id}, context) => {
      return await Friend.destroy({id});
    },

    //STATUS: PENDING
    updateFriendship: async (parent, args, context) => {
    },

    //STATUS: PENDING
    addThought: async (parent,{ content }, context) => {
      if (context.user) {
	let theThought = Thought.findByPk(thoughtId);
	let thoughtUser = thethought.dataValues.userId;
	if (context.user.id === thoughtUser) {
	  return await Thought.create( {userId: context.user.id, content});
	} else {
	  //Ned to replace with different error
	  throw new AuthenticationError("You are not this thought's owner");
	}
      }
      throw new AuthenticationError("You are not logged in");
    },

    //STATUS: PENDING
    updateThought: async (parent, {thoughtId,content}, context) => {
      if (context.user) {
	let theThought = Thought.findByPk(thoughtId);
	let thoughtUser = thethought.dataValues.userId;
	if (context.user.id === thoughtUser) {
	  return await Thought.update({content}, {where: {userId: context.user.id}});
	} else {
	  //Ned to replace with different error
	  throw new AuthenticationError("You are not this thought's owner");
	}
      }
      throw new AuthenticationError("You are not logged in");
    },

    //STATUS: PENDING
    removeThought: async (parent, args, conteext) => {
    },

    //STATUS: PENDING
    addLiked: async (parent, args, conteext) => {
    },

    //STATUS: PENDING
    removeLiked: async (parent, args, conteext) => {
    },

    //STATUS: PENDING
    replayToThought: async (parent, args, conteext) => {
    },

    //STATUS: PENDING
    reThought: async (parent, args, conteext) => {
    },    
  }
};

module.exports = resolvers;
