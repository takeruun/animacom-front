import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserCutePosts, cutePostsSelecter } from 'modules/userPostModule';
import { AppDispatch } from 're-ducks/store/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: '10%',
    marginRight: '10%',
  },
}));

const UsersPosts: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const { kind }: { kind: string } = useParams();
  const posts = useSelector(cutePostsSelecter);
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async (param: string) => {
      const resultAction = await dispatch(fetchUserCutePosts(param));
      if (fetchUserCutePosts.fulfilled.match(resultAction)) {
        const p = unwrapResult(resultAction);
        console.log(p);
      }
    };
    fetchPosts(kind);
  }, [dispatch, kind]);

  return (
    <div className={classes.root}>
      usersposts
    </div>
  );
};

export default UsersPosts;
