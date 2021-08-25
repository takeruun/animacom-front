import { open, close } from 'modules/snackbarModule';

export default function showSnackbar(e: any, thunkApi: any) {
  const error = e.message.split('/')[0];
  const message = e.message.split('/')[1];
  thunkApi.dispatch(close());
  thunkApi.dispatch(open(
    {
      isShow: true,
      isError: true,
      error,
      message,
    },
  ));
}
