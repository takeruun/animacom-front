import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userModule } from 'modules/userModule';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import MyPageEdit from 'components/pages/users/MyPageEdit';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';
import { snackbarModule } from 'modules/snackbarModule';
import userEvent from '@testing-library/user-event';

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const server = setupServer(
  rest.get('http://localhost:3001/v1/users/my_page',
    (_, res, ctx) => res(ctx.status(200), ctx.json({
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
    }))),
  rest.put('http://localhost:3001/v1/users',
    (_, res, ctx) => res(ctx.status(200), ctx.json({
      user: {
        id: '1',
        name: 'NAME_UP',
        nickname: 'NICKNAME_UP',
        followerCount: 2,
        followingCount: 3,
        image: {
          imagePath: 'http://localhost:4566/anima/uploads/user/image/1/f2df4009-5b88-4a1b-9514-ddb09f2ce6af.png',
        },
      },
    }))),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Rendering MyPageEdit', () => {
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

  it('「ユーザー名」を入力できる', () => {
    render(
      <Provider store={store}>
        <MyPageEdit />
      </Provider>,
    );

    const nameInput = screen.getByPlaceholderText('ユーザー名') as HTMLInputElement;
    userEvent.type(nameInput, 'test test');

    expect(nameInput.value).toBe('test test');
  });

  it('「ニックネーム」を入力できる', () => {
    render(
      <Provider store={store}>
        <MyPageEdit />
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('ニックネーム') as HTMLInputElement;
    userEvent.type(emailInput, 'test nick');

    expect(emailInput.value).toBe('test nick');
  });

  describe('Fetch success', () => {
    it('「マイページ編集」が表示される', () => {
      render(
        <Provider store={store}>
          <MyPageEdit />
        </Provider>,
      );

      expect(screen.getByText('マイページ編集')).toBeInTheDocument();
    });

    it('ユーザの「名前」が表示されている', async () => {
      render(
        <Provider store={store}>
          <MyPageEdit />
        </Provider>,
      );

      expect(screen.queryByText(/NAME/)).toBeNull();
      expect(await screen.findByText('NAME')).toBeInTheDocument();
    });

    it('ユーザの「ニックネーム」が表示されている', async () => {
      render(
        <Provider store={store}>
          <MyPageEdit />
        </Provider>,
      );

      expect(screen.queryByText(/NICKNAME/)).toBeNull();
      expect(await screen.findByText('NICKNAME')).toBeInTheDocument();
    });

    it('ユーザの「ユーザ画像（alt）」が表示されている', async () => {
      render(
        <Provider store={store}>
          <MyPageEdit />
        </Provider>,
      );

      expect(screen.queryByText(/ユーザ画像/)).toBeNull();
      expect(await screen.findByAltText('ユーザ画像')).toBeInTheDocument();
    });
  });

  describe('Fetch failuer', () => {
    beforeEach(() => {
      server.use(
        rest.get('http://localhost:3001/v1/users/my_page',
          (_, res, ctx) => res(ctx.status(200), ctx.json({ error: '失敗しました。' }))),
      );
    });

    it('「マイページ編集」は表示される', () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <MyPageEdit />
        </Provider>,
      );

      expect(screen.getByText('マイページ編集')).toBeInTheDocument();
    });

    it('エラーメッセージが表示される', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <MyPageEdit />
        </Provider>,
      );
      expect(await screen.findByText('失敗しました。')).toBeInTheDocument();
    });
  });

  describe('Put success', () => {
    it('成功メッセージが表示される', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <MyPageEdit />
        </Provider>,
      );

      const button = screen.getAllByRole('button')[1];
      userEvent.click(button);

      expect(await screen.findByText('更新成功しました。')).toBeInTheDocument();
    });
  });

  describe('Put failuer', () => {
    beforeEach(() => {
      server.use(
        rest.put('http://localhost:3001/v1/users',
          (_, res, ctx) => res(ctx.status(200), ctx.json({ error: '失敗しました。' }))),
      );
    });
    it('エラーメッセージが表示される', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <MyPageEdit />
        </Provider>,
      );

      const button = screen.getAllByRole('button')[1];
      userEvent.click(button);

      expect(await screen.findByText('失敗しました。')).toBeInTheDocument();
    });
  });
});
