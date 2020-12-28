import authReducer from './auth';

import { AUTHENTICATE_USER_SUCCESS } from './../actions/actionsType';

describe('[auth.js] Reducer', () => {
  it('should return inital state if no state is passed', () => {
    expect(authReducer(undefined, {})).toEqual({
      isAuth: false,
      userId: null,
      error: false,
      isLoggedInWithBuiltBurger: false,
    });
  });

  it('should store the token upon login', () => {
    expect(
      authReducer(undefined, {
        type: AUTHENTICATE_USER_SUCCESS,
        payload: {
          response: {
            data: {
              idToken: '1234',
              localId: '5678',
            },
          },
        },
      })
    ).toEqual({
      isAuth: '1234',
      userId: '5678',
      error: false,
      isLoggedInWithBuiltBurger: false,
    });
  });
});
