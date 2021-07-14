import { PostType } from 're-ducks/post/types';
import * as Types from './types';

export const FETCH_POSTS = 'FETCH_POSTS';

export const fetchPostsAction = (payload: Array<PostType>): Types.FETCH_POSTS => ({
  type: 'FETCH_POSTS',
  payload,
});
