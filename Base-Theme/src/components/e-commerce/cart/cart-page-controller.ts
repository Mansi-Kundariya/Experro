import { useEffect, useState } from 'react';
import {
  AnalyticsService,
  AuthService,
  EcommerceService,
  toast,
  useNavigate,
  useSearchParams,
} from 'experro-storefront';
import { useTranslation } from 'react-i18next';
import { loadB2bNinajaScript } from '../../../utils';
declare let window: any;

const ExpCartPageController = () => {
  const [coupon, setCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [quantityTotal, setQuantityTotal] = useState(0);
  const [cartObj, setCartObj] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdatedItems, setIsLoadingUpdatedItems] =
    useState<boolean>(false);
  const [defaultCurrency, setDefaultCurrency] = useState<any>({});
  const [queryParams] = useSearchParams();
  const [showB2bNinjaButton, setShowB2bNinjaButton] = useState<boolean>(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const getProductOption = (cartItem: any) => {
    const productOptions: any = [];
    cartItem?.options?.forEach((productOption: any) => {
      const tempOption: any = {};
      tempOption['name'] = productOption?.name;
      tempOption['value'] = productOption?.value;
      productOptions.push(tempOption);
    });
    return productOptions;
  };

  const addProductQuantityInCartAnalyticsEvent = (item: any) => {
    let analyticsDataInLocalStorage: any = [];
    if (localStorage.getItem('a_d_')) {
      analyticsDataInLocalStorage = JSON.parse(
        localStorage.getItem('a_d_') as string
      );
    }
    let tempAnalyticsDataInLocalStorage = JSON.parse(
      JSON.stringify(analyticsDataInLocalStorage)
    );
    tempAnalyticsDataInLocalStorage = tempAnalyticsDataInLocalStorage.find(
      (ele: any) => ele?.varientSku === item?.sku || ele?.sku === item?.sku
    );

    const productOptions = getProductOption(item);
    const modeDetails: any = {
      search_term: tempAnalyticsDataInLocalStorage?.searchTerm,
      search_location: tempAnalyticsDataInLocalStorage?.search_location,
      category: tempAnalyticsDataInLocalStorage?.category,
      is_primary_algorithm:
        tempAnalyticsDataInLocalStorage?.is_primary_algorithm,
      is_secondary_algorithm:
        tempAnalyticsDataInLocalStorage?.is_secondary_algorithm,
      algorithm: tempAnalyticsDataInLocalStorage?.algorithm,
      is_merchandising: tempAnalyticsDataInLocalStorage?.is_merchandising,
      rule: tempAnalyticsDataInLocalStorage?.rule,
      rule_type: tempAnalyticsDataInLocalStorage?.rule_type,
      widget_id: tempAnalyticsDataInLocalStorage?.widget_id,
      context_type: tempAnalyticsDataInLocalStorage?.context_type,
      context_data: tempAnalyticsDataInLocalStorage?.context_data,
      variant: tempAnalyticsDataInLocalStorage?.variant,
      rules: tempAnalyticsDataInLocalStorage?.rules,
    };

    AnalyticsService.trackProductAddedToCart({
      sku: item?.sku_for_analytics_esli,
      variantSku: tempAnalyticsDataInLocalStorage?.varientSku,
      totalValue: item?.sale_price,
      quantity: 1,
      price: item?.sale_price,
      name: item?.name,
      brand: item?.brand_esi,
      mode: tempAnalyticsDataInLocalStorage?.mode,
      searchTerm: tempAnalyticsDataInLocalStorage?.searchTerm,
      search_location: tempAnalyticsDataInLocalStorage?.search_location,
      category: tempAnalyticsDataInLocalStorage?.category,
      productCategories: item?.category_meta_ej,
      is_primary_algorithm:
        tempAnalyticsDataInLocalStorage?.is_primary_algorithm,
      is_secondary_algorithm:
        tempAnalyticsDataInLocalStorage?.is_secondary_algorithm,
      algorithm: tempAnalyticsDataInLocalStorage?.algorithm,
      is_merchandising: tempAnalyticsDataInLocalStorage?.is_merchandising,
      rule: tempAnalyticsDataInLocalStorage?.rule,
      rule_type: tempAnalyticsDataInLocalStorage?.rule_type,
      widget_id: tempAnalyticsDataInLocalStorage?.widget_id,
      context_type: tempAnalyticsDataInLocalStorage?.context_type,
      context_data: tempAnalyticsDataInLocalStorage?.context_data,
      variant: tempAnalyticsDataInLocalStorage?.variant,
      rules: tempAnalyticsDataInLocalStorage?.rules,
      mode_details: modeDetails,
      product_option: productOptions,
    });
  };

  const triggerDeleteItemInCartAnalyticsEvent = (
    item: any,
    removeProductQuantity?: number
  ) => {
    let analyticsDataInLocalStorage: any = [];
    if (localStorage.getItem('a_d_')) {
      analyticsDataInLocalStorage = JSON.parse(
        localStorage.getItem('a_d_') as string
      );
    }
    let tempAnalyticsDataInLocalStorage = JSON.parse(
      JSON.stringify(analyticsDataInLocalStorage)
    );
    tempAnalyticsDataInLocalStorage = tempAnalyticsDataInLocalStorage.find(
      (ele: any) => ele?.varientSku === item?.sku || ele?.sku === item?.sku
    );
    const productOptions = getProductOption(item);

    const modeDetails: any = {
      search_term: tempAnalyticsDataInLocalStorage?.searchTerm,
      search_location: tempAnalyticsDataInLocalStorage?.search_location,
      category: tempAnalyticsDataInLocalStorage?.category,
      is_primary_algorithm:
        tempAnalyticsDataInLocalStorage?.is_primary_algorithm,
      is_secondary_algorithm:
        tempAnalyticsDataInLocalStorage?.is_secondary_algorithm,
      algorithm: tempAnalyticsDataInLocalStorage?.algorithm,
      is_merchandising: tempAnalyticsDataInLocalStorage?.is_merchandising,
      rule: tempAnalyticsDataInLocalStorage?.rule,
      rule_type: tempAnalyticsDataInLocalStorage?.rule_type,
      widget_id: tempAnalyticsDataInLocalStorage?.widget_id,
      context_type: tempAnalyticsDataInLocalStorage?.context_type,
      context_data: tempAnalyticsDataInLocalStorage?.context_data,
      variant: tempAnalyticsDataInLocalStorage?.variant,
      rules: tempAnalyticsDataInLocalStorage?.rules,
    };
    AnalyticsService.trackProductRemovedFromCart({
      sku: item?.sku_for_analytics_esli,
      productCategories: item?.category_meta_ej,
      price: item?.sale_price,
      name: item?.name,
      brand: item?.brand_esi,
      quantity: removeProductQuantity ? removeProductQuantity : item.quantity,
      variant_sku: tempAnalyticsDataInLocalStorage?.varientSku,
      totalValue: removeProductQuantity
        ? item.list_price * removeProductQuantity
        : item.list_price * item.quantity,
      search_term: tempAnalyticsDataInLocalStorage?.searchTerm,
      category: tempAnalyticsDataInLocalStorage?.category,
      search_location: tempAnalyticsDataInLocalStorage?.search_location,
      is_primary_algorithm:
        tempAnalyticsDataInLocalStorage?.is_primary_algorithm,
      is_secondary_algorithm:
        tempAnalyticsDataInLocalStorage?.is_secondary_algorithm,
      algorithm: tempAnalyticsDataInLocalStorage?.algorithm,
      is_merchandising: tempAnalyticsDataInLocalStorage?.is_merchandising,
      rule: tempAnalyticsDataInLocalStorage?.rule,
      rule_type: tempAnalyticsDataInLocalStorage?.rule_type,
      widget_id: tempAnalyticsDataInLocalStorage?.widget_id,
      context_type: tempAnalyticsDataInLocalStorage?.context_type,
      context_data: tempAnalyticsDataInLocalStorage?.context_data,
      variant: tempAnalyticsDataInLocalStorage?.variant,
      rules: tempAnalyticsDataInLocalStorage?.rules,
      mode_details: modeDetails,
      product_option: productOptions,
    });
  };

  const triggerCartViewedAnalyticsEvent = (qty: number, cartObj: any) => {
    const products: any = [];
    let analyticisData: any = [];
    try {
      if (localStorage.getItem('a_d_')) {
        analyticisData = JSON.parse(localStorage.getItem('a_d_') as string);
      }
    } catch (e) {
      console.error('error in getting localStorage', e);
    }
    try {
      if (
        cartObj &&
        cartObj.line_items &&
        cartObj.line_items.physical_items?.length
      ) {
        cartObj?.line_items?.physical_items?.forEach((cartProduct: any) => {
          const data = analyticisData?.find((item: any) => {
            if (
              item.sku === cartProduct.sku ||
              item.varientSku === cartProduct.sku
            ) {
              return item;
            }
          });
          const productOptions = getProductOption(cartProduct);

          let tempAnalyticsProduct: any = {};
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
          if (cartProduct) {
            tempAnalyticsProduct = {
              sku: data?.sku_for_analytics_esli,
              product_category:
                cartProduct?.category_meta_ej || data?.product_categories,
              variant_sku: cartProduct?.sku,
              mode: data?.mode || 'direct',
              search_term: data?.searchTerm,
              category: data?.category,
              totalValue: cartProduct.extended_sale_price,
              total_value: cartProduct.extended_sale_price,
              coupon_amount: cartProduct?.coupon_amount,
              discount_amount: cartProduct?.discount_amount,
              extended_list_price: cartProduct?.extended_list_price,
              extended_sale_price: cartProduct?.extended_sale_price,
              list_price: cartProduct?.list_price,
              sale_price: cartProduct?.sale_price,
              original_price: cartProduct?.original_price,
              quantity: cartProduct.quantity,
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
            };
          }
          products.push(tempAnalyticsProduct);
        });
      }
    } catch (err) {
      console.error('err', err);
    }
    AnalyticsService.trackCartViewed({
      totalValue: cartObj.cart_amount,
      totalQuantity: qty,
      cartId: cartObj?.id,
      baseAmount: cartObj?.base_amount,
      cartAmount: cartObj?.cart_amount,
      discountAmount: cartObj?.discount_amount,
      items: cartObj?.line_items?.physical_items,
      products,
    });
  };

  const handleAnalyticsDataInLocalStorage = (item: any) => {
    let analyticsDataInLocalStorage: any = [];
    if (localStorage.getItem('a_d_')) {
      analyticsDataInLocalStorage = JSON.parse(
        localStorage.getItem('a_d_') as string
      );
    }
    analyticsDataInLocalStorage = analyticsDataInLocalStorage.filter(
      // eslint-disable-next-line array-callback-return
      (elem: any) => {
        if (elem.sku !== item.sku && elem.varientSku !== item.sku) {
          return elem;
        }
      }
    );
    if (analyticsDataInLocalStorage?.length) {
      localStorage.setItem('a_d_', JSON.stringify(analyticsDataInLocalStorage));
    } else {
      localStorage.removeItem('a_d_');
    }
  };

  const deleteItem = async (item: any) => {
    setIsLoadingUpdatedItems(true);
    if (item && item?.id) {
      try {
        await EcommerceService.deleteItemInCart({
          itemId: item.id,
        });
        toast.success(t('toast_msg_success.product_removed_from_cart'));
        triggerDeleteItemInCartAnalyticsEvent(item);
        handleAnalyticsDataInLocalStorage(item);
        await updateUserCartObj();
      } catch (e) {
        setIsLoadingUpdatedItems(false);
        console.error(e);
      }
    }
  };

  const handleProductQuantityUpdate = async (operation: string, item: any) => {
    setIsLoadingUpdatedItems(true);
    const line_item: any = {
      product_id: +item.product_id,
    };
    if (item?.variant_id) {
      line_item['variant_id'] = +item.variant_id;
    }

    if (operation === 'inc') {
      line_item['quantity'] = item.quantity + 1;
    } else {
      line_item['quantity'] = item.quantity - 1;
    }

    try {
      const updateResponse = await EcommerceService.updateCart({
        itemId: item.id,
        line_item,
      });
      if (updateResponse.Status === 'failure') {
        setIsLoadingUpdatedItems(false);
        return toast.error(updateResponse?.Error?.message);
      } else {
        if (operation === 'inc') {
          addProductQuantityInCartAnalyticsEvent(item);
        } else {
          triggerDeleteItemInCartAnalyticsEvent(item, 1);
        }
      }
      await updateUserCartObj();
    } catch (e) {
      toast.error(t('toast_msg_error.something_went_wrong'));
      console.error(e);
      setIsLoadingUpdatedItems(false);
    }
  };

  const calculateCartItemsCount = (cartObj: any) => {
    let qty = 0;
    cartObj?.line_items?.physical_items?.forEach((item: any) => {
      qty += item?.quantity;
    });
    setQuantityTotal(qty);
    setCartObj(cartObj);
    triggerCartViewedAnalyticsEvent(qty, cartObj);
  };

  const getCartDetails = async () => {
    try {
      const cartObj = await EcommerceService.getCart();
      if (cartObj && cartObj.Status !== 'failure') {
        try {
          const products: any = {};
          const productIds = cartObj?.line_items?.physical_items?.map(
            (product: any) => {
              return product.product_id;
            }
          );
          const productSku = cartObj?.line_items?.physical_items?.map(
            (product: any) => {
              return product.sku;
            }
          );

          const prodDetailedRespBySkus = await getProductsBySkus(productSku);

          // Mapping the search call object with cart object result based on the cart product sku
          productIds?.forEach((elem: any) => {
            const productFromSearchApi = prodDetailedRespBySkus?.find(
              (item: any) => item?.provider_id_esi === elem?.toString()
            );
            products[elem] = {
              sku_esi: productFromSearchApi.sku_esi,
              categories_esai: productFromSearchApi?.categories_esai,
              sku_for_analytics_esli:
                productFromSearchApi?.sku_for_analytics_esli,
              category_ids_esai: productFromSearchApi?.category_ids_esai,
              category_meta_ej: productFromSearchApi?.category_meta_ej,
            };
          });

          const updatedCartObj = addProductSkuCategoryToCartItemsData(
            cartObj,
            products
          );
          calculateCartItemsCount(updatedCartObj);
          setIsLoading(false);
          return cartObj;
        } catch (e) {
          setIsLoading(false);
          calculateCartItemsCount(cartObj);
          console.error(e);
        }
      } else {
        setCartObj([]);
        setIsLoading(false);
      }
    } catch (e) {
      setCartObj([]);
      setIsLoading(false);
      return null;
    }
  };

  const getProductsBySkus = async (productSku: any) => {
    if (productSku && productSku.length > 0) {
      try {
        const searchObj = {
          skip: 0,
          limit: 1000,
          sortBy: 'relevance',
          orderBy: '',
          body: {
            filter: {
              sku_esi: productSku,
            },
          },
          fieldsToQuery:
            'brand_esi,categories_esai,category_meta_ej,category_ids_esai,id,provider_id_esi,sku_esi,sku_for_analytics_esli',
          byPassMerchandising: true,
        };
        const productsResponse = await EcommerceService.search({
          searchObj,
        });
        return productsResponse?.Data.items;
      } catch (e) {
        return [];
        console.error(e);
      }
    } else {
      return [];
    }
  };

  const addProductSkuCategoryToCartItemsData = (
    cartObj: any,
    products: any
  ) => {
    if (cartObj.line_items?.physical_items) {
      const cartPhysicalItems = cartObj.line_items?.physical_items;
      for (const i in cartPhysicalItems) {
        const productId = cartPhysicalItems[i].product_id;
        if (products[productId] && products[productId].sku_esi) {
          cartPhysicalItems[i].product_sku = products[productId].sku_esi;
        }
        if (products[productId] && products[productId].categories_esai) {
          cartPhysicalItems[i].categories_esai =
            products[productId].categories_esai;
        }
        if (products[productId] && products[productId].category_meta_ej) {
          cartPhysicalItems[i].category_meta_ej =
            products[productId].category_meta_ej;
        }
        if (products[productId] && products[productId].sku_for_analytics_esli) {
          cartPhysicalItems[i].sku_for_analytics_esli =
            products[productId].sku_for_analytics_esli;
        }
        if (products[productId] && products[productId].brand_esi) {
          cartPhysicalItems[i].brand_esi = products[productId].brand_esi;
        }
      }
    }
    return cartObj;
  };

  const updateUserCartObj = async () => {
    const newCartData: any = await EcommerceService.getCart();
    const userDetails = AuthService.getUserDetails();
    const userTemp = {
      ...userDetails,
    };
    if (newCartData?.status !== 400) {
      userTemp.userCartObj = newCartData;
    } else {
      userTemp.userCartObj = {};
    }
    AuthService.setUserDetails(userTemp);
    document.dispatchEvent(new Event('CART_REFRESH'));
    setIsLoadingUpdatedItems(false);
  };

  const applyCouponCode = async (event: any) => {
    event.preventDefault();
    try {
      if (!couponCode?.trim().length) {
        toast.error(t('toast_msg_error.please_enter_coupon_code'));
      } else {
        const couponCodeResponse = await EcommerceService.addCouponCode({
          body: {
            coupon_code: couponCode,
          },
        });
        if (couponCodeResponse.Status === 'failure') {
          return toast.error(couponCodeResponse.Error.message);
        }
        await updateUserCartObj();
        if (couponCodeResponse.coupons?.trim().length === 0)
          toast.error(t('toast_msg_error.please_enter_coupon_code'));
        else toast.success(t('toast_msg_success.coupon_code_applied'));
      }
    } catch (err) {
      toast.error(t('toast_msg_error.something_went_wrong'));
      console.error(err);
    }
  };

  const removeCouponCode = async () => {
    const couponId = cartObj.coupons.length && cartObj.coupons[0]?.code;
    try {
      const removeCouponCodeResponse =
        await EcommerceService.removeCouponCodeById({
          couponId,
        });
      if (removeCouponCodeResponse) {
        setCouponCode('');
        await updateUserCartObj();
      }
    } catch (err) {
      toast.error(t('toast_msg_error.something_went_wrong'));
      console.error(err);
    }
  };

  const getCurrencyData = () => {
    const currenyObj = AuthService.getUserDetails()?.defaultCurrency;
    if (currenyObj) {
      setDefaultCurrency(currenyObj);
    }
  };

  //Abandoned cart handling
  const handelAbandonedCart = async () => {
    const queryParametersToken: string | null = queryParams.get('t');
    try {
      const abandonedCartResponse =
        await EcommerceService.getAbandonedCart(queryParametersToken);
      if (abandonedCartResponse?.Status !== 'failure') {
        navigate('/cart');
        window.location.reload();
      } else {
        toast.error(t('toast_msg_error.something_went_wrong'));
      }
    } catch (e) {
      toast.error(t('toast_msg_error.something_went_wrong'));
      console.error(e);
    }
  };

  const cartToQuote = () => {
    const cartToQuoteLineItems: any = [];
    const cartItems = cartObj?.line_items?.physical_items;
    if (cartItems && cartItems.length) {
      cartItems?.forEach((item: any) => {
        const cartToQuoteObject: any = {
          id: item.product_id,
          qty: item.quantity,
        };
        if (item?.options?.length) {
          const option_selection: any = [];
          item.options.forEach((option: any) => {
            option_selection?.push({
              product_option_id: option.nameId,
              selected_value: option.valueId,
            });
          });
          if (option_selection?.length) {
            cartToQuoteObject['options'] = option_selection;
          }
        }
        cartToQuoteLineItems.push(cartToQuoteObject);
      });
      window?.BN?.add_products_to_quote(cartToQuoteLineItems, true, true);
    }
  };

  useEffect(() => {
    getCurrencyData();
    document.addEventListener('CURRENCY_UPDATE', () => getCurrencyData());
    document.addEventListener('LOGIN_SUCCESSFUL', () =>
      eventListenerFunction()
    );
    // call function for load B2B Ninja Script
    loadB2bNinajaScript(setShowB2bNinjaButton);

    const eventListenerFunction = async () => {
      await getCartDetails();
    };
    if (queryParams.get('t')) {
      handelAbandonedCart();
    } else {
      (async () => {
        await getCartDetails();
        document.addEventListener('CART_REFRESH', () =>
          eventListenerFunction()
        );
      })();
    }
    return () => {
      document.removeEventListener('CART_REFRESH', () =>
        eventListenerFunction()
      );
      document.removeEventListener('LOGIN_SUCCESSFUL', () =>
        eventListenerFunction()
      );
      document.removeEventListener('CURRENCY_UPDATE', () => getCurrencyData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    defaultCurrency,
    coupon,
    couponCode,
    quantityTotal,
    cartObj,
    isLoading,
    isLoadingUpdatedItems,
    deleteItem,
    setCoupon,
    setCouponCode,
    handleProductQuantityUpdate,
    applyCouponCode,
    removeCouponCode,
    showB2bNinjaButton,
    cartToQuote,
    setIsCheckoutLoading,
    isCheckoutLoading,
  };
};

export default ExpCartPageController;
