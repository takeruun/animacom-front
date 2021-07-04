import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const Home: FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div>home</div>
      <div
        role="presentation"
        className="u-text-small"
        onClick={() => dispatch(push('/post/edit'))}
        onKeyDown={() => dispatch(push('/post/edit'))}
      >
        投稿画面へ
      </div>
    </>
  );
};

export default Home;
