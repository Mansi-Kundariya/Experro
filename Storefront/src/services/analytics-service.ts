/* eslint-disable @typescript-eslint/no-unused-vars */
import {CommonUtilities} from "../utilities";

declare const window: any;
const fixedEvents = [
  'product_searched',
  'product_viewed',
  'category_viewed',
  'product_added_to_cart',
  'product_removed_from_cart',
  'product_purchased',
  'cart_viewed',
  'checkout_initiated',
  'checkout_completed',
  'widget_loaded',
  'widget_viewed',
  'product_varient_viewed',
  'web_vitals_fcp',
  'web_vitals_lcp',
  'web_vitals_ttfb',
  'web_vitals_cls',
  'web_vitals_fid',
  'web_vitals_inp'
];

export class AnalyticsService {
  static isAnalyticsEnabled() {
    return !CommonUtilities.isRenderingOnServer() && !CommonUtilities.isRenderingInHeadlessBrowser() && window.ExpAnalytics;
  }

  static async isGAEnabled() {
    if (!CommonUtilities.isRenderingOnServer() && !CommonUtilities.isRenderingInHeadlessBrowser()) {
      if (!window.gtag) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(window.gtag ? true : false);
          }, 400)
        });
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  static themeCurrency() {
    if (process.env.REACT_APP_CURRENCY_FOR_ANALYTICS) {
      return process.env.REACT_APP_CURRENCY_FOR_ANALYTICS
    } else {
      return 'USD'
    }
  }

  static gTagCurrency() {
    try {
      if (CommonUtilities.getCurrency()) {
        const currentCurrency = CommonUtilities.getCurrency();
        return currentCurrency?.currency_code
      } else {
        return 'USD'
      }
    } catch (error) {
      return 'USD'
    }
  }

  static async login(email:any, sourceType?:string, loginMethod?:string) {
    if (this.isAnalyticsEnabled() && window.location.hostname !== 'localhost') {
      try {
        const userId = window?.ExpAnalytics?.get_device_id();
        if (userId !== email) {
          window.ExpAnalytics.change_id(email, true);
          window.ExpAnalytics.q.push(['change_id', email, true]);

          if (sourceType || loginMethod) {            
            this.trackEvent({
              eventName: 'customer_login',
              dur: 0,
              sum: 0,
              count: 1,
              eventData: {
                customer_email: email,
                login_page_url: window.location.pathname,
                source_type: sourceType,
                login_method: loginMethod
              },
            });
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (await this.isGAEnabled()) {
      window.gtag('set', 'user_id', email);
      window.gtag("event", "login", {method: "Website"});
    }
  }

  static async logout() {
    if (this.isAnalyticsEnabled()) {
      try {
        const userId = window?.ExpAnalytics?.get_device_id();
        const newDeviceId = CommonUtilities.generateUUID();
        this.trackEvent({
          eventName: 'customer_logout',
          dur: 0,
          sum: 0,
          count: 1,
          eventData: {
            customer_email: userId,
          },
        });
        window.ExpAnalytics.change_id(newDeviceId, false);
        window.ExpAnalytics.q.push(['change_id', newDeviceId, false]);
        if (window._exp_bc_) {
          window._exp_bc_.postMessage({
            "event": "MULTI_TAB_LOGOUT_SUCCESSFUL"
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  static async updateUserDetails(userDetails) {
    if (this.isAnalyticsEnabled()) {

      const { name, username, email, company, phone, ...customDetails } = userDetails;
      delete customDetails?.id
    // Transform the values of customDetails to strings if they are numeric.
    const convertedCustomDetails = {};
    for (const key in customDetails) {
      if (customDetails[key]) {
        convertedCustomDetails[key] = typeof customDetails[key] === 'number' ? customDetails[key].toString() : customDetails[key];
      }
    }
      const updatedUserDetails = {
        name,
        username,
        email,
        organization:company,
        phone,
        custom:convertedCustomDetails,
      };
      if(window.ExpAnalytics) {
        try {
          const deviceId = window.ExpAnalytics.get_device_id();
          if(updatedUserDetails?.email == deviceId) {
            window.ExpAnalytics.q.push(['user_details', updatedUserDetails]);
          }
        } catch (e) {
          return true;
        }
      }
    }
    if (await this.isGAEnabled()) {
      window.gtag('set', 'user_properties', userDetails);
    }
  }

  static trackPageView({pageTitle, pageUrl}) {
    if (this.isAnalyticsEnabled()) {
      window.ExpAnalytics.q.push(['track_pageview']);
    }
  }

  static async trackEvent({eventName, count, sum, dur, eventData}) {
    if (this.isAnalyticsEnabled()) {
      window.ExpAnalytics.q.push(['add_event', {
        "key": eventName,
        "count": count ? count : 1,
        "sum": sum ? sum : 0,
        "dur": dur ? dur : 0,
        "segmentation": eventData ? eventData : {}
      }])
    }
    if (await this.isGAEnabled() && fixedEvents.indexOf(eventName) === -1) {
      window.gtag('event', eventName, eventData);
    }
  }

  static async trackProductSearched({search_location, searchTerm, noOfResults, sku, products_detail}: {search_location?:string, searchTerm: string | undefined, noOfResults: number | undefined, sku?: string[], products_detail?: string[] | undefined}) {
    if (noOfResults === 0) {
      this.trackEvent({
        eventName: 'product_searched_zero_result',
        dur: 0,
        sum: noOfResults,
        count: 1,
        eventData: {
          search_location: search_location,
          search_term: searchTerm,
          currency:this.themeCurrency(),
        }
      });
    } else {
      this.trackEvent({
        eventName: 'product_searched',
        dur: 0,
        sum: noOfResults,
        count: 1,
        eventData: {
          search_term: searchTerm,
          search_location: search_location,
          products_detail:products_detail,
          sku: sku,
          currency:this.themeCurrency(),
        }
      });
    }

    if (await this.isGAEnabled()) {
      window.gtag('set', 'page_title', 'Search');
      window.gtag("event", "search", {
        search_term: searchTerm
      });
    }
  }

  static async trackWidgetViewed ({noOfResults, products_detail, sku, algorithm, rule, rule_type, widget_id, context_type, context_data,category, variant, pageType, pageMetaId, pageDisplayName}:any) {
    this.trackEvent({
      eventName: 'widget_viewed',
      dur: 0,
      sum: noOfResults,
      count: 1,
      eventData: {
        products_detail: products_detail,
        sku: sku,
        algorithm: algorithm,
        rule:rule,
        rule_type:rule_type,
        widget_id:widget_id,
        context_type:context_type,
        context_data:context_data,
        category:category,
        variant:variant,
        page_type:pageType,
        page_meta_id:pageMetaId,
        page_meta_display_name:pageDisplayName,
        currency:this.themeCurrency(),
      }
    });
  }

  static async trackProductViewed({sku, mode, searchTerm,search_location, category, price, name, brand, productCategories, is_primary_algorithm, is_secondary_algorithm, algorithm, is_merchandising, rule, rule_type, widget_id, context_type, context_data, variant, rules, mode_details,product_option}:any) {
    const eventData = {
      sku: sku,
      name: name,
      price: price,
      mode: mode,
      search_term: searchTerm,
      search_location:search_location,
      category: category,
      product_option:product_option,
      is_primary_algorithm: is_primary_algorithm,
      is_secondary_algorithm:is_secondary_algorithm,
      algorithm: algorithm,
      is_merchandising:is_merchandising,
      rule:rule,
      rule_type:rule_type,
      widget_id:widget_id,
      context_type:context_type,
      context_data:context_data,
      variant:variant,
      rules:rules,
      product_category: productCategories,
      mode_details:mode_details,
      currency:this.themeCurrency(),
    };
    this.trackEvent({
      eventName: 'product_viewed',
      dur: 0,
      sum: 0,
      count: 1,
      eventData
    });
    if (await this.isGAEnabled()) {
      const item = {
        item_id: sku,
        item_name: name,
        currency: this.gTagCurrency(),
        item_brand: brand,
        price: price,
        quantity: 1,
        discount: 0
      };
      if (productCategories) {
        try {
          const maxCategoriesToConsider = productCategories.length > 5 ? 5 : productCategories.length;
          let seq = 1;
          for (let j = 0; j < maxCategoriesToConsider; j++) {
            if (productCategories[j] != 'All') {
              item[`item_category${seq > 1 ? seq : ''}`] = productCategories[j]?.name;
              seq++;
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
      window.gtag("event", "view_item", {
        currency: this.gTagCurrency(),
        value: price,
        items: [
          item
        ]
      });
    }
    return;
  }
  static async trackProductVarientViewed({sku, mode, searchTerm,search_location, category, price, name, brand, productCategories, is_primary_algorithm, is_secondary_algorithm, algorithm, is_merchandising, rule, rule_type, widget_id, context_type, context_data, variant, rules, mode_details,product_option}:any) {
    const eventData = {
      sku: sku,
      name: name,
      price: price,
      mode: mode,
      search_term: searchTerm,
      search_location:search_location,
      category: category,
      product_option:product_option,
      is_primary_algorithm: is_primary_algorithm,
      is_secondary_algorithm:is_secondary_algorithm,
      algorithm: algorithm,
      is_merchandising:is_merchandising,
      rule:rule,
      rule_type:rule_type,
      widget_id:widget_id,
      context_type:context_type,
      context_data:context_data,
      variant:variant,
      rules:rules,
      product_category: productCategories,
      mode_details:mode_details,
      currency:this.themeCurrency(),
    };
    this.trackEvent({
      eventName: 'product_varient_viewed',
      dur: 0,
      sum: 0,
      count: 1,
      eventData
    });
    }

  static async trackCategoryViewed({categoryName, items, categoryId,provider_id_esi, sku, products_detail}: {categoryName: string, items: any, categoryId: string,provider_id_esi:string, sku?: string[], products_detail?:string[] | undefined}) {
    this.trackEvent({
      eventName: 'category_viewed',
      count: 1,
      sum: 0,
      dur: 0,
      eventData: {
        category_id:categoryId,
        category_name: categoryName,
        sku: sku,
        products_detail:products_detail,
        currency:this.themeCurrency(),
      }
    });
    if (await this.isGAEnabled()) {
      const categoryItems = [];
      for (let i = 0; i < items.length; i++) {
        const item = {
          item_id: items[i].sku_esi,
          item_name: items[i].name || items[i].name_eti || items[i].name_esi,
          item_brand: items[i].brand_esi ? items[i].brand_esi : '',
          price: items[i].calculated_price_efi,
          quantity: 1,
          item_category: categoryName,
          item_list_id: provider_id_esi,
          item_list_name: categoryName,
          discount: 0,
          currency: this.gTagCurrency(),
          index: i + 1
        };
        if (items[i].categories_esai) {
          try {
            const maxCategoriesToConsider = items[i].categories_esai.length > 5 ? 5 : items[i].categories_esai.length;
            let seq = 2;
            for (let j = 0; j < maxCategoriesToConsider; j++) {
              if (items[i].categories_esai[j] != categoryName && items[i].categories_esai[j] != 'All') {
                item[`item_category${seq}`] = items[i].categories_esai[j];
                seq++;
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
        categoryItems.push(item);
      }
      window.gtag("event", "view_item_list", {
        currency: this.gTagCurrency(),
        item_list_id: provider_id_esi,
        item_list_name: categoryName,
        items: categoryItems
      });
    }

  }

  static async trackProductAddedToCart({
                                         sku,
                                         variantSku,
                                         mode,
                                        //  widgetId,
                                         searchTerm,
                                         search_location,
                                         category,
                                         totalValue,
                                         quantity,
                                         price,
                                         name,
                                         brand,
                                         productCategories,
                                         is_primary_algorithm,
                                         is_secondary_algorithm,
                                         algorithm,
                                         is_merchandising,
                                         rule,
                                         rule_type,
                                         widget_id,
                                         context_type,
                                         context_data,
                                         variant,
                                         rules,
                                         mode_details,
                                         product_option
                                       }:any) {
    if (!mode) {
      mode = 'direct'
    }
    const eventData: any = {
      sku,
      variant_sku: variantSku,
      mode,
      quantity,
      is_primary_algorithm,
      is_secondary_algorithm,
      algorithm,
      is_merchandising,
      rule,
      rule_type,
      context_type,
      context_data,
      variant,
      rules,
      product_category: productCategories,
      mode_details:mode_details,
      product_option:product_option,
      currency:this.themeCurrency(),
    };
    if (widget_id) {
      eventData.widget_id = widget_id;
    }
    if (searchTerm) {
      eventData.search_term = searchTerm;
    }
    if (search_location) {
      eventData.search_location = search_location;
    }
    if (category) {
      eventData.category = category;
    }
    this.trackEvent({
      eventName: 'product_added_to_cart',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData
    });
    const item =  {
        item_id: sku,
        item_name: name,
        currency: this.gTagCurrency(),
        item_brand: brand,
        price: price,
        quantity: quantity
    }

    if (productCategories) {
      try {
        const maxCategoriesToConsider = productCategories.length > 5 ? 5 : productCategories.length;
        let seq = 1;
        for (let j = 0; j < maxCategoriesToConsider; j++) {
          if (productCategories[j] != 'All') {
            item[`item_category${seq > 1 ? seq : ''}`] = productCategories[j]?.name;
            seq++;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (await this.isGAEnabled()) {
      window.gtag("event", "add_to_cart", {
        currency: this.gTagCurrency(),
        value: totalValue,
        items: [ item ]
      });
    }
  }

  static async trackProductRemovedFromCart({
                                       sku,
                                       name,
                                       brand,
                                       price,
                                       totalValue,
                                       quantity,
                                       productCategories,
                                       variant_sku,
                                       searchTerm,
                                       category,
                                       search_location,
                                       is_primary_algorithm,
                                       is_secondary_algorithm,
                                       algorithm,
                                       is_merchandising,
                                       rule,
                                       rule_type,
                                       widget_id,
                                       context_type,
                                       context_data,
                                       variant,
                                       rules,
                                       mode_details,
                                       product_option,
                                     }:any) {
  const eventData:any = {
    sku,
    quantity,
    variant_sku,
    is_primary_algorithm,
    is_secondary_algorithm,
    algorithm,
    is_merchandising,
    rule,
    rule_type,
    widget_id,
    context_type,
    context_data,
    variant,
    rules,
    product_category: productCategories,
    mode_details:mode_details,
    product_option:product_option,
    currency:this.themeCurrency(),
  };
  if (searchTerm) {
    eventData.search_term = searchTerm;
  }
  if (search_location) {
    eventData.search_location = search_location;
  }
  if (category) {
    eventData.category = category;
  }
    this.trackEvent({
      eventName: 'product_removed_from_cart',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData
  });

  if (await this.isGAEnabled()) {
    const item =  {
      item_id: sku,
      item_name: name,
      currency: this.gTagCurrency(),
      item_brand: brand,
      price: price,
      quantity: quantity
  }

  if (productCategories) {
    try {
      const maxCategoriesToConsider = productCategories.length > 5 ? 5 : productCategories.length;
      let seq = 1;
      for (let j = 0; j < maxCategoriesToConsider; j++) {
        if (productCategories[j] != 'All') {
          item[`item_category${seq > 1 ? seq : ''}`] = productCategories[j]?.name;
          seq++;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
    window.gtag("event", "product_removed_from_cart", {
      currency: this.gTagCurrency(),
      value: totalValue,
      items: [ item ]
    });
  }
  }

  static async trackCartViewed({totalValue, totalQuantity,cartId, baseAmount, cartAmount, discountAmount, items, products}) {
    this.trackEvent({
      eventName: 'cart_viewed',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData: {
        quantity: totalQuantity,
        cart_id:cartId,
        base_amount:baseAmount,
        cart_amount:cartAmount,
        discount_amount:discountAmount,
        products,
        currency:this.themeCurrency(),
      }
    });

    if (await this.isGAEnabled()) {
      const cartItems = [];
      for (let i = 0; i < items.length; i++) {
        cartItems.push({
          item_id: items[i].sku_esi || items[i].sku,
          item_name: items[i].name,
          item_brand: items[i].brand_esi,
          price: items[i].sale_price,
          quantity: items[i].quantity
        });
      }
      window.gtag("event", "view_cart", {
        currency: this.gTagCurrency(),
        value: totalValue,
        items: cartItems
      });
    }
  }

  static async trackCheckoutInitiated({items, totalValue, cartId,totalQuantity,products}:any) {
     this.trackEvent({
      eventName: 'checkout_initiated',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData: {
        cart_id:cartId,
        quantity: totalQuantity,
        amount:totalValue,
        products,
        currency:this.themeCurrency(),
      }
    });
    if (await this.isGAEnabled()) {
      const cartItems = [];
      for (let i = 0; i < items?.length; i++) {
        cartItems.push({
          item_id: items[i]?.sku_esi || items[i]?.sku,
          item_name: items[i]?.name,
          item_brand: items[i]?.brand_esi,
          price: items[i]?.sale_price || items[i]?.salePrice,
          quantity: items[i]?.quantity,
        });
      }
      window.gtag('event', 'checkout_initiated', {
        currency: this.gTagCurrency(),
        value: totalValue,
        items: cartItems,
      });
    }
  }

  static async trackCheckoutCompleted({items, totalValue, cartId, orderId,totalQuantity,subtotal_tax,currency_code,base_handling_cost,base_shipping_cost,discount_amount,handling_cost_ex_tax,shipping_cost_ex_tax,subtotal_ex_tax,total_ex_tax,wrapping_cost_ex_tax,payment_method,shipping_method,products}:any) {
     this.trackEvent({
      eventName: 'checkout_completed',
      count: 1,
      sum: totalValue,
      dur: 0,
      eventData: {
        cart_id:cartId,
        order_id:orderId,
        quantity: totalQuantity,
        amount:totalValue,
        subtotal_tax:subtotal_tax,
        currency_code:currency_code,
        base_handling_cost:base_handling_cost,
        base_shipping_cost:base_shipping_cost,
        discount_amount:discount_amount,
        handling_cost_ex_tax:handling_cost_ex_tax,
        shipping_cost_ex_tax:shipping_cost_ex_tax,
        subtotal_ex_tax:subtotal_ex_tax,
        total_ex_tax:total_ex_tax,
        wrapping_cost_ex_tax:wrapping_cost_ex_tax,
        payment_method:payment_method,
        shipping_method:shipping_method,
        products,
        currency:this.themeCurrency(),
      }
    });
    setTimeout(async () => {
      if (await this.isGAEnabled()) {
        const cartItems = [];
        for (let i = 0; i < items?.length; i++) {
          cartItems.push({
            item_id: items[i]?.sku_esi || items[i]?.sku,
            item_name: items[i]?.name,
            item_brand: items[i]?.brand_esi,
            price: items[i]?.sale_price || items[i]?.salePrice,
            quantity: items[i]?.quantity,
          });
        }
        window.gtag('event', 'checkout_completed', {
          currency: this.gTagCurrency(),
          value: totalValue,
          items: cartItems,
        });
      }
    }, 500);
  }

  static async trackWidgetLoaded({widgetId, widgetName, type, algorithm}) {
    return this.trackEvent({
      eventName: 'widget_loaded',
      count: 1,
      sum: 0,
      dur: 0,
      eventData: {
        widget_id: widgetId,
        widget_name: widgetName,
        type: type,
        algorithm: algorithm
      }
    });
  }
}
