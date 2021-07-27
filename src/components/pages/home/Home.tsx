import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 're-ducks/store/store';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { PostList } from 'components/pages/posts/index';

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: '10%',
    marginRight: '10%',
  },
}));

const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>home</div>
      <PostList path="latest" />
      <PostList path="day_ago" />
      <PostList path="reactions/bests/cute" />
      <PostList path="reactions/bests/fav" />
      <PostList path="reactions/bests/good" />
      <PostList path="reactions/bests/cool" />
      <div
        role="presentation"
        className="u-text-small"
        onClick={() => dispatch(push('/post/edit'))}
        onKeyDown={() => dispatch(push('/post/edit'))}
      >
        投稿画面へ
      </div>
    </div>
  );
};

export default Home;
