import { lazy } from 'react';

const ExpFacetListing = lazy(() =>import('./facet-listing'));
import { ExpFacetListingController } from './facet-listing-controller';

const ExpFacetListingComponents = [ExpFacetListing, ExpFacetListingController];

export default ExpFacetListingComponents;
