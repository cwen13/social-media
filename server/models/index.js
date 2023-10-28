const Friend = require("./Friend");
const ReThought = require("./ReThought");
const Thought = require("./Thought");
const User = require("./User");
const Liked = require("./Liked");

ReThought.belongsTo(User, {
  foreignKey: "reThoughtByUserId"
});

ReThought.belongsTo(Thought, {
  foreignKey: "originalThoughtId",
});

Thought.belongsTo(User, {
  foreignKey: "userId",
});

Thought.hasMany(Liked, {
  foreignKey: "likedByUserId"
});
		      
Thought.hasMany(ReThought, {
    foreignKey: "orginalThoughtId",
});

User.hasMany(Liked, {
  foreignKey: "likedByUSerId"
});

User.hasMany(ReThought, {
  foreignKey: "reThoughtByUserId"
});

User.hasMany(Thought, {
  foreignKey: "userId",
});

User.belongsToMany(User, {
  through: {
    model: Friend,
    unique: true
  },
  as: "friendships"
});

module.exports = {
  Friend,
  User,
  Thought,
  ReThought,
  Liked
};
