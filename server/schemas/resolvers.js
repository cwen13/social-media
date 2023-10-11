const { AuthenticationError } = require('apollo-server-express');
const {User,Friend,Thought,Comment} = require("./../models");
const { signToken } = require('../utils/auth');
 
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context);
      return await User.findOne({id: context.user.id});
    },

    // FUNCTIONING
    users: async (parent, args)/*, context)*/ => {
      return await User.findAll();
    },

    // FUNCTIONING
    user: async (parent, {id})/*, context)*/ => {
      return await User.findOne({where: {id}});
    },

<<<<<<< Updated upstream
=======
    getThoughts: async(parent, args) => {
      return await Thought.findAll();
    },

>>>>>>> Stashed changes
    // FUNCTIONING
    userThoughts: async (parent, args, context) => {
      if (context.user) {
	return await Thought.findAll({where: {id: context.user.id}});
      }
      throw new AuthorizationError("Not logged in");
    }

  },
  Mutation: {
    // FUNCTIONING -- NEED TO RETURN SOMETHING
<<<<<<< Updated upstream
    addUser: async (parent, {id, username, firstName, lastName, email, password})/*, context)*/ => {
=======
    addUser: async (parent, {id, userName, firstName, lastName, email, password}) => {
>>>>>>> Stashed changes
      const update = await User.create(
	{
	  username,
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
    
    updateUser: async (parent, {id, userName, firstName, lastName, email, password})/*, context)*/ => {
      return await User.update({
	username,
	firstName,
	lastName,
	email,
	password
      });
    },
  
    deleteUser: async (parent, {id})/*, context)*/ => {
      return await User.destroy({where: {id}});
    },

    login: async (parent, {email, password})/*, context)*/ => {
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
    
    addThought: async (parent, {userId, content})/*, context)*/ => {
      return Thought.create( {userId, content});  
    },
    
    updateThought: async (parent, {id, content})/*, context)*/ => {
      return await Thought.update({content}, {where: {id}});
    },

    addComment: async (parent, {userId, thoughtId, comment})/*, context)*/ => {
      return await Comment.create({userId, thoughtId, comment});
    },

    updateComment: async (parent, {id, comment})/*, context)*/ => {
      return await Comment.update({ comment}, {where: {id}});
    },

    addFriend: async (parent, {userId, friendId, sent})/*, context)*/ => {
      return await Friend.create({userId, friendId, sent});
    },

    removeFriend: async (parent, {id})/*, context)*/ => {
      return await Friend.destroy({id});
    },
  }
};

module.exports = resolvers;
