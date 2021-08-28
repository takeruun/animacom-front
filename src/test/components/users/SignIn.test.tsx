import {
  render, screen, cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { snackbarModule } from 'modules/snackbarModule';
import SignIn from 'components/pages/sign_in/index';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';

const server = setupServer(
  rest.post('http://localhost:3001/v1/users/auth/sign_in',
    (_, res, ctx) => res(
      ctx.set({
        'access-token': 'test',
        client: 'test',
        expiry: '20210101',
        uid: 'test',
      }),
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
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Rendering SignIn', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;
  const reducers = combineReducers({
    snackbar: snackbarModule.reducer,
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducers,
    });
  });

  const renderComponent = () => render(
    <Provider store={store}>
      <SignIn />
    </Provider>,
  );

  it('「ログイン」が表示される', () => {
    renderComponent();

    expect(screen.getAllByText('ログイン')[0]).toBeInTheDocument();
  });

  it('「メールアドレス」を入力できる', () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
    userEvent.type(emailInput, 'test@email.com');

    expect(emailInput.value).toBe('test@email.com');
  });

  it('「パスワード」を入力できる', () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText('パスワード（半角英数字で6文字以上）') as HTMLInputElement;
    userEvent.type(passwordInput, '12345678');

    expect(passwordInput.value).toBe('12345678');
  });

  it('「ログイン」ボタンが表示される', () => {
    renderComponent();

    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('メールアドレス未入力、「ログイン」ボタン押すとエラー発生する', async () => {
    render(
      <Provider store={store}>
        <CustomizedSnackbar />
        <SignIn />
      </Provider>,
    );

    const passwordInput = screen.getByPlaceholderText('パスワード（半角英数字で6文字以上）') as HTMLInputElement;
    userEvent.type(passwordInput, '12345678');

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(await screen.findByText('メールアドレス or パスワードが入力されていません。')).toBeInTheDocument();
  });

  it('パスワード未入力、「ログイン」ボタン押すとエラー発生する', async () => {
    render(
      <Provider store={store}>
        <CustomizedSnackbar />
        <SignIn />
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
    userEvent.type(emailInput, 'test@email.com');

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(await screen.findByText('メールアドレス or パスワードが入力されていません。')).toBeInTheDocument();
  });

  describe('Post success', () => {
    it('「ログイン」できる', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <SignIn />
        </Provider>,
      );

      const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
      userEvent.type(emailInput, 'test@email.com');
      const passwordInput = screen.getByPlaceholderText('パスワード（半角英数字で6文字以上）') as HTMLInputElement;
      userEvent.type(passwordInput, '12345678');

      const button = screen.getByRole('button');
      userEvent.click(button);

      expect(await screen.findByText('ログインしました。')).toBeInTheDocument();
    });
  });

  describe('Post failure', () => {
    beforeEach(() => {
      server.use(
        rest.post('http://localhost:3001/v1/users/auth/sign_in', (_, res, ctx) => res(
          ctx.status(200),
          ctx.json({
            error: 'ログイン失敗しました。',
            msg: 'パスワードが違います。',
          }),
        )),
      );
    });
    it('「ログイン」できない', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <SignIn />
        </Provider>,
      );

      const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
      userEvent.type(emailInput, 'test@email.com');
      const passwordInput = screen.getByPlaceholderText('パスワード（半角英数字で6文字以上）') as HTMLInputElement;
      userEvent.type(passwordInput, '12345678');

      const button = screen.getByRole('button');
      userEvent.click(button);

      expect(await screen.findByText(/ログイン失敗しました。/i)).toBeInTheDocument();
      expect(await screen.findByText(/パスワードが違います。/i)).toBeInTheDocument();
    });
  });
});
