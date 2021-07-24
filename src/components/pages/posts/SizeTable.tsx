import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from 're-ducks/store/initialState';
import { postReactions, destroyReactions } from 're-ducks/post/operations';
import {
  getCuteCount,
  getFavCount,
  getGoodCount,
  getCoolCount,
  getAlreadyCooled,
  getAlreadyCuted,
  getAlreadyFaved,
  getAlreadyGooded,
  getReactions,
} from 're-ducks/post/selectors';
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

type PropsType = {
  id: string,
}

const SizeTable: FC<PropsType> = (props: PropsType) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selecter = useSelector((state: InitialState) => state);

  const [cuteCount, setCuteCount] = useState<number>(0);
  const [favCount, setFavCount] = useState<number>(0);
  const [goodCount, setGoodCount] = useState<number>(0);
  const [coolCount, setCoolCount] = useState<number>(0);

  const [alreadyCuted, setAlreadyCuted] = useState<boolean>(false);
  const [alreadyFaved, setAlreadyFaved] = useState<boolean>(false);
  const [alreadyGooded, setAlreadyGooded] = useState<boolean>(false);
  const [alreadyCooled, setAlreadyCooled] = useState<boolean>(false);

  const [reactions, setReactions] = useState<{ id: string, kind: number }[]>();

  useEffect(() => {
    setCuteCount(getCuteCount(selecter));
    setFavCount(getFavCount(selecter));
    setGoodCount(getGoodCount(selecter));
    setCoolCount(getCoolCount(selecter));

    setAlreadyCuted(getAlreadyCuted(selecter) || false);
    setAlreadyFaved(getAlreadyFaved(selecter) || false);
    setAlreadyGooded(getAlreadyGooded(selecter) || false);
    setAlreadyCooled(getAlreadyCooled(selecter) || false);

    setReactions(getReactions(selecter));
  }, [selecter, setCuteCount]);

  const { id } = props;

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow key="cute">
            <TableCell component="th" scope="row">かわいい</TableCell>
            <TableCell>{cuteCount}</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton className={classes.iconCell} style={{ color: alreadyCuted ? 'rgb(231, 76, 60)' : 'none' }}>
                <FavoriteIcon onClick={() => {
                  if (alreadyCuted) {
                    const reaction = reactions!.find((r) => r.kind === 1);
                    dispatch(destroyReactions(reaction!.id, 'cute'));
                    setAlreadyCuted(false);
                  } else {
                    dispatch(postReactions(id, 'cute'));
                    setAlreadyCuted(true);
                  }
                }}
                />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="fav">
            <TableCell component="th" scope="row">お気に入り</TableCell>
            <TableCell>{favCount}</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton className={classes.iconCell} style={{ color: alreadyFaved ? 'rgb(236, 240, 21)' : 'none' }}>
                <GradeIcon onClick={() => dispatch(postReactions(id, 'fav'))} />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="good">
            <TableCell component="th" scope="row">いいね</TableCell>
            <TableCell>{goodCount}</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton className={classes.iconCell} style={{ color: alreadyGooded ? 'rgb(8, 130, 245)' : 'none' }}>
                <ThumbUpAltIcon onClick={() => dispatch(postReactions(id, 'good'))} />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="cool">
            <TableCell component="th" scope="row">かっこいい</TableCell>
            <TableCell>{coolCount}</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton className={classes.iconCell} style={{ color: alreadyCooled ? 'rgb(8, 245, 48)' : 'none' }}>
                <FlareIcon onClick={() => dispatch(postReactions(id, 'cool'))} />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;
