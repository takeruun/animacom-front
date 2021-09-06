import ActionCable from 'actioncable';
import { Action, Dispatch } from 'redux';
import { PostType } from 'modules/postModule';
import { CategoryType } from 'modules/categoryModule';
import { UserType } from 'modules/userModule';
import { CommentType, getSuccessComment } from 'modules/commentModule';
import request, { authHeaders, noAuthRequest } from 'hook/useRequest';

export const fetchUserReactionPostsAPI = async (
  kind: string,
): Promise<{ posts: Array<PostType>, kind: string }> => {
  const res = await request({
    url: '/v1/users/posts/reactions',
    method: 'get',
    reqParams: {
      params: {
        kind,
      },
    },
  })
    .then((response) => response);

  return { posts: res, kind };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchUserReactionCountsAPI = async () => {
  const res = await request({
    url: '/v1/users/posts/reactions/counts',
    method: 'get',
  })
    .then((response) => response.reactions.counts);

  return res;
};

export const fetchCategoriesAPI = async (): Promise<Array<CategoryType>> => {
  const res = await request({
    url: '/v1/categories',
    method: 'get',
  })
    .then((response) => response.categories);

  return res;
};

export const fetchRootCategoriesAPI = async (): Promise<Array<CategoryType>> => {
  const res = await request({
    url: '/v1/categories/root',
    method: 'get',
  })
    .then((response) => response.rootCategories);

  return res;
};

export const searchPostsAPI = async (
  params: { keyword?: string, categoryId?: number },
): Promise<Array<PostType>> => {
  const { keyword, categoryId } = params;

  const res = await request({
    url: '/v1/posts/search',
    method: 'get',
    reqParams: {
      params: {
        keyword,
        categoryId,
      },
    },
  })
    .then((response) => response.posts);

  return res;
};

export const fetchPostsAPI = async (path: string): Promise<Array<PostType>> => {
  const res = await request({
    url: `/v1/posts/${path}`,
    method: 'get',
  })
    .then((response) => response.posts);

  return res;
};

export const fetchPostAPI = async (id: string): Promise<PostType> => {
  const res = await request({
    url: `/v1/users/posts/${id}`,
    method: 'get',
  })
    .then((response) => response.post);

  return res;
};

export const createPostAPI = async (data: FormData): Promise<PostType> => {
  const res = await request({
    url: '/v1/users/posts',
    method: 'post',
    reqParams: {
      data,
    },
  })
    .then((response) => response.post);

  return res;
};

export const editPostAPI = async (id: string, data: FormData): Promise<PostType> => {
  const res = await request({
    url: `/v1/users/posts/${id}`,
    method: 'put',
    reqParams: {
      data,
    },
  })
    .then((response) => response.post);

  return res;
};

export const destroyPostAPI = async (id: string): Promise<void> => {
  await request({
    url: `/v1/users/posts/${id}`,
    method: 'delete',
  })
    .then((response) => response);
};

export const postReactionsAPI = async (id: string, kind: string): Promise<PostType> => {
  const res = await request({
    url: `/v1/users/posts/reactions/${id}`,
    method: 'post',
    reqParams: {
      data: {
        reaction: {
          kind,
        },
      },
    },
  })
    .then((response) => response.post);

  return res;
};

export const destroyReactionsAPI = async (id: string, kind: string): Promise<PostType> => {
  const res = await request({
    url: `/v1/users/posts/reactions/${id}`,
    method: 'delete',
    reqParams: {
      data: {
        reaction: {
          kind,
        },
      },
    },
  })
    .then((response) => response.post);

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
    try {
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
    } catch (e) {
      throw new Error('コメント通信でエラーが発生しました。');
    }
  }
);

export const fetchCommentsAPI = async (id: string): Promise<Array<CommentType>> => {
  const res = await request({
    url: `/v1/posts/${id}/comments`,
    method: 'get',
  })
    .then((response) => response.comments);

  return res;
};

