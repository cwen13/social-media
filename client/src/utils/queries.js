import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
  getMe {
    id
    userName
    handle
    email
    profilePicture
  }
}`;

export const QUERY_ALL_USERS = gql`
query getAllUsers {
  getAllUser {
    id
    userName
    firstName
    lastName
    email
    profilePicture
  }
}`;

export const QUERY_USER = gql`
query getUser($userId: ID!) {
  getUser(userId: $userId) {
    id
    lastName
    firstName
    email
    userName
    handle
    profilePicture
  }
}`;

export const QUERY_MY_FRIENDS = gql`
query getMyFriends {
  getMyFriends {
    id
    userName
    handle
    profilePicture
  }
}`;

export const QUERY_USER_FRIENDS = gql`
query getUserFriends($userId: ID!) {
  getUserFriends(userId: $userId) {
    id
    userName
    handle
    profilePicture
  }
}`;

export const QUERY_MY_FOLLOWING = gql`
query getMyFollowing {
  getMyFollowing {
    id
    userName
    handle
    profilePicture
  }
}`;

export const QUERY_USER_FOLLOWING = gql`
query getUserFollowing($userId: ID!) {
  getUserFollowing(userId: $userId) {
    id
    userName
  }
}`;


export const QUERY_MY_THOUGHTS = gql`
query getMyThoughts {
  getMyThoughts {
    id
    userId
    content
    type
    liked
    thoughtAuthor {
      id
      userName
    }
  }
}`;

export const QUERY_ALL_THOUGHTS = gql`
query getAllThoughts {
  getAllThoughts {
    id
    userId
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
      profilePicture
    }
  }
}`;

export const QUERY_ALL_LIKED = gql`
query getAllLiked {
  getAllLiked {
    thoughtId
    likedByUserId
  }
}`;

export const QUERY_THOUGHT = gql`
query getThought($thoughtId: ID!) {
  getThought(thoughtId: $thoughtId) {
    id
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
      profilePicture
    }
  }
}`;

export const QUERY_THOUGHT_LIKES = gql`
query getThoughtLikes ($thoughtId: ID!) {
  getThoughtLikes(thoughtId: $thoughtId) {
    id
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
      profilePicture
    }
  }
}`;


export const QUERY_USER_THOUGHTS = gql`
query getUserThoughts ($userId: ID!) {
  getUserThoughts (userId: $userId) {
    id
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
      profilePicture
    }
  }
}`;

export const QUERY_REPLYS = gql`
query getThoughtReplys ($thoughtId: ID!) {
  getThoughtReplys(thoughtId: $thoughtId) {
    id
    content
    createdAt
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
      profilePicture
    }
  }
}`;

export const QUERY_RETHOUGHT = gql`
query getThoughtReThoughts ($originalThoughtId: ID!) {
  getThoughtReThoughts(originalThoughtId: $originalThoughtId) {
    id
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
    }
  }
}`;

export const QUERY_MY_RETHOUGHTS = gql`
query getMyReThoughts {
  getMyReThoughts {
    id
    userId
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
    }
  }
}`;

export const QUERY_MY_LIKED = gql`
query getAllMyLiked {
  getAllMyLiked {
    thoughtId
    likedByUserId
  }
}`;

export const QUERY_USER_LIKED = gql`
query getUserLiked ($userId: ID!) {
  getUserLiked (userId: $userId) {
    id
    userId
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
    }
  }
}`;


export const QUERY_USER_RETHOUGHTS = gql`
query getUserReThoughts ($userId: ID!)  {
  getUserReThoughts (userId: $userId) {
    id
    userId
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
      profilePicture
    }
  }
}`;

export const QUERY_ALL_RETHOUGHT_IDS = gql`
query getAllReThoughtIds {
  getAllReThoughtIds {
    reThoughtOfId
    reThoughtThoughtId
  }
}`;

export const QUERY_ALL_REPLY_IDS = gql`
query getAllReplyIds {
  getAllReplyIds {
    replyOfId
    replyThoughtId
  }
}`;

export const QUERY_ALL_LIKED_IDS = gql`
query getUserLikedId ($userId: ID!) {
  getUserLikedIds (userId: $userId) {
    thoughtId
    likedByUserId
  }
}`;

export const QUERY_RETHOGHT_ID_PAIRS = gql`
query getReThoughtIdPairs ($originalId: ID!) {
  getReThoughtIdPairs (reThoughtOfId: $originalId) {
    reThoughtOfId
    reThoughtThoughtId
  }
}`;


export const QUERY_REPLY_ID_PAIRS = gql`
query getReplyIdPairs ($originalId: ID!) {
  getReThoughtIdPairs (replyOfId: $originalId) {
    replyOfId
    replyThoughtId
  }
}`;

export const QUERY_RETHOUGHT_ORIGINAL_THOUGHT = gql`
query getReThoughtOriginalThought ($reThoughtId: ID!) {
  getReThoughtOriginalThought (reThoughtId: $reThoughtId) {
    id
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
    }
  }
}`;

export const QUERY_REPLY_ORIGINAL_THOUGHT = gql`
query getReplyOriginalThought ($replyId: ID!) {
  getReplyOriginalThought (replyId: $replyId) {
    id
    content
    type
    liked
    thoughtAuthor {
      id
      userName
      handle
    }
  }
}`;

export const QUERY_USER_BLOCKED = gql`
query getUserBlocked ($userId: ID!) {
  getUserBlocked(userId: $userId) {
    id
    userName
    handle
    profilePicture
  }
}`;

export const QUERY_MY_BLOCKED_USERS = gql`
query getMyBlockedUsers {
  getMyBlockedUsers {
    id
    userName
    handle
    profilePicture
  }
}`;

export const QUERY_MY_PENDING_REQUESTS = gql`
query getMyPendingRequests {
  getMyPendingRequests {
    userId
    pendingId
    requestingFriend {
      id
      userName
      handle
      profilePicture
    }
  }
}`;

export const GET_NOTIFICATION_ID = gql`
query getNotificationId {
  getNotificationId {
    userId
    pendingId
    requestingFriend {
      id
      userName
      handle
      profilePicture
    }
  }
}`;


export const GET_MY_NOTIFICATIONS = gql`
query getMyNotifications {
  getMyNotifications {
    id
    fromUser
    toUser
    friendRequestEntryId
    followedByEntryId
    likedThoughtId
    replyToEntryId
    reThoughtOfEntryId
    acknowledge
    pending {
      requestingFriend {
        id
        handle
        userName
        profilePicture
      }
    }
    following {
      follower {
        id
        handle
        userName
        profilePicture
      }
    }
    liked {
      likedThought {
        id
        content
      }
      thoughtLiker {
        id
        handle
        userName
        profilePicture
      }
    }
    reply {
      originalReplyThought {
        id
        content
        thoughtAuthor {
          id
          handle
          userName
          profilePicture
        }
      }
      replyThought {
        id
        content
        thoughtAuthor {
          id
          handle
          userName
          profilePicture
        }
      }
    }
    reThought {
      reThoughtThought {
        id
        content
        thoughtAuthor {
          id
          handle
          userName
          profilePicture
        }
      }
      originalReThoughtThought {
        id
        content
        thoughtAuthor {
          id
          handle
          userName
          profilePicture
        }
      }
    }
  }
}`;

export const GET_BLOCKED_OR_BLOCKING = gql `
query getIfBlockedOrBlockingUser ($userId: ID!) { getIfBlockedOrBlockingUser(userId: $userId) }`;
