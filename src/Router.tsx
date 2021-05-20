import {
  FC, Suspense, lazy,
} from 'react';
import { Switch, Route } from 'react-router';

const Home = lazy(() => import('components/pages/home/index'));
const SignUp = lazy(() => import('components/pages/sign_up/index'));
const SignIn = lazy(() => import('components/pages/sign_in/index'));

const Router: FC = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Route exact path="/sign_up" component={SignUp} />
      <Route exact path="/sign_in" component={SignIn} />
    </Switch>
  </Suspense>
);

export default Router;
