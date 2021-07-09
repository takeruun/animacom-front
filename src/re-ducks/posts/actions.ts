import * as Types from './types';

export const GET_POST = 'GET_POST';
export const CREATE_POST = 'CREATE_POST';
export const START_FETCH = 'START_FETCH';
export const EDIT_POST = 'EDIT_POST';
export const END_FETCH = 'END_FETCH';

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

export const startFetchAction = (): Types.START_FETCH => ({
  type: 'START_FETCH',
});

export const endFetchAction = (): Types.END_FETCH => ({
  type: 'END_FETCH',
});
