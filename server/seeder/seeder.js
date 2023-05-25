// here will be how to seed the database

const sequelize = require('./../config/connection');
const { User, Comment, Friend, Thought } = require("./../models");
const commentSeedData = require('./commentSeed');
const userSeedData = require('./userSeed');
const thoughtSeedData = require("./thoughtSeed");
const friendSeedData = require("./friendSeed");

const seedDatabase = async () => {

  await sequelize.sync({force:true});

  User.destroy({
    where: {},
  });
  Friend.destroy({
    where: {},
  });
  Thought.destroy({
    where: {},
  });
  Comment.destroy({
    where: {},
  });

  for (let i = 0; i < userSeedData.length; i++) {
    await User.create(userSeedData[i]);
  }

  for (let i = 0; i < friendSeedData.length; i++) {
    await Friend.create(friendSeedData[i]);
  }

  for (let i = 0; i < thoughtSeedData.length; i++) {
    await Thought.create(thoughtSeedData[i]);
  }
  
  for (let i = 0; i < commentSeedData.length; i++) {
    await Comment.create(commentSeedData[i]);
  }



  process.exit(0);
  
}

seedDatabase();
