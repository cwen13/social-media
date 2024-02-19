const { AuthenticationError } = require('apollo-server-express');
const {
  User,
  Friend,
  Thought,
  Liked,
  Blocked,
  Pending,
  Following,
  Reply,
  ReThought,
  Notification
} = require("./../models");
const { signToken } = require('../utils/auth');
const { Op } = require("sequelize");

const resolvers = {
  Query: {
    
    //STATUS: WORKING
    getMe: async (parent, args, context ) => {
      return await User.findByPk((context.user) ? context.user.id : 1);
    },
    
    //STATUS: WORKING
    getAllUsers: async (parent, args, context) => {
      return await User.findAll();
    },
    
    //STATUS: WORKING
    getUser: async (parent, { userId }, context) => {
	  console.log("USERID:",userId);
      return await User.findByPk(userId);
    },
    
    //STATUS: WORKING
    getMyFriends: async (parent, args, context) => {
      let userFriends = await User.findByPk(
		  context.user.id,
		  {
			include: {
			  model: User,
			  as: "friendshipUser",
			  through: "friend"
			}
		  }
      );
      return userFriends.friendshipUser;
    },
    
    //STATUS: WORKING
    getUserFriends: async (parent, { userId }, context) => {
      const userFriends = await User.findByPk(userId, {
		include: {
		  model: User,
		  as: "friendshipUser",
		  through: "friend"
		}})
      return userFriends.friendshipUser;
    },
    
    //STATUS: 
    getMyFollowing: async (parent, args, context) => {
      return(
		  await User.findByPk(
			  context.user.id,
			  {
				include: {
				  model: User,
				  as: "followingUsers",
				  through: "follow"
				}
			  }
		  )
      ).followingUsers;
    },
    
    //STATUS: 
    getUserFollowing: async (parent, { userId }, context) => {
      return (
		  await User.findByPk(
			  userId,
			  {
				include:
				{
				  model: User,
				  as: "followingUsers",
				  through: "follow"
				}
			  }
		  )
      ).followingUsers;
    },
    
    getUserBlocked: async (parent, { userId }, context) => {
      return (
		  await User.findByPk(
			  userId,
			  {
				include:
				{
				  model: User,
				  as: "blockedUser",
				  through: "blocked"
				}
			  }
		  )
      ).blockedUser;
    },
    
    getMyBlockedUsers: async (parent, args, context) => {
      let blocked = await User.findByPk(
		  context.user.id,
		  {
			include:
			{
			  model: User,
			  as: "blockedUser",
			  through: "blocked",
			}
		  }
      );
      return blocked.blockedUser;
    },
    
    
    //STATUS: WORKING
    getMyThoughts: async (parent, args, context) => {
      //return await Thought.findAll({ where: { userId: context.user.id }});
      return await Thought.findAll(
		  {
			where:
			{
			  userId: context.user.id
			},
			include:
			{
			  model: User,
			  as: "thoughtAuthor"
			},
			order:
			[
				[
					"id",
					"DESC"
				]
			],
		  }
      );
    },
    
    //STATUS: WORKING
    getAllThoughts: async (parent, args, context) => {
      if (context.user) {
		const blocking = (await Blocked.findAll(
			{
			  where:
			  {
				userId: context.user.id
			  }
			}
		)
						 ).map((entry) => entry.blockedId);
		const blockedBy = (await Blocked.findAll(
			{
			  where:
			  {
				blockedId: context.user.id
			  }
			}
		)
						  ).map((entry) => entry.blockedId);
		return Thought.findAll(
			{
			  where:
			  {
				id:
				{
				  [Op.ne]: [...blocking, ...blockedBy]
				}
			  },
			  include:
			  {
				model: User,
				as: "thoughtAuthor"
			  },
			  order:
			  [
				  [
					  "id",
					  "DESC"
				  ]
			  ]
			}
		);
      } else {
		return await Thought.findAll(
			{
			  include:
			  {
				model: User,
				as: "thoughtAuthor"
			  },
			  order:
			  [
				  [
					  "id",
					  "DESC"
				  ]
			  ]
			}
		)
      }
    },
    
    //STATUS: WORKING
    getAllLiked: async (parent, args, context) => {
      return await Liked.findAll();				  
    },
    
    //STATUS: WORKING
    getAllMyLiked: async (parent, args, context) => {
      return(
		  await Liked.findAll(
			  {
				where:
				{
				  likedByUserId: context.user.id
				}
			  }
		  )
      );
    },    
    
    //STATUS: WORKING
    getUserLiked: async (parent, { userId }, context) => {
      const liked =  await User.findByPk(userId, {
		include: {
		  model: Thought,
		  as: "userLiked",
		  through: "liked",
		  include: {
			model: User,
			as: "thoughtAuthor"
		  }
		}});
      return liked.userLiked;
    },    
    
    //STATUS: WORKING
    getThought: async(parent, { thoughtId }, context) => {
      const thought = await Thought.findByPk(
		  thoughtId,
		  {
			include:
			{  
  			  model: User,
			  as: "thoughtAuthor"
			}
		  }
      );

      return thought;
    },

    //STATUS: WORKING
    getThoughtLikes: async (parent, { thoughtId }, context) => {
      let thoughtLikes = await Thought.findByPk(
		  thoughtId, {
			include: { model: User,
					   as: "thoughtLikes",
					   through: "liked" }});
      return thoughtLikes.thoughtLikes;
    },

    //STATUS: WORKING
    getUserThoughts: async (parent, { userId }, context) => {
      const userThoughts = await Thought.findAll(
		  {
			where:
			{
			  userId: userId
			},
			include:
			{
			  model: User,
			  as: "thoughtAuthor"
			},
		  }
      );
	  //      console.log(userThoughts);
      return userThoughts;
    },

    //STATUS: WORKING
    getThoughtReplys: async (parent, { thoughtId }, context) => {
      const replys = await Thought.findByPk(
		  thoughtId,
		  {
			include:
			{
			  model: Thought,
			  as: "replyThoughts",
			  through:"reply",
			  include:
			  {
				model: User,
				as: "thoughtAuthor",
			  }
			},
			order:
			[
				[
					"id",
					"DESC"
				]
			]

		  }
      );
      return replys.replyThoughts;
    },

    getReplyOriginalThought: async (parent, { replyId } , context) => {
	  const originalThought = await Thought.findByPk(
		  replyId,
		  {
			include:
			{
			  model: Thought,
			  as: "originalReplyThought",
			  through: "reply",
			  include:
			  {
				model: User,
				as: "thoughtAuthor"
			  }
			}
		  }
	  );
	  return originalThought.originalReplyThought[0];
    },

    getThoughtReThoughts: async (parent, { thoughtId } , context) => {
	  const reThoughts = await Thought.findByPk(
		  thoughtId,
		  {
			include:
			{
			  model: Thought,
			  as: "reThoughtThoughts",
			  through: "reThought",
			  include:
			  {
				model: User,
				as: "thoughtAuthor"
			  }
			}
		  }
	  );
	  return reThoughts.reThoughtThoughts;
    },

    getReThoughtOriginalThought: async (parent, { reThoughtId } , context) => {
	  const originalThought = await Thought.findByPk(
		  reThoughtId,
		  {
			include:
			{
			  model: Thought,
			  as: "originalReThoughtThought",
			  through: "reThought",
			  include:
			  {
				model: User,
				as: "thoughtAuthor"
			  }
			}
		  }
	  );
	  return originalThought.originalReThoughtThought[0];
    },

    //STATUS: WORKING
    getUserReThoughts: async (parent, { userId }, context) => {
      const allReThoughts = await ReThought.findAll();
      const allReThoughtsData = allReThoughts;
      
      const allUserThoughts = await Thought.findAll(
		  {
			where:
			{
			  userId: userId
			},
			include:
			{
			  model: User,
			  as: "thoughtAuthor"
			},
			attributes: ["id"],
	  		order : [["id", "DESC"]],
		  }
      );					  
      
      const allUserThoughtsData = allUserThoughts.map(id => id.id);    
      const userReThoughtIds = allReThoughtsData.filter(
		  thought => allUserThoughtsData.includes(thought.reThoughtThoughtId)
      );
      
      const reThoughtIds = userReThoughtIds.map(thought => thought.reThoughtThoughtId)      
      const reThoughts = await Thought.findAll(
		  {
			where:
			{
			  id: reThoughtIds
			},
			include:
			[
				{
				  model: User,
				  as: "thoughtAuthor",
				},
				
				{
				  model: Thought,
				  through: "reThought",
				  as: "originalReThoughtThought",
				  include:
				  {
					model: User,
					as: "thoughtAuthor"
 				  }
				}
			]
		  }
      );
      return reThoughts;      
    },

    getAllReThoughtIds: async (parent, args, context) => {
      return (await ReThought.findAll({})).map(entry => entry.get({ plain: true }));
    },
    getAllReplyIds: async (parent, args, context) => {
      return (await Reply.findAll({})).map(entry => entry.get({plain:true}));
    },

    //STATUS: WORKING
    getUserReplys: async (parent, { userId }, context) => {
      const allReplys = await Reply.findAll();
      const allReplysData = allReplys.map(entry => entry.get({ plain: true }));
      
      const allUserThoughts = await Thought.findAll(
		  {
			where:
			{
			  userId: userId
			},
			attributes: ["id"]
		  }
      );					  
      const allUserThoughtsData = allUserThoughts.map(
		  entry => entry.get({ plain: true })).map(id => id.id);
      
      const userReplyIds = allReplysData.filter(
		  thought => allUserThoughtsData.includes(thought.replyOfId)
      );
      
      const replys = await Thought.findAll(
		  {
			where:
			{
			  id: userReplyIds.map(thought => thought.replyThoughtId)
			},
			include:
			{
			  model: Thought,
			  as: "replyThought",
			  through: "reply",
			  include:
			  {
				model: User,
				as: "thoughtAuthor",
			  }
			}
		  }
      );
      
      return replys;      
    },

    getUserLikedIds: async (parent, { userId }, context) => {
      return (await Liked.findAll({})).map(entry => entry.get({ plain: true }));
    },

    getReThoughtIdPairs: async (parent, { originalThoughtId }, context) => {
      return await ReThought.findAll(
		  {
			where:
			{
			  reThoughtThoughtId: originalThoughtId
			}
		  }
      );
    },

    getReplyIdPairs: async (parent, { originalThoughtId }, context) => {
      return await Reply.findAll(
		  {
			where:
			{
			  replyThoughtId: originalThoughtId
			},
			include:
			{
			  model: Thought,
			  include:
			  {
				model: User
			  }
			}
			
		  }
      );
    },

    getMyNotifications: async (parent, args, context) => {
      // Get all notifications
	  // WORK ON IMPLEMENTING MERGE SORT FOR A GROUPED OUTPUT NOT SPLIT UP
      var notifications = await Notification.findAll(
		  {
			where:
			{
			  toUser: context.user.id,
			  acknowledge: false
			},
			include:
			[
				
				{
				  model: Pending,
				  include:
				  {
					model: User,
					as: "requestingFriend"
				  }
				},
				
				{
				  model: Following,
				  include:
				  {
					model: User,
					as: "follower"
				  }
				},
				
				{
				  model: Liked,
				  include:
				  [
					  {
						model: Thought,
						as: "likedThought"
					  },
					  {
						model: User,
						as: "thoughtLiker"
					  }
				  ]
				},
				
				{
				  model: Reply,
				  include:
				  [
					  {
						model: Thought,
						as: "replyThought",
						include:
						{
						  model: User,
						  as: "thoughtAuthor"
						}
					  },
					  {
						model: Thought,
						as: "originalReplyThought",
						include:
						{
						  model: User,
						  as: "thoughtAuthor"
						}
					  }
				  ]
				},
				
				{
				  model: ReThought,
				  include:
				  [
					  {
						model: Thought,
						as: "reThoughtThought",
						include:
						{
						  model: User,
						  as: "thoughtAuthor"
						}
					  },
					  {
						model: Thought,
						as: "originalReThoughtThought",
						include:
						{
						  model: User,
						  as: "thoughtAuthor"
						}
					  }
				  ]
				}				
			],
			order:
			[
				[
					"createdAt", "ASC"
				]
			]
			
		  }
      )
	  //console.log("NOTIFS:",notifications.map(entry => entry.get({plain:true})));

	  return notifications
    },

    getMyPendingRequests: async (parent, args, context) => {
      return await Pending.findAll(
		  {
			where:
			{
			  userId: context.user.id
			},
			include:
			{
			  model: User,
			  as: "requestingFriend"
			}
		  }
      );
    },
  },
  Mutation: {

    //STATUS: WORKING
    login: async (parent, {email, password}, context) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new AuthenticationError("There is no user of that email");
      }
      const correctPw = await user.checkPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Password is incorecct");
      }
      const token = signToken(user);
      return { token, user };
    },

    //STATUS: WORKING
    //args = {userName, handle, first/lastName, email, password}
    addUser: async (parent, args, context) => {
      const newUser = await User.create({ ...args });
      const token = signToken(newUser);
      return { token, user: newUser };
    },

    //STATUS: WORKING
    //args = {userName, handle, first/lastName, email, password}
    updateUser: async (parent, args, context) => {
      const userUpdate = await User.update(
		  {
			...args
		  },
		  {
			where:
			{
			  id: context.user.id
			}
		  }
      );
      return userUpdate[0] === 1;
    },

    //STATUS: WORKING
    deleteUser: async (parent, { userId }, context) => {
      if (context.user.id === userId) {
		return (await User.destroy({where: {id: userId}}) === 1);
      } else {
        throw new AuthenticationError("You need to be signed in!");
      }
    },

    //STATUS: WORKING
    //Need to update in future to check if userId is valid
    approveFriendRequest: async (parent, { friendId }, context) => {      
      // making two entries so only one column needs to be quired
      // when collecting all of a user's friends
      try {
		//update findAll ro findOne
		const isValidRequest = await Pending.findOne(
			{
			  where:
			  {
				userId: friendId,
				pendingId: context.user.id
			  }
			}
		);
		console.log("REQUEST:", isValidRequest);

		if(isValidRequest !== null && isValidRequest.length !== 0) {
		  await Pending.destroy(
			  {
				where:
				{
				  [Op.and]:
				  [
					  { userId: context.user.id },
					  { pendingId: friendId }
				  ]
				}
			  }
		  );
		  await Notification.update(
			  {
				acknowledge: true
			  },
			  {
				where:
				{
				  fromUser: friendId,
				  toUser: context.user.id,
				  friendRequestEntryId: isValidRequest.id
				}
			  }
		  );
		  
		  return ((await Friend.create({userId: context.user.id, friendId}) !== null) &&
				  (await Friend.create({userId: friendId, friendId: context.user.id}) !== null));
		} else {
		  return false;
		}
      }catch (err) {
		console.log(err.message);
      }
    },

    //STATUS: 
    addFollow: async (parent, { followingId }, context) => {
      const follow = await Following.create(
		  {
			userId: context.user.id,
			followingId: followingId
		  }
      );
      const notification = await Notification.create(
		  {
			fromUser: context.user.id,
			toUser: followingId,
			followedByEntryId: follow.id
		  }
      )
      return (follow !== null && notification !== null);
    },

    //STATUS: WORKING
    sendFriendRequest: async (parent, { pendingId }, context) => {
      try {
		const pending = await Pending.create(
			{
			  userId: context.user.id,
			  pendingId: pendingId
			}
		);
		const notification = await Notification.create(
			{
			  fromUser: context.user.id,
			  toUser: pendingId,
			  friendRequestEntryId: pending.id
			}
		);
		return (pending !== null && notification !== null);
      } catch (err) {
		console.error(err.message);
      }
      return false;
    },

    denyFriendRequest: async (parent, { pendingId }, context) => {
      const deny = await Pending.destroy(
		  {
			where:
			{
			  [Op.and]:
			  [
				  { userId: context.user.id },
				  { pendingId: pendingId }
			  ]
			}
		  }
      );
      
      const acknowledge = await Notification.update(
		  {
			acknowledge: true
		  },
		  {
			where:
			{
			  fromUser: pendingId,
			  toUser: context.user.id,
			  friendRequestEntryId: pendingId
			}
		  }
      );
      return (deny !== null && acknowledge !== null);
    },

	// IMPLEMENT WASHING OUT FRIEND REQUESTS(PENDING) AND FOLLOWING ENTRIES
    addBlocked: async (parent, { blockedId }, context) => {
	  // check if the bloked ID is in following/friendship/pending
	  // if found delete those entries

	  await Notification.destroy(
		  {
			where:
			{
			  toUser: context.user.id,
			  fromUser: blockedId
			}
		  }
	  );

	  await Notification.destroy(
		  {
			where:
			{
			  toUser: blockedId,
			  fromUser: context.user.id,
			}
		  }
	  );

	  await Following.destroy(
		  {
			where:
			{
			  userId: blockedId,
			  followingId: context.user.id
			}
		  }
	  );

	  await Following.destroy(
		  {
			where:
			{
			  userId: context.user.id,
			  followingId: blockedId,
			}
		  }
	  );

	  await Friend.destroy(
		  {
			where:
			{
			  userId: blockedId,
			  friendId: context.user.id
			}
		  }
	  );

	  await Friend.destroy(
		  {
			where:
			{
			  userId: context.user.id,
			  friendId: blockedId,
			}
		  }
	  );

	  await Pending.destroy(
		  {
			where:
			{
			  userId: blockedId,
			  pendingId: context.user.id
			}
		  }
	  );

	  await Pending.destroy(
		  {
			where:
			{
			  userId: context.user.id,
			  pendingId: blockedId,
			}
		  }
	  );
	  
      return (await Blocked.create(
		  {
			userId: context.user.id,
			blockedId: blockedId
		  }
      ) !== null);
    },

    removeBlocked: async (parent, { blockedId }, context) => {
      return (await Blocked.destroy(
		  {
			where:
			{
			  blockedId
			}
		  }
      ) === 1);
    },
    
    //STATUS: WORKING
    removeFriend: async (parent, { friendId }, context) => {
      return ((await Friend.destroy(
		  {
			where:
			{
			  userId: context.user.id,
			  friendId: friendId
			}
		  }
	  )
			   &&
			   await Friend.destroy(
				   {
					 where:
					 {
					   userId: friendId,
					   friendId: context.user.id
					 }
				   }
			   )
			  ) === 1);
	  
    },

    //STATUS: WORKING
    removeFollow: async (parent, { followingId }, context) => {
      return (await Following.destroy({where: { userId: context.user.id, followingId }}) === 1)
    },
    
    //STATUS: WORKING
    addThought: async (parent, { content }, context) =>{ 
      if (context.user) {
		let thought =  await Thought.create(
			{
			  userId: context.user.id,
			  content: content,
			}
		);
		return await Thought.findByPk(
			thought.id,
			{
			  include:
			  {
				model: User,
				as: "thoughtAuthor"
			  }
			}
		);				     
      } else {
		//Need to replace with different error
		throw new Error("Something went wrong");
      }
      throw new AuthenticationError("You are not logged in");
    },

    //STATUS: WORKING
    updateThought: async (parent, { thoughtId, content }, context) => {
      const thought = await Thought.findByPk(thoughtId);
      if (context.user.id === thought.userId) {
		const [rowsEffected, updatedThought] = await Thought.update(
			{
			  content
			},
			{
			  where:
			  {
				id: thoughtId
			  }
			}
		);
		return await Thought.findByPk(thoughtId, { include: { model: User }});
      } else {
		//Ned to replace with different error
		throw new Error("You are not this thought's owner");
      }
    },

    //STATUS: WORKING
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
		return (await Thought.destroy({ where: { id: thoughtId }}) === 1);
      } else {
        throw new Error("You can not delete this thought!");
      }
    },

    //STATUS: WORKING
    addLiked: async (parent, { thoughtId, thoughtUserId }, context) => {
      if (context.user) {
		try {
		  const liked = await Liked.create(
			  {
				thoughtId: thoughtId,
				likedByUserId: context.user.id
			  }
		  )
		  const acknowledge = await Notification.create(
			  {
				fromUser: context.user.id,
				toUser: thoughtUserId,
				likedThoughtId: thoughtId
			  }
		  );
		  
		  return ( liked !== null && acknowledge !== null);
		} catch (err) {
		  console.error(err.message);
		}
      } else {
		throw new AuthenticaitonErro("You need to be logged in to like a thought!");
      }
    },

    //STATUS: WORKING
    removeLiked: async (parent, { thoughtId }, context) => {
      return (await Liked.destroy(
		  {
			where:
			{
			  thoughtId,
			  likedByUserId: context.user.id
			}
		  }
      ) === 1);
    },
    
    //STATUS: WORKING
    replyToThought: async (parent, { content, thoughtId, thoughtUserId}, context) => {
      const thoughtReply =  await Thought.create(
		  {
			userId: context.user.id,
			content: content,
		  }
      );

      const reply = await Reply.create(
		  {
			replyOfId: thoughtId,
			replyThoughtId: thoughtReply.id
			
		  }
      )

      const acknowledge = await Notification.create(
		  {
			fromUser: context.user.id,
			toUser: thoughtUserId,
			replyToEntryId: reply.id
		  }
      );
      return reply;
    },
    
    //STATUS: PENDING
    addReThought: async (parent, { originalThoughtId, additionalThought, originalThoughtUserId }, context) => {
      if (context.user) {
		const reThoughtThought = await Thought.create(
			{
			  userId: context.user.id,
			  content: additionalThought,
			}
		);

		const reThought = await ReThought.create(
			{
			  reThoughtOfId: originalThoughtId,
			  reThoughtThoughtId: reThoughtThought.id
			}
		);

		const acknowledge = await Notification.create(
			{
			  fromUser: context.user.id,
			  toUser: originalThoughtUserId,
			  reThoughtOfEntryId: reThought.id
			}
		);		
		return reThought;

      } else {
		throw new AuthenticationError("You can not reThought unless your logged in");
      }      
    },

    acknowledgeNotification: async (parent, { notificationId }, context) => {
      return (await Notification.update(
		  {
			acknowledge: true
		  },
		  {
			where:
			{
			  id: notificationId
			}
		  }
      ) !== null);
    }
  }
};

module.exports = resolvers;


