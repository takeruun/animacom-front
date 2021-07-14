import { UserState } from 're-ducks/users/types';
import { PostType } from 're-ducks/post/types';
import { PostsState } from 're-ducks/posts/types';
import { ApiStatusState } from 're-ducks/apiStatus/types';

const initialState = {
  users: {
    isSignedIn: false,
    uid: '',
    name: '',
    nickname: '',
  },
  post: {
    id: '',
    title: '',
    subTitle: '',
    body: '',
    categoryId: '',
    images: [],
  },
  posts: {
    latest: [],
  },
  apiStatus: {
    loading: false,
    error: false,
  },
};

export type InitialState = {
  users: UserState,
  post: PostType,
  posts: PostsState,
  apiStatus: ApiStatusState,
}

export default initialState;
