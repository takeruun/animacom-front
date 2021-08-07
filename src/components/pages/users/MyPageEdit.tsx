import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { InitialState } from 're-ducks/store/initialState';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 're-ducks/store/store';
import { getUsername, getUserNickname } from 're-ducks/users/selectors';
import { updateUser } from 're-ducks/users/operations';
import { fetchUserAPI } from 'api/Endpoint';
import { InputText, SecondaryButton } from 'components/UIKit/index';

const MyPageEdit: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selector = useSelector((state: InitialState) => state);
  const [nickname, setNickname] = useState(getUserNickname(selector));
  const [name, setName] = useState(getUsername(selector));

  const inputNickname = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  }, [setNickname]);

  const inputName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, [setName]);

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUserAPI();
      setName(user.name);
      setNickname(user.nickname);
    };

    getUser();
  }, [dispatch]);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ編集</h2>
      <InputText
        label="名前"
        fullWidth
        multiline
        required
        rows={1}
        value={name}
        type="text"
        input={inputName}
      />
      <div className="module-spacer--medium" />
      <InputText
        label="ニックネーム"
        fullWidth
        multiline
        required={false}
        rows={1}
        value={nickname}
        type="text"
        input={inputNickname}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <SecondaryButton label="編集" onClick={() => dispatch(updateUser({ name, nickname }))} />
      </div>
    </section>
  );
};

export default MyPageEdit;
