import { PostType } from 're-ducks/post/types';
import * as Types from './types';

export const FETCH_LATEST_POSTS = 'FETCH_LATEST_POSTS';
export const FETCH_DAY_AGO_POSTS = 'FETCH_DAY_AGO_POSTS';
export const FETCH_CUTE5_POSTS = 'FETCH_CUTE5_POSTS';
export const FETCH_FAV5_POSTS = 'FETCH_FAV5_POSTS';
export const FETCH_GOOD5_POSTS = 'FETCH_GOOD5_POSTS';
export const FETCH_COOL5_POSTS = 'FETCH_COOL5_POSTS';

export const fetchLatetPostsAction = (payload: Array<PostType>): Types.FETCH_LATEST_POSTS => ({
  type: 'FETCH_LATEST_POSTS',
  payload,
});

export const fetchDayAgoPostsAction = (payload: Array<PostType>): Types.FETCH_DAY_AGO_POSTS => ({
  type: 'FETCH_DAY_AGO_POSTS',
  payload,
});

export const fetchCute5PostsAction = (payload: Array<PostType>): Types.FETCH_CUTE5_POSTS => ({
  type: 'FETCH_CUTE5_POSTS',
  payload,
});

export const fetchFav5PostsAction = (payload: Array<PostType>): Types.FETCH_FAV5_POSTS => ({
  type: 'FETCH_FAV5_POSTS',
  payload,
});

export const fetchGood5PostsAction = (payload: Array<PostType>): Types.FETCH_GOOD5_POSTS => ({
  type: 'FETCH_GOOD5_POSTS',
  payload,
});

export const fetchCool5PostsAction = (payload: Array<PostType>): Types.FETCH_COOL5_POSTS => ({
  type: 'FETCH_COOL5_POSTS',
  payload,
});
