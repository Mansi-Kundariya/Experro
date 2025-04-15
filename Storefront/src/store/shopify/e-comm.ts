import { Http } from '../../utilities';

export class ShopifyEcomm {
  static async getCart() {
    try {
      const response = await Http.get({
        key: 'get-cart',
        url: `/exp-sf-cms/api/shopify/cart`,
        componentId: 'user-cart',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // Create cart For Shopify
  static async createCart({ line_items }: { line_items?: any }) {
    try {
      const response = await Http.post({
        key: 'create-cart',
        url: `/exp-sf-cms/api/shopify/carts`,
        componentId: 'user-cart-create',
        enableSSR: false,
        config: {
          body: {
            lines: line_items,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // Add to cart for Shopify
  static async addToCart({ line_items }: { line_items?: any }) {
    try {
      const response = await Http.post({
        key: 'add-to-cart',
        url: `/exp-sf-cms/api/shopify/carts/items`,
        componentId: 'add-product-to-cart',
        enableSSR: false,
        config: {
          body: {
            lines: line_items,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // update cart for Shopify
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
        url: `/exp-sf-cms/api/shopify/carts/items/${encodeURIComponent(
          itemId
        )}`,
        componentId: 'update-product-in-cart',
        enableSSR: false,
        config: {
          body: {
            line: line_item,
          },
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  // delete Item In Cart for Shopify
  static async deleteItemInCart({ itemId }: { itemId: any }) {
    try {
      await Http.delete({
        key: 'delete-item',
        url: `/exp-sf-cms/api/shopify/carts/items/${encodeURIComponent(
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
  // create product at shopify store
  static async createProduct(product: any) {
    try {
      const response = await Http.post({
        key: 'create-product',
        url: `/exp-sf-cms/api/shopify/product`,
        componentId: 'create-product-store',
        enableSSR: false,
        config: {
          body: product,
        },
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
        url: '/exp-sf-cms/api/shopify/email-subscription/subscribe',
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

  static async unsubscribeToNewsLetter(email) {
    try {
      const response = await Http.post({
        key: 'subscribe-to-news-letter',
        url: '/exp-sf-cms/api/shopify/email-subscription/unsubscribe',
        componentId: 'unsubscribe-news-letter',
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
  static async getOrderById(orderId: string | number) {
    try {
      const response = await Http.get({
        key: 'get-order',
        url: `/exp-sf-cms/api/shopify/orders/${orderId}`,
        componentId: 'user-order-by-id',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
