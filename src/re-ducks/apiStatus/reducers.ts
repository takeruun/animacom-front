import initialState from 're-ducks/store/initialState';
import {
  START_FETCH, END_FETCH,
} from './actions';
import { ActionsType, ApiStatusState } from './types';

const ApiStatusReducer = (
  state: ApiStatusState = initialState.apiStatus, action: ActionsType,
): ApiStatusState => {
  switch (action.type) {
    case START_FETCH:
      return {
        ...state,
        loading: true,
      };
    case END_FETCH:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default ApiStatusReducer;
