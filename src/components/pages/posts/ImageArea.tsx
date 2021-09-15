import { AddPhotoAlternate } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import InputLable from '@material-ui/core/InputLabel';
import {
  ChangeEvent, FC, useCallback, useState,
} from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea: FC = () => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState('');

  const inputImage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files !== null ? event.target.files[0] : null;
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);
  }, [setImageUrl]);

  return (
    <div>
      <div className="u-text-rigth">
        <span>画像を登録する🐾</span>
        <IconButton className={classes.icon}>
          <InputLable>
            <AddPhotoAlternate />
            <input className="u-display-none" type="file" id="image" onChange={inputImage} />
          </InputLable>
        </IconButton>
      </div>
      {
        imageUrl && <img alt="プレビュー画像" src={imageUrl} />
      }
    </div>
  );
};

export default ImageArea;
