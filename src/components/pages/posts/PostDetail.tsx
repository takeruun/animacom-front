import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentSocketAPI } from 'api/Endpoint';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { PostType } from 're-ducks/post/types';
import { fetchPost } from 'modules/postModule';
import { fetchComments } from 'modules/commentModulet';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import Button from '@material-ui/core/Button';
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

type Socket = ActionCable.Channel & {
  create: (userId: string, body: string) => void;
  received: (data: any) => void;
  disconnected: () => void;
}

const PostDetail: FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const commentModule = useSelector((state: RootState) => state.comment);

  const { id }: { id: string } = useParams();
  const [post, setPost] = useState<PostType>();
  const [socket, setSocket] = useState<Socket>();

  console.log(commentModule.comment);

  useEffect(() => {
    const execApi = async (postId: string) => {
      const data = await dispatch(fetchPost(postId)).unwrap();
      setPost(data);
      setSocket(dispatch(createCommentSocketAPI(id)));
      dispatch(fetchComments(postId));
    };
    execApi(id);
  }, [dispatch, id]);

  useEffect(() => () => socket?.disconnected(), [socket]);

  const createComment = (userId: string, body: string) => {
    socket?.create(userId, body);
  };

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
            <SizeTable id={post.id} />
          </div>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
