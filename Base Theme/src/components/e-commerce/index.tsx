import { ExpLogin } from './login';
import { ExpSignUp } from './signup';
import { ExpCheckout } from './checkout';
import { ExpCartComponents } from './cart';
import { ExpProductCell } from './product-cell';
import { ExpProductPrice } from './product-price';
import { ExpWishlistComponents } from './wishlist';
import { ExpSearchPreview } from './search-preview';
import { ExpProductCompare } from './compare-products';
import { ExpCategoryPageComponents } from './listing-page';
import { ExpProductdetailComponents } from './product-detail';

const ECommerceComponents = [
  ExpLogin,
  ExpSignUp,
  ExpCheckout,
  ExpProductCell,
  ExpProductPrice,
  ExpProductCompare,
  ExpSearchPreview,
  ...ExpCartComponents,
  ...ExpWishlistComponents,
  ...ExpCategoryPageComponents,
  ...ExpProductdetailComponents,
];

export default ECommerceComponents;
