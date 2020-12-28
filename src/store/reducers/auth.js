import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_FAIL,
  LOGOUT_AUTH_USER,
  IS_LOGGED_IN_WITH_BUILT_BURGER,
} from './../actions/actionsType';

import produce from 'immer';

const initialState = {
  isAuth: false,
  userId: null,
  error: false,
  isLoggedInWithBuiltBurger: false,
};

const authUserSuccess = (draft, action) => {
  draft.error = false;
  const { idToken, localId } = action.payload.response.data;
  draft.isAuth = idToken;
  draft.userId = localId;
};

const authUserFail = (draft, action) => {
  const error = action.payload.error.replace(/_/gi, ' ');
  draft.error = error;
};

const logoutUser = (draft) => {
  draft.isAuth = false;
  draft.userId = null;
};

const userWithBuiltBurger = (draft) => {
  draft.isLoggedInWithBuiltBurger = true;
};

const authReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AUTHENTICATE_USER_SUCCESS:
        return authUserSuccess(draft, action);

      case AUTHENTICATE_USER_FAIL:
        return authUserFail(draft, action);

      case LOGOUT_AUTH_USER:
        return logoutUser(draft);

      case IS_LOGGED_IN_WITH_BUILT_BURGER:
        return userWithBuiltBurger(draft);
      default:
        break;
    }
  });
};

export default authReducer;
