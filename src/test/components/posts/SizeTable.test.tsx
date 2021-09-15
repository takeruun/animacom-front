import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { postModule, PostType } from 'modules/postModule';
import { snackbarModule } from 'modules/snackbarModule';
import { SizeTable } from 'components/pages/posts';
import userEvent from '@testing-library/user-event';
import CustomizedSnackbar from 'components/contents/snackbar/CustomizedSnackbar';

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const post: PostType = {
  id: '1',
  title: 'Title',
  subTitle: 'SubTitle',
  body: 'Body',
  images: [],
  categoryId: '1',
  cuteCount: 0,
  favCount: 0,
  goodCount: 0,
  coolCount: 0,
  alreadyCuted: false,
  alreadyFaved: false,
  alreadyGooded: false,
  alreadyCooled: false,
  reactions: [],
};

const server = setupServer(
  rest.post('http://localhost:3001/v1/users/posts/reactions/1',
    (_, res, ctx) => res(
      ctx.status(200),
      ctx.json({ post }),
    )),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Rendering SizeTable', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;
  const reducers = combineReducers({
    post: postModule.reducer,
    snackbar: snackbarModule.reducer,
  });

  const reactions = [
    {
      label: 'かわいい', kind: 1, color: 'rgb(231, 76, 60)',
    },
    {
      label: 'お気に入り', kind: 2, color: 'rgb(236, 240, 21)',
    },
    {
      label: 'いいね', kind: 3, color: 'rgb(8, 130, 245)',
    },
    {
      label: 'かっこいい', kind: 4, color: 'rgb(8, 245, 48)',
    },
  ];

  const renderComponent = (props = post) => render(
    <Provider store={store}>
      <SizeTable {...props} />
    </Provider>,
  );

  beforeEach(() => {
    store = configureStore({
      reducer: reducers,
    });
  });

  describe('リアクション一覧が表示される', () => {
    reactions.forEach((reaction) => {
      it(`${reaction.label}が表示される`, () => {
        renderComponent();
        expect(screen.getByText(reaction.label)).toBeInTheDocument();
      });
    });
  });

  describe('リアクションしてないとき、無カラー', () => {
    reactions.forEach((reaction, i) => {
      it(`${reaction.label}`, () => {
        renderComponent();

        const reactionBt = screen.getAllByRole('button')[i];
        expect(reactionBt).not.toHaveStyle(`color: ${reaction.color}`);
      });
    });
  });

  describe('リアクションボタン押して、リアクションできる', () => {
    reactions.forEach((reaction, i) => {
      it(`${reaction.label}`, async () => {
        server.use(
          rest.post('http://localhost:3001/v1/users/posts/reactions/1',
            (_, res, ctx) => res(
              ctx.status(200),
              ctx.json({
                ...post,
                cuteCount: 2,
                favCount: 3,
                goodCount: 4,
                coolCount: 5,
                alreadyCuted: true,
                alreadyFaved: true,
                alreadyGooded: true,
                alreadyCooled: true,
              }),
            )),
        );
        renderComponent({
          ...post,
          cuteCount: 2,
          favCount: 3,
          goodCount: 4,
          coolCount: 5,
          alreadyCuted: true,
          alreadyFaved: true,
          alreadyGooded: true,
          alreadyCooled: true,
        });
        const reactionBt = screen.getAllByRole('button')[i];
        userEvent.click(reactionBt);

        expect(await screen.findByText(2 + i)).toBeInTheDocument();
        expect(reactionBt).toHaveStyle(`color: ${reaction.color}`);
      });
    });
  });

  describe('Post failure', () => {
    it('エラーメッセージが表示される', async () => {
      server.use(
        rest.post('http://localhost:3001/v1/users/posts/reactions/1',
          (_, res, ctx) => res(
            ctx.status(200),
            ctx.json({
              error: '失敗しました。',
              msg: '既にしています。',
            }),
          )),
      );

      render(
        <Provider store={store}>
          <CustomizedSnackbar />
          <SizeTable {...post} />
        </Provider>,
      );

      const reactionBt = screen.getAllByRole('button')[0];
      userEvent.click(reactionBt);

      expect(await screen.findByText(/失敗しました。/i)).toBeInTheDocument();
      expect(await screen.findByText(/既にしています。/i)).toBeInTheDocument();
    });
  });
});
