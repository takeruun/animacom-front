import initialState from 're-ducks/store/initialState';
import {
  GET_POST, EDIT_POST, DESTROY_POST,
} from './actions';
import { PostType, ActionsType } from './types';

const PostReducer = (state: PostType = initialState.post, action: ActionsType): PostType => {
  switch (action.type) {
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
    case DESTROY_POST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default PostReducer;
