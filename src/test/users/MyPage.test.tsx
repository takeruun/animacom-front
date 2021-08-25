import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userModule } from 'modules/userModule';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { rest } from "msw";
import { setupServer } from "msw/node";
import MyPage from 'components/pages/users/MyPage';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';
import { snackbarModule } from 'modules/snackbarModule';

export const history = createBrowserHistory();

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const server = setupServer(
  rest.get('http://localhost:3001/v1/users/my_page', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      user: {
        id: '1',
        name: 'NAME',
        nickname: 'NICKNAME',
        followerCount: 0,
        followingCount: 0,
        image: {
          imagePath: 'http://localhost:4566/anima/uploads/user/image/1/f2df4009-5b88-4a1b-9514-ddb09f2ce6af.png',
        }
      }
    }));
  })
)

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('MyPage', () => {
  let store: any;
  const reducers = combineReducers({
    snackbar: snackbarModule.reducer,
    user: userModule.reducer,
    router: connectRouter(history),
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(routerMiddleware(history)),
    });
  });

  describe('Fetch success', () => {
    it('「マイページ」が表示される', () => {
      render(
        <Provider store={store}>
          <MyPage />
        </Provider>
      );

      expect(screen.getByText('マイページ')).toBeInTheDocument();
    });

    it('ユーザの「名前」が表示されている', async () => {
      render(
        <Provider store={store}>
          <MyPage />
        </Provider>
      );

      expect(screen.queryByText(/NAME/)).toBeNull();
      expect(await screen.findByText('NAME')).toBeInTheDocument();
    });

    it('ユーザの「ニックネーム」が表示されている', async () => {
      render(
        <Provider store={store}>
          <MyPage />
        </Provider>
      );

      expect(screen.queryByText(/NICKNAME/)).toBeNull();
      expect(await screen.findByText('NICKNAME')).toBeInTheDocument();
    });

    it('ユーザの「ユーザ画像（alt）」が表示されている', async () => {
      render(
        <Provider store={store}>
          <MyPage />
        </Provider>
      );

      expect(screen.queryByText(/ユーザ画像/)).toBeNull();
      expect(await screen.findByAltText('ユーザ画像')).toBeInTheDocument();
    });
  });

  describe('Fetch failuer', () => {
    beforeEach(() => {
      server.use(
        rest.get('http://localhost:3001/v1/users/my_page', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ error: '失敗しました。' }));
        })
      );
    });

    it('「マイページ」は表示される', async () => {
      render(
        <Provider store={store}>
          <MyPage />
        </Provider>
      );

      expect(screen.getByText('マイページ')).toBeInTheDocument();
    });

    it('「失敗しました。」がスナックバーに表示される', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <MyPage />
        </Provider>
      );

      expect(await screen.findByText('失敗しました。')).toBeInTheDocument();
    });
  });
});