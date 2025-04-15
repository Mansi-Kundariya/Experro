import toast from 'react-hot-toast';
import { AuthService } from '../../services';
import { CommonUtilities, Http } from '../../utilities';
import { Cookie } from '../../utilities/cookie';
import { Magento } from './magento';

export class MagentoEcomm {
  // _=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_CART_=_=_=_=_=_=_=_=_=_=_=_=
  static async getCartWithDiscountDetails() {
    try {
      const response = await Http.get({
        key: 'get-cart',
        url: `/exp-sf-cms/api/magento/cart/totals`,
        componentId: 'user-cart',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getCart() {
    try {
      const response = await Http.get({
        key: 'get-cart',
        url: `/exp-sf-cms/api/magento/cart`,
        componentId: 'user-cart',
        enableSSR: false,
      });
      const defaultCart = response?.data;
      let finalCartResp = defaultCart;
      if (defaultCart?.statusText === 'OK') {
        const resp = await this.getCartWithDiscountDetails();
        const discountedCart = resp?.data;

        finalCartResp = { ...defaultCart, discountedCart };
      }
      return finalCartResp;
    } catch (e) {
      throw new Error(e);
    }
  }

  // Create cart For Magento
  static async createCart({ line_items }: { line_items?: any }) {
    try {
      const response = await Http.post({
        key: 'create-cart',
        url: `/exp-sf-cms/api/magento/carts`,
        componentId: 'user-cart-create',
        enableSSR: false,
        config: {
          body: {
            cartItems: line_items,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // Add to cart for Magento
  static async addToCart({ line_items }: { line_items?: any }) {
    try {
      const response = await Http.post({
        key: 'add-to-cart',
        url: `/exp-sf-cms/api/magento/carts/items`,
        componentId: 'add-product-to-cart',
        enableSSR: false,
        config: {
          body: {
            cartItem: line_items,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getOrderById(orderId: string | number | null) {
    try {
      const response = await Http.get({
        key: 'get-orders',
        url: `/exp-sf-cms/api/magento/orders/${orderId}`,
        componentId: 'get-orders-by-id',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // update cart for Magento
  static async updateCart({
    itemId,
    line_item,
  }: {
    itemId?: any;
    line_item?: any;
  }) {
    try {
      const response = await Http.put({
        key: 'update-cart',
        url: `/exp-sf-cms/api/magento/carts/items/${itemId}`,
        componentId: 'update-product-in-cart',
        enableSSR: false,
        config: {
          body: {
            cartItem: line_item,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // delete Item In Cart for Magento
  static async deleteItemInCart({ itemId }: { itemId: any }) {
    try {
      await Http.delete({
        key: 'delete-item',
        url: `/exp-sf-cms/api/magento/carts/items/${encodeURIComponent(
          itemId
        )}`,
        componentId: 'delete-product-in-cart',
        enableSSR: false,
        config: {
          body: {},
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async getUserToken() {
    try {
      const response = await Http.get({
        key: 'initiate-checkout',
        url: '/exp-sf-cms/api/magento/generate/checkout-token',
        componentId: 'login-for-checkout',
        enableSSR: false,
      });
      /**
       * NOTE: Handling for "invalid credentials" when user session gets expired, at that time we are logging out user.
       */
      if (
        response.data?.Status === 'failure' &&
        response.data?.Error?.message?.toLowerCase() === 'invalid credentials!'
      ) {
        const logoutResponse = await AuthService.logout();
        if (logoutResponse?.Status !== 'failure') {
          AuthService.setUserDetails({});
          document.dispatchEvent(new Event('LOGOUT_SUCCESSFUL'));
          document.dispatchEvent(new Event('CART_REFRESH'));
          toast.error('You have been logged out. Please log in again.');
        }
        return { isSessionDestroyed: true };
      }

      if (
        response?.data?.data?.length &&
        response?.data?.data[0]?.checkoutSession
      ) {
        const userToken = response?.data?.data[0]?.checkoutSession;
        return { userToken };
      }
      return { errorMsg: 'Token Not Found' };
    } catch (error) {
      return { ...error, errorMsg: 'Token Not Found' };
    }
  }

  // initiate checkout: login for chekcout that return access token
  static async initCheckout() {
    try {
      /**
       * NOTE: Next 4 line we have commented out for checking that user session is not logged out or what, to check that we do need to make a call to get token.
       */
      // const currentTokenIsAvailable = Cookie.get('logUT') === 'true';
      // if (currentTokenIsAvailable) {
      //   return { msg: true };
      // }
      const response = await MagentoEcomm.getUserToken();
      if (response?.isSessionDestroyed) {
        return response;
      }
      if (response?.userToken?.length) {
        const baseUrl = CommonUtilities.getStoreURL();
        await Magento.loginInMagento(
          `${baseUrl}/experro/sso/login?checkouttoken=${response?.userToken}`
        );
        return { msg: true };
      }
    } catch (error) {
      return { msg: false, error };
    }
  }

  static async addCouponCode({ body }) {
    try {
      const response = await Http.put({
        key: 'add-coupon-code',
        url: `/exp-sf-cms/api/magento/cart/coupon/${body?.coupon_code}`,
        componentId: 'exp-add-coupon-code',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async removeAllCouponCode() {
    try {
      const response = await Http.delete({
        key: 'delete-coupon-code',
        url: `/exp-sf-cms/api/magento/cart/coupons`,
        componentId: 'exp-delete-coupon-code',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // _=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_WISHLIST_=_=_=_=_=_=_=_=_=_=
  // static async createWishlist({ body }) {
  //   // try {
  //   //   const response = await Http.post({
  //   //     key: 'create-wishlist',
  //   //     url: `/exp-sf-cms/api/magento/wishlists`,
  //   //     componentId: 'exp-create-wishlist',
  //   //     enableSSR: false,
  //   //     config: {
  //   //       body: body,
  //   //     },
  //   //   });
  //   //   return response.data;
  //   // } catch (e) {
  //   //   throw new Error(e);
  //   // }
  // }

  // static async updateWishlist(wishlistId, body) {
  //   // try {
  //   //   const response = await Http.put({
  //   //     key: 'update-wishlist',
  //   //     url: `/exp-sf-cms/api/magento/wishlists/${wishlistId}`,
  //   //     componentId: 'exp-update-wishlist',
  //   //     enableSSR: false,
  //   //     config: {
  //   //       body: body,
  //   //     },
  //   //   });
  //   //   return response.data;
  //   // } catch (e) {
  //   //   throw new Error(e);
  //   // }
  // }

  // static async deleteWishlist(wishlistId) {
  //   // try {
  //   //   const response = await Http.delete({
  //   //     key: 'delete-wishlist',
  //   //     url: `/exp-sf-cms/api/magento/wishlists/${wishlistId}`,
  //   //     componentId: 'exp-delete-wishlist',
  //   //     enableSSR: false,
  //   //   });
  //   //   return response.data;
  //   // } catch (e) {
  //   //   throw new Error(e);
  //   // }
  // }

  // static async getWishlistById(wishlistId) {
  //   // try {
  //   //   const response = await Http.get({
  //   //     key: 'get-wishlist',
  //   //     url: `/exp-sf-cms/api/magento/wishlists/${wishlistId}`,
  //   //     componentId: 'exp-get-wishlist',
  //   //     enableSSR: false,
  //   //   });
  //   //   return response.data;
  //   // } catch (e) {
  //   //   throw new Error(e);
  //   // }
  // }

  static async getAllWishlists() {
    try {
      const response = await Http.get({
        key: 'get-all-wishlist',
        url: `/exp-sf-cms/api/magento/wishlist`,
        componentId: 'exp-get-all-wishlist',
        enableSSR: false,
      });
      /**
       * NOTE: Handling for "invalid credentials" when user session gets expired, at that time we are logging out user.
       */
      if (
        response.data?.Status === 'failure' &&
        response.data?.Error?.message?.toLowerCase() === 'invalid credentials!'
      ) {
        const logoutResponse = await AuthService.logout();
        if (logoutResponse?.Status !== 'failure') {
          AuthService.setUserDetails({});
          document.dispatchEvent(new Event('LOGOUT_SUCCESSFUL'));
          document.dispatchEvent(new Event('CART_REFRESH'));
          toast.error('You have been logged out. Please log in again.');
        }
      }
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async addItemToWishlist({ body }) {
    try {
      const response = await Http.post({
        key: 'add-item-to-wishlist',
        url: `/exp-sf-cms/api/magento/wishlist/items/${body?.product_sku}`,
        componentId: 'exp-add-item-to-wishlist',
        enableSSR: false,
      });

      /**
       * NOTE: Handling for "invalid credentials" when user session gets expired, at that time we are logging out user.
       */
      if (
        response.data?.Status === 'failure' &&
        response.data?.Error?.message?.toLowerCase() === 'invalid credentials!'
      ) {
        const logoutResponse = await AuthService.logout();
        if (logoutResponse?.Status !== 'failure') {
          AuthService.setUserDetails({});
          document.dispatchEvent(new Event('LOGOUT_SUCCESSFUL'));
          document.dispatchEvent(new Event('CART_REFRESH'));
          toast.error('You have been logged out. Please log in again.');
        }
      }
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async deleteItemFromWishlistById({ itemId }) {
    try {
      const response = await Http.delete({
        key: 'add-item-to-wishlist', ///magento/wishlist/items/:itemId
        url: `/exp-sf-cms/api/magento/wishlist/items/${itemId}`,
        componentId: 'exp-add-item-to-wishlist',
        enableSSR: false,
      });
      /**
       * NOTE: Handling for "invalid credentials" when user session gets expired, at that time we are logging out user.
       */
      if (
        response.data?.Status === 'failure' &&
        response.data?.Error?.message?.toLowerCase() === 'invalid credentials!'
      ) {
        const logoutResponse = await AuthService.logout();
        if (logoutResponse?.Status !== 'failure') {
          AuthService.setUserDetails({});
          document.dispatchEvent(new Event('LOGOUT_SUCCESSFUL'));
          document.dispatchEvent(new Event('CART_REFRESH'));
          toast.error('You have been logged out. Please log in again.');
        }
      }
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async subscribeToNewsLetter(email) {
    try {
      const response = await Http.post({
        key: 'subscribe-to-news-letter',
        url: '/exp-sf-cms/api/magento/account/subscribe',
        componentId: 'news-letter',
        enableSSR: false,
        config: {
          body: {
            email: email,
          },
        },
      });

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
