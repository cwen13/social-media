// make nextwork here
const Friend = require("./Friend");
const Comment = require("./Comment");
const User = require("./User");
const Thought = require("./Thought");

User.hasMany(Thought, {
  foreignKey: "userId"
});

Thought.belongsTo(User, {
  foreignKey: "userId"
});

Thought.hasMany(Comment, {
  foreignKey: "thoughtId",
});

Comment.belongsTo(Thought, {
  foreignKey: "thoughtId",
});


User.belongsToMany(User, {
//  foreignKey: "id",
  as: "friendship",
  through: Friend
});


		     
module.exports = {
  Friend,
  User,
  Comment,
  Thought
};
