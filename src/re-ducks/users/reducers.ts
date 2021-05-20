import initialState from 're-ducks/store/initialState';
import {
  SIGN_UP, SIGN_IN,
} from 're-ducks/users/actions';
import { ActionsType, UserState } from './types';

const UsersReducer = (state: UserState = initialState.users, action: ActionsType): UserState => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default UsersReducer;
