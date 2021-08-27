/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { open, close } from 'modules/snackbarModule';

type PropsType = {
  e?: any,
  _thunkApi: any,
  msg?: string,
  isError?: boolean,
};

export default function showSnackbar({
  e, _thunkApi: thunkApi, msg, isError = true,
}: PropsType): void {
  let error = '';
  let message = '';

  if (isError && e) {
    message = e.message.split('/')[0];
    error = e.message.split('/')[1];
  } else if (!isError && msg) {
    message = msg;
  }

  thunkApi.dispatch(close());
  thunkApi.dispatch(open(
    {
      isShow: true,
      isError,
      error,
      message,
    },
  ));
}
