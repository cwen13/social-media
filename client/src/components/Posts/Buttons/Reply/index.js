import Reacrt from "react";


  const [ replying, setReplying ] = useState(false);
  const [ replyContent, setReplyContent ] = useState("");
  const replyAreaRef = useRef(null);
  const [ cursorPositionReply, setCursorPositionReply ] = useState({ start:0, end: 0 });
  const [ replyToThought, { error: replyError }] = useMutation(
    REPLY_TO_THOUGHT,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );

  // for text to be focus during typinging reply
  useEffect(() => {
    if(replying) {
      replyAreaRef.current.focus();
      replyAreaRef.current.selectionStart = cursorPositionReply.start;
    }
  },[replyContent]);


  const handleChangeReply = (event) => {
    setReplyContent(event.target.value);
    setCursorPositionReply({ start: event.target.selectionStart,
			     end: event.target.selectionEnd
			   });    
  };

  const handleReplySubmit = async () => {
    try {
      const reply = await replyToThought({
	variables: {
	  content: replyContent,
	  thoughtReplyOfId: props.thoughtId
	}});
      setReplyContent("");
      setReplying(false);
    } catch (e) {
      throw new Error("You did not reply to the thought!");
      console.log(e);
    }
  };

  const ReplySection = () => {
    return(
      <>
	{!replying
	 ? <button id={`reply-${props.thoughtId}`}
		   onClick={() => setReplying(true)}>
	     REPLY!
	   </button>
	 : <section className="replying">
	     <textarea id="replyTextBox"
		       name="replyContent"
		       spellCheck="true"
		       placeholder="Reply with kindness"
		       onChange={handleChangeReply}
		       ref={replyAreaRef}
		       value={replyContent}>
	     </textarea>
	     <div className="actions">
	       <button id={`saveEdit-${props.thoughtId}`}
		       onClick={handleReplySubmit}> SAVE </button>
	     </div>
	   </section>}
      </>
    );
  };
