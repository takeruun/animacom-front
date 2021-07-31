import { FC } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: '#000',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

type PropsType = {
  label: string,
  onClick: () => void,
};

const SecondaryButton: FC<PropsType> = (props: PropsType) => {
  const classes = useStyles();
  const { label, onClick } = props;
  return (
    <Button className={classes.button} variant="contained" onClick={() => onClick()}>
      {label}
    </Button>
  );
};

export default SecondaryButton;
