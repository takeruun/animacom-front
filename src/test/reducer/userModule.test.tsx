import reducer, {
  getSuccessUser,
  getSuccessUsers,
  getSuccessLogout,
  updateSuccessUser,
  followSuccess,
  unfollowSuccess,
  getSuccessFollowings,
  getSuccessFollowers,
  initialState,
  UserType,
  signIn,
  signUp,
  signOut,
  fetchUser,
  updateUser,
  fetchUsers,
  followUser,
  unfollowUser,
  fetchFollowUsers,
  fetchFollowerUsers,
} from 'modules/userModule';

describe('Reducer of userModule', () => {
  const user: UserType = {
    isSignedIn: false,
    id: '1',
    name: 'name',
    nickname: 'nickname',
    followerCount: 0,
    followingCount: 3,
    petCount: 1,
    postCount: 2,
    introduction: 'introductin_1',
    image: {
      imagePath: '',
    },
  };

  const user2: UserType = {
    isSignedIn: false,
    id: '2',
    name: 'name2',
    nickname: 'nickname2',
    followerCount: 1,
    followingCount: 1,
    petCount: 1,
    postCount: 1,
    introduction: 'introductin_2',
    image: {
      imagePath: '',
    },
  };

  it('getSuccessUser', () => {
    const action = { type: getSuccessUser.type, payload: user };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(user);
  });

  it('getSuccessUsers', () => {
    const action = { type: getSuccessUsers.type, payload: [user] };
    const state = reducer(initialState, action);
    expect(state.users).toEqual([user]);
  });

  it('getSuccessLogout', () => {
    const action = {
      type: getSuccessLogout.type,
      payload: {
        isSignedIn: false,
        id: '',
        name: '',
        nickname: '',
        followerCount: 0,
        followingCount: 0,
        petCount: 0,
        postCount: 0,
        introduction: '',
        image: {
          imagePath: '',
        },
      },
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual({
      isSignedIn: false,
      id: '',
      name: '',
      nickname: '',
      followerCount: 0,
      followingCount: 0,
      petCount: 0,
      postCount: 0,
      introduction: '',
      image: {
        imagePath: '',
      },
    });
  });

  it('updateSuccessUser', () => {
    const action = { type: updateSuccessUser.type, payload: user };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(user);
  });

  it('followSuccess', () => {
    const action = { type: followSuccess.type, payload: 2 };
    const state = reducer(initialState, action);
    expect(state.user.followingCount).toEqual(2);
  });

  it('unfollowSuccess', () => {
    const action = { type: unfollowSuccess.type, payload: 1 };
    const state = reducer(initialState, action);
    expect(state.user.followingCount).toEqual(1);
  });

  it('getSuccessFollowings', () => {
    const action = { type: getSuccessFollowings.type, payload: [user] };
    const state = reducer(initialState, action);
    expect(state.followings).toEqual([user]);
  });

  it('getSuccessFollowers', () => {
    const action = { type: getSuccessFollowers.type, payload: [user] };
    const state = reducer(initialState, action);
    expect(state.followers).toEqual([user]);
  });

  describe('extraReducer', () => {
    it('signIn', () => {
      const action = { type: signIn.fulfilled.type, payload: { ...user, isSignedIn: true } };
      const state = reducer(initialState, action);
      expect(state.user).toEqual({ ...user, isSignedIn: true });
    });

    it('signUp', () => {
      const action = { type: signUp.fulfilled.type, payload: { ...user, isSignedIn: true } };
      const state = reducer(initialState, action);
      expect(state.user).toEqual({ ...user, isSignedIn: true });
    });

    it('signOut', () => {
      const action = {
        type: signOut.fulfilled.type,
        payload: {
          isSignedIn: false,
          id: '',
          name: '',
          nickname: '',
          followerCount: 0,
          followingCount: 0,
          petCount: 0,
          postCount: 0,
          introduction: '',
          image: {
            imagePath: '',
          },
        },
      };

      const state = reducer(initialState, action);
      expect(state.user).toEqual({
        isSignedIn: false,
        id: '',
        name: '',
        nickname: '',
        followerCount: 0,
        followingCount: 0,
        petCount: 0,
        postCount: 0,
        introduction: '',
        image: {
          imagePath: '',
        },
      });
    });

    it('fetchUser', () => {
      const action = { type: fetchUser.fulfilled.type, payload: user };
      const state = reducer(initialState, action);
      expect(state.selectUser).toEqual(user);
    });

    it('updateUser', () => {
      const action = { type: updateUser.fulfilled.type, payload: { ...user, name: 'update' } };
      const state = reducer(initialState, action);
      expect(state.user).toEqual({ ...user, name: 'update' });
    });

    it('fetchUsers', () => {
      const action = { type: fetchUsers.fulfilled.type, payload: [user] };
      const state = reducer(initialState, action);
      expect(state.users).toEqual([user]);
    });

    it('followUser', () => {
      const action = {
        type: followUser.fulfilled.type,
        payload: {
          followingCount: 2,
          user: { ...user2, followerCount: 2 },
        },
      };
      const state = reducer({ ...initialState, user, users: [user, user2] }, action);
      expect(state.user.followingCount).toEqual(2);
      expect(state.users[1].followerCount).toEqual(2);
    });

    it('unfollowUser', () => {
      const action = {
        type: unfollowUser.fulfilled.type,
        payload: {
          followingCount: 2,
          userId: '2',
        },
      };
      const state = reducer({ ...initialState, user, users: [user, user2] }, action);
      expect(state.user.followingCount).toEqual(2);
      expect(state.users[1].followerCount).toEqual(0);
    });

    it('fetchFollowUsers', () => {
      const action = { type: fetchFollowUsers.fulfilled.type, payload: [user] };
      const state = reducer(initialState, action);
      expect(state.followings).toEqual([user]);
    });

    it('fetchFollowerUsers', () => {
      const action = { type: fetchFollowerUsers.fulfilled.type, payload: [user] };
      const state = reducer(initialState, action);
      expect(state.followers).toEqual([user]);
    });
  });
});
