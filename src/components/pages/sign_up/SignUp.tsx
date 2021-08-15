import {
  ChangeEvent,
  FC,
  useCallback,
  useState,
  memo,
} from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from 're-ducks/users/operations';
import { push } from 'connected-react-router';
import { InputText } from 'components/UIKit/index';
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

const InputTextMemo = memo((
  props: {
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
      <InputTextMemo
        fullWidth
        label="ユーザー名"
        multiline={false}
        required
        rows={1}
        value={name}
        type="text"
        input={inputName}
      />
      <InputTextMemo
        fullWidth
        label="ニックネーム"
        multiline={false}
        required
        rows={1}
        value={nickname}
        type="text"
        input={inputNickname}
      />
      <InputTextMemo
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
