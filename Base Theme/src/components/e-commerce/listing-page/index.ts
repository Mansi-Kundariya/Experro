import ExpFacetListingComponents from './facet-listing';
import ExpCategoryLandingPage from './category-page';
import ExpProductListing from './product-listing';
import ExpCompareButton from './compare-button';


const ExpCategoryPageComponents = [
  ExpCategoryLandingPage,
  ExpProductListing,
  ExpCompareButton,
  ...ExpFacetListingComponents,
];

export { ExpCategoryPageComponents };
