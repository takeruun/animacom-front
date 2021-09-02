import reducer, {
  getSuccessUser,
  getSuccessUsers,
  getSuccessLogout,
  updateSuccessUser,
  followSuccess,
  unfollowSuccess,
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
} from 'modules/userModule';

describe('Reducer of userModule', () => {
  const user: UserType = {
    isSignedIn: false,
    id: '1',
    name: 'name',
    nickname: 'nickname',
    followerCount: 0,
    followingCount: 3,
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
        image: {
          imagePath: '',
        },
      });
    });

    it('fetchUser', () => {
      const action = { type: fetchUser.fulfilled.type, payload: user };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(user);
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
  });
});
