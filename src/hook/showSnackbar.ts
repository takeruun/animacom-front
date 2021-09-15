/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { open, close } from 'modules/snackbarModule';
import { Action, Dispatch } from 'redux';

type PropsType = {
  e?: any,
  msg?: string,
  isError?: boolean,
};

const showSnackbar = ({
  e, msg, isError = true,
}: PropsType) => (dispatch: Dispatch<Action>): void => {
  let error = '';
  let message = '';

  if (isError && e) {
    message = e.message.split('/')[0];
    error = e.message.split('/')[1];
  } else if (!isError && msg) {
    message = msg;
  }

  dispatch(close());
  dispatch(open(
    {
      isShow: true,
      isError,
      error,
      message,
    },
  ));
};

export default showSnackbar;
