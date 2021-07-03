import initialState from 're-ducks/store/initialState';
import { PostsState, ActionsType } from './types';

const PostsReducer = (state: PostsState = initialState.posts, action: ActionsType): PostsState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default PostsReducer;
