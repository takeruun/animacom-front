import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserReactionPosts } from 'modules/userPostModule';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { makeStyles } from '@material-ui/core/styles';
import { PostType } from 're-ducks/post/types';
import { PostCard } from 'components/pages/posts/index';

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
  const userPost = useSelector((state: RootState) => state.userPost);

  let posts: PostType[] = [];
  if (kind === 'cute') {
    posts = userPost.cutePosts;
  } else if (kind === 'fav') {
    posts = userPost.favPosts;
  } else if (kind === 'cool') {
    posts = userPost.coolPosts;
  } else if (kind === 'good') {
    posts = userPost.goodPosts;
  }

  useEffect(() => {
    dispatch(fetchUserReactionPosts(kind));
  }, [dispatch, kind]);

  if (userPost.loading) { return (<p>loading...</p>); }

  return (
    <div className={classes.root}>
      <section className="c-section-wrapin">
        <div className="p-grid__row">
          {
            posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default UsersPosts;
