import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import UsersReducer from 're-ducks/users/reducers';
import PostsReducer from 're-ducks/posts/reducers';
import { History } from 'history';
import thunk from 'redux-thunk';

export default function createStore(history: History) {
  return reduxCreateStore(
    combineReducers({
      // historyの情報をreduxのrouterで管理できる
      router: connectRouter(history),
      users: UsersReducer,
      posts: PostsReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  );
}
