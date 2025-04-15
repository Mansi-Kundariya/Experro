import { lazy } from 'react';

const ExpRecommendationCard = lazy(() => import('./recommendation-card'));
const ExpFrequentlyViewedTogether = lazy(() => import('./recommendation-card'));
const ExpPickUpWhereYouLeftOff = lazy(() => import('./recommendation-card'));
const ExpRecommendedForYou = lazy(() => import('./recommendation-card'));
const ExpRecentlyViewed = lazy(() => import('./recommendation-card'));
const ExpRecentlyPurchased = lazy(() => import('./recommendation-card'));
const ExpFrequentlyBoughtTogether = lazy(() => import('./recommendation-card'));
const ExpBestSeller = lazy(() => import('./recommendation-card'));
const ExpPopularItems = lazy(() => import('./recommendation-card'));
const ExpQueryBased = lazy(() => import('./recommendation-card'));
const ExpHotNewReleases = lazy(() => import('./recommendation-card'));
const ExpInspiredByYourBrowsingHistory = lazy(() => import('./recommendation-card'));
const ExpSimilarProducts = lazy(() => import('./recommendation-card'));


export {
  ExpRecommendationCard,
  ExpFrequentlyViewedTogether,
  ExpPickUpWhereYouLeftOff,
  ExpRecommendedForYou,
  ExpRecentlyViewed,
  ExpRecentlyPurchased,
  ExpFrequentlyBoughtTogether,
  ExpBestSeller,
  ExpPopularItems,
  ExpQueryBased,
  ExpHotNewReleases,
  ExpInspiredByYourBrowsingHistory,
  ExpSimilarProducts
};
