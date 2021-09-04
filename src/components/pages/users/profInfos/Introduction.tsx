import { FC } from 'react';

type PropsType = {
  introduction: string,
};

const Introduction: FC<PropsType> = (props: PropsType) => {
  const { introduction } = props;

  return (
    <div>
      自己紹介：
      {introduction}
    </div>
  );
};

export default Introduction;
