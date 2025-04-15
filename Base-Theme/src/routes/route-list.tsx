import { Suspense } from 'react';
import { Page } from 'experro-storefront';
import LoginPage from '../templates/e-commerce/login-page';
import SignupPage from '../templates/e-commerce/signup-page';
import AlreadyLogin from './already-login';
import ProtectedRoute from './protected-route';
import {ExpProductCompare} from '../components/e-commerce/compare-products';
import SearchPage from '../templates/e-commerce/search-page';
import components from '../components';
import templates from '../templates';
import ExpWishlistLandingPage from '../components/e-commerce/my-account/wishlists/wishlist-landing-page';
import { ExpForgotPassword } from '../components/e-commerce/forgot-password';
import { ExpResetPassword } from '../components/e-commerce/reset-password';
import { ExpMyAccount } from '../components/e-commerce/my-account';
import { ExpCartPage } from '../components/e-commerce/cart';
import { ExpCheckout, ExpStorefrontCheckoutIframe } from '../components/e-commerce/checkout';
import CMSDemoPage from '../templates/cms-demo-page';

const Routes = [
  {
    path: '/cms-demo-page',
    key: 'cms-demo-page',
    element: <CMSDemoPage />,
  },
  {
    path: '/sign-up',
    key: 'sign-up-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={function () {
          return (
            <Suspense fallback={null}>
              <AlreadyLogin
                path={'/my-account'}
                Component={SignupPage}></AlreadyLogin>
            </Suspense>
          );
        }}
        key={'signup-page'}
      />
    ),
  },
  {
    path: '/login',
    key: 'login-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <AlreadyLogin
              path={'/my-account'}
              Component={LoginPage}></AlreadyLogin>
          </Suspense>
        )}
        key={'login-page'}
      />
    ),
  },
  {
    path: '/forgot-password',
    key: 'forgot-password-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpForgotPassword />
          </Suspense>
        )}
        key={'forgot-password-page'}
      />
    ),
  },
  {
    path: '/_reset_p_/:token',
    key: 'reset-password-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpResetPassword />
          </Suspense>
        )}
        key={'reset-password-page'}
      />
    ),
  },
  {
    path: '/cart',
    key: 'cart-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpCartPage />
          </Suspense>
        )}
        key={'cart-page'}
      />
    ),
  },
  {
    path: '/abandoned-cart/',
    key: 'abundant-cart',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpCartPage />
          </Suspense>
        )}
        key={'abundant-cart'}
      />
    ),
  },
  {
    path: '/my-account',
    key: 'my-account-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <ProtectedRoute>
            <Suspense fallback={null}>
              <ExpMyAccount />
            </Suspense>
          </ProtectedRoute>
        )}
        key={'my-account-page'}
      />
    ),
  },
  {
    path: '/compare',
    key: 'product-compare-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpProductCompare />
          </Suspense>
        )}
        key={'product-compare-page'}
      />
    ),
  },
  {
    path: '/search',
    key: 'search-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <SearchPage />
          </Suspense>
        )}
        key={'search-page'}
      />
    ),
  },
  {
    path: '/checkout',
    key: 'checkout-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpCheckout />
          </Suspense>
        )}
        key={'checkout-page'}
      />
    ),
  },
  {
    path: '/_exp_bc_checkout',
    key: 'checkout-page',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpCheckout />
          </Suspense>
        )}
        key={'checkout-page'}
      />
    ),
  },
  {
    path: '/_exp_bc_storefront_checkout_iframe',
    key: 'external-checkout-page-iframe',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpStorefrontCheckoutIframe />
          </Suspense>
        )}
        key={'analytics-checkout-page'}
      />
    ),
  },
  {
    path: '/wishlist',
    key: 'wishlist',
    element: (
      <Page
        components={components}
        templates={templates}
        componentToLoad={() => (
          <Suspense fallback={null}>
            <ExpWishlistLandingPage />
          </Suspense>
        )}
        key={'wishlist'}
      />
    ),
  },
];

export default Routes;
