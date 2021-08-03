import {
  FC, useCallback, useState, MouseEvent, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { RootState } from 're-ducks/store/store';
import { signOut } from 're-ducks/users/operations';
import { fetchRootCategories } from 'modules/categoryModule';
import { fetchUserReactionCounts } from 'modules/reactionCountsModule';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { InputText } from 'components/UIKit/index';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GradeIcon from '@material-ui/icons/Grade';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FlareIcon from '@material-ui/icons/Flare';
import { Badge } from '@material-ui/core';

type PropsType = {
  open: boolean,
  onClose: (event: any) => void,
}

const useStyles = makeStyles((theme) => createStyles({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 256,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
  listTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: '20px',
  },
}));

const ClosableDrawer: FC<PropsType> = (props: PropsType) => {
  const classes = useStyles();
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const reactionCounts = useSelector((state: RootState) => state.reactionCounts);
  const categoryModule = useSelector((state: RootState) => state.category);
  const rootCategories = categoryModule.rootCategories;

  const [searchKeyword, setSearchKeyword] = useState('');

  const inputSearchKeyword = useCallback((event) => {
    setSearchKeyword(event.target.value);
  }, [setSearchKeyword]);

  const selectMenu = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, path: string) => {
    dispatch(push(path));
    onClose(event);
  };

  const menus = [
    {
      func: selectMenu, label: '投稿登録', icon: <AddCircleIcon />, id: 'register', value: '/post/edit',
    },
    {
      func: selectMenu, label: 'プロフィール', icon: <PersonIcon />, id: 'profile', value: '/mypage',
    },
  ];

  const reactionMenus = [
    {
      func: selectMenu, label: 'かわいい', icon: <FavoriteIcon />, id: 'show_cute', value: '/posts/reaction/cute', count: reactionCounts.cuteCount,
    },
    {
      func: selectMenu, label: 'お気に入り', icon: <GradeIcon />, id: 'show_fav', value: '/posts/reaction/fav', count: reactionCounts.favCount,
    },
    {
      func: selectMenu, label: 'いいね', icon: <ThumbUpAltIcon />, id: 'show_good', value: '/posts/reaction/good', count: reactionCounts.goodCount,
    },
    {
      func: selectMenu, label: 'かっこいい', icon: <FlareIcon />, id: 'show_cool', value: '/posts/reaction/cool', count: reactionCounts.coolCount,
    },
  ];

  useEffect(() => {
    dispatch(fetchUserReactionCounts());
    dispatch(fetchRootCategories());
  }, [dispatch]);

  return (
    <nav className={classes.drawer}>
      <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={(e) => onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <div className={classes.searchField}>
            <InputText
              fullWidth={false}
              label="キーワードを入力"
              multiline={false}
              input={inputSearchKeyword}
              required={false}
              rows={1}
              value={searchKeyword}
              type="text"
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem
              button
              key="logout"
              onClick={() => dispatch(signOut())}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
        <Divider />
        <div className={classes.listTitle}>本日のリアクション</div>
        <List>
          {reactionMenus.map((menu) => (
            <ListItem
              button
              key={menu.id}
              onClick={(e) => menu.func(e, menu.value)}
            >
              <ListItemIcon>
                <Badge badgeContent={menu.count} color="secondary">
                  {menu.icon}
                </Badge>
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <div className={classes.listTitle}>カテゴリ一覧</div>
        <List>
          {
            rootCategories.map((category) => (
              <ListItem
                button
                key={category.id}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
