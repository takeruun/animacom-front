import { PostType } from "modules/postModule";
import { render, screen } from '@testing-library/react';
import { PostList } from 'components/pages/posts/index';

describe('renders posts data', () => {
  test("今日の投稿一覧が表示される", async () => {
    const fakeLatestPosts: Array<PostType> = [{
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

    render(
      <PostList path="latest" posts={fakeLatestPosts} />
    );

    expect(screen.getByText('今日の投稿一覧')).toBeInTheDocument();
    expect(screen.getByText('latest_title')).toBeInTheDocument();
    expect(screen.getByText('latest_sub_title')).toBeInTheDocument();
  });

  test("昨日の投稿一覧が表示される", async () => {
    const fakeDayAgoPosts: Array<PostType> = [{
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

    render(
      <PostList path="day_ago" posts={fakeDayAgoPosts} />
    );

    expect(screen.getByText('昨日の投稿一覧')).toBeInTheDocument();
    expect(screen.getByText('day_ago_title')).toBeInTheDocument();
    expect(screen.getByText('day_ago_sub_title')).toBeInTheDocument();
  });

  test("かわいい一覧 best5の投稿一覧が表示される", async () => {
    const cute5: Array<PostType> = [{
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

    render(
      <PostList path="reactions/bests/cute" posts={cute5} />
    );

    expect(screen.getByText('かわいい一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('cute5_title')).toBeInTheDocument();
    expect(screen.getByText('cute5_sub_title')).toBeInTheDocument();
  });

  test("お気に入り一覧 best5の投稿一覧が表示される", async () => {
    const fav5: Array<PostType> = [{
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

    render(
      <PostList path="reactions/bests/fav" posts={fav5} />
    );

    expect(screen.getByText('お気に入り一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('fav5_title')).toBeInTheDocument();
    expect(screen.getByText('fav5_sub_title')).toBeInTheDocument();
  });

  test("いいね一覧 best5の投稿一覧が表示される", async () => {
    const good5: Array<PostType> = [{
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

    render(
      <PostList path="reactions/bests/good" posts={good5} />
    );

    expect(screen.getByText('いいね一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('good5_title')).toBeInTheDocument();
    expect(screen.getByText('good5_sub_title')).toBeInTheDocument();
  });

  test("かっこいい一覧 best5の投稿一覧が表示される", async () => {
    const cool5: Array<PostType> = [{
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

    render(
      <PostList path="reactions/bests/cool" posts={cool5} />
    );

    expect(screen.getByText('かっこいい一覧 best5')).toBeInTheDocument();
    expect(screen.getByText('cool5_title')).toBeInTheDocument();
    expect(screen.getByText('cool5_sub_title')).toBeInTheDocument();
  });
});