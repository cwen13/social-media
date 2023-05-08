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

Thought.hasMnay(Comment, {
  foreignKey: "thoughtId",
});

Comment.belongsTo(Thouhght, {
  foreignKey: "thoughtId",
});


User.hasMany(Friend, {

});

Friend.belongsToMany(User, {
});


		     
module.exports = {
  Friend,
  User,
  Comment,
  Thouhgt
};

