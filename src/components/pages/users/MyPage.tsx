import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextDetail, SecondaryButton } from 'components/UIKit/index';
import { AppDispatch } from 're-ducks/store/store';
import { getUsername, getUserNickname } from 're-ducks/users/selectors';
import { InitialState } from 're-ducks/store/initialState';
import { fetchUser } from 're-ducks/users/operations';
import { push } from 'connected-react-router';

const MyPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selector = useSelector((state: InitialState) => state);
  const name = getUsername(selector);
  const nickname = getUserNickname(selector);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ</h2>
      <div className="module-spacer--medium" />
      <TextDetail label="名前" value={name} />
      <div className="module-spacer--medium" />
      <TextDetail label="ニックネーム名" value={nickname} />
      <div className="module-spacer--small" />
      <div className="center">
        <SecondaryButton label="情報の編集" onClick={() => dispatch(push('/mypage/edit'))} />
      </div>
    </section>
  );
};

export default MyPage;
