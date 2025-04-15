import { memo } from 'react';
import ExpProductReviewsController from './product-reviews-controller';
import { ExpPagination } from '../../../common-components/pagination';
import { IconStar } from '@icons/star';

interface ExpProductReviewsProps {
  productId: string;
}

const ExpProductReviews = (props: ExpProductReviewsProps) => {
  const { productId } = props;
  const reviewsPerPage = 6;

  const {
    productReviews,
    loading,
    pageNumber,
    setPageNumber,
    reviewsMeta,
    getFormattedDate,
  } = ExpProductReviewsController({
    productId,
  });

  return (
    <>
      {loading ? (
        <div className="relative flex justify-center items-center h-dvh">
          <div className="w-14 h-14 rounded-full absolute border-2 border-solid border-gray-100"></div>
          <div className="w-14 h-14 rounded-full animate-spin absolute border-2 border-solid border-primary border-t-transparent"></div>
        </div>
      ) : (
        productReviews &&
        !!productReviews.length && (
          <>
            <ul className="list-style-none product-reviews-list m-b-0">
              {productReviews &&
                productReviews.map((review: any, index: number) => {
                  if (review.status === 'approved') {
                    return (
                      <>
                        <li
                          key={index?.toString()}
                          className="product-review-item my-8">
                          <div className="row align-center m-b-8">
                            <div className="flex items-center space-x-4 mb-4">
                              <ul className="rating-star-list flex items-center space-x-2">
                                {review?.rating > 0 ? (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-amber-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-amber-300" />
                                    </i>
                                  </li>
                                ) : (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-neutral-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-neutral-300" />
                                    </i>
                                  </li>
                                )}
                                {review?.rating > 1 ? (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-amber-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-amber-300" />
                                    </i>
                                  </li>
                                ) : (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-neutral-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-neutral-300" />
                                    </i>
                                  </li>
                                )}
                                {review?.rating > 2 ? (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-amber-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-amber-300" />
                                    </i>
                                  </li>
                                ) : (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-neutral-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-neutral-300" />
                                    </i>
                                  </li>
                                )}
                                {review?.rating > 3 ? (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-amber-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-amber-300" />
                                    </i>
                                  </li>
                                ) : (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-neutral-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-neutral-300" />
                                    </i>
                                  </li>
                                )}
                                {review?.rating > 4 ? (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-amber-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-amber-300" />
                                    </i>
                                  </li>
                                ) : (
                                  <li>
                                    <i className="icon  w-6 h-6 flex items-center justify-center fill-neutral-300">
                                      <IconStar className="w-full h-full icon  flex items-center justify-center fill-neutral-300" />
                                    </i>
                                  </li>
                                )}
                              </ul>
                              <p className="m-b-0 medium flex text-gray-700 space-x-1">
                                <span className="dark-color text-black">
                                  {review?.name}
                                </span>
                                <span>
                                  {' '}
                                  on {getFormattedDate(review?.date_reviewed)}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="review-wrapper">
                            <div>
                              <p className="mb-4 text-black  font-medium">
                                {review?.title}
                              </p>
                            </div>

                            <div className="review-body">
                              <p className="m-b-0 mb-0 text-gray-900">
                                {review?.text}
                              </p>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  }
                  return null;
                })}
              {reviewsMeta.reviews_count > reviewsPerPage && (
                <ExpPagination
                  itemList={productReviews}
                  totalCount={reviewsMeta.reviews_count}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  skip={reviewsPerPage}
                />
              )}
            </ul>
          </>
        )
      )}
    </>
  );
};

export default memo(ExpProductReviews);
