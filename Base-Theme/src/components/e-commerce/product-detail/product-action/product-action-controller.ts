import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import {
  AnalyticsService,
  AuthService,
  EcommerceService,
  toast,
  useSearchParams,
} from 'experro-storefront';
import { useTranslation } from 'react-i18next';
import {
  processPrice,
  loadB2bNinajaScript,
  useExpCommonCheckout,
} from '../../../../utils';

declare const window: any;
interface ExpProductActionControllerProps {
  product: {
    brand_esi: string;
    categories_esai: string;
    category_meta_ej: any;
    calculated_price_efi: number;
    inventory_tracking_esi: string;
    inventory_level_eii: number;
    sku_esi: string;
    sku_for_analytics_esli: any;
    name_esi: string;
    provider_id_esi: string;
    provider_specific_data_ej: any;
  };

  selectedVariant: {
    option_values: any[];
    sku: string;
    id: string;
    inventory_level: number;
    purchasing_disabled: boolean;
    purchasing_disabled_message: string;
  };

  selectedModifiers: any[];
  setIsProductPreviewModalOpen?: Dispatch<SetStateAction<boolean>>;
  analyticsMode?: string | undefined;
  analyticsSearchTerm?: string | null | undefined;
  analyticsCategory?: string | undefined;
  analyticsWidgetId?: any;
  setWishlistClicked?: any;
}

