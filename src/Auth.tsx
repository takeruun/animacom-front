import { push } from 'connected-react-router';
import { InitialState } from 're-ducks/store/initialState';
import { getIsSignedIn } from 're-ducks/users/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Auth: React.FC<any> = ({ children }) => {
  const selecter = useSelector((state: InitialState) => state);
  const isSignedIn = getIsSignedIn(selecter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(push('/sign_in'));
    }
  });

  return children;
};

export default Auth;
