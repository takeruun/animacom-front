import initialState from 're-ducks/store/initialState';
import {
  FETCH_LATEST_POSTS,
  FETCH_DAY_AGO_POSTS,
  FETCH_CUTE5_POSTS,
  FETCH_FAV5_POSTS,
  FETCH_GOOD5_POSTS,
  FETCH_COOL5_POSTS,
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
    case FETCH_CUTE5_POSTS:
      return {
        ...state,
        cute5: action.payload,
      };
    case FETCH_FAV5_POSTS:
      return {
        ...state,
        fav5: action.payload,
      };
    case FETCH_GOOD5_POSTS:
      return {
        ...state,
        good5: action.payload,
      };
    case FETCH_COOL5_POSTS:
      return {
        ...state,
        cool5: action.payload,
      };
    default:
      return state;
  }
};

export default PostReducer;
