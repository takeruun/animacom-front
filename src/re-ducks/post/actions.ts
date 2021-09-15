import * as Types from './types';

export const GET_POST = 'GET_POST';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DESTROY_POST = 'DESTROY_POST';

export const getPostAction = (payload: Types.PostType): Types.GET_POST => ({
  type: 'GET_POST',
  payload,
});

export const createPostAction = (payload: Types.PostType): Types.CREATE_POST => ({
  type: 'CREATE_POST',
  payload,
});

export const editPostAction = (payload: Types.PostType): Types.EDIT_POST => ({
  type: 'EDIT_POST',
  payload,
});

export const destroyPostAction = (): Types.DESTROY_POST => ({
  type: 'DESTROY_POST',
});
