import { FC } from 'react';
import { UserType, unfollowUser, followUser } from 'modules/userModule';
import { AppDispatch } from 're-ducks/store/store';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

type PropsType = {
  users: Array<UserType>,
};

const FUserList: FC<PropsType> = (props: PropsType) => {
  const { users } = props;

  const dispatch: AppDispatch = useDispatch();

  const followButton = (userId: string, follow?: boolean) => (
    <Button
      variant="outlined"
      onClick={() => {
        if (follow) {
          dispatch(unfollowUser(userId));
        } else {
          dispatch(followUser(userId));
        }
      }}
    >
      {follow ? 'フォロー解除' : 'フォローする'}
    </Button>
  );

  return (
    <List>
      {
        users.map((user) => (
          <ListItem
            key={user.id}
          >
            <ListItemAvatar>
              <Avatar
                alt="ユーザ画像"
                src={user.image.imagePath}
              />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
            {followButton(user.id, user.follow)}
          </ListItem>
        ))
      }
    </List>
  );
};

export default FUserList;
