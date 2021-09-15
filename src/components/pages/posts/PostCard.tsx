import { FC, useState } from 'react';
import { PostType } from 're-ducks/post/types';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { destroyPost } from 'modules/postModule';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GradeIcon from '@material-ui/icons/Grade';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FlareIcon from '@material-ui/icons/Flare';
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
}));

const PostCard: FC<PostType> = (props: PostType) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const {
    id, title, subTitle, images, cuteCount, favCount, goodCount, coolCount,
  } = props;
  const postImages = images.length > 0 ? images : [{ imagePath: NoImage }];

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={postImages[0].imagePath}
        onClick={() => dispatch(push(`/posts/${id}`))}
      />
      <CardContent className={classes.content}>
        <div>
          <Typography color="textSecondary" component="p">
            {title}
          </Typography>
          <Typography className={classes.subTitle} component="p">
            {subTitle}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push(`/post/edit/${id}`));
              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem onClick={() => dispatch(destroyPost(id))}>
            削除する
          </MenuItem>
        </Menu>
        <table className="reaction-tb">
          <colgroup span={1} className="cute" />
          <colgroup span={1} className="fav" />
          <colgroup span={1} className="good" />
          <colgroup span={1} className="cool" />
          <thead>
            <tr>
              <td><FavoriteIcon fontSize="small" /></td>
              <td><GradeIcon fontSize="small" /></td>
              <td><ThumbUpAltIcon fontSize="small" /></td>
              <td><FlareIcon fontSize="small" /></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{cuteCount}</td>
              <td>{favCount}</td>
              <td>{goodCount}</td>
              <td>{coolCount}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default PostCard;
