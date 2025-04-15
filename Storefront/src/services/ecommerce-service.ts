/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUtilities, Http } from '../utilities';
import { ContentService } from './content-service';
import { BigCommerceEcomm, ShopifyEcomm } from '../store';
import { MagentoEcomm } from '../store/magento';
import { getCustomersDetailsType } from '../store/bigcommerce/e-comm';
import { responseParseByPath } from '../utilities/responseParserByPath';

interface ExpSearchProps {
  searchObj?: any;
  enableSSR?: boolean;
  isAuto?: boolean;
  searchTerm?: any;
  signal?: any;
  customerGroupId?: any;
}

interface ExpImageSearchProps {
  base64Image: string;
  skip?: number;
  limit?: number;
  fieldsToQuery: string  
}

interface ExpSearchCountProps {
  searchObj?: any;
  signal?: any;
  key?: any;
  componentId?: any;
  enableSSR?: any;
  customerGroupId?: any;
}

interface ExpSearchAutoSuggestProps {
  searchObj ?:any
  signal?:any
}

export  interface widgetSearchWidgetData {
  widget_id: string;
  context_type?: string;
  context_data?: string;
  custom_filter?: any;
  requested_user_id?: any;
  product_ids?: any;
}

export interface widgetSearchObject {
  skip?: string;
  limit?: string;
  fieldsToQuery?: string;
  widgetData: widgetSearchWidgetData;
  currency?: any;
  customerGroupId?: any;
}

declare const window: any;

const getStore: any = () => {
  const store = process.env.REACT_APP_STORE?.toLowerCase();
  if (store === 'shopify') {
    return ShopifyEcomm;
  } else if (store === 'magento') {
    return MagentoEcomm;
  } else {
    return BigCommerceEcomm;
  }
};

export class EcommerceService {

  static async getCurrencies() {
    try {
      return await getStore()?.getCurrencies()
    } catch(error) {
      console.error(error);
      return error
    }

  }

  static async getCart() {
    try {
      return await getStore()?.getCart()
    } catch(error) {
      console.error(error);
      return error
    }

  }

  static async getCartWithDiscountDetails() {
    try {
      return await getStore()?.getCartWithDiscountDetails()
    } catch(error) {
      console.error(error);
      return error
    }

  }

  static async getAbandonedCart(token:string | null){
    try {
      return await getStore()?.getAbandonedCart(token)
    } catch(error) {
      console.error(error);
      return error
    }
  }
  static async getCartRedirectUrls() {
    try {
      return await getStore()?.getCartRedirectUrls()
    } catch(error) {
      console.error(error);
      return error
    }

  }

  static async getOrderById(orderId: string|number) {
    try {
      return await getStore()?.getOrderById(orderId)
    } catch(error) {
      console.error(error);
      return error
    }
  }

  // API to create the cart in BC and update the cart id in user's profile
  static async createCart({ customerId, line_items,gift_certificates, currency}: { customerId?: any, line_items?: any ,gift_certificates?: any, currency?: { code: string }}) {
    try {
      return await getStore()?.createCart({ customerId, line_items: line_items ,gift_certificates: gift_certificates,currency: currency})
    } catch(error) {
      console.error(error);
      return error
    }

  }

  static async updateCustomerId({ customerId, cartId }: { customerId?: any, cartId?: any }) {
    try {
      return await getStore()?.updateCustomerId({ customerId, cartId })
    } catch(error) {
      console.error(error);
      return error
    }

  }

  static async initCheckout() {
    try {
      return await getStore()?.initCheckout();
    } catch (error) {
      return error;
    }
  }

