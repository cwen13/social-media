// make nextwork here
const Friend = require("./Friend");
const ReThought = require("./ReThought");
const Thought = require("./Thought");
const User = require("./User");


//ReThought relationships
ReThought.belongsTo(User, {
  foreignKey: "reThoughtByUserId"
});

ReThought.belongsTo(Thought, {
  foreignKey: "originalThoughtId",
  onDelete: "CASCADE"
});


//Thought relationships
Thought.hasMany(ReThought, {
  foreignKey: "reThoughtByUserId"
});

Thought.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Thought.hasMany(User, {
  foreignKey: "thoughtId",
  as: "thoughtLiked",
  through: "like"
});

Thought.hasMany(Thought, {
  foreignKey: "replyId",
  as: "thoughtReply",
  through: Thought
});  

//User relationships
User.hasMany(ReThought, {
  foreignKey: "reThoughtByUserId"
});

User.hasMany(Thought, {
  foreignKey: "userId",
});

User.hasMany(Thought, {
  foreignKey: "likedByUser",
  as: "likedThought",
  through: Like
});

// Friend relationship
User.belongsToMany(User, {
  foreignKey: "userId",
  as: "friendship",
  through: Friend
});

		     
module.exports = {
  Friend,
  User,
  Thought
};
