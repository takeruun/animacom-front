import {
  render, screen, cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { userModule } from 'modules/userModule';
import UserDetail from 'components/pages/users/UserDetail';

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};

const server = setupServer(
  rest.get('http://localhost:3001/v1/users/1',
    (_, res, ctx) => res(ctx.status(200), ctx.json({
      user: {
        id: '1',
        name: 'NAME',
        nickname: 'NICKNAME',
        followerCount: 0,
        followingCount: 1,
        petCount: 2,
        image: {
          imagePath: 'http://localhost:4566/anima/uploads/user/image/1/f2df4009-5b88-4a1b-9514-ddb09f2ce6af.png',
        },
        postCount: 3,
      },
    }))),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    id: '1',
  }),
}));

describe('Rendering UserDetail', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;
  const reducers = combineReducers({
    user: userModule.reducer,
  });

  const renderComponent = () => render(
    <Provider store={store}>
      <UserDetail />
    </Provider>,
  );

  beforeEach(() => {
    localStorage.setItem('anima', JSON.stringify(headers));
    store = configureStore({
      reducer: reducers,
    });
  });

  describe('表示系', () => {
    it('ユーザ名', async () => {
      renderComponent();

      expect(await screen.findByText('NAME')).toBeInTheDocument();
    });

    it('ユーザ画像(alt)', async () => {
      renderComponent();

      expect(await screen.findByAltText('ユーザ画像')).toBeInTheDocument();
    });

    it('フォローカウント', async () => {
      renderComponent();

      expect(await screen.findByText('0')).toBeInTheDocument();
    });

    it('フォロワーカウント', async () => {
      renderComponent();

      expect(await screen.findByText('1')).toBeInTheDocument();
    });

    it('ペットカウント', async () => {
      renderComponent();

      expect(await screen.findByText('2')).toBeInTheDocument();
    });

    it('投稿数', async () => {
      renderComponent();

      expect(await screen.findByText('3')).toBeInTheDocument();
    });
  });
});
