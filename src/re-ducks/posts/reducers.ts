import initialState from 're-ducks/store/initialState';
import {
  GET_POST, START_FETCH, EDIT_POST, END_FETCH,
} from './actions';
import { PostType, ActionsType } from './types';

const PostsReducer = (state: PostType = initialState.posts, action: ActionsType): PostType => {
  switch (action.type) {
    case START_FETCH:
      return {
        ...state,
        loading: true,
      };
    case GET_POST:
      return {
        ...state,
        ...action.payload,
      };
    case EDIT_POST:
      return {
        ...state,
        ...action.payload,
      };
    case END_FETCH:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default PostsReducer;
