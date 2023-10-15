import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from '../../utils/helpers';


const ThoughtPost = (props) => {

  
  return (
    <section className="thought">
      <p>Thought: {props.thought}</p>
      <p>Info: {props.userId}</p>
      </section>

  );
};

export default ThoughtPost
