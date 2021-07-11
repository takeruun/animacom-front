import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from 're-ducks/store/initialState';
import {
  ChangeEvent, FC, useCallback, useEffect, useState,
} from 'react';
import {
  createPost, startFetch, editPost, fetchPostApi, endFetch,
} from 're-ducks/posts/operations';
import { getLoding } from 're-ducks/posts/selectors';
import {
  InputText, SelectBox,
} from 'components/UIKit/index';
import Button from '@material-ui/core/Button';
import { AddPhotoAlternate } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import InputLable from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core';
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

const PostEdit: FC = () => {
  const classes = useStyles();
  let id = window.location.pathname.split('/post/edit')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  const selecter = useSelector((state: InitialState) => state);
  const loading = getLoding(selecter);
  const dispatch = useDispatch();
  const categories = [
    { id: '1', name: '猫' },
    { id: '2', name: '犬' },
  ];

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState<Array<ImageType>>([]);

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
    try {
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
        dispatch(editPost(id, data));
      }
    } catch (err) {
      console.error('request err', err);
    }
  };

  useEffect(() => {
    if (id !== '') {
      const execApi = async (postId: string) => {
        dispatch(startFetch());

        const res = await fetchPostApi(postId);
        setTitle(res.post.title);
        setSubTitle(res.post.subTitle);
        setBody(res.post.body);
        setCategoryId(res.post.categoryId);
        setImages(res.post.images);

        dispatch(endFetch());
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
          編集！
        </Button>
      );
    }
    return (
      <Button
        onClick={() => submit('post')}
      >
        投稿！
      </Button>
    );
  }

  if (loading) return <p>...loding</p>;

  return (
    <section>
      <h2 className="u-text-center u-text__headline">投稿画面</h2>
      <div className="c-section-container">
        <InputText
          label="タイトル🐾"
          fullWidth
          multiline
          required
          rows={1}
          value={title}
          type="text"
          input={inputTitle}
        />
        <InputText
          label="サブタイトル🐾"
          fullWidth
          multiline
          required
          rows={1}
          value={subTitle}
          type="text"
          input={inputSubTitle}
        />
        <InputText
          label="説明🐾"
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
            <span>画像を登録する🐾</span>
            <IconButton className={classes.icon}>
              <InputLable>
                <AddPhotoAlternate />
                <input className="u-display-none" type="file" id="image" onChange={inputImage} />
              </InputLable>
            </IconButton>
          </div>
          {
            images.map((image) => (
              <ImagePreview delete={deleteImage} id={image.id} imagePath={image.imagePath} />
            ))
          }
        </div>
        <SelectBox
          label="カテゴリ🐾"
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
