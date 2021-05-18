import initialState from 're-ducks/store/initialState';
import {
  SIGN_UP, ActionsType,
} from 're-ducks/users/actions';

import { UserState } from './types';

const UsersReducer = (state: UserState = initialState.users, action: ActionsType): UserState => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default UsersReducer;
