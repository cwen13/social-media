// here will be how to seed the database

const sequelize = require('./../config/connection');
const { User, ReThought, Friend, Thought, Liked } = require("./../models");
const userSeedData = require("./userSeedData.json");
const thoughtSeedData = require("./thoughtSeedData.json");
const friendSeedData = require("./friendSeedData.json");
const likedSeedData = require("./likedSeedData.json");

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
  ReThought.destroy({
    where: {},
  });
  Liked.destroy({
    where:{},
  });

  for (let i = 0; i < userSeedData.length; i++) {
    await User.create(userSeedData[i]);
  }

  for (let i = 0; i < thoughtSeedData.length; i++) {
    await Thought.create(thoughtSeedData[i]);
  }

  for (let i = 0; i < likedSeedData.length; i++) {
    await Liked.create(likedSeedData[i]);
  }  

  for (let i = 0; i < friendSeedData.length; i++) {
    await Friend.create(friendSeedData[i]);
    await Friend.create({
      userId: friendSeedData[i].friendId,
      friendId: friendSeedData[i].userId
    });
  }
  
  process.exit(0);  
}

seedDatabase();
