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
    cuteCount: 0,
    favCount: 0,
    goodCount: 0,
    coolCount: 0,
    alreadyCuted: false,
    alreadyFaved: false,
    alreadyGooded: false,
    alreadyCooled: false,
    reactions: [],
  },
  posts: {
    latest: [],
    dayAgo: [],
    cute5: [],
    fav5: [],
    good5: [],
    cool5: [],
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
