import React from "react";

  const [ reThought, setReThought] = useState(false);
  const [ reThoughtText, setReThoughtText ] = useState("");
const [ cursorPositionReThought, setCursorPositionReThought ] = useState({ start:0, end: 0 });

  const reThoughtAreaRef = useRef(null);
  const [ addReThought, { error: rethoughtError }] = useMutation(
    RETHOUGHT_THOUGHT,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );

  // for text to be focus during typinginreTthought
  useEffect(() => {
    if(reThought) {
      reThoughtAreaRef.current.focus();
      reThoughtAreaRef.current.selectionStart = cursorPositionReThought.start;    
    }
  },[reThoughtText]);

  const handleChangeReThought = (event) => {
    setReThoughtText(event.currentTarget.value);
    setCursorPositionReThought({ start: event.target.selectionStart,
				 end: event.target.selectionEnd
			       });
  };

  const handleReThought = async (event) => {
    event.preventDefault();
    try {
      const reply = await addReThought({
	variables: {
	  originalThoughtId: props.thoughtId,
	  additionalThought: reThoughtText
	}});
      console.log("re'ed the thought");
      setReThoughtText("");
      setReThought(false);
    } catch (e) {
      throw new Error("You did not re the thought!");
      console.log(e);
    }
    
  }


  const ReThoughtButtonSection = (event) => {
    return (
      <>
	{!reThought
	 ? <button id={`reThought-${props.thoughtId}`}
		   onClick={() => setReThought(true)}>
	     RETHOGUHT
	   </button>
	 : <section className="reThought">
	     <textarea id="reThoughtTextBox"
		       name="reThoughtText"
		       spellCheck="true"
		       placeholder="Additional thoughts?"
		       onChange={handleChangeReThought}
		       ref={reThoughtAreaRef}
		       value={reThoughtText}>
	     </textarea>
	     <div className="actions">
	       <button id={`saveReThought-${props.thoughtId}`}
		       onClick={handleReThought}> SAVE </button>
	     </div>
	   </section>
	}
      </>	       
    );
  };


