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
      <Button onClick={() => deleteImage(id)}> X </Button>
      <img alt="アイキャッチ画像" src={imagePath} />
    </div>
  );
};

export default ImagePreview;
