import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from './../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from './../../../utils/helpers';
import { useMutation, useQuery } from "@apollo/client"
import {
} from "./../../../utils/mutations";
import {
  
} from "./../../../utils/queries";
import { QUERY_ALL_THOUGHTS } from "./../../../utils/queries";

const ReThoughtPost = () => {

  return(
    <section className="thought reThought">
      <div className="currentThought">
      </div>
      <div className="thought">
      </div>
    </section>
  );
};

export default ReThoughtPost;
