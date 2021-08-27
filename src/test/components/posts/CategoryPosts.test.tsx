import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { postModule } from 'modules/postModule';
import { categoryModule } from 'modules/categoryModule';
import { snackbarModule } from 'modules/snackbarModule';
import CategoryPosts from 'components/pages/posts/CategoryPosts';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const posts = [{
  id: '1',
  title: 'Title',
  subTitle: 'SubTitle',
  body: 'Body',
  images: [],
  categoryId: '1',
  cuteCount: 1,
  favCount: 2,
  goodCount: 3,
  coolCount: 4,
}];

const server = setupServer(
  rest.get('http://localhost:3001/v1/posts/search', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      posts,
    }));
  }),
  rest.get('http://localhost:3001/v1/categories', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      categories: [
        {
          id: '1',
          name: 'TEST_CATEGORY',
        },
        {
          id: '2',
          name: 'TEST_CATEGORY2',
        },
      ],
    }));
  }),
);

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    category: '1',
  }),
}));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.resetAllMocks();
  cleanup();
});
afterAll(() => server.close());

describe('Rendering CategoryPosts', () => {
  let store: any;
  const reducers = combineReducers({
    post: postModule.reducer,
    category: categoryModule.reducer,
    snackbar: snackbarModule.reducer,
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducers,
    });
  });

  const renderComponent = () => render(
    <Provider store={store}>
      <CategoryPosts />
    </Provider>
  );

  it('「カテゴリ:」が表示されている', () => {
    renderComponent()
    expect(screen.getByText('カテゴリ:'));
  });

  describe('Fetch Success', () => {
    it('カテゴリ名が表示される', async () => {
      renderComponent();
      expect(await screen.findByText('カテゴリ:TEST_CATEGORY')).toBeInTheDocument();
    });

    it('タイトルが表示される', async () => {
      renderComponent();
      expect(await screen.findByText('Title')).toBeInTheDocument();
    });

    it('サブタイトルが表示される', async () => {
      renderComponent();
      expect(await screen.findByText('SubTitle')).toBeInTheDocument();
    });

    it('「かわいい数」が表示される', async () => {
      renderComponent();
      expect(await screen.findByText('1'));
    });

    it('「お気に入り数」が表示される', async () => {
      renderComponent();
      expect(await screen.findByText('2'));
    });

    it('「いいね数」が表示される', async () => {
      renderComponent();
      expect(await screen.findByText('3'));
    });

    it('「かっこいい数」が表示される', async () => {
      renderComponent();
      expect(await screen.findByText('4'));
    });
  });

  describe('Fetch Failure', () => {
    beforeEach(() => {
      server.use(
        rest.get('http://localhost:3001/v1/posts/search', (_, res, ctx) => {
          return res(ctx.status(200), ctx.json({ error: '失敗しました。' }));
        }),
      );
    });

    it('エラーメッセージが表示させる', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <CategoryPosts />
        </Provider>
      );

      expect(await screen.findByText('失敗しました。')).toBeInTheDocument();
    });
  });
});
