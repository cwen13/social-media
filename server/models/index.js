const Friend = require("./Friend");
const ReThought = require("./ReThought");
const Thought = require("./Thought");
const User = require("./User");
const Liked = require("./Liked");
const Blocked = require("./Blocked");
const Pending = require("./Pending");


ReThought.belongsTo(User, {
  foreignKey: "reThoughtByUserId",
});

User.hasMany(ReThought, {
  foreignKey: "reThoughtByUserId",
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
    as: "responseThought"
});

User.hasMany(ReThought, {
  foreignKey: "reThoughtByUserId"
});

User.hasMany(Thought, {
  foreignKey: "userId",
});

User.belongsToMany(Thought, {
  through: "liked",
  foreignKey:"likedByUserId",
  as: "userLikes"
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



module.exports = {
  Friend,
  User,
  Thought,
  ReThought,
  Liked,
  Blocked,
  Pending
};
