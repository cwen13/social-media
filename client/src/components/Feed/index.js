import React, { useEffect  } from "react";
// Need to get teh liked list to reload when accessing the page a second time and on
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ThoughtPost from "./../Posts/ThoughtPost"
import {
  QUERY_ALL_THOUGHTS,
  QUERY_USER_THOUGHTS,
  QUERY_MY_LIKED,
  QUERY_USER_LIKED,
  QUERY_USER_RETHOUGHTS,
  QUERY_ALL_RETHOUGHT_IDS,
  QUERY_ALL_REPLY_IDS
} from "./../../utils/queries";
import { useUserContext } from "./../../utils/UserContext";
import "./style.css";

const Feed = (props) => {
  let userPageId = useParams().userId;

  const { userId } = useUserContext();
  userPageId = (userPageId !== undefined) ? userPageId : userId;
  
  const queryOptions = {
    MyPage : QUERY_USER_THOUGHTS,
    UserPage: QUERY_USER_THOUGHTS,
    MainFeed :  QUERY_ALL_THOUGHTS,
    Liked: QUERY_USER_LIKED,
    MyReThoughts: QUERY_USER_RETHOUGHTS
  };

  const thoughts = {
    MyPage : "getUserThoughts",
    UserPage: "getUserThoughts",
    MainFeed :  "getAllThoughts",
    Liked: "getUserLiked",
    MyReThoughts: "getUserReThoughts"
  };

  const { loading: replyIdsLoading, error: replyIdsError, data: replyIdsData } = useQuery(QUERY_ALL_REPLY_IDS);
  const { loading: reThoughtIdsLoading, error: reThoughtIdsError, data: reThoughtIdsData } = useQuery(QUERY_ALL_RETHOUGHT_IDS);
  
  
  const queryString = (props.page === "MainFeed" && userPageId === undefined || userPageId === 0)
	? ""
	: { variables: { userId: userPageId }};
  
  const { loading: likedIdsLoading, error: likedIdsError, data: likedIdsData, refresh: likedIdsRefresh } = useQuery(
    QUERY_MY_LIKED,
    queryString
  );
  
  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
    queryOptions[props.page],
    queryString    
  );
  
  if (likedIdsLoading) return "Loading Likes";
  if (queryLoading) return "Loading Query";
  if (queryError) return `Q Error ${queryError.message}`;
  if (reThoughtIdsLoading) return "Loading rethought ids";
  if (replyIdsLoading) return "Loading reply ids";
    
  const reThoughtIds = new Set(reThoughtIdsData.getAllReThoughtIds.map(entry => entry.reThoughtThoughtId));
  const isReThought = (thoughtId) => reThoughtIds.has(thoughtId);

  const replyIds = new Set(replyIdsData.getAllReplyIds.map(entry => entry.replyThoughtId));
  const isReply = (thoughtId) => replyIds.has(thoughtId);
  
  const likedThoughts = (likedIdsData) ? likedIdsData.getAllMyLiked.map(result => result.id) : [];
  const isLiked = (thoughtId) => likedThoughts.includes(thoughtId);

  let noData;
  if (queryData === null) {
    switch (props.page) {
    case "MyPage":
      noData = "I have not posted anything yet";
      break;
    case "UserPage":
      noData = "User has not posted anything yet";
      break;
    case "MainFeed":
      noData = "othing to see here";
      break;
    case "Liked":
      noData = "I have not liked anythingyet";
      break;
    case "ReThoughts":
      noData = "I have not rethought anything yet";
      break;
    default:
      noData = null;
      break;
    }
  }
  
  return (
    <div className="feed">
      <ul className="feedPosts">
      {(noData === null) ? noData :
       queryData[thoughts[props.page]].map(thought =>
	 <ThoughtPost key={thought.id}
		      page={props.page}
		      thoughtId={thought.id}
		      thought={thought.content}
		      liked={isLiked(thought.id)}
		      isReThought={isReThought(thought.id)}
		      isReply={isReply(thought.id)}
		      userId={thought.user.id}
		      userName={thought.user.userName}
	 />)}
	</ul>
    </div>
  );
};
	  
export default Feed;

