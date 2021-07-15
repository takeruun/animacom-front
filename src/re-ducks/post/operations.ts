import axios, { AxiosRequestConfig } from 'axios';
import { Action, Dispatch } from 'redux';
import { fetchLatetPostsAction, fetchDayAgoPostsAction } from 're-ducks/posts/actions';
import {
  createPostAction,
  getPostAction,
  editPostAction,
  destroyPostAction,
} from 're-ducks/post/actions';
import { PostsState } from 're-ducks/posts/types';

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

// 未使用
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
          id: res.data.post.id,
          title: res.data.post.title,
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
          images: res.data.post.images,
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
          id: res.data.post.id,
          title: res.data.post.title,
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
          images: res.data.post.images,
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
          id: res.data.post.id,
          title: res.data.post.title,
          subTitle: res.data.post.subTitle,
          body: res.data.post.body,
          categoryId: res.data.post.categoryId,
          images: res.data.post.images,
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

export const destroyPost = (id: string) => (
  async (dispatch: Dispatch<Action>, getState: () => PostsState): Promise<void> => {
    const state = getState();
    const client = axios.create({
      baseURL: url,
    });

    const reqConfig: AxiosRequestConfig = {
      url: `/v1/posts/${id}`,
      headers: {},
      method: 'delete',
    };

    if (localStorage.getItem('anima')) {
      reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || '{}'));
    } else return;

    await client(reqConfig)
      .then(() => {
        const { latest, dayAgo } = state;
        const nextLatest = latest.filter((post) => post.id !== id);
        const nextDayAgo = dayAgo.filter((post) => post.id !== id);
        dispatch(destroyPostAction());
        dispatch(fetchLatetPostsAction(nextLatest));
        dispatch(fetchDayAgoPostsAction(nextDayAgo));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

export default createPost;
