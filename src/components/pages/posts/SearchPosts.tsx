import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { InitialState } from 're-ducks/store/initialState';
import { getSearchPosts } from 're-ducks/posts/selectors';
import PostCard from './PostCard';

const SearchPosts: FC = () => {
  const selector = useSelector((state: InitialState) => state);
  const posts = getSearchPosts(selector);
  const { word }: { word: string } = useParams();

  return (
    <div>
      検索ワード:
      {word}
      {
        posts.length > 0 && posts.map((post) => (
          <PostCard
            key={post.id}
            {...post}
          />
        ))
      }
    </div>
  );
};

export default SearchPosts;
