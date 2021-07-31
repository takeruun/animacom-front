import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextDetail, SecondaryButton } from 'components/UIKit/index';
import { AppDispatch } from 're-ducks/store/store';
import { getUsername } from 're-ducks/users/selectors';
import { InitialState } from 're-ducks/store/initialState';
import { push } from 'connected-react-router';

const MyPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selector = useSelector((state: InitialState) => state);
  const username = getUsername(selector);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ</h2>
      <div className="module-spacer--medium" />
      <TextDetail label="ユーザー名" value={username} />
      <div className="module-spacer--small" />
      <div className="center">
        <SecondaryButton label="情報の編集" onClick={() => dispatch(push('/mypag/edit'))} />
      </div>
    </section>
  );
};

export default MyPage;