const ExpProductActionController = (props: ExpProductActionControllerProps) => {
  const {
    product,
    selectedVariant,
    selectedModifiers,
    setIsProductPreviewModalOpen,
    analyticsMode,
    analyticsSearchTerm,
    analyticsCategory,
    analyticsWidgetId,
  } = props;

  const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false);
  const { onCheckoutClick } = useExpCommonCheckout({ setIsCheckoutLoading });

  const [queryParams] = useSearchParams();
  const [products, setProducts] = useState<{
    purchaseDisabledMessage: string;
    quantityForAddToCart: number;
  }>({
    purchaseDisabledMessage: '',
    quantityForAddToCart: 1,
  });
  const [isloading, setIsLoading] = useState<{
    addToCart: boolean;
    buyNow: boolean;
  }>({
    addToCart: false,
    buyNow: false,
  });
  const [showB2bNinjaButton, setShowB2bNinjaButton] = useState<boolean>(false);
  const { t } = useTranslation();

  const addModeDataToLocalStorageForThePurchaseAnalytics = (
    mode: string,
    searchTerm: string | null,
    category: string | null,
    sku: string,
    sku_for_analytics_esli: string,
    product_categories: any,
    varientSku: string | null,
    widgetId: string | null,
    varientId: string | null,
    analyticsProductData: any
  ) => {
    let localstorageAnalyticsData = [];
    if (localStorage.getItem('a_d_')) {
      localstorageAnalyticsData = JSON.parse(
        localStorage.getItem('a_d_') as string
      );
    }
    const analyticisData = {
      mode,
      searchTerm,
      search_location: analyticsProductData?.search_location,
      category,
      sku,
      sku_for_analytics_esli,
      product_categories,
      varientSku: varientSku,
      widgetId: widgetId,
      varientId: varientId,
      is_primary_algorithm: analyticsProductData?.is_primary_algorithm,
      is_secondary_algorithm: analyticsProductData?.is_secondary_algorithm,
      algorithm: analyticsProductData?.algorithm,
      is_merchandising: analyticsProductData?.is_merchandising,
      rule: analyticsProductData?.rule,
      rule_type: analyticsProductData?.rule_type,
      widget_id: analyticsProductData?.widget_id,
      context_type: analyticsProductData?.context_type,
      context_data: analyticsProductData?.context_data,
      rules: analyticsProductData?.rules,
    };
    localstorageAnalyticsData.push(analyticisData);
    localStorage.setItem('a_d_', JSON.stringify(localstorageAnalyticsData));
  };

  const handleProductQuantityIncDec = (operation: string, event: any) => {
    if (operation === 'direct') {
      return setProducts({
        ...products,
        quantityForAddToCart: +event?.target?.value,
      });
    }
    if (operation === 'inc') {
      setProducts({
        ...products,
        quantityForAddToCart: products?.quantityForAddToCart + 1,
      });
    } else if (operation === 'desc') {
      setProducts({
        ...products,
        quantityForAddToCart: products?.quantityForAddToCart - 1,
      });
    }
  };

  const checkQuantityInputValue = () => {
    if (products?.quantityForAddToCart < 1) {
      setProducts({ ...products, quantityForAddToCart: 1 });
    }
  };

  const triggerProductAddedToCartAnalyticsEvent = () => {
    const mode = analyticsMode || queryParams.get('m') || 'direct';
    const searchTerm = analyticsSearchTerm || queryParams.get('st');
    const widgetId = queryParams.get('w') || analyticsWidgetId;
    const productOptions: any = [];

    if (selectedVariant?.option_values?.length) {
      selectedVariant?.option_values?.forEach((productOption: any) => {
        const tempOption: any = {};
        tempOption['name'] = productOption?.option_display_name;
        tempOption['value'] = productOption?.label;
        productOptions.push(tempOption);
      });
    }

    if (selectedModifiers && Object.keys(selectedModifiers)?.length) {
      for (const modifier in selectedModifiers) {
        product?.provider_specific_data_ej?.modifiers?.forEach((item: any) => {
          const finalObjModiFier: any = {};
          if (item?.id?.toString() === modifier?.toString()) {
            const selectedModifierValue = item?.option_values?.find(
              (elem: any) =>
                elem?.id?.toString() === selectedModifiers[modifier]?.toString()
            );
            finalObjModiFier['name'] = item?.display_name;
            finalObjModiFier['value'] = selectedModifierValue?.label;
            productOptions.push(finalObjModiFier);
          }
        });
      }
    }

    let analyticsProductData: any;
    let localstorageAnalyticsData = [];

    if (localStorage.getItem(`${mode}_a_d_`)) {
      localstorageAnalyticsData = JSON.parse(
        localStorage.getItem(`${mode}_a_d_`) as string
      );
    }
    if (localstorageAnalyticsData.length) {
      analyticsProductData = localstorageAnalyticsData?.find(
        (analyticsProduct: any) => analyticsProduct?.sku === product?.sku_esi
      );
    }
    const category =
      analyticsCategory ||
      queryParams.get('c') ||
      analyticsProductData?.category;

    const modeDetails: any = {
      search_term: searchTerm,
      search_location: analyticsProductData?.search_location,
      category: category,
      is_primary_algorithm: analyticsProductData?.is_primary_algorithm,
      is_secondary_algorithm: analyticsProductData?.is_secondary_algorithm,
      algorithm: analyticsProductData?.algorithm,
      is_merchandising: analyticsProductData?.is_merchandising,
      rule: analyticsProductData?.rule,
      rule_type: analyticsProductData?.rule_type,
      widget_id: analyticsProductData?.widget_id,
      context_type: analyticsProductData?.context_type,
      context_data: analyticsProductData?.context_data,
      variant: analyticsProductData?.variant,
      rules: analyticsProductData?.rules,
    };
    AnalyticsService.trackProductAddedToCart({
      sku: product?.sku_for_analytics_esli,
      variantSku: selectedVariant?.sku,
      totalValue: product.calculated_price_efi * products?.quantityForAddToCart,
      quantity: products?.quantityForAddToCart,
      price: processPrice(product, selectedVariant, selectedModifiers),
      name: product.name_esi,
      brand: product.brand_esi,
      mode: mode,
      searchTerm: searchTerm,
      search_location: analyticsProductData?.search_location,
      category: category,
      productCategories: product?.category_meta_ej,
      is_primary_algorithm: analyticsProductData?.is_primary_algorithm,
      is_secondary_algorithm: analyticsProductData?.is_secondary_algorithm,
      algorithm: analyticsProductData?.algorithm,
      is_merchandising: analyticsProductData?.is_merchandising,
      rule: analyticsProductData?.rule,
      rule_type: analyticsProductData?.rule_type,
      widget_id: analyticsProductData?.widget_id,
      context_type: analyticsProductData?.context_type,
      context_data: analyticsProductData?.context_data,
      variant: analyticsProductData?.variant,
      rules: analyticsProductData?.rules,
      mode_details: modeDetails,
      product_option: productOptions,
    });

    addModeDataToLocalStorageForThePurchaseAnalytics(
      mode,
      searchTerm,
      category,
      product.sku_esi,
      product?.sku_for_analytics_esli,
      product?.category_meta_ej,
      selectedVariant?.sku,
      widgetId,
      selectedVariant?.id,
      analyticsProductData
    );
  };

  const addToCart = async (isBuyItNow: boolean) => {
    const userDetails = AuthService.getUserDetails();

    //Clearing the flag of purchase_a_d_ for Analyticis Event for External Checkout
    localStorage.removeItem('purchase_a_d_');

    try {
      if (!isBuyItNow) {
        setIsLoading({ ...isloading, addToCart: true });
      } else {
        setIsLoading({ ...isloading, buyNow: true });
      }
      let cartDetails: any;
      const line_items: any = [
        {
          product_id: +product?.provider_id_esi,
          quantity:
            products?.quantityForAddToCart > 0
              ? products?.quantityForAddToCart
              : 1,
        },
      ];
      const option_selections = [];
      if (selectedVariant) {
        // line_items[0].variant_id = +selectedVariant.id;
        for (const i in selectedVariant.option_values) {
          const option = selectedVariant.option_values[i];
          option_selections.push({
            option_id: option.option_id,
            option_value: option.id,
          });
        }
      }

      if (selectedModifiers) {
        for (const optionId in selectedModifiers) {
          option_selections.push({
            option_id: parseInt(optionId),
            option_value: selectedModifiers[optionId],
          });
        }
      }

      if (option_selections.length > 0) {
        line_items[0].option_selections = option_selections;
      }

      if (userDetails?.userCartObj?.id) {
        const cartId = userDetails?.userCartObj?.id;
        cartDetails = await EcommerceService.addToCart({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          cartId,
          line_items,
        });
        if (cartDetails.Status === 'failure') {
          toast.error(cartDetails.Error.message);
          setIsLoading({ ...isloading, addToCart: false });
          return;
        }
      } else {
        let cartId: any = '';
        if (userDetails?.userInfo?.ecommCustomerId) {
          cartId = userDetails.userInfo?.ecommCustomerId;
        }
        cartDetails = await EcommerceService.createCart({
          customerId: cartId,
          line_items: line_items,
        });
        if (cartDetails.Status === 'failure') {
          toast.error(cartDetails.Error.message);
          setIsLoading({ ...isloading, addToCart: false });
          return;
        }
      }

      const userTemp = { ...userDetails };

      if (cartDetails.Status !== 'failure') {
        triggerProductAddedToCartAnalyticsEvent();
        userTemp.userCartObj = await EcommerceService.getCart();
      }
      AuthService.setUserDetails(userTemp);
      if (!isBuyItNow) {
        setIsLoading({ ...isloading, addToCart: false });
        if (setIsProductPreviewModalOpen) {
          setIsProductPreviewModalOpen(false);
        }
        document.dispatchEvent(new Event('CART_REFRESH'));
        document.dispatchEvent(new Event('OPEN_CART_SLIDER'));
        toast.success(t('toast_msg_success.product_add_to_cart'));
      } else {
        document.dispatchEvent(new Event('CART_REFRESH'));
        onCheckoutClick();
        setIsLoading({ ...isloading, buyNow: false });
      }
    } catch (e) {
      toast.error(t('toast_msg_error.something_went_wrong'));
      setIsLoading({ addToCart: false, buyNow: false });
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  function checkCanAddToCart() {
    if (
      product.inventory_tracking_esi === 'product' &&
      product.inventory_level_eii <= 0
    ) {
      setProducts({
        ...products,
        purchaseDisabledMessage:
          'The selected product combination is currently unavailable.',
      });
    } else if (
      product.inventory_tracking_esi === 'variant' &&
      selectedVariant?.inventory_level <= 0
    ) {
      setProducts({
        ...products,
        purchaseDisabledMessage:
          'The selected product combination is currently unavailable.',
      });
    } else if (selectedVariant?.purchasing_disabled) {
      setProducts({
        ...products,
        purchaseDisabledMessage: selectedVariant.purchasing_disabled_message
          ? selectedVariant.purchasing_disabled_message
          : 'The selected product combination is currently unavailable.',
      });
    } else {
      setProducts({ ...products, purchaseDisabledMessage: '' });
    }
  }

  const showQuote = async () => {
    return window?.BN?.show_quote('quote-view');
  };

  const addProductToQuote = async () => {
    const quoteRequestObj: any = [
      {
        id: +product.provider_id_esi,
        qty:
          products?.quantityForAddToCart > 0
            ? products?.quantityForAddToCart
            : 1,
      },
    ];
    const option_selections = [];
    if (selectedVariant) {
      for (const i in selectedVariant.option_values) {
        const option = selectedVariant.option_values[i];
        option_selections.push({
          product_option_id: option.option_id,
          selected_value: option.id,
        });
      }
    }

    if (selectedModifiers) {
      for (const optionId in selectedModifiers) {
        option_selections.push({
          product_option_id: parseInt(optionId),
          selected_value: selectedModifiers[optionId],
        });
      }
    }
    if (option_selections?.length) {
      quoteRequestObj[0].options = option_selections;
    }
    return window?.BN?.add_products_to_quote(quoteRequestObj, true, true);
  };

  useEffect(() => {
    // call function for load B2B Ninja Script
    loadB2bNinajaScript(setShowB2bNinjaButton);
  }, []);

  useEffect(() => {
    checkCanAddToCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant]);

  return {
    purchaseDisabledMessage: products?.purchaseDisabledMessage,
    quantityForAddToCart: products?.quantityForAddToCart,
    addToCartLoading: isloading?.addToCart,
    isBuyNowLoading: isloading?.buyNow,
    handleProductQuantityIncDec,
    checkQuantityInputValue,
    addToCart,
    showB2bNinjaButton,
    showQuote,
    addProductToQuote,
    isCheckoutLoading,
  };
};

export default ExpProductActionController;
