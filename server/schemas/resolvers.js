const { AuthenticationError } = require('apollo-server-express');
const { User,Friend,Thought,Comment } = require("./../models");
const { signToken } = require('../utils/auth');
 
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return await User.findOne({ where: { id: context.user.id } });
    },

    // FUNCTIONING
    getUsers: async (parent, args, context) => {
      return await User.findAll();
    },

    // FUNCTIONING
    user: async (parent, args, context) => {
      return await User.findOne({where: {id: context.user.id}});
    },

    getThought: async(parent, { id }, context) => {
      return await Thought.findByPk({id});
    },

    getAllThoughts: async(parent, args) => {
      return await Thought.findAll();
    },

    getUserThoughts: async (parent, { userId }, context) => {
      return await Thought.findAll({where: {id: userId} });
    },
    
    // FUNCTIONING
    getMyThoughts: async (parent, args, context) => {
      if (context.user) {
	return await Thought.findAll({where: {id: context.user.id}});
      }
      throw new AuthorizationError("Not logged in");
    }

  },
  Mutation: {
    // FUNCTIONING
    addUser: async (parent, { userName, firstName, lastName, email, password }, context) => {
      const newUser = await User.create(
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
      const token = signToken(newUser);
      return { token, newUser };
    },
    
    updateUser: async (parent, { userName, firstName, lastName, email, password}, context) => {
      return await User.update({where: { id: context.user.id},
				variables: { userName,
					     firstName,
					     lastName,
					     email,
					     password
					   }});
    },
  
    deleteUser: async (parent, {id}, context) => {
      return await User.destroy({where: {id}});
    },

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

    addComment: async (parent, {userId, thoughtId, comment}, context) => {
      return await Comment.create({userId, thoughtId, comment});
    },

    updateComment: async (parent, {id, comment}, context) => {
      return await Comment.update({ comment}, {where: {id}});
    },

    addFriend: async (parent, {userId, friendId, sent}, context) => {
      return await Friend.create({userId, friendId, sent});
    },

    removeFriend: async (parent, {id}, context) => {
      return await Friend.destroy({id});
    },
  }
};

module.exports = resolvers;
