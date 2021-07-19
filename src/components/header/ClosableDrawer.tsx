import {
  FC, useCallback, useState, MouseEvent,
} from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
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
}));

const ClosableDrawer: FC<PropsType> = (props: PropsType) => {
  const classes = useStyles();
  const { open, onClose } = props;
  const dispatch = useDispatch();

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
            <ListItem button key="logout">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
