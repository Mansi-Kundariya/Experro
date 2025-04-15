import { useState, useCallback, useEffect } from 'react';
import {
  AnalyticsService,
  AuthService,
  EcommerceService,
  IsCMSApp,
  toast,
  useNavigate,
  useSearchParams,
} from 'experro-storefront';
import { useTranslation } from 'react-i18next';
import { processPrice } from '../../../utils';
import { expImageOption } from '../../../interfaces/exp-image.interface';
import { removeHtmlTags } from '../../../utils';

interface ExpProductCellControllerProps {
  productDetails: {
    images_ej: any[];
    sku_esi: string;
    reviews_rating_sum_eii: string;
    reviews_count_eii: string;
    page_slug_esi: any;
    sku_for_analytics_esli: any;
    calculated_price_efi: number;
    name_eti: string;
    brand_esi: string;
    categories_esai: any;
    category_meta_ej: any;
    provider_id_esi: any;
    variants_ej?: any;
    variant_options_ej: any;
    rule_details: any;
    is_merchandising?: boolean;
    is_secondary_algorithm?: boolean;
    is_primary_algorithm?: boolean;
  };
  productCompareSkus?: any[];
  categoryTree?: any[];
  mode: string;
  category?: string;
  widgetId?: string;
  widgetRuleDetails?: any;
}

