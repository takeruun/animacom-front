import { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {
  createStyles, fade, Theme, makeStyles,
} from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import CategoryIcon from '@material-ui/icons/Category';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    marginLeft: 150,
    marginRight: 150,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  peopleButton: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  descriptionIcon: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  categoryIcon: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  signButton: {
    marginRight: 20,
  },
}));

const Header: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Tooltip title="ユーザ一覧">
            <IconButton
              className={classes.peopleButton}
              color="inherit"
              aria-label="open drawer"
            >
              <PeopleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="投稿一覧">
            <IconButton
              className={classes.descriptionIcon}
              color="inherit"
              aria-label="open drawer"
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="カテゴリ一覧">
            <IconButton
              className={classes.descriptionIcon}
              color="inherit"
              aria-label="open drawer"
            >
              <CategoryIcon />
            </IconButton>
          </Tooltip>
          <Typography className={classes.title} variant="h6" noWrap>
            AnimaCom
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.signButton}>
            <Button variant="contained" color="secondary">新規登録</Button>
            <Button variant="outlined">ログイン</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
