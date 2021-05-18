import { Action } from 'redux';

export type UserState = {
  isSignedIn: boolean,
  uid: string,
  name: string,
  nickname: string,
}

export interface SIGN_UP extends Action {
  type: 'SIGN_UP';
  payload: UserState;
}

export interface SIGN_OUT extends Action {
  type: 'SIGN_OUT';
  payload: UserState;
}
