import { EcommerceService } from 'experro-storefront';
import { useState, useEffect } from 'react';

interface ExpProductReviewsControllerProps {
  productId: string;
}

const ExpProductReviewsController = (
  props: ExpProductReviewsControllerProps
) => {
  const { productId } = props;
  const limit = 6;

  const [loading, setLoading] = useState<boolean>(false);
  const [productReviews, setProductReviews] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [reviewsMeta, setReviewsMeta] = useState<any>();

  const getReviews = async (id: string, pagenumber: number, limit: number) => {
    try {
      setLoading(true);
      const res = await EcommerceService.getProductReviewsByProductId({
        productId: id,
        skip: pagenumber,
        limit: limit,
      });

      if (res?.reviews?.data) {
        setProductReviews(res.reviews.data);
        setReviewsMeta(res.reviews_meta);
      }

      setLoading(false);
    } catch (error) {
      console.error('something went wrong at getReviews', error);
      setLoading(false);
    }
  };

  const searchProduct = async (
    productId: string,
    skip: number,
    limit: number
  ) => {
    try {
      await getReviews(productId, skip, limit);
    } catch (error) {
      console.error(error);
    }
  };

  const getFormattedDate = (date: string) => {
    const convertInDate = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    //@ts-ignore
    const formattedDate = convertInDate.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');

    return `${month} ${day.replace(',', '')}, ${year}`;
  };

  useEffect(() => {
    (async () => {
      await searchProduct(productId, pageNumber ? pageNumber : 1, limit);
    })();
  }, [pageNumber, productId]);

  return {
    productReviews,
    loading,
    pageNumber,
    setPageNumber,
    reviewsMeta,
    getFormattedDate,
  };
};

export default ExpProductReviewsController;
