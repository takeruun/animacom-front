import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { fetchMyUser } from 'modules/userModule';
import { push } from 'connected-react-router';
import { TextDetail, SecondaryButton } from 'components/UIKit/index';
import NoImage from '../../../assets/no_image.png';

const MyPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const userModule = useSelector((state: RootState) => state.user);
  const name = userModule.user.name;
  const nickname = userModule.user.nickname;
  const imagePath = userModule.user.image?.imagePath;
  const userImage: {
    path: string;
    alt: string;
  } = { path: imagePath || NoImage, alt: imagePath ? 'ユーザ画像' : 'NoImage' };

  useEffect(() => {
    dispatch(fetchMyUser());
  }, [dispatch]);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ</h2>
      <div className="module-spacer--medium" />
      <TextDetail label="名前" value={name} />
      <div className="module-spacer--medium" />
      <TextDetail label="ニックネーム名" value={nickname} />
      <div className="module-spacer--small" />

      <img src={userImage.path} alt={userImage.alt} />
      <div className="module-spacer--small" />
      <div className="center">
        <SecondaryButton label="情報の編集" onClick={() => dispatch(push('/mypage/edit'))} />
      </div>
    </section>
  );
};

export default MyPage;
