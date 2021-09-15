import {
  ChangeEvent,
  FC,
  useCallback,
  useState,
  memo,
} from 'react';
import { useDispatch } from 'react-redux';
import { signUp, UserImageType } from 'modules/userModule';
import { push } from 'connected-react-router';
import { InputText } from 'components/UIKit/index';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputLable from '@material-ui/core/InputLabel';
import { AddPhotoAlternate } from '@material-ui/icons';

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
  icon: {
    height: 48,
    width: 48,
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

const SignUp: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [image, setImage] = useState<UserImageType>();

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

  const inputIntroduction = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIntroduction(event.target.value);
  }, [setIntroduction]);

  const inputImage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const reader = new FileReader();
      const imageFile = event.target.files[0];
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        const newImage = { file: imageFile, imagePath: URL.createObjectURL(imageFile) };
        setImage(newImage);
      };
    }
  }, [setImage]);

  const submit = () => {
    const data = new FormData();
    data.append('name', name);
    data.append('nickname', nickname);
    data.append('email', email);
    data.append('password', password);
    data.append('introduction', introduction);
    if (image && image.file) {
      data.append('image', image.file);
    }
    dispatch(signUp(data));
  };

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <InputTextMemo
        id="name"
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
        id="nickname"
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
      <InputTextMemo
        id="introduction"
        fullWidth
        label="自己紹介"
        multiline
        required
        rows={3}
        value={introduction}
        type="text"
        input={inputIntroduction}
      />
      <div className="u-text-rigth">
        <span>画像を登録する🐾</span>
        <IconButton className={classes.icon}>
          <InputLable>
            <AddPhotoAlternate />
            <input className="u-display-none" type="file" id="image" onChange={inputImage} />
          </InputLable>
        </IconButton>
        {image && (
          <img src={image.imagePath} alt="ユーザ画像" />
        )}
      </div>
      <div className="module-spacer--medium" />
      <div className="center">
        <Button
          className={classes.button}
          onClick={() => submit()}
        >
          新規登録
        </Button>

        <div className="module-spacer--small" />
        <div
          role="presentation"
          className="u-text-small"
          onClick={() => dispatch(push('/sign_in'))}
          onKeyDown={() => dispatch(push('/sign_in'))}
        >
          アカウントをお持ちの方はこちら
        </div>
      </div>
    </div>
  );
};

export default SignUp;
