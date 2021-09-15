import {
  render, screen, cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { snackbarModule } from 'modules/snackbarModule';
import { userModule } from 'modules/userModule';
import UserList from 'components/pages/users/UserList';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const users = [{
  id: '1',
  name: 'NAME',
  nickname: 'NICKNAME',
  followerCount: 0,
  followingCount: 0,
  image: {
    imagePath: 'http://localhost:4566/anima/uploads/user/image/1/f2df4009-5b88-4a1b-9514-ddb09f2ce6af.png',
  },
  follow: false,
}, {
  id: '2',
  name: 'NAME2',
  nickname: 'NICKNAME2',
  followerCount: 0,
  followingCount: 0,
  image: {
    imagePath: '',
  },
  follow: false,
}];

const server = setupServer(
  rest.get('http://localhost:3001/v1/users',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({ users }),
    )),
  rest.post('http://localhost:3001/v1/users/follows',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({ followingCount: 1 }),
    )),
  rest.delete('http://localhost:3001/v1/users/follows',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({ followingCount: 0 }),
    )),

);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Rendering UserList', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;
  const reducers = combineReducers({
    snackbar: snackbarModule.reducer,
    user: userModule.reducer,
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducers,
    });
  });

  const renderComponent = () => render(
    <Provider store={store}>
      <UserList />
    </Provider>,
  );

  describe('ユーザ一覧が表示される', () => {
    users.forEach((user) => {
      it(`${user.name}が表示される`, async () => {
        renderComponent();

        expect(await screen.findByText(user.name)).toBeInTheDocument();
      });
    });
  });

  describe('フォローしていない場合、「フォローする」が表示される', () => {
    users.forEach((user) => {
      it(`${user.name}`, async () => {
        renderComponent();

        expect((await screen.findAllByText('フォローする')).length).toBe(2);
      });
    });
  });

  describe('フォローしている場合、「フォロー解除」が表示される', () => {
    beforeEach(() => {
      server.use(
        rest.get('http://localhost:3001/v1/users',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              users: [{
                ...users[0],
                follow: true,
              }, {
                ...users[1],
                follow: true,
              }],
            }),
          )),
      );
    });
    users.forEach((user) => {
      it(`${user.name}`, async () => {
        renderComponent();

        expect((await screen.findAllByText('フォロー解除')).length).toBe(2);
      });
    });
  });

  describe('フォローしている者としていない者がいる場合', () => {
    users.forEach((user, i) => {
      beforeEach(() => {
        server.use(
          rest.get('http://localhost:3001/v1/users',
            (_, res, ctx) => res(
              ctx.status(200),
              ctx.json({
                users: [{
                  ...users[i],
                  follow: true,
                }, {
                  ...users[i === 0 ? 1 : 0],
                }],
              }),
            )),
        );
      });

      it(`${user.name}をフォローしている`, async () => {
        renderComponent();

        expect(await screen.findByText('フォローする')).toBeInTheDocument();
        expect(await screen.findByText('フォロー解除')).toBeInTheDocument();
      });
    });
  });

  describe('「フォローする」ボタンでフォローできる', () => {
    users.forEach((user, i) => {
      beforeEach(() => {
        server.use(
          rest.get('http://localhost:3001/v1/users',
            (_, res, ctx) => res(
              ctx.status(200),
              ctx.json({
                users: [{
                  ...users[i],
                  follow: true,
                }, {
                  ...users[i === 0 ? 1 : 0],
                }],
              }),
            )),
        );
      });

      it(`${user.name}`, async () => {
        renderComponent();

        const folloBt = await screen.findByText('フォローする');
        userEvent.click(folloBt);
        expect(await screen.findByText('フォローする')).toBeInTheDocument();
        expect(await screen.findByText('フォロー解除')).toBeInTheDocument();
      });
    });
  });

  describe('「フォロー解除」ボタンで解除できる', () => {
    users.forEach((user, i) => {
      beforeEach(() => {
        server.use(
          rest.get('http://localhost:3001/v1/users',
            (_, res, ctx) => res(
              ctx.status(200),
              ctx.json({
                users: [{
                  ...users[i],
                  follow: true,
                }, {
                  ...users[i === 0 ? 1 : 0],
                }],
              }),
            )),
        );
      });

      it(`${user.name}`, async () => {
        renderComponent();

        const folloBt = await screen.findByText('フォロー解除');
        userEvent.click(folloBt);
        expect(await screen.findByText('フォローする')).toBeInTheDocument();
        expect(await screen.findByText('フォロー解除')).toBeInTheDocument();
      });
    });
  });

  describe('Fetch failure', () => {
    it('エラーメッセージが表示される', async () => {
      server.use(
        rest.get('http://localhost:3001/v1/users',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              error: '失敗しました。',
            }),
          )),
      );

      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <UserList />
        </Provider>,
      );

      expect(await screen.findByText(/失敗しました。/i)).toBeInTheDocument();
    });
  });

  describe('Post failure', () => {
    it('エラーメッセージが表示される', async () => {
      server.use(
        rest.get('http://localhost:3001/v1/users',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              users: [{
                ...users[0],
                follow: true,
              }, {
                ...users[1],
              }],
            }),
          )),
        rest.post('http://localhost:3001/v1/users/follows',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              error: '失敗しました。',
            }),
          )),
      );

      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <UserList />
        </Provider>,
      );

      const folloBt = await screen.findByText('フォローする');
      userEvent.click(folloBt);

      expect(await screen.findByText(/失敗しました。/i)).toBeInTheDocument();
    });
  });

  describe('Delete failure', () => {
    it('エラーメッセージが表示される', async () => {
      server.use(
        rest.get('http://localhost:3001/v1/users',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              users: [{
                ...users[0],
                follow: true,
              }, {
                ...users[1],
              }],
            }),
          )),
        rest.delete('http://localhost:3001/v1/users/follows',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              error: '失敗しました。',
            }),
          )),
      );

      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <UserList />
        </Provider>,
      );

      const folloBt = await screen.findByText('フォロー解除');
      userEvent.click(folloBt);

      expect(await screen.findByText(/失敗しました。/i)).toBeInTheDocument();
    });
  });
});
