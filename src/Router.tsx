import {
  FC, Suspense, lazy,
} from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from 'Auth';

const Home = lazy(() => import('components/pages/home/index'));
const SignUp = lazy(() => import('components/pages/sign_up/index'));
const SignIn = lazy(() => import('components/pages/sign_in/index'));
const PostEdit = lazy(() => import('components/pages/posts/PostEdit'));
const PostDetail = lazy(() => import('components/pages/posts/PostDetail'));
const UsersPosts = lazy(() => import('components/pages/users/UsersPosts'));
const MyPage = lazy(() => import('components/pages/users/MyPage'));
const MyPageEdit = lazy(() => import('components/pages/users/MyPageEdit'));
const SearchPosts = lazy(() => import('components/pages/posts/SearchPosts'));
const CategoryPosts = lazy(() => import('components/pages/posts/CategoryPosts'));
const UserList = lazy(() => import('components/pages/users/UserList'));
const UserDetail = lazy(() => import('components/pages/users/UserDetail'));
const PetEdit = lazy(() => import('components/pages/pets/PetEdit'));

const Router: FC = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Route exact path="/sign_up" component={SignUp} />
      <Route exact path="/sign_in" component={SignIn} />
      <Route exact path="/search" component={SearchPosts} />
      <Route exact path="/category/:category" component={CategoryPosts} />
      <Route exact path="/users/" component={UserList} />
      <Auth>
        <Route exact path="/posts/:id" component={PostDetail} />
        <Route path="/post/edit(/:id)?" component={PostEdit} />
        <Route exact path="/posts/reaction/:kind" component={UsersPosts} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/mypage/edit" component={MyPageEdit} />
        <Route exact path="/users/:id" component={UserDetail} />
        <Route exact path="/pet/edit/:id(\d+)?" component={PetEdit} />
      </Auth>
    </Switch>
  </Suspense>
);

export default Router;
