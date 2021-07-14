import * as Types from './types';

export const START_FETCH = 'START_FETCH';
export const END_FETCH = 'END_FETCH';

export const startFetchAction = (): Types.START_FETCH => ({
  type: 'START_FETCH',
});

export const endFetchAction = (): Types.END_FETCH => ({
  type: 'END_FETCH',
});
