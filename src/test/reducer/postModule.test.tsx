import reducer, {
  getSuccessPost,
  getSuccessSearchPosts,
  getSuccessLatestPosts,
  getSuccessDayAgoPosts,
  getSuccessCute5Posts,
  getSuccessFav5Posts,
  getSuccessGood5Posts,
  getSuccessCool5Posts,
  postSuccessReactions,
  destorySuccessReactions,
  initialState,
  PostType,
  fetchPost,
  fetchCategoryPosts,
  fetchPosts,
  postReactions,
  destroyReactions,
} from 'modules/postModule';

describe('Reducer of postModule', () => {
  const post: PostType = {
    id: "1",
    title: "title",
    subTitle: "sub_title",
    body: "body",
    categoryId: "1",
    images: [],
    cuteCount: 0,
    favCount: 0,
    goodCount: 0,
    coolCount: 0,
  }

  it('getSuccessPost', () => {
    const action = { type: getSuccessPost.type, payload: post };
    const state = reducer(initialState, action);
    expect(state.post.id).toEqual('1');
  });

  it('getSuccessSearchPosts', () => {
    const action = { type: getSuccessSearchPosts.type, payload: [post] };
    const state = reducer(initialState, action);
    expect(state.searchPosts[0].id).toEqual('1');
  });

  it('getSuccessLatestPosts', () => {
    const action = { type: getSuccessLatestPosts.type, payload: [post] };
    const state = reducer(initialState, action);
    expect(state.latest[0].id).toEqual('1');
  });

  it('getSuccessDayAgoPosts', () => {
    const action = { type: getSuccessDayAgoPosts.type, payload: [post] };
    const state = reducer(initialState, action);
    expect(state.dayAgo[0].id).toEqual('1');
  });

  it('getSuccessCute5Posts', () => {
    const action = { type: getSuccessCute5Posts.type, payload: [post] };
    const state = reducer(initialState, action);
    expect(state.cute5[0].id).toEqual('1');
  });

  it('getSuccessFav5Posts', () => {
    const action = { type: getSuccessFav5Posts.type, payload: [post] };
    const state = reducer(initialState, action);
    expect(state.fav5[0].id).toEqual('1');
  });

  it('getSuccessGood5Posts', () => {
    const action = { type: getSuccessGood5Posts.type, payload: [post] };
    const state = reducer(initialState, action);
    expect(state.good5[0].id).toEqual('1');
  });

  it('getSuccessCool5Posts', () => {
    const action = { type: getSuccessCool5Posts.type, payload: [post] };
    const state = reducer(initialState, action);
    expect(state.cool5[0].id).toEqual('1');
  });

  it('postSuccessReactions', () => {
    const action = { type: postSuccessReactions.type, payload: post };
    const state = reducer(initialState, action);
    expect(state.post.id).toEqual('1');
  });

  it('destorySuccessReactions', () => {
    const action = { type: destorySuccessReactions.type, payload: post };
    const state = reducer(initialState, action);
    expect(state.post.id).toEqual('1');
  });

  describe('extraReducer', () => {
    it('fetchPost', () => {
      const action = { type: fetchPost.fulfilled.type, payload: post }
      const state = reducer(initialState, action);
      expect(state.post.id).toEqual('1');
    });

    it('fetchCategoryPosts', () => {
      const action = { type: fetchCategoryPosts.fulfilled.type, payload: [post] }
      const state = reducer(initialState, action);
      expect(state.searchPosts[0].id).toEqual('1');
    });

    it('fetchPosts [latest]', () => {
      const action = { type: fetchPosts.fulfilled.type, payload: { posts: [post], path: 'latest' } }
      const state = reducer(initialState, action);
      expect(state.latest[0].id).toEqual('1');
    });

    it('fetchPosts [dayAgo]', () => {
      const action = { type: fetchPosts.fulfilled.type, payload: { posts: [post], path: 'day_ago' } }
      const state = reducer(initialState, action);
      expect(state.dayAgo[0].id).toEqual('1');
    });

    it('fetchPosts [reactions/bests/cute]', () => {
      const action = { type: fetchPosts.fulfilled.type, payload: { posts: [post], path: 'reactions/bests/cute' } }
      const state = reducer(initialState, action);
      expect(state.cute5[0].id).toEqual('1');
    });

    it('fetchPosts [reactions/bests/fav]', () => {
      const action = { type: fetchPosts.fulfilled.type, payload: { posts: [post], path: 'reactions/bests/fav' } }
      const state = reducer(initialState, action);
      expect(state.fav5[0].id).toEqual('1');
    });

    it('fetchPosts [reactions/bests/good]', () => {
      const action = { type: fetchPosts.fulfilled.type, payload: { posts: [post], path: 'reactions/bests/good' } }
      const state = reducer(initialState, action);
      expect(state.good5[0].id).toEqual('1');
    });

    it('fetchPosts [reactions/bests/cool]', () => {
      const action = { type: fetchPosts.fulfilled.type, payload: { posts: [post], path: 'reactions/bests/cool' } }
      const state = reducer(initialState, action);
      expect(state.cool5[0].id).toEqual('1');
    });

    it('postReactions', () => {
      const action = { type: postReactions.fulfilled.type, payload: post }
      const state = reducer(initialState, action);
      expect(state.post.id).toEqual('1');
    });

    it('destroyReactions', () => {
      const action = { type: destroyReactions.fulfilled.type, payload: post }
      const state = reducer(initialState, action);
      expect(state.post.id).toEqual('1');
    });
  });
});
