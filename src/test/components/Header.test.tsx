import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { userModule } from 'modules/userModule';
import { snackbarModule } from 'modules/snackbarModule';
import { categoryModule } from 'modules/categoryModule';
import { searchModule } from 'modules/searchModule';
import { postModule } from 'modules/postModule';
import { reactionCountsModule } from 'modules/reactionCountsModule';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';
import Header from 'components/header/Header';
import SearchPosts from 'components/pages/posts/SearchPosts';

const history = createBrowserHistory();
const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};

const server = setupServer(
  rest.get('http://localhost:3001/v1/users/my_page',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        user: {
          id: '1',
          name: 'NAME',
          nickname: 'NICKNAME',
          followerCount: 0,
          followingCount: 0,
          image: {
            imagePath: 'http://localhost:4566/anima/uploads/user/image/1/f2df4009-5b88-4a1b-9514-ddb09f2ce6af.png',
          },
        },
      }),
    )),
  rest.delete('http://localhost:3001/v1/users/auth/sign_out',
    (_, res, ctx) => res(ctx.status(200))),
  rest.get('http://localhost:3001/v1/users/posts/reactions/counts',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        reactions: {
          counts: [
            {
              kind: 1,
              count: 1,
            }, {
              kind: 2,
              count: 2,
            }, {
              kind: 3,
              count: 3,
            }, {
              kind: 4,
              count: 4,
            },
          ],
        },
      }),
    )),
  rest.get('http://localhost:3001/v1/categories/root',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        rootCategories: [
          {
            id: '1',
            name: 'TEST_CATEGORY',
          },
        ],
      }),
    )),
  rest.get('http://localhost:3001/v1/posts/search',
    (_, res, ctx) => res(ctx.status(200), ctx.json({
      posts: [{
        id: '1',
        title: 'TEST_Title',
        subTitle: 'SubTitle',
        body: 'Body',
        images: [],
        categoryId: '1',
        cuteCount: 0,
        favCount: 0,
        goodCount: 0,
        coolCount: 0,
        reactions: [],
      }],
    }))),
);

beforeAll(() => server.listen());
afterEach(() => {
  history.location.pathname = '/';
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    search: '',
  }),
}));

describe('Rendering Header', () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;
  const reducers = combineReducers({
    snackbar: snackbarModule.reducer,
    user: userModule.reducer,
    category: categoryModule.reducer,
    search: searchModule.reducer,
    post: postModule.reducer,
    reactionCounts: reactionCountsModule.reducer,
    router: connectRouter(history),
  });

  beforeEach(() => {
    localStorage.setItem('anima', JSON.stringify(headers));
    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(routerMiddleware(history)),
    });
  });

  const renderComponent = () => render(
    <Provider store={store}>
      <SearchPosts />
      <Header />
    </Provider>,
  );

  it('「ユーザ一覧」が表示されている', async () => {
    renderComponent();

    const userListBt = screen.getAllByRole('button')[0];
    userEvent.hover(userListBt);
    expect(await screen.findByText('ユーザ一覧')).toBeInTheDocument();
  });

  it('「投稿一覧」が表示されている', async () => {
    renderComponent();

    const postListBt = screen.getAllByRole('button')[1];
    userEvent.hover(postListBt);
    expect(await screen.findByText('投稿一覧')).toBeInTheDocument();
  });

  it('「カテゴリ一覧」が表示されている', async () => {
    renderComponent();

    const categoryListBt = screen.getAllByRole('button')[2];
    userEvent.hover(categoryListBt);
    expect(await screen.findByText('カテゴリ一覧')).toBeInTheDocument();
  });

  it('検索ワード入力できる', () => {
    renderComponent();

    const inputSearch = screen.getByPlaceholderText('Search…') as HTMLInputElement;
    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'testTes');
    expect(inputSearch.value).toBe('testTes');
  });

  describe('ページ遷移', () => {
    it('ユーザ一覧ページへ', () => {
      renderComponent();

      const userListBt = screen.getAllByRole('button')[0];
      userEvent.click(userListBt);
      expect(history.location.pathname).toBe('/users');
    });

    it('ログインページへ', () => {
      localStorage.removeItem('anima');
      renderComponent();

      expect(screen.getAllByText('ログイン').length).toBe(2);

      const loginBt = screen.getAllByText('ログイン')[0];
      userEvent.click(loginBt);
      expect(history.location.pathname).toBe('/sign_in');
    });

    it('キーワード検索結果ページへ', async () => {
      renderComponent();

      const inputSearch = screen.getByPlaceholderText('Search…');
      userEvent.type(inputSearch, 'test');
      fireEvent.keyPress(inputSearch, { key: 'Enter', code: 13, charCode: 13 });

      expect(history.location.pathname + history.location.search).toBe('/search?word=test');
    });
  });

  describe('ログイン中', () => {
    it('「ログアウト」が表示される', async () => {
      renderComponent();

      expect((await screen.findAllByText('ログアウト')).length).toBe(2);
    });
  });

  describe('未ログイン', () => {
    it('「ログイン」が表示される', async () => {
      localStorage.removeItem('anima');
      renderComponent();

      expect(screen.getAllByText('ログイン').length).toBe(2);
    });
  });

  it('ログアウトできる', async () => {
    renderComponent();
    expect((await screen.findAllByText('ログアウト')).length).toBe(2);

    const loginBt = screen.getAllByText('ログアウト')[0];

    userEvent.click(loginBt);
    expect((await screen.findAllByText('ログイン')).length).toBe(2);
  });

  it('ドロワー表示できる', async () => {
    renderComponent();

    const drawerBt = screen.getAllByRole('button')[4];

    userEvent.click(drawerBt);
    expect(await screen.findByText('本日のリアクション')).toBeInTheDocument();
  });

  describe('ドロワー内の一部テスト', () => {
    describe('ログイン中', () => {
      it('「ログアウト」が表示される', async () => {
        renderComponent();
        const drawerBt = screen.getAllByRole('button')[4];
        userEvent.click(drawerBt);

        expect((await screen.findAllByText('ログアウト')).length).toBe(2);
      });

      it('ログアウトできる', async () => {
        renderComponent();
        expect((await screen.findAllByText('ログアウト')).length).toBe(2);

        const loginBt = screen.getAllByText('ログアウト')[1];

        userEvent.click(loginBt);
        expect((await screen.findAllByText('ログイン')).length).toBe(2);
      });
    });

    describe('ログアウト中', () => {
      beforeEach(() => {
        localStorage.removeItem('anima');
      });

      it('「ログイン」が表示される', () => {
        renderComponent();

        expect(screen.getAllByText('ログイン').length).toBe(2);
      });

      it('ログインページに遷移できる', () => {
        renderComponent();

        expect(screen.getAllByText('ログイン').length).toBe(2);

        const loginBt = screen.getAllByText('ログイン')[1];
        userEvent.click(loginBt);
        expect(history.location.pathname).toBe('/sign_in');
      });
    });
  });

  describe('Fetch fauiler', () => {
    beforeEach(() => {
      server.use(
        rest.get('http://localhost:3001/v1/users/my_page',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              error: '失敗しました。',
            }),
          )),
      );
    });

    it('エラーメッセージが表示される', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <Header />
        </Provider>,
      );

      expect(await screen.findByText(/失敗しました。/i)).toBeInTheDocument();
    });
  });
});
