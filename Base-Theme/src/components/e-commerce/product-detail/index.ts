import { lazy } from 'react';
const ExpProductdetail = lazy(() => import('./product-detail'));
import { ExpProductaction } from './product-action';
import { ExpProductAverageReview } from './product-average-review';
import { ExpProductCustomFields } from './product-custom-fields';
import { ExpProductImage } from './product-image';
import { ExpProductModifiers } from './product-modifiers';
import { ExpProductOptions } from './product-options';
import { ExpProductReviewModel } from './product-review-model';
import { ExpProductShare } from './product-share';
import { ExpProductTabSection } from './product-tab-section';

const ExpProductdetailComponents: any = [
  ExpProductdetail,
  ExpProductaction,
  ExpProductAverageReview,
  ExpProductCustomFields,
  ExpProductImage,
  ExpProductModifiers,
  ExpProductOptions,
  ExpProductReviewModel,
  ExpProductShare,
  ExpProductTabSection,
];

export {
  ExpProductdetailComponents,
  ExpProductdetail,
  ExpProductaction,
  ExpProductAverageReview,
  ExpProductCustomFields,
  ExpProductImage,
  ExpProductModifiers,
  ExpProductOptions,
  ExpProductReviewModel,
  ExpProductShare,
  ExpProductTabSection,
};
