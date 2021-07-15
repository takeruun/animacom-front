import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 're-ducks/posts/operations';
import { startFetch, endFetch } from 're-ducks/apiStatus/operations';
import { InitialState } from 're-ducks/store/initialState';
import { getDayAgoPosts, getLatestPosts } from 're-ducks/posts/selectors';
import { PostType } from 're-ducks/post/types';
import PostCard from './PostCard';

type PropsType = {
  param: string,
}

const PostList: FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const selecter = useSelector((state: InitialState) => state);
  const { param } = props;

  function getPosts(): Array<PostType> {
    if (param === 'day_ago') {
      return getDayAgoPosts(selecter);
    }
    return getLatestPosts(selecter);
  }
  const posts = getPosts();

  useEffect(() => {
    dispatch(startFetch());
    dispatch(fetchPosts(param));
    dispatch(endFetch());
  }, [dispatch, param]);

  return (
    <div className="posts-list">
      {param === 'latest' && (<p>今日の投稿一覧</p>)}
      {param === 'day_ago' && (<p>昨日の投稿一覧</p>)}
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
