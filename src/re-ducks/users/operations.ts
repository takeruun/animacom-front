import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { signUpAction } from './actions';
import { UserState } from './types';

type UserParams = {
  email: string,
  name: string,
  nickname: string,
  password: string
}

export const signUp = (params: UserParams) => (
  async (dispatch: Dispatch<Action>, getState: () => UserState): Promise<void> => {
    const state = getState();
    const { isSignedIn } = state;
    let uid = '';

    if (!isSignedIn) {
      if (params.email === '' || params.name === '' || params.nickname === '' || params.password === '') {
        alert('入力しろ');
      }
      const url = 'http://localhost:3001';

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
    }
  });

export default signUp;
