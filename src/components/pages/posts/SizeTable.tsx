import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postReactions, destroyReactions } from 'modules/postModule';
import { AppDispatch, RootState } from 're-ducks/store/store';
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
  const dispatch: AppDispatch = useDispatch();
  const postModule = useSelector((state: RootState) => state.post);
  const post = postModule.post;
  const alreadyCuted = post.alreadyCuted;
  const alreadyFaved = post.alreadyFaved;
  const alreadyGooded = post.alreadyGooded;
  const alreadyCooled = post.alreadyCooled;

  const [cuteCount, setCuteCount] = useState<number>(0);
  const [favCount, setFavCount] = useState<number>(0);
  const [goodCount, setGoodCount] = useState<number>(0);
  const [coolCount, setCoolCount] = useState<number>(0);

  const [reactions, setReactions] = useState<{ id: string, kind: number }[]>();

  useEffect(() => {
    setCuteCount(post.cuteCount);
    setFavCount(post.favCount);
    setGoodCount(post.goodCount);
    setCoolCount(post.coolCount);

    setReactions(post.reactions);
  }, [post]);

  const { id } = props;

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow key="cute">
            <TableCell component="th" scope="row">かわいい</TableCell>
            <TableCell>{cuteCount}</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton
                role="button"
                className={classes.iconCell}
                style={{ color: alreadyCuted ? 'rgb(231, 76, 60)' : '' }}
                onClick={() => {
                  if (alreadyCuted) {
                    const reaction = reactions?.find((r) => r.kind === 1);
                    dispatch(destroyReactions({ id: reaction!.id, kind: 'cute' }));
                  } else {
                    dispatch(postReactions({ id, kind: 'cute' }));
                  }
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="fav">
            <TableCell component="th" scope="row">お気に入り</TableCell>
            <TableCell>{favCount}</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton
                role="button"
                className={classes.iconCell}
                style={{ color: alreadyFaved ? 'rgb(236, 240, 21)' : '' }}
                onClick={() => {
                  if (alreadyFaved) {
                    const reaction = reactions?.find((r) => r.kind === 2);
                    dispatch(destroyReactions({ id: reaction!.id, kind: 'fav' }));
                  } else {
                    dispatch(postReactions({ id, kind: 'fav' }));
                  }
                }}
              >
                <GradeIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="good">
            <TableCell component="th" scope="row">いいね</TableCell>
            <TableCell>{goodCount}</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton
                role="button"
                className={classes.iconCell}
                style={{ color: alreadyGooded ? 'rgb(8, 130, 245)' : '' }}
                onClick={() => {
                  if (alreadyGooded) {
                    const reaction = reactions?.find((r) => r.kind === 3);
                    dispatch(destroyReactions({ id: reaction!.id, kind: 'good' }));
                  } else {
                    dispatch(postReactions({ id, kind: 'good' }));
                  }
                }}
              >
                <ThumbUpAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow key="cool">
            <TableCell component="th" scope="row">かっこいい</TableCell>
            <TableCell>{coolCount}</TableCell>
            <TableCell className={classes.iconCell}>
              <IconButton
                role="button"
                className={classes.iconCell}
                style={{ color: alreadyCooled ? 'rgb(8, 245, 48)' : '' }}
                onClick={() => {
                  if (alreadyCooled) {
                    const reaction = reactions?.find((r) => r.kind === 4);
                    dispatch(destroyReactions({ id: reaction!.id, kind: 'cool' }));
                  } else {
                    dispatch(postReactions({ id, kind: 'cool' }));
                  }
                }}
              >
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
