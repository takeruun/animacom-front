import axios from 'axios';
import { push } from 'connected-react-router';
import { Action, Dispatch } from 'redux';
import { signUpAction, signInAction, signOutAction } from './actions';
import { UserState } from './types';

const url = 'http://localhost:3001';
type UserParams = {
  email: string,
  name: string,
  nickname: string,
  password: string
}

type SignInParams = {
  email: string,
  password: string
}

export const signUp = (params: UserParams) => (
  async (dispatch: Dispatch<Action>, getState: () => UserState): Promise<void | boolean> => {
    const state = getState();
    const { isSignedIn } = state;
    let uid = '';

    if (!isSignedIn) {
      if (params.email === '' || params.name === '' || params.nickname === '' || params.password === '') {
        alert('入力しろ');
        return false;
      }

      await axios.post(`${url}/v1/users/auth`, {
        email: params.email,
        password: params.password,
        name: params.name,
        nickname: params.nickname,
      })
        .then((res) => {
          uid = res.headers.uid;
          localStorage.setItem('headers', JSON.stringify(res.headers));
        })
        .catch(() => null);

      dispatch(signUpAction({
        isSignedIn: true,
        uid,
        name: params.name,
        nickname: params.nickname,
      }));
      dispatch(push('/'));

      return true;
    }
    return false;
  }
);

export const signIn = (params: SignInParams) => (
  async (dispatch: Dispatch<Action>, getState:() => UserState): Promise<void> => {
    const state = getState();
    const { isSignedIn } = state;

    if (!isSignedIn) {
      if (params.email === '' || params.password === '') {
        alert('入力しろ');
      }

      await axios.post(`${url}/v1/users/auth/sign_in`, {
        email: params.email,
        password: params.password,
      }).then((res) => {
        const headers = {
          accessToken: res.headers['access-token'],
          client: res.headers.clien,
          expiry: res.headers.expiry,
          uid: res.headers.uid,
        };
        localStorage.setItem('headers', JSON.stringify(headers));
        dispatch(signInAction({
          isSignedIn: true,
          uid: res.headers.uid,
          name: res.data.user.name,
          nickname: res.data.user.nickname,
        }));
        dispatch(push('/'));
      });
    }
  }
);

export const signOut = () => async (dispatch: Dispatch<Action>): Promise<void> => {
  await axios.post(`${url}/v1/users/auth/sign_out`)
    .then(() => {
      dispatch(signOutAction());
      dispatch(push('/'));
    });
};
