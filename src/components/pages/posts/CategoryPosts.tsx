import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { fetchCategoryPosts } from 'modules/postModule';
import PostCard from './PostCard';

const CategoryPosts: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const postModule = useSelector((state: RootState) => state.post);
  const posts = postModule.searchPosts;
  const { category }: { category: string } = useParams();

  useEffect(() => {
    dispatch(fetchCategoryPosts(Number(category)));
  }, [dispatch, category]);

  return (
    <div className="posts-list">
      カテゴリ:
      {category}
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

export default CategoryPosts;
