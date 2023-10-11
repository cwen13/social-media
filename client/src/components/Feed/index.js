import React from "react";

const Feed = (props) => {
  const { loading, error, data } =  useQuery(QT);
  
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;
  
  console.log("data:", data.getThoughts);

  var key = 0;
  const renderThought = (thought) => {
    return (    	
      <div className="thought" key={thought.id}>
	  <p>User: {thought.userId}</p>
	  <p>Thought: {thought.content}</p>
	</div>
    );
  }
  
  return (
      <>
      <p> The feed</p>
      </>
  );
};

export default Feed;
