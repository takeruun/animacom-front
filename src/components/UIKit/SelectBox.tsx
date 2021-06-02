import { FC } from 'react';
import InputLable from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formControl: {
    marginBottom: 16,
    minWidth: 120,
    width: '100%',
  },
}));

type Props = {
  label: string,
  required: boolean,
  value: string,
  select: React.Dispatch<React.SetStateAction<string>>,
  options: {
    id: string,
    name: string,
  }[]
}

const SelectBox: FC<Props> = (props: Props) => {
  const classes = useStyles();
  const {
    label, required, value, select, options,
  } = props;

  return (
    <FormControl className={classes.formControl}>
      <InputLable>
        {label}
        <Select
          required={required}
          value={value}
          onChange={(event) => select(event.target.value as string)}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </InputLable>
    </FormControl>
  );
};

export default SelectBox;
