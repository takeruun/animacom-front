import * as Types from './types';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

export const signUpAction = (payload: Types.UserState): Types.SIGN_UP => ({
  type: 'SIGN_UP',
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

export type ActionsType = ReturnType<typeof signUpAction | typeof signOutAction>
