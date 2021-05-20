import {
  ChangeEvent, FC, useCallback, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from 're-ducks/users/operations';
import { push } from 'connected-react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: '#000',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const SignUp: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const inputName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, [setName]);

  const inputEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputNickname = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  }, [setNickname]);

  const inputPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextField
        fullWidth
        label="ユーザー名"
        multiline={false}
        required
        rows={1}
        value={name}
        type="text"
        onChange={inputName}
      />
      <TextField
        fullWidth
        label="ニックネーム"
        multiline={false}
        required
        rows={1}
        value={nickname}
        type="text"
        onChange={inputNickname}
      />
      <TextField
        fullWidth
        label="メールアドレス"
        multiline={false}
        required
        rows={1}
        value={email}
        type="email"
        onChange={inputEmail}
      />
      <TextField
        fullWidth
        label="パスワード（半角英数字で6文字以上）"
        multiline={false}
        required
        rows={1}
        value={password}
        type="password"
        onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <Button
          className={classes.button}
          onClick={() => dispatch(signUp({
            name, nickname, email, password,
          }))}
        >
          新規登録
        </Button>

        <div className="module-spacer--small" />
        <div role="presentation" className="u-text-small" onClick={() => dispatch(push('/sign_in'))} onKeyDown={() => dispatch(push('/sign_in'))}>アカウントをお持ちの方はこちら</div>
      </div>
    </div>
  );
};

export default SignUp;
