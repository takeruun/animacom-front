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
import { History, createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { userPostModule } from 'modules/userPostModule';
import { reactionCountsModule } from 'modules/reactionCountsModule';
import { categoryModule } from 'modules/categoryModule';
import { configureStore } from '@reduxjs/toolkit';
import { postModule } from 'modules/postModule';
import { commentModule } from 'modules/commentModule';
import { userModule } from 'modules/userModule';
import { searchModule } from 'modules/searchModule';
import { snackbarModule } from 'modules/snackbarModule';
import { petModule } from 'modules/petModule';

export default function createStore(history: History) {
  return reduxCreateStore(
    combineReducers({
      // historyの情報をreduxのrouterで管理できる
      router: connectRouter(history),
      users: UsersReducer,
      post: PostReducer,
      posts: PostsReducer,
      apiStatus: ApiStatusReducer,
      userPost: userPostModule.reducer,
      reactionCounts: reactionCountsModule.reducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  );
}

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  apiStatus: ApiStatusReducer,
  user: userModule.reducer,
  userPost: userPostModule.reducer,
  reactionCounts: reactionCountsModule.reducer,
  category: categoryModule.reducer,
  post: postModule.reducer,
  comment: commentModule.reducer,
  search: searchModule.reducer,
  pet: petModule.reducer,
  snackbar: snackbarModule.reducer,
});
export const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(routerMiddleware(history), thunk),
  },
);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
