import { render, screen, cleanup } from '@testing-library/react';
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
import ClosableDrawer from 'components/header/ClosableDrawer';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';

const history = createBrowserHistory();
const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
const rootCategories = [
  {
    id: '1',
    name: 'TEST_CATEGORY',
  }, {
    id: '2',
    name: 'TEST_CATEGORY2',
  },
];
const server = setupServer(
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
        rootCategories,
      }),
    )),
);

beforeAll(() => server.listen());
afterEach(() => {
  history.location.pathname = '/';
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Rendering ClosableDrawer', () => {
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
  const onClose = jest.fn();
  const reactionMenus = [
    {
      label: 'かわいい', value: '/posts/reaction/cute', count: 1,
    },
    {
      label: 'お気に入り', value: '/posts/reaction/fav', count: 2,
    },
    {
      label: 'いいね', value: '/posts/reaction/good', count: 3,
    },
    {
      label: 'かっこいい', value: '/posts/reaction/cool', count: 4,
    },
  ];

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
      <ClosableDrawer open onClose={onClose} />
    </Provider>,
  );

  it('検索ワード入力できる', () => {
    renderComponent();

    const inputSearch = screen.getByPlaceholderText('キーワードを入力') as HTMLInputElement;
    userEvent.type(inputSearch, 'testTes');
    expect(inputSearch.value).toBe('testTes');
  });

  it('「投稿登録」が表示される', () => {
    renderComponent();
    expect(screen.getByText('投稿登録')).toBeInTheDocument();
  });

  it('「プロフィール」が表示される', () => {
    renderComponent();
    expect(screen.getByText('投稿登録')).toBeInTheDocument();
  });

  it('「Logout」が表示される', () => {
    renderComponent();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('「本日のリアクション」が表示される', () => {
    renderComponent();
    expect(screen.getByText('本日のリアクション')).toBeInTheDocument();
  });

  describe('リアクション一覧が表示される', () => {
    reactionMenus.forEach((menu) => {
      it(`${menu.label}が表示される`, () => {
        renderComponent();
        expect(screen.getByText(menu.label)).toBeInTheDocument();
      });
    });
  });

  describe('カテゴリ一覧が表示される', () => {
    rootCategories.forEach((category) => {
      it(`${category.name}が表示される`, async () => {
        renderComponent();
        expect(await screen.findByText(category.name)).toBeInTheDocument();
      });
    });
  });

  describe('本日のリアクション数が表示される', () => {
    reactionMenus.forEach((reaction) => {
      it(`${reaction.label}数${reaction.count}が表示される`, async () => {
        renderComponent();
        expect(await screen.findByText(reaction.count)).toBeInTheDocument();
      });
    });
  });

  describe('ページ遷移', () => {
    it('投稿登録', () => {
      renderComponent();

      const postBt = screen.getAllByRole('button')[1];
      userEvent.click(postBt);
      expect(history.location.pathname).toBe('/post/edit');
    });

    it('マイページ', () => {
      renderComponent();

      const mypageBt = screen.getAllByRole('button')[2];
      userEvent.click(mypageBt);
      expect(history.location.pathname).toBe('/mypage');
    });

    describe('リアクション一覧', () => {
      reactionMenus.forEach((menu, i) => {
        it(`${menu.label}`, () => {
          renderComponent();

          const reactionBt = screen.getAllByRole('button')[4 + i];
          userEvent.click(reactionBt);
          expect(history.location.pathname).toBe(menu.value);
        });
      });
    });

    describe('カテゴリ一覧', () => {
      rootCategories.forEach((category, i) => {
        it(`${category.name}`, async () => {
          renderComponent();

          expect(await screen.findByText(category.name)).toBeInTheDocument();
          const categoryBt = screen.getAllByRole('button')[8 + i];
          userEvent.click(categoryBt);
          expect(history.location.pathname).toBe(`/category/${category.id}`);
        });
      });
    });
  });

  describe('Fetch Failure', () => {
    beforeEach(() => {
      server.use(
        rest.get('http://localhost:3001/v1/users/posts/reactions/counts',
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
          <ClosableDrawer open onClose={onClose} />
        </Provider>,
      );

      expect(await screen.findByText(/失敗しました。/i)).toBeInTheDocument();
    });
  });
});
