import {
  FC, Suspense, lazy,
} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from 'components/contents/loding/Loding';

const Home = lazy(() => import('components/pages/home/Home'));
const SignUp = lazy(() => import('components/pages/sign_up/SignUp'));

const Router: FC = () => (
  <BrowserRouter>
    <Suspense fallback={Loading}>
      <Switch>
        <Route exact path="(/)?" component={Home} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