const ExpProductCellController = (props: ExpProductCellControllerProps) => {
  const {
    productDetails,
    productCompareSkus,
    categoryTree,
    mode,
    category,
    widgetId,
    widgetRuleDetails,
  } = props;
  let navigate: any;
  let queryParams: any;
  let productNavigationUrl = `${productDetails?.page_slug_esi}`;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>();
  const [wishlistClicked, setWishlistClicked] = useState<boolean>(false);
  const [isCartLoading, setIsCartLoading] = useState<boolean>(false);
  const [isQuickViewLoading, setIsQuickViewLoading] = useState<boolean>(false);
  const [colorOption, setColorOption] = useState<string>('');
  const [selectedVarient, setSelectedVarient] = useState<any>();
  const [productOptionId, setProductOptionId] = useState<string>('');
  const [colorVarients, setColorVarients] = useState<any>();

  const { t } = useTranslation();

  const options: expImageOption[] = [
    {
      width: 353,
    },
    {
      width: 281,
    },
    {
      width: 346,
    },
    {
      width: 287,
    },
    {
      width: 232,
    },
  ];

  const images = productDetails?.images_ej?.sort(
    (a_image: { is_thumbnail: number }, b_image: { is_thumbnail: number }) =>
      Number(b_image?.is_thumbnail) - Number(a_image?.is_thumbnail)
  );
  const selectedSku = productCompareSkus?.find(
    (_sku: string) => _sku === productDetails.sku_esi
  );
  const averageReviewsCount = Math.round(
    (parseInt(productDetails?.reviews_rating_sum_eii) || 0) /
      (parseInt(productDetails?.reviews_count_eii) || 1)
  );

  if (IsCMSApp) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [queryParams] = useSearchParams();
    if (categoryTree) {
      productNavigationUrl = productNavigationUrl.includes('?')
        ? `${productNavigationUrl}&c_id=${categoryTree[0]?.id}`
        : `${productNavigationUrl}?c_id=${categoryTree[0]?.id}`;
    }
    if (mode) {
      productNavigationUrl = productNavigationUrl.includes('?')
        ? `${productNavigationUrl}&m=${mode}`
        : `${productNavigationUrl}?m=${mode}`;
    }
    if (queryParams.has('q')) {
      productNavigationUrl = productNavigationUrl.includes('?')
        ? `${productNavigationUrl}&st=${queryParams.get('q')}`
        : `${productNavigationUrl}?st=${queryParams.get('q')}`;
    }
    if (category && mode === 'category') {
      productNavigationUrl = productNavigationUrl.includes('?')
        ? `${productNavigationUrl}&c=${category}`
        : `${productNavigationUrl}?c=${category}`;
    }
  }

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalOpen = useCallback(async () => {
    try {
      const analyticsData: any = {
        mode: mode,
        sku: productDetails?.sku_esi,
        sku_for_analytics_esli: productDetails?.sku_for_analytics_esli,
      };
      if (mode === 'search') {
        analyticsData['search_location'] = queryParams.get('ac')
          ? 'autocomplete'
          : 'page';
        analyticsData['rules'] = productDetails?.rule_details;
      } else if (mode === 'widget' && widgetRuleDetails) {
        analyticsData['is_primary_algorithm'] =
          productDetails?.is_primary_algorithm;
        analyticsData['is_secondary_algorithm'] =
          productDetails?.is_secondary_algorithm;
        analyticsData['algorithm'] = widgetRuleDetails?.algorithm;
        analyticsData['is_merchandising'] = productDetails?.is_merchandising;
        analyticsData['rule'] = widgetRuleDetails?.rule_id;
        analyticsData['rule_type'] = widgetRuleDetails?.rule_type;
        analyticsData['widget_id'] = widgetRuleDetails?.widget_id;
        analyticsData['context_type'] = widgetRuleDetails?.context_type;
        analyticsData['context_data'] = widgetRuleDetails?.context_data;
        analyticsData['variant'] = widgetRuleDetails?.variant;
        analyticsData['category'] = widgetRuleDetails?.category;
      } else if (mode === 'widget' && widgetId) {
        analyticsData['widget_id'] = removeHtmlTags(widgetId);
      } else if (mode === 'category' || mode === 'direct') {
        analyticsData['rules'] = productDetails?.rule_details;
      }
      let localstorageAnalyticsData = [];
      if (localStorage.getItem(`${mode}_a_d_`)) {
        localstorageAnalyticsData = JSON.parse(
          localStorage.getItem(`${mode}_a_d_`) as string
        );
      }
      let isProductid: any;
      if (localstorageAnalyticsData.length) {
        isProductid = localstorageAnalyticsData?.find(
          (analyticsProduct: any) =>
            analyticsProduct?.sku === productDetails?.sku_esi
        );
      }
      if (!isProductid) {
        localstorageAnalyticsData.push(analyticsData);
      }
      localStorage.setItem(
        `${mode}_a_d_`,
        JSON.stringify(localstorageAnalyticsData)
      );
      setIsQuickViewLoading(true);
      setIsModalOpen(true);
      const productResponse = await EcommerceService.search({
        searchObj: {
          skip: 0,
          limit: 1,
          fieldsToQuery:
            'brand_esi,brand_eti,brand_page_slug_esi,calculated_price_efi,categories_esai,category_meta_ej,categories_etai,category_tree_ej,category_ids_esai,custom_fields_ej,custom_url,description_eti,images_ej,inventory_level_eii,inventory_tracking_esi,name_esi,name_eti,page_slug_esi,price_efi,provider_id_esi,provider_specific_data_ej,retail_price_ef,sale_price_efi,sku_esi,sku_for_analytics_esli,variant_options_ej,variants_ej,warranty_es',
          body: {
            filter: {
              sku_esi: [productDetails.sku_esi],
            },
          },
          byPassMerchandising: true,
        },
      });

      setProductData(productResponse);
      setIsQuickViewLoading(false);
      const productAnalytics = productResponse?.Data?.items[0];

      if (productAnalytics) {
        const analyticsCategory =
          category || widgetRuleDetails?.category || null;

        const modeDetails: any = {
          search_term: queryParams.get('q'),
          search_location:
            mode === 'search'
              ? queryParams.get('ac')
                ? 'autocomplete'
                : 'page'
              : null,
          category: analyticsCategory,
          is_primary_algorithm:
            widgetRuleDetails && productDetails?.is_primary_algorithm,
          is_secondary_algorithm:
            widgetRuleDetails && productDetails?.is_secondary_algorithm,
          algorithm: widgetRuleDetails?.algorithm,
          is_merchandising:
            widgetRuleDetails && productDetails?.is_merchandising,
          rule: widgetRuleDetails?.rule_id,
          rule_type: widgetRuleDetails?.rule_type,
          widget_id: widgetRuleDetails?.widget_id,
          context_type: widgetRuleDetails?.context_type,
          context_data: widgetRuleDetails?.context_data,
          variant: widgetRuleDetails?.variant,
          rules: productDetails?.rule_details,
        };
        const productOptions: any = [];
        try {
          if (productAnalytics?.variant_options_ej?.length) {
            productAnalytics?.variant_options_ej?.forEach(
              (productOption: any) => {
                const tempOption: any = {};
                let defaultSelected = productOption?.option_values?.filter(
                  (opt: any) => {
                    return opt?.is_default;
                  }
                );
                if (defaultSelected?.length === 0) {
                  defaultSelected = productOption?.option_values[0];
                } else {
                  defaultSelected = defaultSelected[0];
                }
                tempOption['name'] = productOption?.display_name;
                tempOption['value'] = defaultSelected?.label;
                productOptions.push(tempOption);
              }
            );
          }
          if (productAnalytics?.provider_specific_data_ej?.modifiers?.length) {
            productAnalytics?.provider_specific_data_ej?.modifiers?.forEach(
              (productModifier: any) => {
                const tempModifier: any = {};
                let defaultSelected = productModifier?.option_values?.filter(
                  (opt: any) => {
                    return opt?.is_default;
                  }
                );
                if (defaultSelected?.length === 0) {
                  defaultSelected = productModifier?.option_values[0];
                } else {
                  defaultSelected = defaultSelected[0];
                }
                tempModifier['name'] = productModifier?.display_name;
                tempModifier['value'] = defaultSelected?.label;
                productOptions.push(tempModifier);
              }
            );
          }
        } catch (err) {
          console.error(err);
        }
        AnalyticsService.trackProductViewed({
          sku: productAnalytics?.sku_for_analytics_esli,
          price: productAnalytics?.calculated_price_efi,
          searchTerm: queryParams.get('q'),
          search_location:
            mode === 'search'
              ? queryParams.get('ac')
                ? 'autocomplete'
                : 'page'
              : null,
          mode: mode ? mode : 'direct',
          category: analyticsCategory,
          brand: productAnalytics?.brand_esi,
          name: productAnalytics?.name_esi,
          productCategories: productAnalytics?.category_meta_ej,
          rules: productDetails?.rule_details,
          is_primary_algorithm:
            widgetRuleDetails && productDetails?.is_primary_algorithm,
          is_secondary_algorithm:
            widgetRuleDetails && productDetails?.is_secondary_algorithm,
          algorithm: widgetRuleDetails?.algorithm,
          is_merchandising:
            widgetRuleDetails && productDetails?.is_merchandising,
          rule: widgetRuleDetails?.rule_id,
          rule_type: widgetRuleDetails?.rule_type,
          widget_id: widgetRuleDetails?.widget_id,
          context_type: widgetRuleDetails?.context_type,
          context_data: widgetRuleDetails?.context_data,
          variant: widgetRuleDetails?.variant,
          mode_details: modeDetails,
          product_option: productOptions,
        });
      }
    } catch (err) {
      setIsQuickViewLoading(false);
      setIsModalOpen(false);
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(t('toast_msg_error.something_went_wrong'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails.sku_esi]);

  const addModeDataToLocalStorageForThePurchaseAnalytics = (
    mode: string,
    searchTerm: string | null,
    searchLocation: string | null,
    category: string | null,
    sku: string,
    sku_for_analytics_esli: string,
    product_categories: any,
    varientSku: string | null,
    widgetId: string | null,
    varientId: string | null,
    rules: any,
    is_primary_algorithm: boolean | null,
    is_secondary_algorithm: boolean | null,
    algorithm: any,
    is_merchandising: boolean | null,
    rule: any,
    rule_type: any,
    widget_id: any,
    context_type: any,
    context_data: any,
    variant: any
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
      search_location: searchLocation,
      category,
      sku,
      sku_for_analytics_esli,
      product_categories,
      varientSku: varientSku,
      widgetId: widgetId,
      varientId: varientId,
      rules,
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
    };
    localstorageAnalyticsData.push(analyticisData);
    localStorage.setItem('a_d_', JSON.stringify(localstorageAnalyticsData));
  };

  const triggerProductAddedToCartAnalyticsEvent = () => {
    const analyticsMode = mode || queryParams.get('m') || 'direct';
    const searchTerm = queryParams.get('q') || queryParams.get('st');
    const analyticsWidgetId = queryParams.get('w') || widgetId;
    const searchLocation =
      analyticsMode === 'search'
        ? queryParams.get('ac')
          ? 'autocomplete'
          : 'page'
        : null;
    const analyticsCategory =
      category || widgetRuleDetails?.category || queryParams.get('c');

    const modeDetails: any = {
      search_term: searchTerm,
      search_location: searchLocation,
      category: analyticsCategory,
      is_primary_algorithm:
        widgetRuleDetails && productDetails?.is_primary_algorithm,
      is_secondary_algorithm:
        widgetRuleDetails && productDetails?.is_secondary_algorithm,
      algorithm: widgetRuleDetails?.algorithm,
      is_merchandising: widgetRuleDetails && productDetails?.is_merchandising,
      rule: widgetRuleDetails?.rule_id,
      rule_type: widgetRuleDetails?.rule_type,
      widget_id: widgetRuleDetails?.widget_id,
      context_type: widgetRuleDetails?.context_type,
      context_data: widgetRuleDetails?.context_data,
      variant: widgetRuleDetails?.variant,
      rules: productDetails?.rule_details,
    };
    AnalyticsService.trackProductAddedToCart({
      sku: productDetails?.sku_for_analytics_esli,
      variantSku: '',
      totalValue: productDetails.calculated_price_efi * 1,
      quantity: 1,
      price: processPrice(productDetails, '', ''),
      name: productDetails.name_eti,
      brand: productDetails.brand_esi,
      mode: analyticsMode,
      widgetId: analyticsWidgetId,
      searchTerm: searchTerm,
      search_location: searchLocation,
      category: analyticsCategory,
      productCategories: productDetails?.category_meta_ej,
      rules: productDetails?.rule_details,
      is_primary_algorithm:
        widgetRuleDetails && productDetails?.is_primary_algorithm,
      is_secondary_algorithm:
        widgetRuleDetails && productDetails?.is_secondary_algorithm,
      algorithm: widgetRuleDetails?.algorithm,
      is_merchandising: widgetRuleDetails && productDetails?.is_merchandising,
      rule: widgetRuleDetails?.rule_id,
      rule_type: widgetRuleDetails?.rule_type,
      widget_id: widgetRuleDetails?.widget_id,
      context_type: widgetRuleDetails?.context_type,
      context_data: widgetRuleDetails?.context_data,
      variant: widgetRuleDetails?.variant,
      mode_details: modeDetails,
    });

    addModeDataToLocalStorageForThePurchaseAnalytics(
      analyticsMode,
      searchTerm,
      searchLocation,
      analyticsCategory,
      productDetails.sku_esi,
      productDetails?.sku_for_analytics_esli,
      productDetails?.category_meta_ej,
      '',
      analyticsWidgetId,
      '',
      productDetails?.rule_details,
      widgetRuleDetails && productDetails?.is_primary_algorithm,
      widgetRuleDetails && productDetails?.is_secondary_algorithm,
      widgetRuleDetails?.algorithm,
      widgetRuleDetails && productDetails?.is_merchandising,
      widgetRuleDetails?.rule_id,
      widgetRuleDetails?.rule_type,
      widgetRuleDetails?.widget_id,
      widgetRuleDetails?.context_type,
      widgetRuleDetails?.context_data,
      widgetRuleDetails?.variant
    );
  };

  const handelProductClicked = () => {
    const analyticsData: any = {
      mode: mode,
      sku: productDetails?.sku_esi,
      sku_for_analytics_esli: productDetails?.sku_for_analytics_esli,
    };
    if (mode === 'search') {
      analyticsData['search_location'] = queryParams.get('ac')
        ? 'autocomplete'
        : 'page';
      analyticsData['rules'] = productDetails?.rule_details;
    } else if (mode === 'widget' && widgetId) {
      analyticsData['widget_id'] = removeHtmlTags(widgetId);
    } else if (mode === 'widget' && widgetRuleDetails) {
      analyticsData['is_primary_algorithm'] =
        productDetails?.is_primary_algorithm;
      analyticsData['is_secondary_algorithm'] =
        productDetails?.is_secondary_algorithm;
      analyticsData['algorithm'] = widgetRuleDetails?.algorithm;
      analyticsData['is_merchandising'] = productDetails?.is_merchandising;
      analyticsData['rule'] = widgetRuleDetails?.rule_id;
      analyticsData['rule_type'] = widgetRuleDetails?.rule_type;
      analyticsData['widget_id'] = widgetRuleDetails?.widget_id;
      analyticsData['context_type'] = widgetRuleDetails?.context_type;
      analyticsData['context_data'] = widgetRuleDetails?.context_data;
      analyticsData['variant'] = widgetRuleDetails?.variant;
      analyticsData['category'] = widgetRuleDetails?.category;
    } else if (mode === 'category' || mode === 'direct') {
      analyticsData['rules'] = productDetails?.rule_details;
    }

    let localstorageAnalyticsData = [];
    if (localStorage.getItem(`${mode}_a_d_`)) {
      localstorageAnalyticsData = JSON.parse(
        localStorage.getItem(`${mode}_a_d_`) as string
      );
    }
    let isProductid: any;
    if (localstorageAnalyticsData.length) {
      isProductid = localstorageAnalyticsData?.find(
        (analyticsProduct: any) =>
          analyticsProduct?.sku === productDetails?.sku_esi
      );
    }
    if (!isProductid) {
      localstorageAnalyticsData.push(analyticsData);
    }

    localStorage.setItem(
      `${mode}_a_d_`,
      JSON.stringify(localstorageAnalyticsData)
    );
  };

  const handleViewDetailsClick = () => {
    handelProductClicked();
    navigate(productNavigationUrl);
  };

  const handleAddToCartButtonClick = async () => {
    const userDetails = AuthService.getUserDetails();

    //Clearing the flag of purchase_a_d_ for Analyticis Event for External Checkout
    localStorage.removeItem('purchase_a_d_');
    setIsCartLoading(true);
    try {
      const line_items: [{ product_id: number; quantity: number }] = [
        {
          product_id: +productDetails?.provider_id_esi,
          quantity: 1,
        },
      ];

      let cartDetails: any;
      if (userDetails?.userCartObj?.id) {
        cartDetails = await EcommerceService.addToCart({ line_items });
        if (cartDetails.Status === 'failure') {
          toast.error(cartDetails.Error.message);
          setIsCartLoading(false);
          return;
        }
      } else {
        let customerId: string = '';
        if (userDetails?.userInfo?.ecommCustomerId) {
          customerId = userDetails.userInfo?.ecommCustomerId;
        }
        cartDetails = await EcommerceService.createCart({
          customerId: customerId,
          line_items: line_items,
        });
        if (cartDetails.Status === 'failure') {
          toast.error(cartDetails.Error.message);
          setIsCartLoading(false);
          return;
        }
      }
      if (cartDetails.Status !== 'failure') {
        triggerProductAddedToCartAnalyticsEvent();
      }
      const userTemp = { ...userDetails };
      userTemp.userCartObj = cartDetails;
      AuthService.setUserDetails(userTemp);
      setIsCartLoading(false);
      document.dispatchEvent(new Event('CART_REFRESH'));
      document.dispatchEvent(new Event('OPEN_CART_SLIDER'));
      toast.success('Product added to cart');
    } catch (err) {
      console.error(err);
      setIsCartLoading(false);
      toast.error(t('toast_msg_error.something_went_wrong'));
    }
  };

  const defaultProductExceptColor = () => {
    const selectedOptions: any = {};
    const varientOptions = productDetails?.variant_options_ej?.filter(
      (elem: any) => elem.display_name !== 'Color'
    );
    if (varientOptions && varientOptions.length) {
      varientOptions.forEach((option: any) => {
        const defaultOption =
          option.option_values?.find((value: any) => value.is_default) ||
          option.option_values[0];
        if (defaultOption) {
          selectedOptions[option.id] = defaultOption.id;
        }
      });
    }
    return selectedOptions;
  };

  const getSelectedVarient = (selectedColorOption: any) => {
    let selectedVariant;
    const selectedProductOptions = {
      ...defaultProductExceptColor(),
      ...selectedColorOption,
    };

    if (productDetails?.variants_ej) {
      for (const key in productDetails?.variants_ej) {
        const varient = productDetails?.variants_ej[key];

        let allMatch = true;
        varient?.option_values?.forEach((option: any) => {
          const selectedOption = selectedProductOptions[option.option_id];
          if (!(option.id === selectedOption)) {
            allMatch = false;
          }
        });
        if (allMatch) {
          selectedVariant = varient;
          break;
        }
      }
    }
    return selectedVariant;
  };

  const getVarient = (option: any) => {
    setColorOption(option.value_data?.colors[0]);
    const selectedProductVarient = { ...selectedVarient };
    selectedProductVarient[productOptionId] = option.id;
    const finalVarient = getSelectedVarient(selectedProductVarient);
    setSelectedVarient(finalVarient);
  };

  useEffect(() => {
    const colorVarientOptions = productDetails?.variant_options_ej?.find(
      (product: any) => product.display_name === 'Color'
    );
    setColorVarients([colorVarientOptions]);

    if (colorVarientOptions) {
      const selectedProductOptions: any = {};
      const selectedDefaultProductOption =
        colorVarientOptions?.option_values?.find(
          (option: any) => option.is_default
        );
      if (selectedDefaultProductOption) {
        setSelectedVarient(
          (selectedProductOptions[colorVarientOptions?.id] =
            selectedDefaultProductOption?.id)
        );
      } else {
        setSelectedVarient(productDetails.variants_ej[0]);
      }
      setProductOptionId(colorVarientOptions?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    averageReviewsCount,
    images,
    isModalOpen,
    isCartLoading,
    isQuickViewLoading,
    productData,
    productNavigationUrl,
    queryParams,
    selectedSku,
    colorVarients,
    colorOption,
    selectedVarient,
    getVarient,
    setIsModalOpen,
    handleModalOpen,
    handleCloseModal,
    handleAddToCartButtonClick,
    handleViewDetailsClick,
    handelProductClicked,
    options,
    wishlistClicked,
    setWishlistClicked,
  };
};

export default ExpProductCellController;
