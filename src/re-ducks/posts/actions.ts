import * as Types from './types';

export const getPostAction = (payload: Types.PostType): Types.GET_POST => ({
  type: 'GET_POST',
  payload,
})

export const createPostAction = (payload: Types.PostType): Types.CREATE_POST => ({
  type: 'CREATE_POST',
  payload,
});

export default createPostAction;
