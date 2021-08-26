import reducer, {
  getSuccessReactionCounts,
  initialState,
  fetchUserReactionCounts
} from 'modules/reactionCountsModule';

describe('Reducer of reactionCountsModule', () => {
  const reactionCounts = {
    cuteCount: 1,
    favCount: 2,
    goodCount: 3,
    coolCount: 4,
  };

  it('getSuccessReactionCounts', () => {
    const action = { type: getSuccessReactionCounts.type, payload: reactionCounts };
    const state = reducer(initialState, action);
    expect(state.cuteCount).toEqual(reactionCounts.cuteCount);
    expect(state.favCount).toEqual(reactionCounts.favCount);
    expect(state.goodCount).toEqual(reactionCounts.goodCount);
    expect(state.coolCount).toEqual(reactionCounts.coolCount);
  });

  describe('extraReducer', () => {
    it('fetchUserReactionCounts', () => {
      const action = { type: fetchUserReactionCounts.fulfilled.type, payload: reactionCounts };
      const state = reducer(initialState, action);
      expect(state.cuteCount).toEqual(reactionCounts.cuteCount);
      expect(state.favCount).toEqual(reactionCounts.favCount);
      expect(state.goodCount).toEqual(reactionCounts.goodCount);
      expect(state.coolCount).toEqual(reactionCounts.coolCount);
    });
  });
});
