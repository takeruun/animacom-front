import axios, { AxiosRequestConfig } from 'axios';
import { Action, Dispatch } from 'redux';
import {
  fetchLatetPostsAction,
  fetchDayAgoPostsAction,
  fetchCute5PostsAction,
  fetchFav5PostsAction,
  fetchGood5PostsAction,
  fetchCool5PostsAction,
} from './actions';

const url = 'http://localhost:3001';

export const fetchPosts = (path: string) => (
  async (dispatch: Dispatch<Action>): Promise<void> => {
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: `/v1/posts/${path}`,
      headers: {},
      method: 'get',
    };

    await client(reqConfig)
      .then((res) => {
        if (path === 'latest') {
          dispatch(fetchLatetPostsAction(res.data.posts));
        } else if (path === 'day_ago') {
          dispatch(fetchDayAgoPostsAction(res.data.posts));
        } else if (path === 'reactions/bests/cute') {
          dispatch(fetchCute5PostsAction(res.data.posts));
        } else if (path === 'reactions/bests/fav') {
          dispatch(fetchFav5PostsAction(res.data.posts));
        } else if (path === 'reactions/bests/good') {
          dispatch(fetchGood5PostsAction(res.data.posts));
        } else if (path === 'reactions/bests/cool') {
          dispatch(fetchCool5PostsAction(res.data.posts));
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export default fetchPosts;
