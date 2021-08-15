import { FC } from 'react';
import TextField from '@material-ui/core/TextField';

type PropsType = {
  fullWidth: boolean,
  label: string,
  multiline: boolean,
  required: boolean,
  rows: number,
  value: string,
  type: string,
  input: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const InputText: FC<PropsType> = (props: PropsType) => {
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
    <TextField
      fullWidth={fullWidth}
      label={label}
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
