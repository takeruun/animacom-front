import { push } from 'connected-react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Auth: React.FC<any> = ({ children }) => {
  const dispatch = useDispatch();
  const auth = localStorage.getItem('anima');

  useEffect(() => {
    if (!auth || JSON.parse(auth)?.accessToken?.length < 0) {
      dispatch(push('/sign_in'));
    }
  });

  return children;
};

export default Auth;
