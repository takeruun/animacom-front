import {
  ChangeEvent,
  FC,
  useCallback,
  useState,
  memo,
} from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'modules/userModule';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core';
import { InputText } from 'components/UIKit/index';

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

const InputTextMemo = memo((
  props: {
    id: string,
    fullWidth: boolean,
    label: string,
    multiline: boolean,
    required: boolean,
    rows: number,
    value: string,
    type: string,
    input: (event: ChangeEvent<HTMLInputElement>) => void,
  },
) => {
  const {
    id,
    fullWidth,
    label,
    multiline,
    required,
    rows,
    value,
    type,
    input,
  } = props;
  return (
    <InputText
      id={id}
      fullWidth={fullWidth}
      label={label}
      multiline={multiline}
      input={input}
      required={required}
      rows={rows}
      value={value}
      type={type}
    />
  );
});

const SignIn: FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">ログイン</h2>
      <div className="module-spacer--medium" />
      <InputTextMemo
        id="email"
        fullWidth
        label="メールアドレス"
        multiline={false}
        required
        rows={1}
        value={email}
        type="email"
        input={inputEmail}
      />
      <InputTextMemo
        id="password"
        fullWidth
        label="パスワード（半角英数字で6文字以上）"
        multiline={false}
        required
        rows={1}
        value={password}
        type="password"
        input={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <Button
          className={classes.button}
          onClick={() => dispatch(signIn({
            email, password,
          }))}
        >
          ログイン
        </Button>

        <div className="module-spacer--small" />
        <p role="presentation" className="u-text-small" onClick={() => dispatch(push('/sign_up'))} onKeyDown={() => dispatch(push('signin'))}>アカウントをお持ちの方はこちら</p>
      </div>
    </div>
  );
};

export default SignIn;
