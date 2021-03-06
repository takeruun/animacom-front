import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  memo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from 'modules/categoryModule';
import { createPost, editPost, fetchPost } from 'modules/postModule';
import { AppDispatch, RootState } from 're-ducks/store/store';
import {
  InputText, SelectBox,
} from 'components/UIKit/index';
import Button from '@material-ui/core/Button';
import { AddPhotoAlternate } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import InputLable from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core';
import showSnackbar from 'hook/showSnackbar';
import ImagePreview from './ImagePreview';

export type ImageType = {
  id: string,
  imagePath: string,
  file: File,
}

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

const PostEdit: FC = () => {
  const classes = useStyles();
  let id = window.location.pathname.split('/post/edit')[1];
  if (id !== undefined && id !== '') {
    id = id.split('/')[1];
  }

  const dispatch: AppDispatch = useDispatch();
  const postModule = useSelector((state: RootState) => state.post);
  const categoryModule = useSelector((state: RootState) => state.category);
  const loading = postModule.loading;
  const categories = categoryModule.categories;

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState<Array<ImageType>>([]);
  const mountedRef = useRef(false);

  const inputTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, [setTitle]);

  const inputSubTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSubTitle(event.target.value);
  }, [setSubTitle]);

  const inputBody = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  }, [setBody]);

  const inputImage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const reader = new FileReader();
      const imageFile = event.target.files[0];
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        const newImage = { id: '', file: imageFile, imagePath: URL.createObjectURL(imageFile) };
        setImages(((prenvState) => [...prenvState, newImage]));
      };
    }
  }, [setImages]);

  const deleteImage = useCallback((imageId: string) => {
    const newImages = images.filter((image) => image.id !== imageId);
    setImages(newImages);
  }, [images]);

  const submit = (method: string) => {
    const data = new FormData();
    data.append('post[title]', title);
    data.append('post[subTitle]', subTitle);
    data.append('post[body]', body);
    data.append('post[categoryId]', categoryId);
    images.forEach((image) => {
      data.append('post[images][][id]', image.id);
      data.append('post[images][][file]', image.file);
    });

    if (method === 'post') {
      dispatch(createPost(data));
    } else if (method === 'edit') {
      dispatch(editPost({ id, data }));
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
    if (id !== undefined && id !== '') {
      const execApi = async (postId: string) => {
        try {
          const post = await dispatch(fetchPost(postId)).unwrap();
          if (mountedRef.current) {
            setTitle(post.title);
            setSubTitle(post.subTitle);
            setBody(post.body);
            setCategoryId(post.categoryId);
            setImages(post.images);
          }
        } catch (e) {
          dispatch(showSnackbar({ e }));
        }
      };
      execApi(id);
    }
  }, [id, dispatch]);

  function button() {
    if (id) {
      return (
        <Button
          onClick={() => submit('edit')}
        >
          ?????????
        </Button>
      );
    }
    return (
      <Button
        onClick={() => submit('post')}
      >
        ?????????
      </Button>
    );
  }

  if (loading) return <p>...loding</p>;

  return (
    <section>
      <h2 className="u-text-center u-text__headline">????????????</h2>
      <div className="c-section-container">
        <InputTextMemo
          id="title"
          label="????????????????"
          fullWidth
          multiline
          required
          rows={1}
          value={title}
          type="text"
          input={inputTitle}
        />
        <InputTextMemo
          id="subTitle"
          label="??????????????????????"
          fullWidth
          multiline
          required
          rows={1}
          value={subTitle}
          type="text"
          input={inputSubTitle}
        />
        <InputTextMemo
          id="body"
          label="??????????"
          fullWidth
          multiline
          required
          rows={5}
          value={body}
          type="text"
          input={inputBody}
        />
        <div>
          <div className="u-text-rigth">
            <span>?????????????????????????</span>
            <IconButton className={classes.icon}>
              <InputLable>
                <AddPhotoAlternate />
                <input className="u-display-none" type="file" id="image" onChange={inputImage} />
              </InputLable>
            </IconButton>
          </div>
          <ul className="p-media_privew">
            {
              images.map((image) => (
                <ImagePreview delete={deleteImage} id={image.id} imagePath={image.imagePath} />
              ))
            }
          </ul>
        </div>
        <SelectBox
          label="????????????????"
          required
          options={categories}
          value={categoryId}
          select={setCategoryId}
        />
        <div className="module-spacer--small" />
        <div className="cneter">
          {button()}
        </div>
      </div>
    </section>
  );
};

export default PostEdit;
