import { Provider, useSelector } from 'react-redux';
import { PostType } from 'modules/postModule';
import { render, screen } from '@testing-library/react';
import Home from 'components/pages/home';
import { store } from 're-ducks/store/store';

const mockDispatch = jest.fn();
jest.mock('axios');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
  connect: () => (ReactComponent: any) => ({
    ReactComponent
  }),
  Provider: ({ children }: any) => children,
}));

describe('renders home', () => {
  const useSelectorMock = useSelector as jest.Mock;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector: any) => selector(mockStore));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  const mockStore = {
    post: {
      latest,
      dayAgo,
      cute5,
      fav5,
      good5,
      cool5,
    },
  };

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

  it('今日の投稿一覧が表示される', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText('latest_title')).toBeInTheDocument();
    expect(screen.getByText('latest_sub_title')).toBeInTheDocument();
  });

  it('昨日の投稿一覧が表示される', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText('day_ago_title')).toBeInTheDocument();
    expect(screen.getByText('day_ago_sub_title')).toBeInTheDocument();
  });

  it('かわいい一覧 best5の投稿一覧が表示される', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText('cute5_title')).toBeInTheDocument();
    expect(screen.getByText('cute5_sub_title')).toBeInTheDocument();
  });

  it('お気に入り一覧 best5の投稿一覧が表示される', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText('fav5_title')).toBeInTheDocument();
    expect(screen.getByText('fav5_sub_title')).toBeInTheDocument();
  });

  it("いいね一覧 best5の投稿一覧が表示される", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('good5_title')).toBeInTheDocument();
    expect(screen.getByText('good5_sub_title')).toBeInTheDocument();
  });

  test("かっこいい一覧 best5の投稿一覧が表示される", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('cool5_title')).toBeInTheDocument();
    expect(screen.getByText('cool5_sub_title')).toBeInTheDocument();
  });
});
