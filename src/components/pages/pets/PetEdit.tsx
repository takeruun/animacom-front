import {
  ChangeEvent,
  FC, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { AppDispatch } from 're-ducks/store/store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createPet, fetchPet, editPet } from 'modules/petModule';
import { InputText, SelectBox } from 'components/UIKit';
import showSnackbar from 'hook/showSnackbar';
import { Button, createStyles, makeStyles } from '@material-ui/core';
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
    value: string | number,
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

const PetEdit: FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const { id }: { id?: string } = useParams();

  const mountedRef = useRef(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [genderId, setGender] = useState('0');
  const [image, setImage] = useState<{file: File, imagePath:string}>();

  const categories = [{
    id: '0',
    name: 'オス',
  }, {
    id: '1',
    name: 'メス',
  }];

  const inputName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, [setName]);

  const inputAge = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.target.value));
  }, [setAge]);

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

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      const getPet = async (petId: string) => {
        try {
          const data = await dispatch(fetchPet(petId)).unwrap();
          if (mountedRef.current) {
            setName(data.name);
            setAge(data.age);
            setGender(data.gender.id);
          }
        } catch (e) {
          dispatch(showSnackbar({ e }));
        }
      };
      getPet(id);
    }
  }, [id, dispatch]);

  const submit = () => {
    const data = new FormData();
    data.append('pets[name]', name);
    data.append('pets[age]', String(age));
    data.append('pets[gender]', genderId);
    if (image && image.file) {
      data.append('image', image.file);
    }

    if (id !== undefined) {
      dispatch(editPet({ id, data }));
    } else {
      dispatch(createPet(data));
    }
  };

  return (
    <section>
      <h2 className="u-text-center u-text__headline">ペット登録</h2>
      <div className="c-section-container">
        <InputTextMemo
          id="name"
          label="名前🐾"
          fullWidth
          multiline
          required
          rows={1}
          value={name}
          type="text"
          input={inputName}
        />
        <InputTextMemo
          id="name"
          label="年齢🐾"
          fullWidth
          multiline
          required
          rows={1}
          value={age}
          type="number"
          input={inputAge}
        />
        <SelectBox
          label="性別🐾"
          required
          options={categories}
          value={genderId}
          select={setGender}
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
          <img src={image.imagePath} alt="ペット画像" />
          )}
        </div>
        <div className="module-spacer--medium" />
        <div className="center">
          <Button
            className={classes.button}
            onClick={() => submit()}
          >
            {id ? '更新' : '登録'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PetEdit;
