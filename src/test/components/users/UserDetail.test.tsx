import {
  render, screen, cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { userModule, UserType } from 'modules/userModule';
import UserDetail from 'components/pages/users/UserDetail';

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};

const user: UserType = {
  id: '2',
  name: 'NAME',
  nickname: 'NICKNAME',
  followerCount: 0,
  followingCount: 1,
  petCount: 2,
  image: {
    imagePath: 'http://localhost:4566/anima/uploads/user/image/1/f2df4009-5b88-4a1b-9514-ddb09f2ce6af.png',
  },
  postCount: 3,
  introduction: 'INTRODUCTION',
  isSignedIn: true,
};

const server = setupServer(
  rest.get('http://localhost:3001/v1/users/2',
    (_, res, ctx) => res(ctx.status(200), ctx.json({
      user,
    }))),
  rest.get('http://localhost:3001/v1/follows/followings/2',
    (_, res, ctx) => res(ctx.status(200), ctx.json({
      users: [{
        ...user,
        id: '3',
        name: 'NAME_3',
      }],
    }))),
  rest.get('http://localhost:3001/v1/follows/followers/2',
    (_, res, ctx) => res(ctx.status(200), ctx.json({
      users: [{
        ...user,
        id: '4',
        name: 'NAME_4',
      }],
    }))),
  rest.get('http://localhost:3001/v1/users/2/pets',
    (_, res, ctx) => res(ctx.status(200), ctx.json({
      pets: [{
        id: '1',
        name: 'petNmae',
        age: 1,
        gender: {
          id: '0',
          name: 'オス',
        },
      }],
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
    id: '2',
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

    it('初期はプロフィール', async () => {
      renderComponent();

      expect(await screen.findByText(/INTRODUCTION/i)).toBeInTheDocument();
    });
  });

  describe('ユーザメニュークリック系', () => {
    it('フォロワー', async () => {
      renderComponent();

      const followBt = await screen.findByText('フォロワー');
      userEvent.click(followBt);

      expect(await screen.findByText('NAME_4')).toBeInTheDocument();
    });

    it('フォロー', async () => {
      renderComponent();

      const followBt = await screen.findByText('フォロー');
      userEvent.click(followBt);

      expect(await screen.findByText('NAME_3')).toBeInTheDocument();
    });

    it('ペット', async () => {
      renderComponent();

      const petBt = await screen.findByText('ペット');
      userEvent.click(petBt);

      expect(await screen.findByText('petNmae')).toBeInTheDocument();
    });
  });
});
