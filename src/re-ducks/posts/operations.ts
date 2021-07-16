import axios, { AxiosRequestConfig } from 'axios';
import { Action, Dispatch } from 'redux';
import { fetchLatetPostsAction, fetchDayAgoPostsAction } from './actions';

const url = 'http://localhost:3001';

type AuthType = {
  accessToken: string
  client: string
  uid: string
}

const authHeaders = ({ accessToken, client, uid }: AuthType) => ({
  'access-token': accessToken,
  client,
  uid,
});

export const fetchPosts = (param: string) => (
  async (dispatch: Dispatch<Action>): Promise<void> => {
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: `/v1/posts/${param}`,
      headers: {},
      method: 'get',
    };

    if (localStorage.getItem('anima')) {
      reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
    } else return;

    await client(reqConfig)
      .then((res) => {
        if (param === 'latest') {
          dispatch(fetchLatetPostsAction(res.data.posts));
        } else if (param === 'day_ago') {
          dispatch(fetchDayAgoPostsAction(res.data.posts));
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export default fetchPosts;
