import { FC } from 'react';

type PropsType = {
  delete: (id: string) => void,
  id: string,
  imagePath: string,
}

const ImagePreview: FC<PropsType> = (props: PropsType) => {
  const { delete: deleteImage, id, imagePath } = props;

  return (
    <li className="p-media-pr__thumb">
      <button type="button" className="btn" onClick={() => deleteImage(id)}>X</button>
      <img alt="アイキャッチ画像" src={imagePath} />
    </li>
  );
};

export default ImagePreview;
