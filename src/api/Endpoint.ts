import axios, { AxiosRequestConfig } from 'axios';
import ActionCable from 'actioncable';
import { Action, Dispatch } from 'redux';
import { PostType } from 'modules/postModule';
import { CategoryType } from 'modules/categoryModule';
import { CommentType, getSuccessComment } from 'modules/commentModule';

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
  } else {
    throw new Error('please login');
  }

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
  } else {
    throw new Error('please login');
  }

  const res = await client(reqConfig)
    .then((response) => response.data.reactions.counts)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const fetchCategoriesAPI = async (): Promise<Array<CategoryType>> => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/categories',
    headers: {},
    method: 'get',
  };

  const res = await client(reqConfig)
    .then((response) => response.data.categories)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const fetchRootCategoriesAPI = async (): Promise<Array<CategoryType>> => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: '/v1/categories/root',
    headers: {},
    method: 'get',
  };
  const res = await client(reqConfig)
    .then((response) => response.data.rootCategories)
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

export const searchPostsAPI = async (
  params: { keyword?: string, categoryId?: number },
): Promise<Array<PostType>> => {
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

export const fetchPostsAPI = async (path: string): Promise<Array<PostType>> => {
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

export const fetchPostAPI = async (id: string): Promise<PostType> => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/users/posts/${id}`,
    headers: {},
    method: 'get',
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
  } else {
    throw new Error('please login');
  }

  const res = await client(reqConfig)
    .then((response) => response.data.post)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const createPostAPI = async (data: FormData): Promise<PostType> => {
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
  } else {
    throw new Error('please login');
  }

  const res = await client(reqConfig)
    .then((response) => response.data.post)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const editPostAPI = async (id: string, data: FormData): Promise<PostType> => {
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
  } else {
    throw new Error('please login');
  }

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

export const postReactionsAPI = async (id: string, kind: string): Promise<PostType> => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/users/posts/reactions/${id}`,
    headers: {},
    method: 'post',
    data: {
      reaction: {
        kind,
      },
    },
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
  } else {
    throw new Error('please login');
  }

  const res = await client(reqConfig)
    .then((response) => response.data.post)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export const destroyReactionsAPI = async (id: string, kind: string): Promise<PostType> => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/users/posts/reactions/${id}`,
    headers: {},
    method: 'delete',
    data: {
      reaction: {
        kind,
      },
    },
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
  } else {
    throw new Error('please login');
  }

  const res = await client(reqConfig)
    .then((response) => response.data.post)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};

export type ReciveDataType = {
  id: number,
  userId: number,
  postId: number,
  body: string,
  createdAt: string,
};

export type SocketType = ActionCable.Channel & {
  create: (body: string) => void;
  received: (data: ReciveDataType) => void;
  disconnected: () => void;
}

export const createCommentSocketAPI = (postId: string) => (
  (dispatch: Dispatch<Action>): SocketType => {
    const cable = ActionCable.createConsumer(
      'ws:localhost:3001/v1/cable',
    );
    const socket = cable.subscriptions.create(
      {
        channel: 'CommentChannel',
        post_id: postId,
      },
      {
        create: (body: string) => {
          socket.perform('create', {
            user_email: authHeaders(JSON.parse(localStorage.getItem('anima') || '')).uid,
            body,
          });
        },
        received: (data: ReciveDataType) => {
          const comment = {
            id: data.id,
            userId: data.userId,
            postId: data.postId,
            body: data.body,
            createdAt: new Date(data.createdAt).toISOString(),
          };

          dispatch(getSuccessComment(comment));
        },
        disconnected: () => cable.disconnect(),
      },
    );

    return socket;
  }
);

export const fetchCommentsAPI = async (id: string): Promise<Array<CommentType>> => {
  const client = axios.create({
    baseURL: url,
  });

  const reqConfig: AxiosRequestConfig = {
    url: `/v1/posts/${id}/comments`,
    headers: {},
    method: 'get',
  };

  const res = await client(reqConfig)
    .then((response) => response.data.comments)
    .catch((e) => {
      throw new Error(e);
    });

  return res;
};
