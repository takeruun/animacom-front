import { FC } from 'react';
import { close } from 'modules/snackbarModule';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 're-ducks/store/store';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CustomizedSnackbar: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const snackbarModule = useSelector((state: RootState) => state.snackbar);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(close());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={snackbarModule.isShow}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarModule.isError ? 'error' : 'success'}
      >
        {snackbarModule.error.length > 0 && snackbarModule.error}
        {snackbarModule.message.length > 0 && snackbarModule.isError && <br />}
        {snackbarModule.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbar;
