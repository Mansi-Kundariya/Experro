/* eslint-disable no-restricted-globals */
import { useState, Dispatch, SetStateAction } from 'react';
import { EcommerceService, toast, } from 'experro-storefront';
import { useTranslation } from 'react-i18next';

interface ExpProductReviewModelControllerProps {
  product: {
    brand_esi: string;
    title: string;
    categories_esai: string;
    calculated_price_efi: number;
    inventory_tracking_esi: string;
    inventory_level_eii: number;
    sku_esi: string;
    sku_for_analytics_esli: any;
    name_esi: string;
    provider_id_esi: string;
  };
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  getProductReviewsAndAverageReviewCount: any;
}

const ExpProductReviewModelController = (
  props: ExpProductReviewModelControllerProps
) => {
  const { product, setIsModalOpen, getProductReviewsAndAverageReviewCount } =
    props;

  const { t } = useTranslation();
  const emailRegX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const initialFieldValue = {
    rating: 'Select Rating',
    ratingValidation: '',
    name: '',
    email: '',
    emailValidation: '',
    comments: '',
    commentsValidation: '',
  };
  const [reviewField, setReviewField] = useState<any>(initialFieldValue);

  const onSubmitReview = async (event: any) => {
    event.preventDefault();
    const currentTime = new Date(Date.now());
    currentTime.setMilliseconds(0);

    if (
      reviewField.ratingValidation === 'success-field' &&
      reviewField.emailValidation === 'success-field' &&
      reviewField.commentsValidation === 'success-field'
    ) {
      await EcommerceService.addProductReview({
        productId: product.provider_id_esi,
        body: {
          title: product.title,
          date_reviewed: currentTime.toISOString().replace('.000Z', 'Z'),
          text: reviewField.comments,
          rating: Number(reviewField.rating),
          name: reviewField.name,
          email: reviewField.email,
        },
      })
        .then(() => {
          toast.success(t('toast_msg_success.review_submited'));
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          event;
          toast.error(t('toast_msg_error.review_submit_failed'));
        });
      setIsModalOpen(false);
      setReviewField({
        ...reviewField,
        rating: 'Select Rating',
        name: '',
        email: '',
        comments: '',
      });
      getProductReviewsAndAverageReviewCount();
      history.replaceState({}, document.title, '.');
    } else {
      if (!reviewField.comments) {
        setReviewField({ ...reviewField, commentsValidation: 'error-field' });
      }
      if (!reviewField.email) {
        setReviewField({ ...reviewField, emailValidation: 'error-field' });
      }
      if (reviewField.rating === 'Select Rating') {
        setReviewField({ ...reviewField, ratingValidation: 'error-field' });
      }
    }
  };

  const onChangeReviewFields = (e: any, name: string) => {
    const { value } = e.target;

    switch (name) {
      case 'rating':
        if (value === 'Select Rating') {
          setReviewField({
            ...reviewField,
            rating: value,
            ratingValidation: 'error-field',
          });
        } else {
          setReviewField({
            ...reviewField,
            rating: value,
            ratingValidation: 'success-field',
          });
        }
        break;
      case 'name':
        setReviewField({ ...reviewField, name: value });
        break;
      case 'email':
        if (!emailRegX.test(value)) {
          setReviewField({
            ...reviewField,
            email: value,
            emailValidation: 'error-field',
          });
        } else {
          setReviewField({
            ...reviewField,
            email: value,
            emailValidation: 'success-field',
          });
        }
        break;
      case 'comments':
        if (!value) {
          setReviewField({
            ...reviewField,
            comments: value,
            commentsValidation: 'error-field',
          });
        } else {
          setReviewField({
            ...reviewField,
            comments: value,
            commentsValidation: 'success-field',
          });
        }
        break;
      default:
        break;
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setReviewField(initialFieldValue);
    history.replaceState({}, document.title, '.');
  };
  const scrollToReviewTab = () => {
    document.dispatchEvent(new Event('REVIEW_TAB'));
  };

  return {
    reviewField,
    onSubmitReview,
    onChangeReviewFields,
    onModalClose,
    scrollToReviewTab,
  };
};

export default ExpProductReviewModelController;
