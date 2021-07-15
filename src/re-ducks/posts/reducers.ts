import initialState from 're-ducks/store/initialState';
import {
  FETCH_POSTS,
} from './actions';
import { ActionsType, PostsState } from './types';

const PostReducer = (state: PostsState = initialState.posts, action: ActionsType): PostsState => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        latest: action.payload,
      };
    default:
      return state;
  }
};

export default PostReducer;
