import reducer, {
  updateWord,
  initialState,
} from 'modules/searchModule';

describe('Reducer oof searchModule', () => {
  const search = {
    word: 'test',
  };

  it('update', () => {
    const action = { type: updateWord.type, payload: search.word };
    const state = reducer(initialState, action);
    expect(state.word).toEqual(search.word);
  });
});
