import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 're-ducks/posts/operations';
import { startFetch, endFetch } from 're-ducks/apiStatus/operations';
import { InitialState } from 're-ducks/store/initialState';
import { getPostsLatest } from 're-ducks/posts/selectors';
import PostCard from './PostCard';

const PostList: FC = () => {
  const dispatch = useDispatch();
  const selecter = useSelector((state: InitialState) => state);
  const posts = getPostsLatest(selecter);

  useEffect(() => {
    dispatch(startFetch());
    dispatch(fetchPosts());
    dispatch(endFetch());
  }, [dispatch]);

  return (
    <div className="posts-list">
      <p>今日の投稿一覧</p>
      <section className="c-section-wrapin">
        <div className="p-grid__row">
          {
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                subTitle={post.subTitle}
                body={post.body}
                categoryId={post.categoryId}
                images={post.images}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default PostList;
