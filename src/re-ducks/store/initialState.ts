import { UserState } from 're-ducks/users/types';

const initialState = {
  users: {
    isSignedIn: false,
    uid: '',
    name: '',
    nickname: '',
  },
};

export type InitialState = {
  users: UserState
}

export default initialState;
