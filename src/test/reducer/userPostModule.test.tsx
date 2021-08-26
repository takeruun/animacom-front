import { PostType } from 'modules/postModule';
import reducer, {
  getSuccessCutePosts,
  getSuccessFavPosts,
  getSuccessGoodPosts,
  getSuccessCoolPosts,
  initialState,
  fetchUserReactionPosts,
} from 'modules/userPostModule';

describe('Reducer of userPostModule', () => {
  const posts: Array<PostType> = [{
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
  }];

  it('getSuccessCutePosts', () => {
    const action = { type: getSuccessCutePosts.type, payload: posts };
    const state = reducer(initialState, action);
    expect(state.cutePosts).toEqual(posts);
  });

  it('getSuccessFavPosts', () => {
    const action = { type: getSuccessFavPosts.type, payload: posts };
    const state = reducer(initialState, action);
    expect(state.favPosts).toEqual(posts);
  });

  it('getSuccessGoodPosts', () => {
    const action = { type: getSuccessGoodPosts.type, payload: posts };
    const state = reducer(initialState, action);
    expect(state.goodPosts).toEqual(posts);
  });

  it('getSuccessCoolPosts', () => {
    const action = { type: getSuccessCoolPosts.type, payload: posts };
    const state = reducer(initialState, action);
    expect(state.coolPosts).toEqual(posts);
  });

  describe('extraReducer', () => {
    it('fetchUserReactionPosts [kind = cute]', () => {
      const action = {
        type: fetchUserReactionPosts.fulfilled.type,
        payload: {
          kind: 'cute',
          posts,
        },
      };
      const state = reducer(initialState, action);
      expect(state.cutePosts).toEqual(posts);
    });

    it('fetchUserReactionPosts [kind = fav]', () => {
      const action = {
        type: fetchUserReactionPosts.fulfilled.type,
        payload: {
          kind: 'fav',
          posts,
        },
      };
      const state = reducer(initialState, action);
      expect(state.favPosts).toEqual(posts);
    });

    it('fetchUserReactionPosts [kind = good]', () => {
      const action = {
        type: fetchUserReactionPosts.fulfilled.type,
        payload: {
          kind: 'good',
          posts,
        },
      };
      const state = reducer(initialState, action);
      expect(state.goodPosts).toEqual(posts);
    });

    it('fetchUserReactionPosts [kind = cool]', () => {
      const action = {
        type: fetchUserReactionPosts.fulfilled.type,
        payload: {
          kind: 'cool',
          posts,
        },
      };
      const state = reducer(initialState, action);
      expect(state.coolPosts).toEqual(posts);
    });
  });
});