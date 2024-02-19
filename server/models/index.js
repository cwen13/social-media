const Friend = require("./Friend");
const Thought = require("./Thought");
const User = require("./User");
const Liked = require("./Liked");
const Blocked = require("./Blocked");
const Pending = require("./Pending");
const ReThought = require("./ReThought");
const Reply = require("./Reply");
const Following = require("./Following");
const Notification = require("./Notification");


Thought.belongsTo(User, {
  foreignKey: "userId",
  as: "thoughtAuthor"
});
		      
User.hasMany(Thought, {
  foreignKey: "userId",
  as: "userThought"
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

// User to User
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

// Thought to (Re)Thought
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

// Notification relations
User.belongsToMany(User, {
  through: "notification",
  foreignKey: "fromUser",
  as: "fromUser"
});

Thought.belongsToMany(Liked, {
  through: "notification",
  foreignKey: "likedThoughtId",
  as: "newLikedThought"
});

Thought.belongsToMany(Thought, {
  through: "notification",
  foreignKey: "replyToEntryId",
  as: "newReply"
});

Thought.belongsToMany(Thought, {
  through: "notification",
  foreignKey: "reThoughtOfEntryId",
  as: "newReThought"
});


//Extra relations for juntction tables
// to work with notifcations
Pending.belongsTo(User, {
  foreignKey: "userId",
  otherKey: "pendingId",
  as: "requestingFriend"
});

Pending.belongsTo(User, {
  foreignKey: "pendingId",
  otherKey: "userId",
  as: "requestedFriend"
});

Following.belongsTo(User, {
  foreignKey: "userId",
  otherKey:"followingId",
  as: "follower"
});

Following.belongsTo(User, {
  foreignKey: "followingId",
  otherKey: "userId",
  as: "followed"
});

Liked.belongsTo(User, {
  foreignKey: "likedByUserId",
  as: "thoughtLiker"
});

Liked.belongsTo(Thought, {
  foreignKey: "thoughtId",
  as: "likedThought"
});

Reply.belongsTo(Thought, {
  foreignKey: "replyThoughtId",
  otherKey: "replyOfId",
  as: "replyThought"
});

Reply.belongsTo(Thought, {
  foreignKey: "replyOfId",
  otherKey: "replyThoughtId",
  as: "originalReplyThought"
});

ReThought.belongsTo(Thought, {
  foreignKey: "reThoughtOfId",
  otherKey: "reThoughtThoughtId",
  as: "originalReThoughtThought"
});

ReThought.belongsTo(Thought, {
  foreignKey: "reThoughtThoughtId",
  otherKey: "reThoughtOfId",
  as: "reThoughtThought"
});

// Setting up relationships to return post info
// when quering the notifcaiton table directl
Notification.belongsTo(User, {
  foreignKey: "fromUser",
  otherKey: "toUser",
  as: "interactor"
});

Notification.belongsTo(User, {
  foreignKey: "toUser",
  otherKey: "fromUser",
  as: "poster"
});

Notification.belongsTo(Pending, {
  foreignKey: "friendRequestEntryId"
});

Notification.belongsTo(Following, {
  foreignKey: "followedByEntryId"
});

Notification.belongsTo(Liked, {
  foreignKey: "likedThoughtId"
});

Notification.belongsTo(Reply, {
  foreignKey: "replyToEntryId"
});

Notification.belongsTo(ReThought, {
  foreignKey: "reThoughtOfEntryId"
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
  Following,
  Notification
};
