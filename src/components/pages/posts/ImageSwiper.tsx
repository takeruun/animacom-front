import { FC, useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import NoImage from '../../../assets/no_image.png';

type PropsType = {
  images: {
    id: string;
    file: File | null;
    imagePath: string;
  }[]
};

const ImageSwiper: FC<PropsType> = (props: PropsType) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    spaceBetween: 30,
  });

  const { images } = props;

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="画像なし" />
        </div>
      ) : (
        images.map((image) => (
          <div className="p-media__thumb" key={image.id}>
            <img src={image.imagePath} alt="画像" />
          </div>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
