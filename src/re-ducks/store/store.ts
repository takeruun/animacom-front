import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import UsersReducer from 're-ducks/users/reducers';
import PostReducer from 're-ducks/post/reducers';
import PostsReducer from 're-ducks/posts/reducers';
import ApiStatusReducer from 're-ducks/apiStatus/reducers';
import { History } from 'history';
import thunk from 'redux-thunk';

export default function createStore(history: History) {
  return reduxCreateStore(
    combineReducers({
      // historyの情報をreduxのrouterで管理できる
      router: connectRouter(history),
      users: UsersReducer,
      post: PostReducer,
      posts: PostsReducer,
      apiStatus: ApiStatusReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  );
}
