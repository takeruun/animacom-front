import { UserState } from 're-ducks/users/types';
import { PostType, PostsState } from 're-ducks/posts/types';

const initialState = {
  users: {
    isSignedIn: false,
    uid: '',
    name: '',
    nickname: '',
  },
  post: {
    title: '',
    subTitle: '',
    body: '',
    categoryId: '',
  },
  posts: {
    list: [],
  },
};

export type InitialState = {
  users: UserState,
  post: PostType,
  posts: PostsState
}

export default initialState;
