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
      label: '????????????', value: '/posts/reaction/cute', count: 1,
    },
    {
      label: '???????????????', value: '/posts/reaction/fav', count: 2,
    },
    {
      label: '?????????', value: '/posts/reaction/good', count: 3,
    },
    {
      label: '???????????????', value: '/posts/reaction/cool', count: 4,
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

  it('??????????????????????????????', () => {
    renderComponent();

    const inputSearch = screen.getByPlaceholderText('????????????????????????') as HTMLInputElement;
    userEvent.type(inputSearch, 'testTes');
    expect(inputSearch.value).toBe('testTes');
  });

  it('????????????????????????????????????', () => {
    renderComponent();
    expect(screen.getByText('????????????')).toBeInTheDocument();
  });

  it('??????????????????????????????????????????', () => {
    renderComponent();
    expect(screen.getByText('????????????')).toBeInTheDocument();
  });

  it('???????????????????????????????????????????????????', () => {
    renderComponent();
    expect(screen.getByText('???????????????????????????')).toBeInTheDocument();
  });

  describe('??????????????????????????????????????????', () => {
    reactionMenus.forEach((menu) => {
      it(`${menu.label}??????????????????`, () => {
        renderComponent();
        expect(screen.getByText(menu.label)).toBeInTheDocument();
      });
    });
  });

  describe('????????????????????????????????????', () => {
    rootCategories.forEach((category) => {
      it(`${category.name}??????????????????`, async () => {
        renderComponent();
        expect(await screen.findByText(category.name)).toBeInTheDocument();
      });
    });
  });

  describe('????????????????????????????????????????????????', () => {
    reactionMenus.forEach((reaction) => {
      it(`${reaction.label}???${reaction.count}??????????????????`, async () => {
        renderComponent();
        expect(await screen.findByText(reaction.count)).toBeInTheDocument();
      });
    });
  });

  describe('???????????????', () => {
    it('????????????', () => {
      renderComponent();

      const postBt = screen.getAllByRole('button')[1];
      userEvent.click(postBt);
      expect(history.location.pathname).toBe('/post/edit');
    });

    it('???????????????', () => {
      renderComponent();

      const mypageBt = screen.getAllByRole('button')[2];
      userEvent.click(mypageBt);
      expect(history.location.pathname).toBe('/mypage');
    });

    describe('????????????????????????', () => {
      reactionMenus.forEach((menu, i) => {
        it(`${menu.label}`, () => {
          renderComponent();

          const reactionBt = screen.getAllByRole('button')[4 + i];
          userEvent.click(reactionBt);
          expect(history.location.pathname).toBe(menu.value);
        });
      });
    });

    describe('??????????????????', () => {
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

  describe('Fetch failure', () => {
    beforeEach(() => {
      server.use(
        rest.get('http://localhost:3001/v1/users/posts/reactions/counts',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              error: '?????????????????????',
            }),
          )),
      );
    });

    it('??????????????????????????????????????????', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <ClosableDrawer open onClose={onClose} />
        </Provider>,
      );

      expect(await screen.findByText(/?????????????????????/i)).toBeInTheDocument();
    });
  });
});
