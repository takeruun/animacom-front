import { FC } from 'react';
import { PostType } from 're-ducks/post/types';
import PostCard from './PostCard';

type PropsType = {
  path: string,
  posts: Array<PostType>,
}

const PostList: FC<PropsType> = (props: PropsType) => {
  const { path, posts } = props;

  return (
    <div className="posts-list">
      {path === 'latest' && (<p>今日の投稿一覧</p>)}
      {path === 'day_ago' && (<p>昨日の投稿一覧</p>)}
      {path === 'reactions/bests/cute' && (<p>かわいい一覧 best5</p>)}
      {path === 'reactions/bests/fav' && (<p>お気に入り一覧 best5</p>)}
      {path === 'reactions/bests/good' && (<p>いいね一覧 best5</p>)}
      {path === 'reactions/bests/cool' && (<p>かっこいい一覧 best5</p>)}
      <section className="c-section-wrapin">
        <div className="p-grid__row">
          {
            posts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default PostList;
