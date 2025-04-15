import { lazy } from 'react';


const ExpWishlist = lazy(() => import('./wishlist'));
const ExpCreateNewWishlist = lazy(() => import('./create-new-wishlist'));

const ExpWishlistComponents = [ExpWishlist, ExpCreateNewWishlist];

export { ExpWishlistComponents };
