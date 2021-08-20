import { FC, useEffect } from 'react';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from 'modules/userModule';
import UserCard from './UserCard';

const UserList: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userModule = useSelector((state: RootState) => state.user);
  const users = userModule.users;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="users-list">
      <section className="c-section-wrapin">
        <div className="p-grid__row">
          {
            users.map((user) => (
              <UserCard
                key={user.id}
                {...user}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default UserList;
