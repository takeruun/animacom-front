import axios, { AxiosRequestConfig } from 'axios';
import { Action, Dispatch } from 'redux';
import { fetchPostsAction } from './actions';

const url = 'http://localhost:3001';

export const fetchPosts = () => (
  async (dispatch: Dispatch<Action>): Promise<void> => {
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: '/v1/posts/latest',
      headers: {},
      method: 'get',
    };

    await client(reqConfig)
      .then((res) => {
        dispatch(fetchPostsAction(res.data.posts));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export default fetchPosts;
