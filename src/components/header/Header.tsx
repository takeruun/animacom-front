import {
  FC,
  useCallback,
  useState,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
} from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { fetchUser, signOut } from 'modules/userModule';
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
import MenuIcon from '@material-ui/icons/Menu';
import ClosableDrawer from './ClosableDrawer';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#fff',
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
    color: 'grey',
    display: 'none',
    cursor: 'pointer',
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
    color: 'grey',
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
  btn: {
    marginRight: 20,
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const userModule = useSelector((state: RootState) => state.user);
  const isSignedIn = userModule.user.isSignedIn;

  const searchKeywordInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const search = (event: KeyboardEvent<HTMLDivElement>) => {
    const keyword = searchKeywordInputRef.current?.value;
    if (event.key === 'Enter') {
      dispatch(push(`/search/${keyword}`));
    }
  };

  const handleDrawerToggle = useCallback((event: MouseEvent) => {
    if (event.type === 'keydown' && (event.metaKey || event.shiftKey)) {
      return;
    }
    setOpen(!open);
  }, [setOpen, open]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.title}
            variant="h6"
            onClick={() => dispatch(push('/'))}
          >
            AnimaCom
          </Typography>
          <Tooltip title="ユーザ一覧">
            <IconButton
              className={classes.peopleButton}
              color="default"
              aria-label="open drawer"
            >
              <PeopleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="投稿一覧">
            <IconButton
              className={classes.descriptionIcon}
              color="default"
              aria-label="open drawer"
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="カテゴリ一覧">
            <IconButton
              className={classes.descriptionIcon}
              color="default"
              aria-label="open drawer"
            >
              <CategoryIcon />
            </IconButton>
          </Tooltip>
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
              inputRef={searchKeywordInputRef}
              onKeyPress={(e) => search(e)}
            />
          </div>
          {isSignedIn ? (
            <Button
              variant="outlined"
              onClick={() => dispatch(signOut())}
              className={classes.btn}
            >
              ログアウト
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => dispatch(push('/sign_in'))}
              className={classes.btn}
            >
              ログイン
            </Button>
          )}
          <IconButton>
            <MenuIcon onClick={(e) => handleDrawerToggle(e)} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ClosableDrawer
        open={open}
        onClose={handleDrawerToggle}
      />
    </div>
  );
};

export default Header;
