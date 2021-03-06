import * as Types from './types';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const FETCH_USER = 'FETCH_USER';

export const signUpAction = (payload: Types.UserState): Types.SIGN_UP => ({
  type: 'SIGN_UP',
  payload: {
    isSignedIn: true,
    uid: payload.uid,
    name: payload.name,
    nickname: payload.nickname,
  },
});

export const signInAction = (payload: Types.UserState): Types.SIGN_IN => ({
  type: 'SIGN_IN',
  payload: {
    isSignedIn: true,
    uid: payload.uid,
    name: payload.name,
    nickname: payload.nickname,
  },
});

export const signOutAction = (): Types.SIGN_OUT => ({
  type: 'SIGN_OUT',
  payload: {
    isSignedIn: false,
    uid: '',
    name: '',
    nickname: '',
  },
});

export const getUserAction = (payload: Types.UserState): Types.FETCH_USER => ({
  type: 'FETCH_USER',
  payload: {
    isSignedIn: false,
    uid: payload.uid,
    name: payload.name,
    nickname: payload.nickname,
  },
});
