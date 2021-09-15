import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  memo,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 're-ducks/store/store';
import { fetchMyUser, updateUser, UserImageType } from 'modules/userModule';
import showSnackbar from 'hook/showSnackbar';
import { InputText, SecondaryButton } from 'components/UIKit/index';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputLable from '@material-ui/core/InputLabel';
import { AddPhotoAlternate } from '@material-ui/icons';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

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

const MyPageEdit: FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<UserImageType>();
  const [introduction, setIntroduction] = useState('');
  const mountedRef = useRef(false);

  const inputNickname = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  }, [setNickname]);

  const inputName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, [setName]);

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

  const inputIntroduction = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIntroduction(event.target.value);
  }, [setIntroduction]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await dispatch(fetchMyUser()).unwrap();
        if (mountedRef.current) {
          setName(user.name);
          setNickname(user.nickname);
          setImage(user.image);
          setIntroduction(user.introduction);
        }
      } catch (e) {
        dispatch(showSnackbar({ e }));
      }
    };

    getUser();
  }, [dispatch]);

  const submit = () => {
    const data = new FormData();
    data.append('user[name]', name);
    data.append('user[nickname]', nickname);
    data.append('user[introduction]', introduction);
    if (image && image.file) {
      data.append('user[image]', image.file);
    }
    dispatch(updateUser(data));
  };

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ編集</h2>
      <InputTextMemo
        id="name"
        label="ユーザー名"
        fullWidth
        multiline
        required
        rows={1}
        value={name}
        type="text"
        input={inputName}
      />
      <div className="module-spacer--medium" />
      <InputTextMemo
        id="nickname"
        label="ニックネーム"
        fullWidth
        multiline
        required={false}
        rows={1}
        value={nickname}
        type="text"
        input={inputNickname}
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
      <div className="module-spacer--medium" />
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
      <div className="center">
        <SecondaryButton label="編集" onClick={() => submit()} />
      </div>
    </section>
  );
};

export default MyPageEdit;
