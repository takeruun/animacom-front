import { UserState } from 're-ducks/users/types';
import { PostsState } from 're-ducks/posts/types';

const initialState = {
  users: {
    isSignedIn: false,
    uid: '',
    name: '',
    nickname: '',
  },
  posts: {
    list: [],
  },
};

export type InitialState = {
  users: UserState,
  posts: PostsState
}

export default initialState;
