import { Button } from '@material-ui/core';

type PropsType = {
  delete: (id: string) => void,
  id: string,
  imagePath: string,
}

const ImagePreview = (props: PropsType) => {
  const { delete: deleteImage, id, imagePath } = props;

  return (
    <div className="p-media__thumb">
      <img alt="アイキャッチ画像" src={imagePath} />
      <Button onClick={() => deleteImage(id)}> X </Button>
    </div>
  );
};

export default ImagePreview;
