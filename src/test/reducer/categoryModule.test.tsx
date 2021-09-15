import reducer, {
  getSuccessCategory,
  getSuccessRootCategory,
  initialState,
  fetchCategories,
  fetchRootCategories,
} from 'modules/categoryModule';

describe('Reducer of categoryModule', () => {
  const category = {
    id: '1',
    name: 'category',
  };

  it('getSuccessCategory', () => {
    const action = { type: getSuccessCategory.type, payload: [category] };
    const state = reducer(initialState, action);
    expect(state.categories).toEqual([category]);
  });

  it('getSuccessRootCategory', () => {
    const action = { type: getSuccessRootCategory.type, payload: [category] };
    const state = reducer(initialState, action);
    expect(state.rootCategories).toEqual([category]);
  });

  describe('extraReducer', () => {
    it('fetchCategories', () => {
      const action = { type: fetchCategories.fulfilled.type, payload: [category] };
      const state = reducer(initialState, action);
      expect(state.categories).toEqual([category]);
    });

    it('fetchRootCategories', () => {
      const action = { type: fetchRootCategories.fulfilled.type, payload: [category] };
      const state = reducer(initialState, action);
      expect(state.rootCategories).toEqual([category]);
    });
  });
});
