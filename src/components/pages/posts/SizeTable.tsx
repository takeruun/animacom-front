import { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GradeIcon from '@material-ui/icons/Grade';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FlareIcon from '@material-ui/icons/Flare';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

const SizeTable: FC = () => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow key="cute">
            <TableCell component="th" scope="row">かわいい</TableCell>
            <TableCell>3</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton className={classes.iconCell}>
                <FavoriteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="fav">
            <TableCell component="th" scope="row">お気に入り</TableCell>
            <TableCell>3</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton className={classes.iconCell}>
                <GradeIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="good">
            <TableCell component="th" scope="row">いいね</TableCell>
            <TableCell>3</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton className={classes.iconCell}>
                <ThumbUpAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="cool">
            <TableCell component="th" scope="row">かっこいい</TableCell>
            <TableCell>3</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton className={classes.iconCell}>
                <FlareIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
