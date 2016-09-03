import $ from 'jquery';
import { browserHistory } from 'react-router'; // commits info about url to react router, and to make changes to url
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_INFO} from './types';

const ROOT_URL = 'http://localhost:3000/api';

export function signinUser({email, password}) {
  return function(dispatch) { //redux-thunk gives access to the dispatch
                              //function. it lets use return a function instead
                              //of an object from action creator
    $.post(`${ROOT_URL}/signin`, { email, password })
      .done(response => {
        console.log(response)
        dispatch({type: AUTH_USER});

        localStorage.setItem('token', response.token);

        browserHistory.push('/information'); // success pushes you to /information.

      })
      .fail(() => {
        // catch does not take you to new page
        dispatch(authError('EMAIL/PASSWORD combo incorrect'));
      })
  }
}

export function signupUser({email, password, username}) {
  return function(dispatch) {
    $.ajax({
      url: `${ROOT_URL}/signup`,
      type: "POST",
      data: {email, password, username},
    })
      .done(response => {
        dispatch({type: AUTH_USER});

        localStorage.setItem('token', response.token);

        browserHistory.push('/information'); // success pushes you to /information.
      }).fail((error) => {
        console.log(error)
        dispatch(authError(error.response.error));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER};
}

export function fetchInfo() {
  var token = localStorage.getItem('token')
  return function(dispatch) {
    $.ajax({
       url: ROOT_URL,
       type: "GET",
       headers: {
          "authorization": token
       }
    }).done(response => {
      dispatch({
        type: FETCH_INFO,
        payload: response.message
      })
    });
  }
}
