import {
  FC, useEffect, useRef,
} from 'react';
import { RootState } from 're-ducks/store/store';
import { useSelector } from 'react-redux';
import FUserList from './FUserList';

const FollowUsers: FC = () => {
  const mountedRef = useRef(false);

  const userModule = useSelector((state: RootState) => state.user);
  const users = userModule.followings;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <FUserList users={users} />
  );
};

export default FollowUsers;
