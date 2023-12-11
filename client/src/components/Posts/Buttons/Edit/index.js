import React from "react";

  const [ isEditing, setIsEditing ] = useState(false);

  const [ thoughtText, setThoughtText ] = useState(props.thought);
  const [ cursorPositionThought, setCursorPositionThought ] = useState({ start:0, end: 0 });

  const thoughtAreaRef = useRef(null);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const updateThoughtResponse = await updateThought({
	variables: {
	  thoughtId: props.thoughtId,
	  content: thoughtText
	}});
      setIsEditing(false);
    } catch (e) {
      console.log("Thought update was not commited to memory")
      console.log(e)
    }; 
  };


  const [ updateThought, { error: updateError }] =  useMutation(
    UPDATE_THOUGHT,
    {
      refetchQueries:
      [
	QUERY_ALL_THOUGHTS,
	"getAllThoughts"
      ]
    }
  );

  // for text to be focus during typingin thought
  useEffect(() => {
    if(isEditing) {
      thoughtAreaRef.current.focus();
      thoughtAreaRef.current.selectionStart = cursorPositionThought.start;    
    }
  },[thoughtText]);

  const handleChangeThought = (event) => {
    setThoughtText(event.currentTarget.value);
    setCursorPositionThought(
      {
	start: event.target.selectionStart,
	end: event.target.selectionEnd
      }
    );
  };

  const RenderEdit = () => {
    return (
      <section className="thought">
	<textarea id="thoughtTextBox"
		  name="thoughtText"
		  spellCheck="true"
		  defaultValue={thoughtText}
		  onChange={handleChangeThought}
		  ref={thoughtAreaRef}>
	</textarea>
	<div className="actions">
	  <button id={`saveEdit-${props.thoughtId}`}
		  onClick={handleSave}> SAVE </button>
	</div>
      </section>
    );
  };

	     <button id={`edit-${props.thoughtId}`}
		     onClick={() => setIsEditing(!isEditing)}>EDIT!
	     </button>
