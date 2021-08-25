import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { PostEdit } from 'components/pages/posts';
import { postModule } from 'modules/postModule';
import { categoryModule } from 'modules/categoryModule';

export const history = createBrowserHistory();

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const server = setupServer(
  rest.get('http://localhost:3001/v1/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      categories: [
        {
          id: '1',
          name: 'TEST_CATEGORY',
        },
        {
          id: '2',
          name: 'UPDATE_CATEGORY',
        },
      ],
    }));
  }),
  rest.get('http://localhost:3001/v1/users/posts/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      post: {
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
      }
    }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('renders post edit', () => {
  let store: any;
  const reducers = combineReducers({
    post: postModule.reducer,
    category: categoryModule.reducer,
    router: connectRouter(history),
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(routerMiddleware(history)),
    });
  });

  describe('新規投稿できる', () => {

    const renderComponent = () => render(
      <Provider store={store}>
        <PostEdit />
      </Provider>
    );

    it('タイトル入力できる', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText('タイトル🐾');
      fireEvent.change(titleInput, {
        target: {
          value: 'タイトル'
        }
      });
      expect(screen.getByText('タイトル')).toBeInTheDocument();
    });

    it('サブタイトル入力できる', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText('サブタイトル🐾');
      fireEvent.change(titleInput, {
        target: {
          value: 'サブタイトル'
        }
      });
      expect(screen.getByText('サブタイトル')).toBeInTheDocument();
    });

    it('説明入力できる', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText('説明🐾');
      fireEvent.change(titleInput, {
        target: {
          value: '説明'
        }
      });
      expect(screen.getByText('説明')).toBeInTheDocument();
    });

    it('カテゴリ選択できる', async () => {
      renderComponent();

      userEvent.click(screen.getAllByRole('button')[1]);
      userEvent.click(await screen.findByText('TEST_CATEGORY'));
      expect(screen.getAllByText('TEST_CATEGORY')[0]).toBeInTheDocument();
    });

    it('「投稿」が表示されている', () => {
      renderComponent();

      expect(screen.getByText('投稿！')).toBeInTheDocument();
    });
  });

  describe('編集できる', () => {
    const renderComponent = () => render(
      <Provider store={store}>
        <PostEdit />
      </Provider>
    );

    beforeEach(() => {
      // @ts-ignore
      delete window.location;
      // @ts-ignore
      window.location = {
        pathname: 'http://dummy.com/post/edit/1',
      };
    });

    it('タイトル再入力できる', async () => {
      renderComponent();

      expect(await screen.findByText('TEST_Title'));

      const titleInput = screen.getByText('TEST_Title');
      fireEvent.change(titleInput, {
        target: {
          value: 'UPDATE_Title'
        }
      });
      expect(screen.getByText('UPDATE_Title')).toBeInTheDocument();
    });

    it('サブタイトル再入力できる', async () => {
      renderComponent();

      expect(await screen.findByText('SubTitle'));

      const titleInput = screen.getByPlaceholderText('サブタイトル🐾');
      fireEvent.change(titleInput, {
        target: {
          value: 'UPDATE_SUBTITLE'
        }
      });
      expect(screen.getByText('UPDATE_SUBTITLE')).toBeInTheDocument();
    });

    it('説明再入力できる', async () => {
      renderComponent();

      expect(await screen.findByText('Body'));

      const titleInput = screen.getByPlaceholderText('説明🐾');
      fireEvent.change(titleInput, {
        target: {
          value: 'UPDATE_BODY'
        }
      });
      expect(screen.getByText('UPDATE_BODY')).toBeInTheDocument();
    });

    it('カテゴリ選択できる', async () => {
      renderComponent();

      expect(await screen.findByText('TEST_CATEGORY'))

      userEvent.click(screen.getAllByRole('button')[1]);
      userEvent.click(screen.getByText('UPDATE_CATEGORY'));
      expect(screen.getAllByText('UPDATE_CATEGORY')[0]).toBeInTheDocument();
    });

    it('「編集」が表示されている', () => {
      renderComponent();

      expect(screen.getByText('編集！')).toBeInTheDocument();
    });
  });
});