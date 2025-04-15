import { Http } from "../../utilities";

type includesType =  'addresses'| 'storecredit'| 'attributes' | 'formfields'| 'shopper_profile_id' |'segment_ids';
export interface getCustomersDetailsType  {
  include?: includesType[]
}

export class BigCommerceEcomm {
  static async getCurrencies() {
    try {
      const response = await Http.get({
        key: 'bc',
        url: `/exp-sf-cms/api/bc/currencies`,
        componentId: 'currencies',
        enableSSR: true,
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
        url: `/exp-sf-cms/api/bc/cart?include=line_items.physical_items.options`,
        componentId: 'user-cart',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getAbandonedCart(token:string | null) {
    try {
      const response = await Http.get({
        key: 'get-cart',
        url: `/exp-sf-cms/api/bc/abandoned-cart/${token}`,
        componentId: 'user-abandoned-cart',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getCheckoutInfo(checkoutId: string) {
    try {
      const response = await Http.get({
        key: 'get-cart',
        url: `/exp-sf-cms/api/bc/checkout?checkoutId=${checkoutId}`,
        componentId: 'user-cart',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  
  static async getCartRedirectUrls() {
    try {
      const response = await Http.get({
        key: 'get-cart',
        url: `/exp-sf-cms/api/bc/cart?include=redirect_urls`,
        componentId: 'user-cart-redirect-urls',
        enableSSR: false,
      });
      if (response.data.error) {
        throw response.data.error;
      }
      const finalResponse = {
        ...response.data.redirect_urls,
        ...response.data
      }
      return finalResponse;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getOrderById(orderId: string|number) {
    try {
      const response = await Http.get({
        key: 'get-order',
        url: `/exp-sf-cms/api/bc/orders/${orderId}`,
        componentId: 'user-order-by-id',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // API to create the cart in BC and update the cart id in user's profile
  static async createCart({ customerId, line_items,gift_certificates, currency}: { customerId?: any, line_items?: any, gift_certificates?: any, currency?: { code: string }}) {
    try {
      const response = await Http.post({
        key: 'create-cart',
        url: `/exp-sf-cms/api/bc/carts`,
        componentId: 'user-cart-create',
        enableSSR: false,
        config: {
          body: {
            customer_id: customerId,
            line_items,
            gift_certificates,
            currency,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async updateCustomerId({ customerId, cartId }: { customerId?: any, cartId?: any }) {
    try {
      const response = await Http.put({
        key: 'update-user-in-cart',
        url: `/exp-sf-cms/api/bc/carts/update-customer`,
        componentId: 'update-user',
        enableSSR: false,
        config: {
          body: {
            customer_id: customerId,
            id: cartId,
          },
        },
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  static async addToCart({ line_items, gift_certificates, currency }: { line_items?: any ,gift_certificates?: any, currency?: { code: string }}) {
    try {
      const response = await Http.post({
        key: 'add-to-cart',
        url: `/exp-sf-cms/api/bc/carts/items`,
        componentId: 'add-product-to-cart',
        enableSSR: false,
        config: {
          body: {
            line_items,
            gift_certificates,
            currency,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async updateCart({ itemId, line_item }: { itemId?: any, line_item?: any }) {
    try {
      const response = await Http.put({
        key: 'update-cart',
        url: `/exp-sf-cms/api/bc/carts/items/${itemId}`,
        componentId: 'update-product-in-cart',
        enableSSR: false,
        config: {
          body: {
            line_item,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }



  static async deleteItemInCart({ itemId }: { itemId?: any }) {
    try {
      const response =  await Http.delete({
        key: 'delete-item',
        url: `/exp-sf-cms/api/bc/carts/items/${itemId}`,
        componentId: 'delete-product-in-cart',
        enableSSR: false,
        config: {
          body: {},
        },
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteCart() {
    try {
      const response = await Http.delete({
        key: "delete-cart",
        url: `/exp-sf-cms/api/bc/carts/`,
        componentId: "delete-cart",
        enableSSR: false,
        config: {
          body: {},
        },
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  static async getProductReviewsByProductId({ productId, skip, limit, status = '1', exclude_fields, include_fields }: { productId: string | number, skip: string , limit: string, status: '0' | '1', exclude_fields: string, include_fields: string }) {
    let url = `/exp-sf-cms/api/bc/products/${productId}/reviews?status=${status}`

    if(skip){
      url += `&page=${skip}`;
    }
    if(limit){
      url += `&limit=${limit}`;
    }
    if(exclude_fields){
      url += `&exclude_fields=${exclude_fields}`;
    }
    if(include_fields){
      url += `&include_fields=${include_fields}`;
    }

    try {
      const response = await Http.get({
        key: 'get-all-reviews',
        url: url,
        componentId: 'exp-all-reviews',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async updateProductReviewByProductIdAndReviewId({
    productId,
    reviewId,
  }) {
    try {
      const response = await Http.put({
        key: 'update-product-reviews',
        url: `/exp-sf-cms/api/bc/products/${productId}/reviews/${reviewId}`,
        componentId: 'exp-update-reviews',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async addProductReview({ productId, body }) {
    try {
      await Http.post({
        key: 'add-product-review',
        url: `/exp-sf-cms/api/bc/products/${productId}/reviews`,
        componentId: 'exp-add-product-review',
        enableSSR: false,
        config: {
          body: body,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async addCouponCode({ body }) {
    try {
      const response = await Http.post({
        key: 'add-coupon-code',
        url: `/exp-sf-cms/api/bc/checkouts/coupons`,
        componentId: 'exp-add-coupon-code',
        enableSSR: false,
        config: {
          body: body,
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async removeCouponCodeById({ couponId }) {
    try {
      const response = await Http.delete({
        key: 'delete-coupon-code',
        url: `/exp-sf-cms/api/bc/checkouts/coupons/${couponId}`,
        componentId: 'exp-delete-coupon-code',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async createWishlist({ body }) {
    try {
      const response = await Http.post({
        key: 'create-wishlist',
        url: `/exp-sf-cms/api/bc/wishlists`,
        componentId: 'exp-create-wishlist',
        enableSSR: false,
        config: {
          body: body,
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async updateWishlist(wishlistId, body) {
    try {
      const response = await Http.put({
        key: 'update-wishlist',
        url: `/exp-sf-cms/api/bc/wishlists/${wishlistId}`,
        componentId: 'exp-update-wishlist',
        enableSSR: false,
        config: {
          body: body,
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async deleteWishlist(wishlistId) {
    try {
      const response = await Http.delete({
        key: 'delete-wishlist',
        url: `/exp-sf-cms/api/bc/wishlists/${wishlistId}`,
        componentId: 'exp-delete-wishlist',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getAllWishlists() {
    try {
      const response = await Http.get({
        key: 'get-all-wishlist',
        url: `/exp-sf-cms/api/bc/wishlists`,
        componentId: 'exp-get-all-wishlist',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getWishlistById(wishlistId) {
    try {
      const response = await Http.get({
        key: 'get-wishlist',
        url: `/exp-sf-cms/api/bc/wishlists/${wishlistId}`,
        componentId: 'exp-get-wishlist',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async addItemToWishlist({ wishlistId, body }) {
    try {
      const response = await Http.post({
        key: 'add-item-to-wishlist',
        url: `/exp-sf-cms/api/bc/wishlists/${wishlistId}/items`,
        componentId: 'exp-add-item-to-wishlist',
        enableSSR: false,
        config: {
          body: body,
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async deleteItemFromWishlistById({ wishlistId, itemId }) {
    try {
      const response = await Http.delete({
        key: 'add-item-to-wishlist',
        url: `/exp-sf-cms/api/bc/wishlists/${wishlistId}/items/${itemId}`,
        componentId: 'exp-add-item-to-wishlist',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async subscribeToNewsLetter(email) {
    try {
      const response = await Http.post({
        key: 'subscribe-to-news-letter',
        url: '/exp-sf-cms/api/bc/news-letter/subscribe',
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
  static async getStoreLocations() {
    try {
      const response = await Http.get({
        key: 'get-locations',
        url: `/exp-sf-cms/api/bc/inventory/locations`,
        componentId: 'exp-get-locations',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  static async getGiftCertificateBalance(code: string) {
    try {
      const response = await Http.post({
        key: 'get-gift-card-balance',
        url: `/exp-sf-cms/api/bc/gift_certificates/check-balance`,
        componentId: 'exp-get-gift-card-balance',
        enableSSR: false,
        config: {
          body: {
            code: code,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  /**
   * @returns For logged in user it will give the userDetails with with attributes of bigcommerce
   */
     static async getCustomersDetails(args ?: getCustomersDetailsType) {
      try {
        let url = `/exp-sf-cms/api/bc/get-customer-details`;
        if(args?.include){
          url += `?include=${args?.include?.join(',')}`;
        }
        const response = await Http.get({
            key: 'customer-details',
            url: url,
            enableSSR: false,
          });
        if (response && response.data) {
          return response.data;
        } else {
          // throw new Error('ObjectNotFound');
        }
      } catch (e) {
        // throw new Error('ObjectNotFound');
      }
    }
  
    /**
     * @returns The attributes of the available from the bigcommerce.
     */
    static async getCustomerAttributes() {
      try {
        const url = `/exp-sf-cms/api/bc/get-customer-attributes`;
        const response = await Http.get({
            key: 'customer-details',
            url: url,
            enableSSR: false,
          });
        if (response && response.data) {
          return response.data;
        } else {
          // throw new Error('ObjectNotFound');
        }
      } catch (e) {
        // throw new Error('ObjectNotFound');
      }
    }
}
