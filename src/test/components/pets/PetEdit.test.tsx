import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { snackbarModule } from 'modules/snackbarModule';
import { petModule, PetType } from 'modules/petModule';
import PetEdit from 'components/pages/pets/PetEdit';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};

const pet: PetType = {
  id: '1',
  name: 'テスト 猫',
  age: 1,
  gender: {
    id: '0',
    name: 'オス',
  },
};

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    id: '1',
  }),
}));

const server = setupServer(
  rest.get('http://localhost:3001/v1/users/pets/1', (_, res, ctx) => res(ctx.status(200), ctx.json({
    pet,
  }))),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.resetAllMocks();
  cleanup();
});
afterAll(() => server.close());

describe('Rendering of PetEdit', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;
  const reducers = combineReducers({
    pet: petModule.reducer,
    snackbar: snackbarModule.reducer,
  });

  beforeEach(() => {
    localStorage.setItem('anima', JSON.stringify(headers));
    store = configureStore({
      reducer: reducers,
    });
  });

  const renderComponent = () => render(
    <Provider store={store}>
      <PetEdit />
    </Provider>,
  );

  describe('id 有り', () => {
    it('名前が表示される', async () => {
      renderComponent();

      expect(await screen.findByText('テスト 猫')).toBeInTheDocument();
    });

    it('年齢が表示される', async () => {
      renderComponent();

      expect(await screen.findByText('1')).toBeInTheDocument();
    });

    it('性別が表示される', async () => {
      renderComponent();

      expect(await screen.findByText('オス')).toBeInTheDocument();
    });

    it('更新が表示される', async () => {
      renderComponent();

      expect(await screen.findByText('更新')).toBeInTheDocument();
    });
  });

  describe('id なし', () => {
    it('名前は空', () => {
      renderComponent();

      expect(screen.queryByText('test 猫')).toBeNull();
    });

    it('年齢は空', () => {
      renderComponent();

      expect(screen.queryByText('1')).toBeNull();
    });

    it('性別は初期値', () => {
      renderComponent();

      expect(screen.queryByText('オス')).toBeTruthy();
    });

    it('登録が表示される', async () => {
      renderComponent();

      expect(await screen.findByText('登録')).toBeInTheDocument();
    });
  });

  describe('入力できる', () => {
    it('名前', () => {
      renderComponent();

      const inputName = screen.getByPlaceholderText('名前🐾');
      userEvent.type(inputName, 'test name');

      expect(screen.getByText('test name')).toBeInTheDocument();
    });

    it('年齢', () => {
      renderComponent();

      const inputName = screen.getByPlaceholderText('年齢🐾');
      userEvent.type(inputName, '5');

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('性別', async () => {
      renderComponent();

      userEvent.click(screen.getAllByRole('button')[0]);
      userEvent.click(await screen.findByText('メス'));
      expect(screen.getAllByText('メス')[0]).toBeInTheDocument();
    });
  });

  describe('Fetch failure', () => {
    beforeEach(() => {
      server.use(
        rest.get('http://localhost:3001/v1/users/pets/1',
          (_, res, ctx) => res(ctx.status(200), ctx.json({
            error: '失敗しました。',
          }))),
      );
    });
    it('「ペット登録」は表示される', () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <PetEdit />
        </Provider>,
      );

      expect(screen.getByText('ペット登録')).toBeInTheDocument();
    });

    it('エラーメッセージが表示される', async () => {
      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <PetEdit />
        </Provider>,
      );

      expect(await screen.findByText('失敗しました。')).toBeInTheDocument();
    });
  });
});
