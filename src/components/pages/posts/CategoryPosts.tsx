import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { fetchCategoryPosts } from 'modules/postModule';
import { fetchCategories } from 'modules/categoryModule';
import PostCard from './PostCard';

const CategoryPosts: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const postModule = useSelector((state: RootState) => state.post);
  const categoryModule = useSelector((state: RootState) => state.category);
  const posts = postModule.searchPosts;
  const categories = categoryModule.categories;
  const { category }: { category: string } = useParams();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCategoryPosts(Number(category)));
  }, [dispatch, category]);

  return (
    <div className="posts-list">
      カテゴリ:
      {categories.find((c) => c.id === category)?.name}
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
