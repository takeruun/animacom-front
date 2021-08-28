import {
  render, screen, cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { snackbarModule } from 'modules/snackbarModule';
import SignUp from 'components/pages/sign_up/index';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';

const server = setupServer(
  rest.post('http://localhost:3001/v1/users/auth',
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

describe('Rendering SignUp', () => {
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
      <SignUp />
    </Provider>,
  );

  it('「アカウント登録」が表示される', () => {
    renderComponent();

    expect(screen.getByText('アカウント登録')).toBeInTheDocument();
  });

  it('「ユーザー名」を入力できる', () => {
    renderComponent();

    const nameInput = screen.getByPlaceholderText('ユーザー名') as HTMLInputElement;
    userEvent.type(nameInput, 'test test');

    expect(nameInput.value).toBe('test test');
  });

  it('「ニックネーム」を入力できる', () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('ニックネーム') as HTMLInputElement;
    userEvent.type(emailInput, 'test nick');

    expect(emailInput.value).toBe('test nick');
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

  it('名前未入力、「アカウント登録」ボタン押すとエラー発生する', async () => {
    render(
      <Provider store={store}>
        <CustomizedSnackbar />
        <SignUp />
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
    userEvent.type(emailInput, 'test@email.com');
    const passwordInput = screen.getByPlaceholderText('パスワード（半角英数字で6文字以上）') as HTMLInputElement;
    userEvent.type(passwordInput, '12345678');

    const button = screen.getAllByRole('button')[1];
    userEvent.click(button);

    expect(await screen.findByText('名前 or メールアドレス or パスワードが入力されていません。')).toBeInTheDocument();
  });

  it('メールアドレス未入力、「アカウント登録」ボタン押すとエラー発生する', async () => {
    render(
      <Provider store={store}>
        <CustomizedSnackbar />
        <SignUp />
      </Provider>,
    );

    const nameInput = screen.getByPlaceholderText('ユーザー名') as HTMLInputElement;
    userEvent.type(nameInput, 'test test');
    const passwordInput = screen.getByPlaceholderText('パスワード（半角英数字で6文字以上）') as HTMLInputElement;
    userEvent.type(passwordInput, '12345678');

    const button = screen.getAllByRole('button')[1];
    userEvent.click(button);

    expect(await screen.findByText('名前 or メールアドレス or パスワードが入力されていません。')).toBeInTheDocument();
  });

  it('パスワード未入力、「アカウント登録」ボタン押すとエラー発生する', async () => {
    render(
      <Provider store={store}>
        <CustomizedSnackbar />
        <SignUp />
      </Provider>,
    );

    const nameInput = screen.getByPlaceholderText('ユーザー名') as HTMLInputElement;
    userEvent.type(nameInput, 'test test');
    const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
    userEvent.type(emailInput, 'test@email.com');

    const button = screen.getAllByRole('button')[1];
    userEvent.click(button);

    expect(await screen.findByText('名前 or メールアドレス or パスワードが入力されていません。')).toBeInTheDocument();
  });

  describe('Post success', () => {
    it('「アカウント作成・ログイン」できる', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <SignUp />
        </Provider>,
      );
      const nameInput = screen.getByPlaceholderText('ユーザー名') as HTMLInputElement;
      userEvent.type(nameInput, 'test test');
      const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
      userEvent.type(emailInput, 'test@email.com');
      const passwordInput = screen.getByPlaceholderText('パスワード（半角英数字で6文字以上）') as HTMLInputElement;
      userEvent.type(passwordInput, '12345678');

      const button = screen.getAllByRole('button')[1];
      userEvent.click(button);

      expect(await screen.findByText('アカウント作成、ログインしました。')).toBeInTheDocument();
    });
  });

  describe('Post fauilre', () => {
    beforeEach(() => {
      server.use(
        rest.post('http://localhost:3001/v1/users/auth', (_, res, ctx) => res(
          ctx.status(200),
          ctx.json({
            error: 'アカウント作成失敗しました。',
            msg: 'メールアドレス重複です。',
          }),
        )),
      );
    });

    it('アカウント作成できない', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <SignUp />
        </Provider>,
      );

      const nameInput = screen.getByPlaceholderText('ユーザー名') as HTMLInputElement;
      userEvent.type(nameInput, 'test test');
      const emailInput = screen.getByPlaceholderText('メールアドレス') as HTMLInputElement;
      userEvent.type(emailInput, 'test@email.com');
      const passwordInput = screen.getByPlaceholderText('パスワード（半角英数字で6文字以上）') as HTMLInputElement;
      userEvent.type(passwordInput, '12345678');

      const button = screen.getAllByRole('button')[1];
      userEvent.click(button);

      expect(await screen.findByText(/アカウント作成失敗しました。/i)).toBeInTheDocument();
      expect(await screen.findByText(/メールアドレス重複です。/i)).toBeInTheDocument();
    });
  });
});
