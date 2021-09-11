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
import Router from 'react-router-dom';

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
  rest.get('http://localhost:3001/v1/users/pets/1',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        pet,
      }),
    )),
  rest.post('http://localhost:3001/v1/users/pets',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        ...pet,
        name: 'test name',
        age: 5,
        gender: {
          id: '1',
          name: 'メス',
        },
      }),
    )),
  rest.put('http://localhost:3001/v1/users/pets/1',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        ...pet,
        name: 'test name',
        age: 5,
        gender: {
          id: '1',
          name: 'メス',
        },
      }),
    )),
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
      <CustomizedSnackbar />
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

  describe('入力できる', () => {
    it('名前', () => {
      renderComponent();

      const inputName = screen.getByPlaceholderText('名前🐾');
      userEvent.type(inputName, 'test name');

      expect(screen.getByText('test name')).toBeInTheDocument();
    });

    it('年齢', () => {
      renderComponent();

      const inputAge = screen.getByPlaceholderText('年齢🐾');
      userEvent.type(inputAge, '5');

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('性別', async () => {
      renderComponent();

      userEvent.click(screen.getAllByRole('button')[0]);
      userEvent.click(await screen.findByText('メス'));
      expect(screen.getAllByText('メス')[0]).toBeInTheDocument();
    });
  });

  describe('id なし', () => {
    beforeEach(() => jest.spyOn(Router, 'useParams').mockReturnValue({ }));

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

  describe('Fetch failure', () => {
    beforeEach(() => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
      server.use(
        rest.get('http://localhost:3001/v1/users/pets/1',
          (_, res, ctx) => res(ctx.status(200), ctx.json({
            error: '失敗しました。',
          }))),
      );
    });
    it('「ペット登録」は表示される', () => {
      renderComponent();

      expect(screen.getByText('ペット登録')).toBeInTheDocument();
    });

    it('エラーメッセージが表示される', async () => {
      renderComponent();

      expect(await screen.findByText('失敗しました。')).toBeInTheDocument();
    });
  });

  describe('Post', () => {
    beforeEach(() => jest.spyOn(Router, 'useParams').mockReturnValue({ }));

    it('Success', async () => {
      renderComponent();

      const inputName = screen.getByPlaceholderText('名前🐾');
      userEvent.type(inputName, 'test name');

      const inputAge = screen.getByPlaceholderText('年齢🐾');
      userEvent.type(inputAge, '5');

      userEvent.click(screen.getAllByRole('button')[0]);
      userEvent.click(await screen.findByText('メス'));

      const postBt = screen.getByText('登録');
      userEvent.click(postBt);

      expect(await screen.findByText('ペット登録しました。')).toBeInTheDocument();
    });

    it('Failure', async () => {
      server.use(
        rest.post('http://localhost:3001/v1/users/pets',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              error: '失敗しました。',
            }),
          )),
      );
      renderComponent();

      const inputName = screen.getByPlaceholderText('名前🐾');
      userEvent.type(inputName, 'test name');

      const inputAge = screen.getByPlaceholderText('年齢🐾');
      userEvent.type(inputAge, '5');

      userEvent.click(screen.getAllByRole('button')[0]);
      userEvent.click(await screen.findByText('メス'));

      const postBt = screen.getByText('登録');
      userEvent.click(postBt);

      expect(await screen.findByText('失敗しました。')).toBeInTheDocument();
    });
  });

  describe('Put', () => {
    beforeEach(() => jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' }));

    it('Success', async () => {
      renderComponent();

      const inputName = screen.getByPlaceholderText('名前🐾');
      userEvent.type(inputName, 'test name');

      const inputAge = screen.getByPlaceholderText('年齢🐾');
      userEvent.type(inputAge, '5');

      userEvent.click(screen.getAllByRole('button')[0]);
      userEvent.click(await screen.findByText('メス'));

      const postBt = screen.getByText('更新');
      userEvent.click(postBt);

      expect(await screen.findByText('ペット更新しました。')).toBeInTheDocument();
    });

    it('Failure', async () => {
      server.use(
        rest.put('http://localhost:3001/v1/users/pets/1',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              error: '失敗しました。',
            }),
          )),
      );
      renderComponent();

      const inputName = screen.getByPlaceholderText('名前🐾');
      userEvent.type(inputName, 'test name');

      const inputAge = screen.getByPlaceholderText('年齢🐾');
      userEvent.type(inputAge, '5');

      userEvent.click(screen.getAllByRole('button')[0]);
      userEvent.click(await screen.findByText('メス'));

      const postBt = screen.getByText('更新');
      userEvent.click(postBt);

      expect(await screen.findByText('失敗しました。')).toBeInTheDocument();
    });
  });
});
