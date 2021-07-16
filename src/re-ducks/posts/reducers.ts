import initialState from 're-ducks/store/initialState';
import {
  FETCH_LATEST_POSTS, FETCH_DAY_AGO_POSTS,
} from './actions';
import { ActionsType, PostsState } from './types';

const PostReducer = (state: PostsState = initialState.posts, action: ActionsType): PostsState => {
  switch (action.type) {
    case FETCH_LATEST_POSTS:
      return {
        ...state,
        latest: action.payload,
      };
    case FETCH_DAY_AGO_POSTS:
      return {
        ...state,
        dayAgo: action.payload,
      };
    default:
      return state;
  }
};

export default PostReducer;
