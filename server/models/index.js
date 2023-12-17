const Friend = require("./Friend");
const Thought = require("./Thought");
const User = require("./User");
const Liked = require("./Liked");
const Blocked = require("./Blocked");
const Pending = require("./Pending");
const ReThought = require("./ReThought");
const Reply = require("./Reply");
const Following = require("./Following");

Thought.belongsTo(User, {
  foreignKey: "userId",
});
		      
User.hasMany(Thought, {
  foreignKey: "userId",
  as: "thoughtAuthor"
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
  as: "blockedUser",
});

User.belongsToMany(User, {
  through: "blocked",
  foreignKey: "blockedId",
  otherKey: "userId",
  as: "blockingUser",
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

Thought.belongsToMany(Thought,{
  through: "reThought",
  foreignKey: "reThoughtOfId",
  otherKey: "reThoughtThoughtId",
  as: "reThoughtThoughts"
});

Thought.belongsToMany(Thought,{
  through: "reThought",
  foreignKey: "reThoughtThoughtId",
  otherKey: "reThoughtOfId",
  as: "originalReThoughtThought"
});

Thought.belongsToMany(Thought,{
  through: "reply",
  foreignKey: "replyOfId",
  otherKey: "replyThoughtId",
  as: "replyThoughts"
});

Thought.belongsToMany(Thought,{
  through: "reply",
  foreignKey: "replyThoughtId",
  otherKey: "replyOfId",
  as: "originalReplyThought"
});



module.exports = {
  Friend,
  User,
  Thought,
  Liked,
  Blocked,
  Pending,
  ReThought,
  Reply,
  Following
};
