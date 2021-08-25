import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { postModule, PostType } from "modules/postModule";
import PostList from 'components/pages/posts/PostList';

export const history = createBrowserHistory();

const headers = {
  accessToken: 'accessToken',
  client: 'client',
  expiry: 'expiry',
  uid: 'uid',
};
localStorage.setItem('anima', JSON.stringify(headers));

const server = setupServer(
  rest.get('http://localhost:3001/v1/posts', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({
      posts: [{}]
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('renders posts data', () => {
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

  it("今日の投稿一覧が表示される", async () => {
    const posts: Array<PostType> = [{
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

    server.use(
      rest.get('http://localhost:3001/v1/posts/latest', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({
          posts,
        }));
      }),
    );

    render(
      <Provider store={store}>
        <PostList path="latest" posts={posts} />
      </Provider>
    );

    expect(screen.getByText('今日の投稿一覧')).toBeInTheDocument();
    expect(screen.getByText('latest_title')).toBeInTheDocument();
    expect(screen.getByText('latest_sub_title')).toBeInTheDocument();
  });

  it("昨日の投稿一覧が表示される", async () => {
    const posts: Array<PostType> = [{
      id: "1",
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

    server.use(
      rest.get('http://localhost:3001/v1/posts/latest', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({
          posts,
        }));
      }),
    );

    render(
      <Provider store={store}>
        <PostList path="day_ago" posts={posts} />
      </Provider>
    );

    expect(screen.getByText('昨日の投稿一覧')).toBeInTheDocument();
    expect(screen.getByText('day_ago_title')).toBeInTheDocument();
    expect(screen.getByText('day_ago_sub_title')).toBeInTheDocument();
  });

  it("かわいい一覧 best5の投稿一覧が表示される", async () => {
    const posts: Array<PostType> = [{
      id: "1",
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

    server.use(
      rest.get('http://localhost:3001/v1/posts/latest', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({
          posts,
        }));
      }),
    );

    render(
      <Provider store={store}>
        <PostList path="reactions/bests/cute" posts={posts} />
      </Provider>
    );

    expect(screen.getByText('かわいい一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('cute5_title')).toBeInTheDocument();
    expect(screen.getByText('cute5_sub_title')).toBeInTheDocument();
  });

  it("お気に入り一覧 best5の投稿一覧が表示される", async () => {
    const posts: Array<PostType> = [{
      id: "1",
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

    server.use(
      rest.get('http://localhost:3001/v1/posts/latest', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({
          posts,
        }));
      }),
    );

    render(
      <Provider store={store}>
        <PostList path="reactions/bests/fav" posts={posts} />
      </Provider>
    );

    expect(screen.getByText('お気に入り一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('fav5_title')).toBeInTheDocument();
    expect(screen.getByText('fav5_sub_title')).toBeInTheDocument();
  });

  it("いいね一覧 best5の投稿一覧が表示される", async () => {
    const posts: Array<PostType> = [{
      id: "1",
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

    server.use(
      rest.get('http://localhost:3001/v1/posts/latest', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({
          posts,
        }));
      }),
    );

    render(
      <Provider store={store}>
        <PostList path="reactions/bests/good" posts={posts} />
      </Provider>
    );

    expect(screen.getByText('いいね一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('good5_title')).toBeInTheDocument();
    expect(screen.getByText('good5_sub_title')).toBeInTheDocument();
  });

  it("かっこいい一覧 best5の投稿一覧が表示される", async () => {
    const posts: Array<PostType> = [{
      id: "1",
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

    server.use(
      rest.get('http://localhost:3001/v1/posts/latest', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({
          posts,
        }));
      }),
    );

    render(
      <Provider store={store}>
        <PostList path="reactions/bests/cool" posts={posts} />
      </Provider>
    );

    expect(screen.getByText('かっこいい一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('cool5_title')).toBeInTheDocument();
    expect(screen.getByText('cool5_sub_title')).toBeInTheDocument();
  });
});