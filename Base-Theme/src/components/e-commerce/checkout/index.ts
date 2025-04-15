import { lazy } from 'react';

const ExpCheckout = lazy(() => import('./checkout'));
const ExpStorefrontCheckoutIframe = lazy(
  () => import('./storefront-checkout-iframe')
);

export { ExpCheckout, ExpStorefrontCheckoutIframe };
