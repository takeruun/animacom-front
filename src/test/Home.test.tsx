import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { postModule, PostType } from 'modules/postModule';
import Home from 'components/pages/home';

const latest: Array<PostType> = [{
  id: "1",
  title: "latest_title",
  subTitle: "latest_sub_title",
  body: "latest_body",
  categoryId: "1",
  images: [],
  cuteCount: 0,
  favCount: 0,
  goodCount: 0,
  coolCount: 0,
}];
const dayAgo: Array<PostType> = [{
  id: "2",
  title: "day_ago_title",
  subTitle: "day_ago_sub_title",
  body: "day_ago_body",
  categoryId: "1",
  images: [],
  cuteCount: 0,
  favCount: 0,
  goodCount: 0,
  coolCount: 0,
}];
const cute5: Array<PostType> = [{
  id: "3",
  title: "cute5_title",
  subTitle: "cute5_sub_title",
  body: "cute5_body",
  categoryId: "1",
  images: [],
  cuteCount: 0,
  favCount: 0,
  goodCount: 0,
  coolCount: 0,
}];
const fav5: Array<PostType> = [{
  id: "4",
  title: "fav5_title",
  subTitle: "fav5_sub_title",
  body: "fav5_body",
  categoryId: "1",
  images: [],
  cuteCount: 0,
  favCount: 0,
  goodCount: 0,
  coolCount: 0,
}];
const good5: Array<PostType> = [{
  id: "5",
  title: "good5_title",
  subTitle: "good5_sub_title",
  body: "good5_body",
  categoryId: "1",
  images: [],
  cuteCount: 0,
  favCount: 0,
  goodCount: 0,
  coolCount: 0,
}];
const cool5: Array<PostType> = [{
  id: "6",
  title: "cool5_title",
  subTitle: "cool5_sub_title",
  body: "cool5_body",
  categoryId: "1",
  images: [],
  cuteCount: 0,
  favCount: 0,
  goodCount: 0,
  coolCount: 0,
}];

export const history = createBrowserHistory();

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const server = setupServer(
  rest.get('http://localhost:3001/v1/posts/latest', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      posts: latest,
    }));
  }),
  rest.get('http://localhost:3001/v1/posts/day_ago', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      posts: dayAgo,
    }));
  }),
  rest.get('http://localhost:3001/v1/posts/reactions/bests/cute', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      posts: cute5,
    }));
  }),
  rest.get('http://localhost:3001/v1/posts/reactions/bests/fav', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      posts: fav5,
    }));
  }),
  rest.get('http://localhost:3001/v1/posts/reactions/bests/good', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      posts: good5,
    }));
  }),
  rest.get('http://localhost:3001/v1/posts/reactions/bests/cool', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      posts: cool5,
    }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('renders home', () => {
  let store: any;
  const reducers = combineReducers({
    post: postModule.reducer,
    router: connectRouter(history),
  });

  beforeEach(() => {
    store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(routerMiddleware(history)),
    });
  });

  it('ホーム画面表示', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText('今日の投稿一覧')).toBeInTheDocument();
    expect(screen.getByText('昨日の投稿一覧')).toBeInTheDocument();
    expect(screen.getByText('かわいい一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('お気に入り一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('いいね一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('かっこいい一覧 best5')).toBeInTheDocument();
  });

  it('今日の投稿一覧が表示される', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(await screen.findByText('latest_title')).toBeInTheDocument();
    expect(await screen.findByText('latest_sub_title')).toBeInTheDocument();
  });

  it('昨日の投稿一覧が表示される', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(await screen.findByText('day_ago_title')).toBeInTheDocument();
    expect(await screen.findByText('day_ago_sub_title')).toBeInTheDocument();
  });

  it('かわいい一覧 best5の投稿一覧が表示される', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(await screen.findByText('cute5_title')).toBeInTheDocument();
    expect(await screen.findByText('cute5_sub_title')).toBeInTheDocument();
  });

  it('お気に入り一覧 best5の投稿一覧が表示される', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(await screen.findByText('fav5_title')).toBeInTheDocument();
    expect(await screen.findByText('fav5_sub_title')).toBeInTheDocument();
  });

  it("いいね一覧 best5の投稿一覧が表示される", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(await screen.findByText('good5_title')).toBeInTheDocument();
    expect(await screen.findByText('good5_sub_title')).toBeInTheDocument();
  });

  test("かっこいい一覧 best5の投稿一覧が表示される", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(await screen.findByText('cool5_title')).toBeInTheDocument();
    expect(await screen.findByText('cool5_sub_title')).toBeInTheDocument();
  });
});
