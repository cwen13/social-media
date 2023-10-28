let { writeFile } = require("fs");
const thoughts = require("./thoughtSeed.json");
const users = require("./userSeedData.json");

//Need to make: Liked, ReThought, Thought
//Liked: id(INT), thoughtId, likedByUserId
//ReThought: id, reThoughtByUSerId, orginalThoughtId, additionalThoughtId
//**Leaving Rethoughts empty and maybe later after testing db in apoolo client**
//Thought: id, userId, content, thoughtReplyOfId, reThought

//Have
//Thought(partial): id, content
//User(full)
//Friend(full)

const randomUser = () => Math.floor(Math.random() * (28));

const randomThought = (numberOfThoughts) => thoughts[Math.floor(Math.random()* numberOfThoughts)];

const createThought = (thought, userId) => though = { userId: userId,
						      content: thought,
						      thoughtReplayOfId: false,
						    };

const createLike = (thoughtId, userId) => like = {thoughtId: thoughtId ,
						  likedByUserId: userId
						 };

const writeSeedData = (seedName, seedData) => {
  writeFile(seedName,
	    JSON.stringify(seedData),
	    (err) => {
	      if(err) console.log("ERROR:",err);
	    });
};

const init = () => {
  //use thought file for creation of thought models
  Thoughts = [];
  for (let i =0; i < thoughts.length; i++) {
    Thoughts.push(createThought(thoughts[i].content,
				randomUser()));
  };

  writeSeedData("thoughtSeedData.json", Thoughts);
  
  //use thougths to create some liked one
  let same;
  Liked = [];
  for (let i=0; i < (2*users.length); i++) {
    tempLike = createLike(randomThought(thoughts.length).id,
			  randomUser()
			 );
    if (Liked.length === 0) {
      Liked.push(tempLike);
      continue;
    };

    same = false;
    //check for duplicate entries
    for (let j=0; j < Liked.length; j++) {
      let currentLike = Liked[j];
      if (currentLike.thoughtId === tempLike.thoughtID &&
	  currentLike.likedByUserId === tempLike.likedByUserId) {
	same = true;
	break;
      };
    };
    if(same) continue;
    Liked.push(tempLike);
  };
    writeSeedData("likedSeedData.json", Liked);
};

init();

