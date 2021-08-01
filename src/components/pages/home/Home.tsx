import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 're-ducks/posts/operations';
import { startFetch, endFetch } from 're-ducks/apiStatus/operations';
import {
  getCool5Posts,
  getCute5Posts,
  getDayAgoPosts,
  getFav5Posts,
  getGood5Posts,
  getLatestPosts,
} from 're-ducks/posts/selectors';
import { InitialState } from 're-ducks/store/initialState';
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
  const dispatch = useDispatch();
  const selector = useSelector((state: InitialState) => state);
  const classes = useStyles();

  const list = [
    { path: 'latest', posts: getLatestPosts(selector) },
    { path: 'day_ago', posts: getDayAgoPosts(selector) },
    { path: 'reactions/bests/cute', posts: getCute5Posts(selector) },
    { path: 'reactions/bests/fav', posts: getFav5Posts(selector) },
    { path: 'reactions/bests/good', posts: getGood5Posts(selector) },
    { path: 'reactions/bests/cool', posts: getCool5Posts(selector) },
  ];

  useEffect(() => {
    dispatch(startFetch());
    dispatch(fetchPosts('latest'));
    dispatch(fetchPosts('day_ago'));
    dispatch(fetchPosts('reactions/bests/cute'));
    dispatch(fetchPosts('reactions/bests/fav'));
    dispatch(fetchPosts('reactions/bests/good'));
    dispatch(fetchPosts('reactions/bests/cool'));
    dispatch(endFetch());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div>home</div>
      {
        list.map((p) => (
          <PostList
            path={p.path}
            posts={p.posts}
          />
        ))
      }
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
