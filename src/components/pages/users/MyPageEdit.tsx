import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  memo,
} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 're-ducks/store/store';
import { updateUser } from 'modules/userModule';
import { fetchUserAPI } from 'api/Endpoint';
import { InputText, SecondaryButton } from 'components/UIKit/index';

const InputTextMemo = memo((
  props: {
    fullWidth: boolean,
    label: string,
    multiline: boolean,
    required: boolean,
    rows: number,
    value: string,
    type: string,
    input: (event: ChangeEvent<HTMLInputElement>) => void,
  },
) => {
  const {
    fullWidth,
    label,
    multiline,
    required,
    rows,
    value,
    type,
    input,
  } = props;
  return (
    <InputText
      fullWidth={fullWidth}
      label={label}
      multiline={multiline}
      input={input}
      required={required}
      rows={rows}
      value={value}
      type={type}
    />
  );
});

const MyPageEdit: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');

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
      <InputTextMemo
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
      <InputTextMemo
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
