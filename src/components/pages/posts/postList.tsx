import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 're-ducks/posts/operations';
import { startFetch, endFetch } from 're-ducks/apiStatus/operations';
import { InitialState } from 're-ducks/store/initialState';
import {
  getCool5Posts,
  getCute5Posts,
  getDayAgoPosts,
  getFav5Posts,
  getGood5Posts,
  getLatestPosts,
} from 're-ducks/posts/selectors';
import { PostType } from 're-ducks/post/types';
import PostCard from './PostCard';

type PropsType = {
  path: string,
}

const PostList: FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const selecter = useSelector((state: InitialState) => state);
  const { path } = props;

  function getPosts(): Array<PostType> {
    let posts = [];
    if (path === 'day_ago') {
      posts = getDayAgoPosts(selecter);
    } else if (path === 'reactions/bests/cute') {
      posts = getCute5Posts(selecter);
    } else if (path === 'reactions/bests/fav') {
      posts = getFav5Posts(selecter);
    } else if (path === 'reactions/bests/good') {
      posts = getGood5Posts(selecter);
    } else if (path === 'reactions/bests/cool') {
      posts = getCool5Posts(selecter);
    } else {
      posts = getLatestPosts(selecter);
    }
    return posts;
  }
  const posts = getPosts();

  useEffect(() => {
    dispatch(startFetch());
    dispatch(fetchPosts(path));
    dispatch(endFetch());
  }, [dispatch, path]);

  return (
    <div className="posts-list">
      {path === 'latest' && (<p>今日の投稿一覧</p>)}
      {path === 'day_ago' && (<p>昨日の投稿一覧</p>)}
      {path === 'reactions/bests/cute' && (<p>かわいい一覧 best5</p>)}
      {path === 'reactions/bests/fav' && (<p>お気に入り一覧  best5</p>)}
      {path === 'reactions/bests/good' && (<p>いいね一覧  best5</p>)}
      {path === 'reactions/bests/cool' && (<p>かっこいい一覧  best5</p>)}
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
                cuteCount={post.cuteCount}
                favCount={post.favCount}
                goodCount={post.goodCount}
                coolCount={post.coolCount}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default PostList;
