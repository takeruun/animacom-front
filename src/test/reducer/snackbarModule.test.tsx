import reducer, {
  open,
  close,
  initialState,
} from 'modules/snackbarModule';

describe('Reducer of snackbarModule', () => {
  const snackbar = {
    isShow: true,
    isError: true,
    error: 'Failure',
    message: 'network err',
  };

  it('open', () => {
    const action = { type: open.type, payload: snackbar };
    const state = reducer(initialState, action);
    expect(state).toEqual(snackbar);
  });

  it('close', () => {
    const action = { type: close.type };
    const state = reducer(snackbar, action);
    expect(state.isShow).toBeFalsy();
  });
});
