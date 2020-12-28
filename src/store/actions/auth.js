import axios from 'axios';

import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAIL,
  LOGOUT_AUTH_USER,
  IS_LOGGED_IN_WITH_BUILT_BURGER,
} from './actionsType';

const API_KEY = ` AIzaSyCvNRY64MO98dhFntz3ZdYqDKsmJaxhCVc `;

export const logoutUser = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('tokenExpirationDate');
  return { type: LOGOUT_AUTH_USER };
};

export const checkAuthTimeout = (tokenExpirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logoutUser());
    }, tokenExpirationDate * 1000);
  };
};

export const authUser = (email, password, isLogin) => {
  return async (dispatch) => {
    try {
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
      };

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

      if (!isLogin) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
      }

      const response = await axios.post(url, authData);

      const { idToken, expiresIn, localId } = response.data;

      localStorage.setItem('idToken', idToken);
      localStorage.setItem(
        'tokenExpirationDate',
        new Date(new Date().getTime() + expiresIn * 1000)
      );

      localStorage.setItem('userId', localId);

      dispatch({ type: AUTHENTICATE_USER_SUCCESS, payload: { response } });
      dispatch(checkAuthTimeout(expiresIn));
    } catch (error) {
      console.log(error);

      dispatch({
        type: AUTHENTICATE_USER_FAIL,
        payload: { error: error.response.data.error.message },
      });
    }
  };
};

export const checkUserToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('idToken');

    const tokenExpDate = new Date(localStorage.getItem('tokenExpirationDate'));

    if (!token || !tokenExpDate || tokenExpDate < new Date()) {
      return dispatch(logoutUser());
    }

    const localId = localStorage.getItem('userId');

    dispatch({
      type: AUTHENTICATE_USER_SUCCESS,
      payload: {
        response: { data: { idToken: token, localId } },
      },
    });

    dispatch(
      checkAuthTimeout((tokenExpDate.getTime() - new Date().getTime()) / 1000)
    );
  };
};

export const userWithBuilBurger = () => {
  return { type: IS_LOGGED_IN_WITH_BUILT_BURGER };
};
