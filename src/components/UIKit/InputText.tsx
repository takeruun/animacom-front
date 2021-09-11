import { FC } from 'react';
import TextField from '@material-ui/core/TextField';

type PropsType = {
  id: string,
  fullWidth: boolean,
  label: string,
  multiline: boolean,
  required: boolean,
  rows: number,
  value: string | number,
  type: string,
  input: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const InputText: FC<PropsType> = (props: PropsType) => {
  const {
    id,
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
    <TextField
      id={id}
      fullWidth={fullWidth}
      label={label}
      placeholder={label}
      multiline={multiline}
      required={required}
      rows={rows}
      value={value}
      type={type}
      onChange={input}
    />
  );
};

export default InputText;
