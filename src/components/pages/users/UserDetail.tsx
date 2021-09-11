import {
  FC,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from 'react';
import { AppDispatch } from 're-ducks/store/store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchUser, fetchFollowUsers, fetchFollowerUsers, UserType,
} from 'modules/userModule';
import showSnackbar from 'hook/showSnackbar';
import { Grid } from '@material-ui/core';
import NoImage from '../../../assets/no_image.png';
import Introduction from './profInfos/Introduction';
import FollowUsers from './profInfos/FollowUsers';
import FollowerUsers from './profInfos/FollowerUsers';

const UserDetail: FC = () => {
  const { id }: { id: string } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const mountedRef = useRef(false);
  const [selectUser, setUser] = useState<UserType>();
  const [infoId, setInfoId] = useState('profile');

  let userImage: {path: string, alt: string} = { path: '', alt: '' };
  if (selectUser) {
    userImage = selectUser.image.imagePath?.length > 0 ? { path: selectUser.image.imagePath, alt: 'ユーザ画像' } : { path: NoImage, alt: 'no_image' };
  }

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const execApi = async (userId: string) => {
      try {
        dispatch(fetchFollowUsers(userId));
        dispatch(fetchFollowerUsers(userId));
        const data = await dispatch(fetchUser(userId)).unwrap();
        if (mountedRef.current) {
          setUser(data);
        }
      } catch (e) {
        dispatch(showSnackbar({ e }));
      }
    };
    execApi(id);
  }, [dispatch, id]);

  const selectInfosMenu = (value: string, event?: KeyboardEvent<HTMLDivElement>) => {
    if (event && event.key !== 'Enter') return;

    setInfoId(value);
  };

  const userInfosMenu = [
    {
      func: selectInfosMenu, value: 'profile', name: 'プロフィール', className: 'w-20-percent self-center',
    },
    {
      func: selectInfosMenu, value: 'followers', name: 'フォロワー', className: 'w-20-percent', count: selectUser?.followerCount,
    },
    {
      func: selectInfosMenu, value: 'followings', name: 'フォロー', className: 'w-20-percent', count: selectUser?.followingCount,
    },
    {
      func: selectInfosMenu, value: 'pets', name: 'ペット', className: 'w-20-percent', count: selectUser?.petCount,
    },
    {
      func: selectInfosMenu, value: 'posts', name: '投稿', className: 'w-20-percent', count: selectUser?.postCount,
    },
  ];

  let menuComponets;
  if (selectUser) {
    menuComponets = [
      { id: 'profile', component: <Introduction introduction={selectUser?.introduction} /> },
      { id: 'followers', component: <FollowerUsers /> },
      { id: 'followings', component: <FollowUsers /> },
      { id: 'pets', component: <Introduction introduction="pets" /> },
      { id: 'posts', component: <Introduction introduction="posts" /> },
    ];
  }

  return (
    <>
      {selectUser && (
      <section className="c-section-wrapin">
        <div className="user-header">
          <img className="header-img" src={NoImage} alt="header" />
          <div className="user-prof">
            <div className="user-prof-main">
              {userImage && (
              <img className="user-img" src={userImage.path} alt={userImage.alt} />
              )}
              <p className="self-end">
                {selectUser.name}
              </p>
            </div>
            <div className="user-infos">
              <Grid container spacing={5}>
                {
                  userInfosMenu.map((menu) => (
                    <Grid
                      item
                      className={menu.className}
                      key={menu.value}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => menu.func(menu.value)}
                        onKeyDown={(e) => menu.func(menu.value, e)}
                        className={infoId === menu.value ? 'active' : ''}
                      >
                        <p>
                          {menu.name}
                        </p>
                        {menu.count && (
                          <p>
                            {menu.count}
                          </p>
                        )}
                      </div>
                    </Grid>
                  ))
                }
              </Grid>
            </div>
          </div>
        </div>
        {
          menuComponets
            && menuComponets.find((c) => c.id === infoId)?.component
        }
      </section>
      )}
    </>
  );
};

export default UserDetail;
