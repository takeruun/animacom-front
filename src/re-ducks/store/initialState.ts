import { UserState } from 're-ducks/users/types';
import { PostType } from 're-ducks/posts/types';

const initialState = {
  users: {
    isSignedIn: false,
    uid: '',
    name: '',
    nickname: '',
  },
  posts: {
    loading: false,
    error: false,
    title: '',
    subTitle: '',
    body: '',
    categoryId: '',
  },
};

export type InitialState = {
  users: UserState,
  posts: PostType
}

export default initialState;
