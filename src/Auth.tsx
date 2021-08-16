import { push } from 'connected-react-router';
import { AppDispatch } from 're-ducks/store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Auth: React.FC<any> = ({ children }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = localStorage.getItem('anima');

  useEffect(() => {
    if (!auth || JSON.parse(auth)?.accessToken?.length < 0) {
      dispatch(push('/sign_in'));
    }
  });

  return children;
};

export default Auth;
