import { memo } from 'react';
import { IconStar } from '../../../../assets/icons/star';

interface ExpProductAverageReviewProps {
  averageReviewsCount: number | undefined;
  starFillClassName: string;
  starClassName: string;
}

const ExpProductAverageReview = (props: ExpProductAverageReviewProps) => {
  const { averageReviewsCount, starFillClassName, starClassName } = props;

  return (
    <>
      {averageReviewsCount! > 0 ? (
        <li className="">
          <i className={starFillClassName}>
            <IconStar className={`w-full h-full ${starFillClassName}`} />
          </i>
        </li>
      ) : (
        <li className="">
          <i className={starClassName}>
            <IconStar className={`w-full h-full ${starClassName}`} />
          </i>
        </li>
      )}

      {averageReviewsCount! > 1 ? (
        <li className="">
          <i className={starFillClassName}>
            <IconStar className={`w-full h-full ${starFillClassName}`} />
          </i>
        </li>
      ) : (
        <li className="">
          <i className={starClassName}>
            <IconStar className={`w-full h-full ${starClassName}`} />
          </i>
        </li>
      )}

      {averageReviewsCount! > 2 ? (
        <li className="">
          <i className={starFillClassName}>
            <IconStar className={`w-full h-full ${starFillClassName}`} />
          </i>
        </li>
      ) : (
        <li className="">
          <i className={starClassName}>
            <IconStar className={`w-full h-full ${starClassName}`} />
          </i>
        </li>
      )}

      {averageReviewsCount! > 3 ? (
        <li className="">
          <i className={starFillClassName}>
            <IconStar className={`w-full h-full ${starFillClassName}`} />
          </i>
        </li>
      ) : (
        <li className="">
          <i className={starClassName}>
            <IconStar className={`w-full h-full ${starClassName}`} />
          </i>
        </li>
      )}

      {averageReviewsCount! > 4 ? (
        <li>
          <i className={starFillClassName}>
            <IconStar className={`w-full h-full ${starFillClassName}`} />
          </i>
        </li>
      ) : (
        <li>
          <i className={starClassName}>
            <IconStar className={`w-full h-full ${starClassName}`} />
          </i>
        </li>
      )}
    </>
  );
};

export default memo(ExpProductAverageReview);
