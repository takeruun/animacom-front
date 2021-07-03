import axios, { AxiosRequestConfig } from 'axios';
import { Action, Dispatch } from 'redux';
import { createPostAction } from './actions';

const url = 'http://localhost:3001';

type PostParams = {
  title: string,
  subTitle: string,
  body: string,
  categoryId: string,
}

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

export const createPost = (params: PostParams) => (
  async (dispatch: Dispatch<Action>): Promise<void> => {
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: '/v1/posts',
      headers: {},
      method: 'post',
      data: {
        post: {
          title: params.title,
          subTitle: params.subTitle,
          body: params.body,
          categoryId: params.categoryId,
        },
      },
    };

    if (sessionStorage.getItem('anima')) {
      reqConfig.headers = authHeaders(JSON.parse(sessionStorage.getItem('anima') || '{}'));
    } else return;

    await client(reqConfig)
      .then((res) => {
        dispatch(createPostAction({
          title: res.data.post.title,
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
        }));
      })
      .catch(() => null);
  }
);

export default createPost;
