import axios, { AxiosRequestConfig } from 'axios';
import { Action, Dispatch } from 'redux';
import {
  createPostAction, getPostAction, startFetchAction, editPostAction, endFetchAction,
} from './actions';

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
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
          images: res.data.post.images,
          loading: false,
          error: false,
        }));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export const createPost = (data: FormData) => (
  async (dispatch: Dispatch<Action>): Promise<void> => {
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: '/v1/posts',
      headers: {},
      method: 'post',
      data,
    };

    if (localStorage.getItem('anima')) {
      reqConfig.headers = {
        ...authHeaders(JSON.parse(localStorage.getItem('anima') || '')),
        'Content-Type': 'multipart/form-data',
      };
    } else return;

    await client(reqConfig)
      .then((res) => {
        dispatch(createPostAction({
          title: res.data.post.title,
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
          images: res.data.post.images,
          loading: false,
          error: false,
        }));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export const editPost = (id: string, data: FormData) => (
  async (dispatch: Dispatch<Action>): Promise<void> => {
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: `/v1/posts/${id}`,
      headers: {},
      method: 'put',
      data,
    };

    if (localStorage.getItem('anima')) {
      reqConfig.headers = {
        ...authHeaders(JSON.parse(localStorage.getItem('anima') || '')),
        'Content-Type': 'multipart/form-data',
      };
    } else return;

    await client(reqConfig)
      .then((res) => {
        dispatch(editPostAction({
          title: res.data.post.title,
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
          images: res.data.post.images,
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
