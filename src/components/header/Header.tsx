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
import useQuery from 'hook/useQuery';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 're-ducks/store/store';
import { fetchMyUser } from 'modules/userModule';
import { updateWord } from 'modules/searchModule';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import CategoryIcon from '@material-ui/icons/Category';
import MenuIcon from '@material-ui/icons/Menu';
import ClosableDrawer from './ClosableDrawer';

const Header: FC = () => {
  const query = useQuery();
  const dispatch: AppDispatch = useDispatch();
  const searchKeywordInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMyUser());
  }, [dispatch]);

  const search = (event: KeyboardEvent<HTMLDivElement>) => {
    const keyword = searchKeywordInputRef.current?.value;

    if (event.key === 'Enter') {
      dispatch(updateWord(keyword));
      dispatch(push(`/search?word=${keyword}`));
    }
  };

  useEffect(() => {
    const setWord = query.get('word') || '';
    dispatch(updateWord(setWord));
    if (searchKeywordInputRef.current) {
      searchKeywordInputRef.current.value = setWord;
    }
  }, [dispatch, query]);

  const handleDrawerToggle = useCallback((event: MouseEvent) => {
    if (event.type === 'keydown' && (event.metaKey || event.shiftKey)) {
      return;
    }
    setOpen(!open);
  }, [setOpen, open]);

  return (
    <>
      <header className="w-full h-14">
        <div className="mx-auto w-5/6 flex justify-end">
          <div className="mr-auto my-auto" tabIndex={0} role="button" onKeyUp={() => dispatch(push('/'))} onClick={() => dispatch(push('/'))}>AnimaCom</div>
          <nav>
            <ul className="flex">
              <li>
                <Tooltip
                  title="ユーザ一覧"
                  onClick={() => dispatch(push('/users'))}
                >
                  <IconButton
                    className="px-1.5"
                    color="default"
                    aria-label="open drawer"
                  >
                    <PeopleIcon />
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="投稿一覧">
                  <IconButton
                    className="px-1.5"
                    color="default"
                    aria-label="open drawer"
                  >
                    <DescriptionIcon />
                  </IconButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="カテゴリ一覧">
                  <IconButton
                    className="px-1.5"
                    color="default"
                    aria-label="open drawer"
                  >
                    <CategoryIcon />
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </nav>
          <div className="relative text-gray-500">
            <div className="absolute flex items-center h-full pointer-events-none z-10">
              <SearchIcon />
            </div>
            <input
              placeholder="Search…"
              type="text"
              className="w-24 pl-8 h-full outline-none focus:w-full transition-[width] transform duration-300 delay-300"
              ref={searchKeywordInputRef}
              onKeyPress={(e) => search(e)}
            />
          </div>
          <IconButton
            onClick={(e) => handleDrawerToggle(e)}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </header>
      <ClosableDrawer
        open={open}
        onClose={handleDrawerToggle}
      />
    </>
  );
};

export default Header;
