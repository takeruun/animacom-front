import reducer, {
  getSuccessComment,
  getSuccessComments,
  initialState,
  fetchComments,
} from 'modules/commentModule';

describe('Reducer of commentModule', () => {
  const comment = {
    id: 1,
    userId: 1,
    nickname: 'name',
    postId: 1,
    body: 'body',
    createdAt: '',
  };

  it('getSuccessComment', () => {
    const action = { type: getSuccessComment.type, payload: comment };
    const state = reducer(initialState, action);
    expect(state.comments).toEqual([comment]);
  });

  it('getSuccessComments', () => {
    const action = { type: getSuccessComments.type, payload: [comment] };
    const state = reducer(initialState, action);
    expect(state.comments).toEqual([comment]);
  });

  describe('extraReducer', () => {
    it('fetchComments', () => {
      const action = { type: fetchComments.fulfilled.type, payload: [comment] };
      const state = reducer(initialState, action);
      expect(state.comments).toEqual([comment]);
    });
  });
});
