import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { fetchPosts } from 'modules/postModule';
import { startFetch, endFetch } from 're-ducks/apiStatus/operations';
import { makeStyles } from '@material-ui/core/styles';
import PostList from 'components/pages/posts/PostLists';

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: '10%',
    marginRight: '10%',
  },
}));

const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const postModule = useSelector((state: RootState) => state.post);
  const classes = useStyles();

  const list = [
    { id: 'latest', path: 'latest', posts: postModule.latest },
    { id: 'day_ago', path: 'day_ago', posts: postModule.dayAgo },
    { id: 'cute', path: 'reactions/bests/cute', posts: postModule.cute5 },
    { id: 'fav', path: 'reactions/bests/fav', posts: postModule.fav5 },
    { id: 'good', path: 'reactions/bests/good', posts: postModule.good5 },
    { id: 'cool', path: 'reactions/bests/cool', posts: postModule.cool5 },
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
      {
        list.map((p) => (
          <PostList
            key={p.id}
            path={p.path}
            posts={p.posts}
          />
        ))
      }
    </div>
  );
};

export default Home;
