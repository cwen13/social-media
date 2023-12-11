import Reacct from "react";

  const [ isLiked, setIsLiked ] = useState(props.liked);

  const [ likedThought, { error: likedError }] = useMutation(
    ADD_LIKED,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );
  const [ removeLikedThought, { error: removeLikedError }] = useMutation(
    REMOVE_LIKED,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );



  const handleLiked  = async (event) => {
    event.preventDefault();
    try {
      if (userId && !isLiked) {
	const likedResponse = await likedThought({
	  variables: {
	    thoughtId: props.thoughtId
	  }
	});
	setIsLiked(true);
      } else if (userId && isLiked) {
	const removeLikedResponse = await removeLikedThought({
	  variables: {
	    thoughtId: props.thoughtId
	  }
	});
	setIsLiked(false);
      } else {
	console.log("User needs to be logged in");
      };
    } catch (e) {
      throw new Error("No thought thought liked");
      console.log(e);
    }
  };

	     <button id={`liked-${props.thoughtId}`}
		     className={isLiked ? "liked-thought" : "not-liked-thought"}
		     onClick={handleLiked}>
	       LIKE!
	     </button>
