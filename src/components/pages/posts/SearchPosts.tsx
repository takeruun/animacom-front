import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { searchPosts } from 'modules/postModule';
import PostCard from './PostCard';

const SearchPosts: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const postModule = useSelector((state: RootState) => state.post);
  const searchModule = useSelector((state: RootState) => state.search);
  const posts = postModule.searchPosts;
  const word = searchModule.word;

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
