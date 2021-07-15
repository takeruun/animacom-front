import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { PostList } from 'components/pages/posts/index';

const Home: FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div>home</div>
      <PostList />
      <div
        role="presentation"
        className="u-text-small"
        onClick={() => dispatch(push('/posts/edit'))}
        onKeyDown={() => dispatch(push('/posts/edit'))}
      >
        投稿画面へ
      </div>
    </>
  );
};

export default Home;
