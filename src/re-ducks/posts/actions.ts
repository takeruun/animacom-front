import { PostType } from 're-ducks/post/types';
import * as Types from './types';

export const FETCH_LATEST_POSTS = 'FETCH_LATEST_POSTS';
export const FETCH_DAY_AGO_POSTS = 'FETCH_DAY_AGO_POSTS';

export const fetchLatetPostsAction = (payload: Array<PostType>): Types.FETCH_LATEST_POSTS => ({
  type: 'FETCH_LATEST_POSTS',
  payload,
});

export const fetchDayAgoPostsAction = (payload: Array<PostType>): Types.FETCH_DAY_AGO_POSTS => ({
  type: 'FETCH_DAY_AGO_POSTS',
  payload,
});
