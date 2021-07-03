import * as Types from './types';

export const createPostAction = (payload: Types.PostType): Types.CREATE_POST => ({
  type: 'CREATE_POST',
  payload,
});

export default createPostAction;
