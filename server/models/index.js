// make nextwork here
const Friend = require("./Friend");
const ReThought = require("./ReThought");
const Thought = require("./Thought");
const User = require("./User");
const Liked = require("./Liked");

//ReThought relationships
ReThought.belongsTo(User, {
  foreignKey: "reThoughtByUserId"
});

ReThought.belongsTo(Thought, {
  foreignKey: "originalThoughtId",
  onDelete: "CASCADE"
});


//Thought relationships
Thought.belongsToMany(ReThought, {
  foreignKey: "reThoughtByUserId"
});

Thought.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Thought.hasMany(User, {
  foreignKey: "thoughtId",
  as: "thoughtLikedBy",
  through: "liked"
});

Thought.hasMany(Liked, {
  foreignKey: "thoughtId"
});

Thought.hasMany(Thought, {
  foreignKey: "replyId",
  as: "thoughtReply",
  through: Thought
});  

Thought.hasMany(ReThought, {
  foreignKey:originalThoughtId,
});


// Liked relationships
Liked.hasMany(User, {
  foreignKey: "likedByUserId"
});

Liked.hasMany(Thought, {
  foreignKey: "thoughtId"
});

//User relationships
User.hasMany(ReThought, {
  foreignKey: "reThoughtByUserId"
});

User.hasMany(Thought, {
  foreignKey: "userId",
});

User.hasMany(Liked, {
  foreignKey: "likedByUserId",
});

// User-Friend relationship
User.belongsToMany(User, {
  foreignKey: "userId",
  as: "friendship",
  through: Friend
});

		     
module.exports = {
  Friend,
  User,
  Thought,
  ReThought,
  Liked
};
