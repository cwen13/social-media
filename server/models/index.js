const Friend = require("./Friend");
const Thought = require("./Thought");
const User = require("./User");
const Liked = require("./Liked");
const Blocked = require("./Blocked");
const Pending = require("./Pending");


Thought.belongsTo(User, {
  foreignKey: "userId",
});
		      
User.hasMany(Thought, {
  foreignKey: "userId",
});

User.belongsToMany(Thought, {
  through: "liked",
  foreignKey:"likedByUserId",
  as: "userLiked"
});

Thought.belongsToMany(User, {
  through: "liked",
  foreignKey: "thoughtId",
  as: "thoughtLikes"
})

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

User.belongsToMany(User, {
  through: "blocked",
  foreignKey: "userId",
  otherKey: "blockedId",
  as: "blockingUser",
});

User.belongsToMany(User, {
  through: "blocked",
  foreignKey: "blockedId",
  otherKey: "userId",
  as: "blockedUser",
});

User.belongsToMany(User, {
  through: "pending",
  foreignKey: "userId",
  otherKey: "pendingId",
  as: "pendingRequest",
});

User.belongsToMany(User, {
  through: "pending",
  foreignKey: "pendingId",
  otherKey: "userId",
  as: "pendingUser",
});

User.belongsToMany(User,{
  through: "following",
  foreignKey: "userId",
  otherKey: "followingId",
  as: "followingUsers"
});

User.belongsToMany(User,{
  through: "following",
  foreignKey: "followingId",
  otherKey: "userId",
  as: "followers"
});

Thought.hasOne(Thought, {
  foreignKey: "thoughtReplayOfId",
  as: "parentThought"
});
		      
Thought.hasMany(Thought, {
  foreignKey: "thoughtReplayOfId",
  as: "childThought"
});

module.exports = {
  Friend,
  User,
  Thought,
  Liked,
  Blocked,
  Pending
};
