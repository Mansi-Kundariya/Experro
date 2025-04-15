import { useState, useEffect } from 'react';
import {
  EcommerceService,
  useNavigate,
  AnalyticsService,
  AuthService,
  CommonUtilities,
} from 'experro-storefront';

declare let window: any;

const ExpCheckoutController = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [checkoutError, setCheckoutError] = useState<any>('');
  let cartObj: any;

  const analyticsProductsForCheckoutInitiated = (cartObj: any) => {
    const products: any = [];
    let analyticisData: any = [];
    if (localStorage.getItem('a_d_')) {
      analyticisData = JSON.parse(localStorage.getItem('a_d_') as string);
    }
    for (const elem of cartObj?.line_items?.physical_items) {
      // eslint-disable-next-line
      const data = analyticisData?.find((item: any) => {
        if (item.sku === elem.sku || item.varientSku === elem.sku) {
          return item;
        }
      });
      let tempAnalyticsProduct: any = {};

      if (data) {
        const modeDetails: any = {
          search_term: data?.searchTerm,
          search_location: data?.search_location,
          category: data?.category,
          is_primary_algorithm: data?.is_primary_algorithm,
          is_secondary_algorithm: data?.is_secondary_algorithm,
          algorithm: data?.algorithm,
          is_merchandising: data?.is_merchandising,
          rule: data?.rule,
          rule_type: data?.rule_type,
          widget_id: data?.widget_id,
          context_type: data?.context_type,
          context_data: data?.context_data,
          variant: data?.variant,
          rules: data?.rules,
        };
        tempAnalyticsProduct = {
          sku: data?.sku_for_analytics_esli,
          product_category: data?.product_categories,
          variant_sku: elem?.sku,
          mode: data?.mode || 'direct',
          search_term: data?.searchTerm,
          category: data?.category,
          totalValue: elem.extended_sale_price,
          total_value: elem.extended_sale_price,
          coupon_amount: elem?.coupon_amount,
          discount_amount: elem?.discount_amount,
          extended_list_price: elem?.extended_list_price,
          extended_sale_price: elem?.extended_sale_price,
          list_price: elem?.list_price,
          sale_price: elem?.sale_price,
          original_price: elem?.original_price,
          quantity: elem.quantity,
          search_location: data?.search_location,
          is_primary_algorithm: data?.is_primary_algorithm,
          is_secondary_algorithm: data?.is_secondary_algorithm,
          algorithm: data?.algorithm,
          is_merchandising: data?.is_merchandising,
          rule: data?.rule,
          rule_type: data?.rule_type,
          widget_id: data?.widget_id,
          context_type: data?.context_type,
          context_data: data?.context_data,
          variant: data?.variant,
          rules: data?.rules,
          mode_details: modeDetails,
        };
      }
      products.push(tempAnalyticsProduct);
    }
    return products;
  };

  const analyticsProducts = async (productItems: any) => {
    const products: any = [];
    let analyticisData: any = [];

    if (localStorage.getItem('a_d_')) {
      analyticisData = JSON.parse(localStorage.getItem('a_d_') as string);
    }
    try {
      for (const elem of productItems) {
        const data = analyticisData?.find((item: any) => {
          if (item?.sku === elem?.sku || item?.varientSku === elem?.sku) {
            return item;
          }
        });

        let tempAnalyticsProduct: any = {};
        const productOptions: any = [];

        if (elem?.product_options?.length) {
          elem?.product_options?.forEach((productOption: any) => {
            const tempOption: any = {};
            tempOption['name'] = productOption?.display_name;
            tempOption['value'] = productOption?.display_value;
            productOptions.push(tempOption);
          });
        }
        if (data && elem) {
          const modeDetails: any = {
            search_term: data?.searchTerm,
            search_location: data?.search_location,
            category: data?.category,
            is_primary_algorithm: data?.is_primary_algorithm,
            is_secondary_algorithm: data?.is_secondary_algorithm,
            algorithm: data?.algorithm,
            is_merchandising: data?.is_merchandising,
            rule: data?.rule,
            rule_type: data?.rule_type,
            widget_id: data?.widget_id,
            context_type: data?.context_type,
            context_data: data?.context_data,
            variant: data?.variant,
            rules: data?.rules,
          };
          tempAnalyticsProduct = {
            sku: data?.sku_for_analytics_esli,
            product_category: data?.product_categories,
            variant_sku: elem?.sku,
            mode: data?.mode || 'direct',
            search_term: data?.searchTerm,
            category: data?.category,
            totalValue: elem?.base_total || elem?.extendedSalePrice,
            total_value: elem?.base_total || elem?.extendedSalePrice,
            quantity: elem?.quantity,
            search_location: data?.search_location,
            is_primary_algorithm: data?.is_primary_algorithm,
            is_secondary_algorithm: data?.is_secondary_algorithm,
            algorithm: data?.algorithm,
            is_merchandising: data?.is_merchandising,
            rule: data?.rule,
            rule_type: data?.rule_type,
            widget_id: data?.widget_id,
            context_type: data?.context_type,
            context_data: data?.context_data,
            variant: data?.variant,
            rules: data?.rules,
            mode_details: modeDetails,
            product_option: productOptions,
            applied_discounts: elem?.applied_discounts || elem?.discounts,
            fixed_shipping_cost: elem?.fixed_shipping_cost,
            base_wrapping_cost: elem?.base_wrapping_cost,
            wrapping_cost_ex_tax: elem?.wrapping_cost_ex_tax,
            price_ex_tax: elem?.price_ex_tax || elem?.salePrice,
            total_ex_tax: elem?.total_ex_tax || elem?.extendedSalePrice,
            base_cost_price: elem?.base_cost_price,
            cost_price_ex_tax: elem?.cost_price_ex_tax,
          };
        } else if (!data) {
          const apiProdutsData: any = await EcommerceService.search({
            searchObj: {
              body: {
                filter: { fq: `(provider_id_esi:${elem?.product_id})` },
              },
              fieldsToQuery:
                'brand_esi,brand_page_slug_esi,calculated_price_efi,categories_esai,category_meta_ej,category_tree_ej,custom_url,id,images_ej,name_eti,page_slug_esi,price_efi,provider_id_esi,provider_specific_data_ej,retail_price_ef,reviews_count_eii,reviews_rating_sum_eii,sale_price_efi,sku_esi,sku_for_analytics_esli,variant_options_ej,variants_ej',
              skip: 0,
              limit: 1,
              byPassMerchandising: true,
            },
          });
          if (
            apiProdutsData?.Data?.items?.[0] &&
            apiProdutsData?.Data?.items?.[0]?.sku_for_analytics_esli
          ) {
            elem['sku_for_analytics_esli'] =
              apiProdutsData?.Data?.items?.[0]?.sku_for_analytics_esli;
          }
          if (
            apiProdutsData?.Data?.items?.[0] &&
            apiProdutsData?.Data?.items?.[0]?.category_meta_ej
          ) {
            elem['product_categories'] =
              apiProdutsData?.Data?.items?.[0]?.category_meta_ej;
          }
          tempAnalyticsProduct = {
            sku: elem?.sku_for_analytics_esli,
            product_category: elem?.product_categories,
            variant_sku: elem?.sku,
            totalValue: elem?.base_total || elem?.extendedSalePrice,
            total_value: elem?.base_total || elem?.extendedSalePrice,
            quantity: elem?.quantity,
            mode: 'direct',
            mode_details: {},
            product_option: productOptions,
            applied_discounts: elem?.applied_discounts || elem?.discounts,
            fixed_shipping_cost: elem?.fixed_shipping_cost,
            base_wrapping_cost: elem?.base_wrapping_cost,
            wrapping_cost_ex_tax: elem?.wrapping_cost_ex_tax,
            price_ex_tax: elem?.price_ex_tax || elem?.salePrice,
            total_ex_tax: elem?.total_ex_tax || elem?.extendedSalePrice,
            base_cost_price: elem?.base_cost_price,
            cost_price_ex_tax: elem?.cost_price_ex_tax,
          };
        }
        products.push(tempAnalyticsProduct);
      }
    } catch (err) {
      console.error('err', err);
    }
    return products;
  };
  const ExpBCCheckoutIframeHandler = async (event: any) => {
    if (event) {
      try {
        if (
          event.data &&
          event.data.event === 'EXP_ORDER_DATA' &&
          event.data.orderData
        ) {
          const orderDetails: any = event.data.orderData;
          const userDetails = await AuthService.getUserDetails();

          if (orderDetails && orderDetails?.orderId) {
            const orderResponse = await EcommerceService.getOrderById(
              orderDetails?.orderId
            );

            // Update the Analytics device ID when triggering the checkout completed event.
            if (orderResponse && orderResponse?.billing_address?.email) {
              AnalyticsService?.login(orderResponse?.billing_address?.email);
            } else if (orderDetails && orderDetails?.billingAddress) {
              AnalyticsService?.login(orderResponse?.billingAddress?.email);
            }

            let trackProducts: any;
            if (
              orderResponse?.consignments?.[0]?.shipping &&
              orderResponse?.consignments?.[0]?.shipping?.length &&
              orderResponse?.consignments?.[0]?.shipping?.[0]?.line_items
            ) {
              trackProducts =
                orderResponse?.consignments?.[0]?.shipping[0]?.line_items;
            } else if (
              orderResponse?.consignments?.[0]?.pickups &&
              orderResponse?.consignments?.[0]?.pickups?.length &&
              orderResponse?.consignments?.[0]?.pickups?.[0]?.line_items
            ) {
              trackProducts =
                orderResponse?.consignments?.[0]?.pickups?.[0]?.line_items;
            } else {
              trackProducts = orderDetails?.lineItems?.physicalItems;
            }

            let qty = 0;
            orderDetails?.lineItems?.physicalItems?.forEach((item: any) => {
              qty += item?.quantity;
            });
            const products: any = await analyticsProducts(trackProducts);

            await AnalyticsService.trackCheckoutCompleted({
              items: orderDetails?.lineItems?.physicalItems,
              totalQuantity: qty,
              cartId: orderDetails?.cartId,
              orderId: orderDetails?.orderId,
              totalValue: orderDetails?.orderAmount,
              subtotal_tax: orderResponse?.subtotal_tax,
              currency_code: orderResponse?.currency_code,
              base_handling_cost: orderResponse?.base_handling_cost,
              base_shipping_cost: orderResponse?.base_shipping_cost,
              discount_amount: orderResponse?.discount_amount,
              handling_cost_ex_tax: orderResponse?.handling_cost_ex_tax,
              shipping_cost_ex_tax: orderResponse?.shipping_cost_ex_tax,
              subtotal_ex_tax: orderResponse?.subtotal_ex_tax,
              total_ex_tax: orderResponse?.total_ex_tax,
              wrapping_cost_ex_tax: orderResponse?.wrapping_cost_ex_tax,
              payment_method: orderResponse?.payment_method,
              shipping_method:
                orderResponse?.consignments?.[0]?.shipping[0]?.shipping_method,
              products,
            });
            // localStorage.setItem('purchase_a_d_', 'true');
            localStorage.removeItem('a_d_');
            localStorage.removeItem('search_a_d_');
            localStorage.removeItem('category_a_d_');
            localStorage.removeItem('widget_a_d_');
            localStorage.removeItem('direct_a_d_');
          }
          userDetails.userCartObj = {};
          AuthService.setUserDetails(userDetails);
          document.dispatchEvent(new Event('CART_REFRESH'));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const externalCheckout = async () => {
    window.addEventListener('message', ExpBCCheckoutIframeHandler, false);
    window.parent.postMessage('SEND_ORDER_DETAILS', '*');
  };

  const embeddedCheckout = async () => {
    setIsLoading(true);
    let checkoutScript: any = document.getElementById('checkout-script');
    if (!checkoutScript) {
      checkoutScript = document.createElement('script');
      checkoutScript.type = 'text/javascript';
      checkoutScript.src =
        'https://bigcommerce-checkout-sdk.b-cdn.net/v1/loader.js';
      checkoutScript.id = 'checkout-script';
      document.head.appendChild(checkoutScript);
    }
    cartObj = await EcommerceService.getCart();
    const userDetails = await AuthService.getUserDetails();
    let qty = 0;
    cartObj?.line_items?.physical_items?.forEach((item: any) => {
      qty += item?.quantity;
    });

    try {
      const redirectUrls = await EcommerceService.getCartRedirectUrls();
      if (redirectUrls?.embedded_checkout_url) {
        const module = await window?.checkoutKitLoader?.load(
          'embedded-checkout'
        );

        try {
          module
            .embedCheckout({
              url: redirectUrls?.embedded_checkout_url,
              containerId: 'checkout_page',
              onLoad: (_e: any) => {
                const products: any =
                  analyticsProductsForCheckoutInitiated(cartObj);
                AnalyticsService.trackCheckoutInitiated({
                  items: cartObj?.line_items?.physical_items,
                  totalQuantity: qty,
                  cartId: cartObj?.id,
                  totalValue: cartObj.cart_amount,
                  products,
                });
                setIsLoading(false);
              },
              onFrameLoad: (_e: any) => {
                setIsLoading(false);
              },
              onComplete: async (_e: any) => {
                setIsLoading(false);
                if (cartObj && cartObj?.id) {
                  const products: any = analyticsProducts(
                    cartObj?.line_items?.physical_items
                  );
                  AnalyticsService.trackCheckoutCompleted({
                    items: cartObj?.line_items?.physical_items,
                    totalQuantity: qty,
                    cartId: cartObj?.id,
                    totalValue: cartObj.cart_amount,
                    products,
                  });
                  localStorage.removeItem('a_d_');
                  localStorage.removeItem('search_a_d_');
                  localStorage.removeItem('category_a_d_');
                  localStorage.removeItem('widget_a_d_');
                  localStorage.removeItem('direct_a_d_');
                }
                userDetails.userCartObj = {};
                AuthService.setUserDetails(userDetails);
                document.dispatchEvent(new Event('CART_REFRESH'));
              },
              onError: (e: any) => {
                setIsLoading(false);
                console.error('inside bigcommerce onError', e);
                setCheckoutError(e.message);
              },
              onFrameError: (e: any) => {
                setIsLoading(false);
                setCheckoutError(e.message);
                console.error('inside bigcommerce onFrameError', e);
              },
            })
            .catch((e: any) => {
              console.error('Embedding checkout error', e);
              setCheckoutError(e.message);
            });
        } catch (err: any) {
          setIsLoading(false);
          // eslint-disable-next-line no-console
          console.error('inside embedCheckout catch method', err);
          setCheckoutError(err.message);
        }
      }
    } catch (e) {
      if (!CommonUtilities.isRenderingOnServer()) {
        return navigate('/cart');
      }
    }
  };

  useEffect(() => {
    if (process.env.REACT_APP_EXTERNAL_CHECKOUT === 'true') {
      externalCheckout();
    } else {
      embeddedCheckout();
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cartObj = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, checkoutError };
};

export default ExpCheckoutController;
