const Friend = require("./Friend");
const ReThought = require("./ReThought");
const Thought = require("./Thought");
const User = require("./User");
const Liked = require("./Liked");
const Pending = require("./Pending");
const Blocked = require("./Blocked");


ReThought.belongsTo(User, {
  foreignKey: "reThoughtsByUserId"
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
  foreignKey: "likedByUserId"
});

User.hasMany(ReThought, {
  foreignKey: "reThoughtByUserId"
});

User.hasMany(Thought, {
  foreignKey: "userId",
});

User.belongsToMany(User, {
  through: "friend",
  foreignKey: "userId",
  otherKey: "friendId",
  as: "friendshipUser",
});

User.belongsToMany(User, {
  through: "friend",
  foreignKey: "friendId",
  otherKey: "userId",
  as: "friendshipFriend",
});

//User.belongsToMany(User, {
//  through: "blocked",
//  as: "blocked"
//});
//
//User.belongsToMany(User, {
//  through: "pending",
//  as: "pending"
//});


module.exports = {
  Friend,
  User,
  Thought,
  ReThought,
  Liked
};
