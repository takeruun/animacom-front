import axios, { AxiosRequestConfig } from 'axios';
import { Action, Dispatch } from 'redux';
import {
  createPostAction, getPostAction, startFetchAction, editPostAction, endFetchAction,
} from './actions';

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

export const startFetch = () => (
  (dispatch: Dispatch<Action>) => {
    dispatch(startFetchAction());
  }
);

export const endFetch = () => (
  (dispatch: Dispatch<Action>) => {
    dispatch(endFetchAction());
  }
);

export const fetchPost = (id: number) => (
  async (dispatch: Dispatch<Action>): Promise<void> => {
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: `/v1/posts/${id}`,
      headers: {},
      method: 'get',
    };

    if (localStorage.getItem('anima')) {
      reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || '{}'));
    } else return;

    await client(reqConfig)
      .then((res) => {
        dispatch(getPostAction({
          title: res.data.post.title,
          subTitle: res.data.post.sub_title,
          body: res.data.post.body,
          categoryId: res.data.post.category_id,
          loading: false,
          error: false,
        }));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

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

    if (localStorage.getItem('anima')) {
      reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || '{}'));
    } else return;

    await client(reqConfig)
      .then((res) => {
        dispatch(createPostAction({
          title: res.data.post.title,
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
          loading: false,
          error: false,
        }));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export const editPost = (id: string, params: PostParams) => (
  async (dispatch: Dispatch<Action>): Promise<void> => {
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: `/v1/posts/${id}`,
      headers: {},
      method: 'put',
      data: {
        post: {
          title: params.title,
          subTitle: params.subTitle,
          body: params.body,
          categoryId: params.categoryId,
        },
      },
    };

    if (localStorage.getItem('anima')) {
      reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || '{}'));
    } else return;

    await client(reqConfig)
      .then((res) => {
        dispatch(editPostAction({
          title: res.data.post.title,
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
          loading: false,
          error: false,
        }));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export const fetchPostApi = async (id: string) => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/posts/${id}`,
    headers: {},
    method: 'get',
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
  } else return false;

  return client(reqConfig)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};

export default createPost;
