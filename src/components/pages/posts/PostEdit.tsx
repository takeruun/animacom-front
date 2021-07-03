import { useDispatch } from 'react-redux';
import {
  ChangeEvent, FC, useCallback, useState,
} from 'react';
import { InputText, SelectBox } from 'components/UIKit/index';
import Button from '@material-ui/core/Button';
import { createPost } from 're-ducks/posts/operations';
import ImageArea from './ImageArea';

const PostEdit: FC = () => {
  const dispatch = useDispatch();
  const categories = [
    { id: '1', name: '猫' },
    { id: '2', name: '犬' },
  ];

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const inputTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }, [setTitle]);

  const inputSubTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSubTitle(event.target.value);
  }, [setSubTitle]);

  const inputBody = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  }, [setBody]);

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
        <ImageArea />
        <SelectBox
          label="カテゴリ🐾"
          required
          options={categories}
          value={categoryId}
          select={setCategoryId}
        />
        <div className="module-spacer--small" />
        <div className="cneter">
          <Button
            onClick={() => dispatch(
              createPost({
                title,
                subTitle,
                body,
                categoryId,
              }),
            )}
          >
            投稿！
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PostEdit;
