import React from "react";


	     <button id={`remove-${props.thoughtId}`}
		     onClick={handleRemove}>Remove!
	     </button> 

  const [ removeThought, { error: removeError }] = useMutation(
    REMOVE_THOUGHT,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );



  const handleRemove = async (event) => {
    event.preventDefault();
    try {
      const removeResponse = await removeThought({
	variables: {
	  thoughtId: props.thoughtId
	}});
    } catch (e) {
      throw new Error("No thought removed");
      console.log(e);
    };
  };
  