export const signInAPI = async (
  params: { email: string, password: string },
): Promise<UserType> => {
  const { email, password } = params;

  if (email === '' || password === '') {
    throw new Error('メールアドレス or パスワードが入力されていません。');
  }

  const res = await noAuthRequest({
    url: 'v1/users/auth/sign_in',
    method: 'post',
    reqParams: {
      data: {
        email,
        password,
      },
    },
  })
    .then(({ response, headers }) => {
      const newheaders = {
        accessToken: headers['access-token'],
        client: headers.client,
        expiry: headers.expiry,
        uid: headers.uid,
      };
      localStorage.setItem('anima', JSON.stringify(newheaders));
      return response.user;
    });

  return {
    isSignedIn: true,
    ...res,
  };
};

export const signUpAPI = async (
  data: FormData,
): Promise<UserType> => {
  if (data.get('name') === '' || data.get('email') === '' || data.get('password') === '') {
    throw new Error('名前 or メールアドレス or パスワードが入力されていません。');
  }

  const res = await noAuthRequest({
    url: '/v1/users/auth',
    method: 'post',
    reqParams: {
      data,
    },
  }).then(({ response, headers }) => {
    const newheaders = {
      accessToken: headers['access-token'],
      client: headers.client,
      expiry: headers.expiry,
      uid: headers.uid,
    };
    localStorage.setItem('anima', JSON.stringify(newheaders));
    return response.user;
  });

  return {
    isSignedIn: true,
    ...res,
  };
};

export const fetchUserAPI = async (userId: string): Promise<UserType> => {
  const res = await request({
    url: `/v1/users/${userId}`,
    method: 'get',
  }).then((response) => response.user);

  return {
    isSignedIn: false,
    ...res,
  };
};

export const fetchMyUserAPI = async (): Promise<UserType> => {
  const res = await request({
    url: '/v1/users/my_page',
    method: 'get',
  })
    .then((response) => response.user);

  return {
    isSignedIn: true,
    ...res,
  };
};

export const signOutAPI = async (): Promise<void> => {
  await request({
    url: '/v1/users/auth/sign_out',
    method: 'delete',
  })
    .then((response) => response);
};

export const putUserAPI = async (
  data: FormData,
): Promise<UserType> => {
  const res = await request({
    url: '/v1/users',
    method: 'put',
    reqParams: {
      data,
    },
  }).then((response) => response.user);

  return res;
};

export const fetchUsersAPI = async (): Promise<Array<UserType>> => {
  const res = await request({
    url: '/v1/users',
    method: 'get',
  }).then((response) => response.users);

  return res;
};

export const followUserAPI = async (
  userId: string,
): Promise<{ followingCount: number, user: UserType }> => {
  const res = await request({
    url: '/v1/users/follows',
    method: 'post',
    reqParams: {
      data: {
        followId: userId,
      },
    },
  }).then((response) => response);

  return {
    followingCount: Number(res.followingCount),
    user: res.followings.find((user: UserType) => user.id === userId),
  };
};

export const unfollowUserAPI = async (
  userId: string,
): Promise<{ followingCount: number, userId: string }> => {
  const res = await request({
    url: '/v1/users/follows',
    method: 'delete',
    reqParams: {
      data: {
        followId: userId,
      },
    },
  }).then((response) => response.followingCount);

  return { followingCount: Number(res), userId };
};

export const fetchFollowUsersAPI = async (userId: string): Promise<Array<UserType>> => {
  const res = await request({
    url: `/v1/follows/followings/${userId}`,
    method: 'get',
  }).then((response) => response.users);

  return res;
};

export const fetchFollowerUsersAPI = async (userId: string): Promise<Array<UserType>> => {
  const res = await request({
    url: `/v1/follows/followers/${userId}`,
    method: 'get',
  }).then((response) => response.users);

  return res;
};