  static async addToCart({
    line_items,
    gift_certificates,
    currency,
  }: {
    line_items?: any;
    gift_certificates?: any;
    currency?: { code: string };
  }) {
    try {
      return await getStore()?.addToCart({
        line_items: line_items,
        gift_certificates:gift_certificates,
        currency: currency,
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async updateCart({ itemId, line_item }: { itemId?: any, line_item?: any }) {
    try {
      return await getStore()?.updateCart({ itemId: itemId, line_item: line_item })
    } catch(error) {
      console.error(error);
      return error
    }

  }

  static async deleteItemInCart({ itemId }: { itemId?: any }) {
    try {
      return await getStore()?.deleteItemInCart({ itemId: itemId })
    } catch(error) {
      console.error(error);
      return error
    }

  }

  static async getProductByCollection({currency,field_name,field_value}){
    try{
      const url=`/apis/content/v1/collection/get-collection-data?field_name=${field_name}&field_value=${field_value}&currency=${currency}`

      const config = {
        key: 'getProductByCollection',
        url: url,
      };

      const response = await Http.get(config);
      return response.data;
    }
    catch(e){
      return e
    }
  }

  static async imageSearch({base64Image, skip=0, limit=5, fieldsToQuery}: ExpImageSearchProps){
    try {
      const searchUrl = `/apis/ecommerce-service/public/v1/image-search?skip=${skip}&limit=${limit}&fields=${fieldsToQuery}`;
      const searchConfig = {
        key: 'image-search',
        url: searchUrl,
        componentId: 'exp-image-search',
        enableSSR: false,
        config: {
          body: {
            image: base64Image
          },
        },
      }
      const response = await Http.post(searchConfig);
    return response.data;
  }catch (e){
    throw new Error(e)
  }
  }


  static async search({
    searchObj,
    enableSSR = true,
    isAuto = false,
    searchTerm,
    signal,
    customerGroupId,
  }: ExpSearchProps) {
    try {
      let searchUrl = `/apis/ecommerce-service/public/v1/search?fields=${searchObj?.fieldsToQuery}&isAuto=${isAuto}`;

      if (searchObj?.skip) {
        searchUrl += `&skip=${searchObj?.skip}`;
      }
      if (searchObj?.limit) {
        searchUrl += `&limit=${searchObj?.limit}`;
      }
      if (searchObj?.sortBy) {
        searchUrl += `&sort_by=${searchObj?.sortBy}`;
      }
      if (searchObj?.orderBy) {
        searchUrl = `${searchUrl}&order_by=${searchObj?.orderBy}`;
      }
      if (searchObj.byPassMerchandising) {
        searchUrl = `${searchUrl}&by_pass_merchandising=true`;
      }
      if (searchObj.byPassInventory) {
        searchUrl = `${searchUrl}&by_pass_inventory=true`;
      }
      if (searchTerm) {
        searchUrl = `${searchUrl}&searchTerm=${searchTerm}`;
      }
      if (searchObj?.currency) {
        searchUrl += `&currency=${searchObj?.currency}`;
      }
      if (searchObj?.locationId) {
        searchUrl += `&location_id=${searchObj?.locationId}`;
      }

      const searchConfig = {
        key: 'search',
        url: searchUrl,
        componentId: 'exp-search-api',
        enableSSR: false,
        config: {
          body: searchObj.body,
        },
      };

      if (customerGroupId) {
        searchConfig['customerGroupId'] = customerGroupId;
      }

      if (signal) {
        searchConfig['signal'] = signal;
      }
      const response = await Http.post(searchConfig);

      response?.data?.Data?.items.forEach((item: any) => {
        for (const i in item) {
          if (i.endsWith('_ej')) {
            if (typeof item[i] === 'string' && item[i]?.length) {
              try {
                item[i] = JSON.parse(item[i]);
              } catch (err) {
                console.error(err);
              }
            }
          }
        }
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async searchV2({
    searchObj,
    enableSSR = true,
    isAuto = false,
    searchTerm,
    signal,
  }: ExpSearchProps) {
    try {
      let searchUrl = `/apis/ecommerce-service/public/v2/search?fields=${searchObj?.fieldsToQuery}&isAuto=${isAuto}`;

      if (searchObj?.skip) {
        searchUrl += `&skip=${searchObj?.skip}`;
      }
      if (searchObj?.limit) {
        searchUrl += `&limit=${searchObj?.limit}`;
      }
      if (searchObj?.sortBy) {
        searchUrl += `&sort_by=${searchObj?.sortBy}`;
      }
      if (searchObj?.orderBy) {
        searchUrl = `${searchUrl}&order_by=${searchObj?.orderBy}`;
      }
      if (searchObj?.byPassMerchandising) {
        searchUrl = `${searchUrl}&by_pass_merchandising=true`;
      }
      if (searchObj?.byPassInventory) {
        searchUrl = `${searchUrl}&by_pass_inventory=true`;
      }
      if (searchTerm) {
        searchUrl = `${searchUrl}&searchTerm=${searchTerm}`;
      }
      const searchConfig = {
        key: 'search',
        url: searchUrl,
        componentId: 'exp-search-api',
        enableSSR: false,
        config: {
          body: searchObj.body,
        },
      };
      if (signal) {
        searchConfig['signal'] = signal;
      }
      const response = await Http.post(searchConfig);

       //We are making this call to parse the required stringyfied fields according to the path in the meta in response
       const parsedResponse =responseParseByPath(response);
      return parsedResponse.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async searchAutoSuggest({searchObj, signal}:ExpSearchAutoSuggestProps){
    try {
        const searchUrl = '/apis/merchandising-service/v1/public/search-auto-suggester-with-spellcheck';

        const searchAutoSuggestConfig = {
          key: 'search-auto-suggest',
          url: searchUrl,
          componentId: 'exp-search-api',
          enableSSR: false,
          config: {
            body: searchObj.body,
          },
        };
        if (signal) {
          searchAutoSuggestConfig['signal'] = signal
        }

      const response = await Http.post(searchAutoSuggestConfig);
      return response.data;

    } catch (e){
      throw new Error(e);
    }
  }
  static async searchAutoSuggestV2({
    searchObj,
    signal,
  }: ExpSearchAutoSuggestProps) {
    try {
      const searchUrl =
        '/apis/merchandising-service/v2/public/search-auto-suggester-with-spellcheck';

      const searchAutoSuggestConfig = {
        key: 'search-auto-suggest',
        url: searchUrl,
        componentId: 'exp-search-api',
        enableSSR: false,
        config: {
          body: searchObj.body,
        },
      };
      if (signal) {
        searchAutoSuggestConfig['signal'] = signal;
      }

      const response = await Http.post(searchAutoSuggestConfig);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getSearchCount({
    searchObj,
    key,
    componentId,
    enableSSR = true,
    signal,
    customerGroupId,
  }: ExpSearchCountProps) {
    try {
      let searchUrl = `/apis/ecommerce-service/public/v1/search/count?&sort_by=${searchObj?.sortBy}`;
      if (searchObj?.orderBy) {
        searchUrl = `${searchUrl}&order_by=${searchObj?.orderBy}`;
      }
      if (searchObj?.currency) {
        searchUrl += `&currency=${searchObj?.currency}`;
      }

      const searchCountConfig = {
        key: key,
        url: searchUrl,
        componentId: componentId,
        enableSSR: false,
        config: {
          body: searchObj.body,
        },
      };

      if (customerGroupId) {
        searchCountConfig['customerGroupId'] = customerGroupId;
      }

      if (signal) {
        searchCountConfig['signal'] = signal;
      }

      const response = await Http.post(searchCountConfig);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  static async getSearchCountV2({
    searchObj,
    key,
    componentId,
    enableSSR = true,
    signal,
    customerGroupId,
  }: ExpSearchCountProps) {
    try {
      let searchUrl = `/apis/ecommerce-service/public/v2/search/count?&sort_by=${searchObj?.sortBy}`;
      if (searchObj?.orderBy) {
        searchUrl = `${searchUrl}&order_by=${searchObj?.orderBy}`;
      }
      if (searchObj?.currency) {
        searchUrl += `&currency=${searchObj?.currency}`;
      }

      const searchCountConfig = {
        key: key,
        url: searchUrl,
        componentId: componentId,
        enableSSR: false,
        config: {
          body: searchObj.body,
        },
      };

      if (customerGroupId) {
        searchCountConfig['customerGroupId'] = customerGroupId;
      }

      if (signal) {
        searchCountConfig['signal'] = signal;
      }

      const response = await Http.post(searchCountConfig);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async facetedSearch({ searchObj }) {
    try {
      let url = `/apis/ecommerce-service/public/v1/search/facet?fields=${searchObj?.fieldsToQuery}&skip=${searchObj?.skip}&limit=${searchObj?.limit}`;

      if (searchObj?.currency) {
        url += `&currency=${searchObj?.currency}`;
      }

      const facetObj = {
        key: 'facet-search',
        url: url,
        componentId: 'exp-facet-api',
        enableSSR: false,
        config: {
          body: searchObj.body,
        },
      };

      if (searchObj.customerGroupId) {
        facetObj['customerGroupId'] = searchObj.customerGroup;
      }

      const response = await Http.post(facetObj);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async facetedSearchV2({ searchObj }) {
    try {
      const response = await Http.post({
        key: 'facet-search',
        url: `/apis/ecommerce-service/public/v2/search/facet?fields=${searchObj?.fieldsToQuery}&skip=${searchObj?.skip}&limit=${searchObj?.limit}`,
        componentId: 'exp-facet-api',
        enableSSR: false,
        config: {
          body: searchObj.body,
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getFacetByCategoryName(categoryName) {
    try {
      const response = await Http.get({
        key: 'get-facet-by-category',
        url: `/apis/ecommerce-service/public/v1/facets/category/${categoryName}`,
        componentId: 'exp-category-facet-api',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getFacetByCategoryNameV2(categoryName) {
    try {
      const response = await Http.get({
        key: 'get-facet-by-category',
        url: `/apis/ecommerce-service/public/v2/facets/category/${categoryName}`,
        componentId: 'exp-category-facet-api',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getCategoriesAndSubCategories(categoryId?: string) {
    let url = `/apis/merchandising-service/v1/public/category-list`;

    if(categoryId){
      url += `?category_id=${categoryId}`
    }
    try {
      const response = await Http.get({
        key: 'get-categories-and-sub-categories',
        url: url,
        componentId: 'exp-category-and-sub-categories',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getCategoriesAndSubCategoriesV2(categoryId?: string) {
    let url = `/apis/merchandising-service/v2/public/category-list`;

    if (categoryId) {
      url += `?category_id=${categoryId}`;
    }
    try {
      const response = await Http.get({
        key: 'get-categories-and-sub-categories',
        url: url,
        componentId: 'exp-category-and-sub-categories',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }


  static async getAllFacet() {
    try {
      const response = await Http.get({
        key: 'get-all-facets',
        url: '/apis/ecommerce-service/public/v1/facets',
        componentId: 'exp-all-facets-api',
        enableSSR: false,
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getProductReviewsByProductId({ productId, skip, limit  }: { productId?: any, skip?: any, limit?: any }) {
    try {
      return await getStore()?.getProductReviewsByProductId({ productId, skip, limit })
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async updateProductReviewByProductIdAndReviewId({
    productId,
    reviewId,
  }: {
    productId?: any,
    reviewId?: any,
  }) {
    try {
      return await getStore()?.updateProductReviewByProductIdAndReviewId({
        productId,
        reviewId,
      })
    } catch (error) {
      console.error(error);
      return error
    }

  }

  static async addProductReview({ productId, body }: { productId?: any, body?: any }) {
    try {
      return await getStore()?.addProductReview({ productId, body })
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async addCouponCode({ body }: { body?: any }) {
    try {
      return await getStore()?.addCouponCode({ body })
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async removeCouponCodeById({ couponId }: { couponId?: any }) {
    try {
      return await getStore()?.removeCouponCodeById({ couponId })
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async removeAllCouponCode() {
    try {
      return await getStore()?.removeAllCouponCode()
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async createWishlist({ body }: { body?: any }) {
    try {
      return await getStore()?.createWishlist({ body })
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async updateWishlist(wishlistId, body) {
    try {
      return await getStore()?.updateWishlist(wishlistId, body)
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async getCheckoutInfo(checkoutId: string) {
    try {
      return await getStore()?.getCheckoutInfo(checkoutId)
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async deleteWishlist(wishlistId) {
    try {
      return await getStore()?.deleteWishlist(wishlistId)
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async deleteCart() {
    try {
      return await getStore()?.deleteCart()
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async getAllWishlists() {
    try {
      return await getStore()?.getAllWishlists()
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async getWishlistById(wishlistId) {
    try {
      return await getStore()?.getWishlistById(wishlistId)
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async addItemToWishlist({ wishlistId, body }:{ wishlistId?: any, body: any }) {
    try {
      return await getStore()?.addItemToWishlist({ wishlistId, body })
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async deleteItemFromWishlistById({ wishlistId, itemId }: {wishlistId?: any, itemId: any}) {
    try {
      return await getStore()?.deleteItemFromWishlistById({ wishlistId, itemId })
    } catch(error) {
      console.error(error);
      return error
    }
  }

  static async searchProductByField({ fieldName, fieldValue, fieldsToQuery, filter }: { fieldName?: any, fieldValue?: any, fieldsToQuery?: any, filter?: string }) {
    const modelName = await this.getContentModelName({
      model: 'ecommerce_product',
    });
    const tmpProduct =
      await ContentService.getContentModelRecordsByFieldKeyValue({
        modelInternalName: modelName,
        fieldKey: fieldName,
        fieldValue: fieldValue,
        fieldsToQuery: fieldsToQuery,
        sortBy: '',
        sortType: '',
        filter: filter
      });
    return tmpProduct;
  }

  static async getContentModelName({ model }) {
    let storeHash = null;
    while (!storeHash) {
      storeHash = CommonUtilities.getStoreHash();
      await new Promise((resolve) => {
        setTimeout(resolve, 200)
      });
    }
    if (storeHash) {
      return model + '_' + storeHash;
    } else {
      return model;
    }
  }

  // static async jewelryBuilderBase64ImagePost({ headers, body }) {
  //   try {
  //     const response = await fetch(
  //       'https://ddl-staging.diamondsdirect.com/apis/product-service/v1/upload-base64-image',
  //       {
  //         method: 'POST',
  //         headers: headers,
  //         body: JSON.stringify(body),
  //       }
  //     );
  //     return response.json();
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
  static async getEcommerceModalFields() {
    const url = `/apis/ecommerce-service/public/v1/ecommerce-model-fields`;
    const response = await Http.get({ key: 'ecommerce-model-fields', url: url, });
    if (response.data.Status === 'success') { return response.data.Data; }
    else { throw new Error('ObjectNotFound'); }
  }
  static async getEcommerceModalValues(fieldName: string) {
    const url = `/apis/merchandising-service/public/v1/contents/content-fields/${fieldName}/values`;
    const response = await Http.get({ key: 'ecommerce-model-values', url: url, });
    if (response.data.Status === 'success') { return response.data.Data; }
    else { throw new Error('ObjectNotFound'); }
  }
  static async getAutoCompleteList({ searchObj }){
    try {
      const searchUrl = '/apis/merchandising-service/v1/public/search-autocomplete';
       const response = await Http.post({
        key: 'search',
        url: searchUrl,
        componentId: 'exp-autoComplete',
        enableSSR: false,
        config: {
          body: searchObj.body,
        },
      });
      return response.data;
    }catch(e){
      throw new Error(e)
    }
  }

  static async emailTemplateForms(formId: string, formMapping: any){
    try {
      const lang = CommonUtilities.getLanguage();
      const templateFormUrl = `/apis/setting-service/public/v1/forms/${formId}/submit?${lang ? `locale=${lang}` : ''}`;
      const response = await fetch(templateFormUrl, {
        method: 'POST',
        body: formMapping,
      });
      const responseData = await response.json();
      return responseData;
    }catch(e){
      throw new Error(e)
    }
  }

  static async subscribeToNewsLetter(email) {
    try {
      return await getStore()?.subscribeToNewsLetter(email);
    } catch (e) {
      throw new Error(e);
    }
  }

  static async unsubscribeToNewsLetter(email) {
    try {
      return await getStore()?.unsubscribeToNewsLetter(email);
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getUserLocation() {
    const url = '/apis/ecommerce-service/public/v1/location';
    try {
      const response = await Http.get({ key: 'location', url: url, });
       return response;
    }catch (e){
      throw new Error(e);
    }
  }

  static async getPersonalizationWidgetList(algorithmInternalName: any, fieldsToQuery?: string) {
    let url = `/apis/personalization-service/public/v1/widgets`;
    if(algorithmInternalName){
      url += `?algorithm_internal_name=${algorithmInternalName}`
    }
    if(fieldsToQuery){
      url += `&fields_to_query=${fieldsToQuery}`
    }
    const response = await Http.get({ key: 'personalization-widget-list', url: url, });
    if (response.data.Status === 'success') { return response.data; }
    else { throw new Error('ObjectNotFound'); }
  }

  static async widgetSearch(searchWidgetObject?:widgetSearchObject) {
    try{
      let widgetSearchUrl = `/apis/ecommerce-service/public/v1/widget-search?skip=${searchWidgetObject?.skip}&limit=${searchWidgetObject?.limit}`

      if (searchWidgetObject?.fieldsToQuery) {
        widgetSearchUrl += `&fields=${
          searchWidgetObject?.fieldsToQuery
            ? searchWidgetObject?.fieldsToQuery
            : '*'
        }`;
      }

      if (searchWidgetObject?.currency) {
        widgetSearchUrl += `&currency=${searchWidgetObject?.currency}`;
      }

      // resolve get_device_id() function if it is not present than pass empty string

      let device_id = '';

      try {
        if (window.location.hostname !== 'localhost') {
          device_id = window.ExpAnalytics.get_device_id();
        }
      } catch (error) {
        device_id = '';
      }

      const _body: any = {
        ...searchWidgetObject?.widgetData,
        requested_user_id: device_id,
      };

      const searchObj = {
        key: 'widget_search',
        url: widgetSearchUrl,
        componentId: 'exp-search-widget-api',
        enableSSR: false,
        config: {
          body: _body,
        },
      };

      if (searchWidgetObject?.customerGroupId) {
        searchObj['customerGroupId'] = searchWidgetObject?.customerGroupId;
      }

      const response = await Http.post(searchObj);

      response?.data?.Data?.items.forEach((item: any) => {
        for (const i in item) {
          if (i.endsWith('_ej')) {
            if (typeof item[i] === 'string' && item[i]?.length) {
              item[i] = JSON.parse(item[i]);
            }
          }
        }
      });
      return response.data;
    }catch (e){
      throw new Error(e);
    }
  }

  static async createProduct(product:any) {
    try {
      return await getStore()?.createProduct(product)
    } catch(error) {
      console.error(error);
      return error
    }
  }
  static async getStoreLocations() {
    try {
      return await getStore()?.getStoreLocations()
    } catch (error) {
      console.error(error);
      return error
    }
  }
  
  static async getGiftCertificateBalance(code:string) {
    try {
      return await getStore()?.getGiftCertificateBalance(code)
    } catch (error) {
      console.error(error);
      return error
    }
  }

  static async getCustomersDetails(args ?: getCustomersDetailsType) {
    try {
      return await getStore()?.getCustomersDetails(args)
    } catch (error) {
      return error
    }
}
    

  static async getCustomerAttributes() {
    try {
      return await getStore()?.getCustomerAttributes()
    } catch (error) {
      return error
    }
  }
}
