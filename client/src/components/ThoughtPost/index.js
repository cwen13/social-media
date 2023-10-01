import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const ThoughtPost = (props) => {

  return (
    <section className="thought">
      <p>Thought: {props.thought}</p>
      <p>Info: {props.info}</p>
      </section>

  );
};

export default ThoughtPost
