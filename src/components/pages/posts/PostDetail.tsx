import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { endFetch, startFetch } from 're-ducks/apiStatus/operations';
import { fetchPostApi } from 're-ducks/post/operations';
import { PostType } from 're-ducks/post/types';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import { ImageSwiper, SizeTable } from './index';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
  subTitle: {
    fontSize: 36,
  },
}));

const returnCodeToBr = (text: string) => {
  if (text === '') {
    return text;
  }
  return parse(text.replace(/\r?\n/g, '<br/>'));
};

const PostDetail: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const execApi = async (postId: string) => {
      dispatch(startFetch());
      const res = await fetchPostApi(postId);
      setPost(res.post);
      dispatch(endFetch());
    };
    execApi(id);
  }, [dispatch, id]);

  return (
    <section className="c-section-wrapin">
      {post && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={post.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{post.title}</h2>
            <p className={classes.subTitle}>{post.subTitle}</p>
            <div className="module-spacer--small" />
            <p>{returnCodeToBr(post.body)}</p>
            <div className="module-spacer--small" />
            <SizeTable />
          </div>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
