import React from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./../../utils/UserContext";
import { useQuery } from "@apollo/client";
import {
  QUERY_THOUGHT,
  QUERY_MY_LIKED,
  QUERY_REPLYS
} from "./../../utils/queries";
import UserInfo from "./../../components/UserInfo";
import ThoughtPost from "./../../components/Posts/ThoughtPost";
//import ThoughtReplys from "./../../components/ThoughtReplys";

import "./../MainStyles/style.css";

const ThoughtPage = () => {
  const page = "ThoughtPage";
  const { postId } = useParams();
  const { userId, loginUSer, logoutUser } = useUserContext();

  const { loading: thoughtLoading, error: thoughtError, data: thoughtData } =
	useQuery(
	  QUERY_THOUGHT,
	  { variables: { thoughtId: postId } }
	);

  
  const { loading: likedLoading, error: likedError, data: likedData } = useQuery(QUERY_MY_LIKED);
  const likedThoughts = (likedData) ? likedData.getAllMyLiked.map(result => result.thoughtId) : [0];
  const isLiked = (thoughtId) => likedThoughts.includes(thoughtId);
  if (likedLoading) return <p> Loading </p>;
  if (thoughtLoading) return <p> Loading </p>;

  const thought = thoughtData.getThought;
  
  return(
    <section id="feedContainer">
	  <UserInfo id="userInfo"  page={page}/>
	  <ThoughtPost userName={thought.user.userName}
		       userId={thought.user.id}
		       thought={thought.content}
		       thoughtId={thought.id}
		       thoughtReplyOfId={thought.thoughtReplyOfId}
		       key={thought.id}
		       page={page}
		       liked={isLiked(thought.id)}
	  />
    </section>);
};


export default ThoughtPage;
