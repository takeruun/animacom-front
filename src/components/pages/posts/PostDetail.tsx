import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentSocketAPI, SocketType } from 'api/Endpoint';
import { AppDispatch, RootState } from 're-ducks/store/store';
import { PostType } from 're-ducks/post/types';
import { fetchPost } from 'modules/postModule';
import showSnackbar from 'hook/showSnackbar';
import { fetchComments } from 'modules/commentModule';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import { InputText } from 'components/UIKit/index';
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

const PostDetail: FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const commentModule = useSelector((state: RootState) => state.comment);

  const { id }: { id: string } = useParams();
  const [post, setPost] = useState<PostType>();
  const [socket, setSocket] = useState<SocketType>();
  const [body, setBody] = useState('');
  const mountedRef = useRef(false);
  const comments = commentModule.comments;

  const inputBody = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  }, [setBody]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const execApi = async (postId: string) => {
      try {
        const data = await dispatch(fetchPost(postId)).unwrap();
        if (mountedRef.current) {
          setPost(data);
          dispatch(fetchComments(postId));
          setSocket(dispatch(createCommentSocketAPI(id)));
        }
      } catch (e) {
        dispatch(showSnackbar({ e }));
      }
    };

    execApi(id);
  }, [dispatch, id]);

  useEffect(() => () => socket?.disconnected(), [socket]);

  const createComment = () => {
    socket?.create(body);
    setBody('');
  };

  return (
    <>
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
      <div className="comments">
        {
          comments.map((comment) => (
            <li key={comment.id}>
              <div>
                nickname:
                {comment.nickname}
              </div>
              <div>
                {returnCodeToBr(comment.body)}
              </div>
            </li>
          ))
        }
        <InputText
          id="comment"
          label="コメント"
          fullWidth={false}
          multiline
          required
          rows={5}
          value={body}
          type="text"
          input={inputBody}
        />
        <Button
          onClick={() => createComment()}
        >
          送信
        </Button>
      </div>
    </>
  );
};

export default PostDetail;
