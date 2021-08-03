import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from 're-ducks/store/initialState';
import { getSearchPosts } from 're-ducks/posts/selectors';
import { searchPosts } from 're-ducks/posts/operations';
import PostCard from './PostCard';

const SearchPosts: FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: InitialState) => state);
  const posts = getSearchPosts(selector);
  const { word }: { word: string } = useParams();

  useEffect(() => {
    dispatch(searchPosts(word));
  }, [dispatch, word]);

  return (
    <div className="posts-list">
      検索ワード:
      {word}
      <section className="c-section-wrapin">
        <div className="p-grid__row">
          {
            posts.length > 0 && posts.map((post) => (
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

export default SearchPosts;
