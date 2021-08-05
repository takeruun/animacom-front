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

export const fetchRootCategoriesAPI = async () => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/categories/root',
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

export const fetchUserAPI = async () => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/users',
    headers: {},
    method: 'get',
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
  } else return {};

  const res = await client(reqConfig)
    .then((response) => response.data.user)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const searchPostsAPI = async (params: { keyword?: string, categoryId?: number }) => {
  const { keyword, categoryId } = params;

  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/posts/search',
    headers: {},
    method: 'get',
    params: {
      keyword,
      categoryId,
    },
  };

  const res = await client(reqConfig)
    .then((response) => response.data.posts)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const fetchPostsAPI = async (path: string) => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/posts/${path}`,
    headers: {},
    method: 'get',
  };

  const res = await client(reqConfig)
    .then((response) => response.data.posts)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const fetchPostAPI = async (id: string) => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/posts/${id}`,
    headers: {},
    method: 'get',
  };

  const res = await client(reqConfig)
    .then((response) => response.data.post)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const createPostAPI = async (data: FormData) => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/users/posts',
    headers: {},
    method: 'post',
    data,
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = {
      ...authHeaders(JSON.parse(localStorage.getItem('anima') || '')),
      'Content-Type': 'multipart/form-data',
    };
  } else return {};

  const res = await client(reqConfig)
    .then((response) => response.data.post)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const editPostAPI = async (id: string, data: FormData) => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/users/posts/${id}`,
    headers: {},
    method: 'put',
    data,
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = {
      ...authHeaders(JSON.parse(localStorage.getItem('anima') || '')),
      'Content-Type': 'multipart/form-data',
    };
  } else return {};

  const res = await client(reqConfig)
    .then((response) => response.data.post)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const destroyPostAPI = async (id: string) => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/users/posts/${id}`,
    headers: {},
    method: 'delete',
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || '{}'));
  } else return {};

  const res = await client(reqConfig)
    .then((response) => response.data)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};
