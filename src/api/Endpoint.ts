import axios, { AxiosRequestConfig } from 'axios';

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

export const fetchUserReactionPostsAPI = async (kind: string) => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/users/posts/reactions',
    headers: {},
    method: 'get',
    params: {
      kind,
    },
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
  } else return {};

  const res = await client(reqConfig)
    .then((response) => response.data)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const fetchUserReactionCountsAPI = async () => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/users/posts/reactions/counts',
    headers: {},
    method: 'get',
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
  } else return {};

  const res = await client(reqConfig)
    .then((response) => response.data.reactions.counts)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const fetchCategoriesAPI = async () => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/categories',
    headers: {},
    method: 'get',
  };
  const res = await client(reqConfig)
    .then((response) => response.data)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};
