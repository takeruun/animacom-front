/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  render, screen, cleanup, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { PostEdit } from 'components/pages/posts';
import { postModule } from 'modules/postModule';
import { categoryModule } from 'modules/categoryModule';

const history = createBrowserHistory();

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const server = setupServer(
  rest.get('http://localhost:3001/v1/categories', (_, res, ctx) => res(ctx.status(200), ctx.json({
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
  }))),
  rest.get('http://localhost:3001/v1/users/posts/1', (_, res, ctx) => res(ctx.status(200), ctx.json({
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
      reactions: [],
    },
  }))),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Rendering PostEdit', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  describe('?????????????????????', () => {
    const renderComponent = () => render(
      <Provider store={store}>
        <PostEdit />
      </Provider>,
    );

    it('???????????????????????????', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText('????????????????');
      fireEvent.change(titleInput, {
        target: {
          value: '????????????',
        },
      });
      expect(screen.getByText('????????????')).toBeInTheDocument();
    });

    it('?????????????????????????????????', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText('??????????????????????');
      fireEvent.change(titleInput, {
        target: {
          value: '??????????????????',
        },
      });
      expect(screen.getByText('??????????????????')).toBeInTheDocument();
    });

    it('?????????????????????', async () => {
      renderComponent();

      const titleInput = screen.getByPlaceholderText('??????????');
      fireEvent.change(titleInput, {
        target: {
          value: '??????',
        },
      });
      expect(screen.getByText('??????')).toBeInTheDocument();
    });

    it('???????????????????????????', async () => {
      renderComponent();

      userEvent.click(screen.getAllByRole('button')[1]);
      userEvent.click(await screen.findByText('TEST_CATEGORY'));
      expect(screen.getAllByText('TEST_CATEGORY')[0]).toBeInTheDocument();
    });

    it('????????????????????????????????????', () => {
      renderComponent();

      expect(screen.getByText('?????????')).toBeInTheDocument();
    });
  });

  describe('???????????????', () => {
    const renderComponent = () => render(
      <Provider store={store}>
        <PostEdit />
      </Provider>,
    );

    beforeEach(() => {
      // @ts-ignore
      delete window.location;
      // @ts-ignore
      window.location = {
        pathname: 'http://dummy.com/post/edit/1',
      };
    });

    it('??????????????????????????????', async () => {
      const { getByText } = renderComponent();

      expect(await screen.findByText('TEST_Title'));

      const titleInput = screen.getByText('TEST_Title');

      await waitFor(() => {
        fireEvent.change(titleInput, {
          target: {
            value: 'UPDATE_Title',
          },
        });
        expect(getByText('UPDATE_Title')).toBeInTheDocument();
      });
    });

    it('????????????????????????????????????', async () => {
      const { getByText } = renderComponent();

      expect(await screen.findByText('SubTitle'));

      const titleInput = screen.getByPlaceholderText('??????????????????????');

      await waitFor(() => {
        fireEvent.change(titleInput, {
          target: {
            value: 'UPDATE_SUBTITLE',
          },
        });
        expect(getByText('UPDATE_SUBTITLE')).toBeInTheDocument();
      });
    });

    it('????????????????????????', async () => {
      const { getByText } = renderComponent();

      expect(await screen.findByText('Body'));

      const titleInput = screen.getByPlaceholderText('??????????');

      await waitFor(() => {
        fireEvent.change(titleInput, {
          target: {
            value: 'UPDATE_BODY',
          },
        });
        expect(getByText('UPDATE_BODY')).toBeInTheDocument();
      });
    });

    it('???????????????????????????', async () => {
      const { getAllByText } = renderComponent();

      expect(await screen.findByText('TEST_CATEGORY'));

      userEvent.click(screen.getAllByRole('button')[1]);

      await waitFor(() => {
        userEvent.click(screen.getByText('UPDATE_CATEGORY'));
        expect(getAllByText('UPDATE_CATEGORY')[0]).toBeInTheDocument();
      });
    });

    it('???????????????????????????????????????', async () => {
      const { getByText } = renderComponent();

      expect(await screen.findByText('?????????')).toBeInTheDocument();

      await waitFor(() => {
        expect(getByText('?????????')).toBeInTheDocument();
      });
    });
  });
});
