import { FC } from 'react';
import { followUser, unfollowUser, UserType } from 'modules/userModule';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 're-ducks/store/store';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NoImage from '../../../assets/no_image.png';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('md')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  subTitle: {
    color: theme.palette.secondary.dark,
    fontSize: 16,
  },
  cardFotter: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'wrap',
    width: '100%',
  },
  btn: {
    marginLeft: 'auto',
  },
}));

const UserCard: FC<UserType> = (props: UserType) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const {
    id,
    nickname,
    name,
    image,
    follow,
  } = props;

  const userImage = image.imagePath?.length > 0 ? image.imagePath : NoImage;

  const followButton = () => (
    <Button
      className={classes.btn}
      variant="outlined"
      onClick={() => {
        if (follow) {
          dispatch(unfollowUser(id));
        } else {
          dispatch(followUser(id));
        }
      }}
    >
      {follow ? 'フォロー解除' : 'フォローする'}
    </Button>
  );

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={userImage}
        onClick={() => dispatch(push(`/users/${id}`))}
      />
      <CardContent className={classes.content}>
        <div className={classes.cardFotter}>
          <div>
            <Typography color="textSecondary" component="p">
              {name}
            </Typography>
            <Typography className={classes.subTitle} component="p">
              {nickname}
            </Typography>
          </div>
          {followButton()}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
