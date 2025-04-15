import { AnalyticsService, useSearchParams } from 'experro-storefront';
import { useCallback, useEffect, useState } from 'react';

interface ExpProductOptionsControllerProps {
  product: any;
  productOptions: any;
  selectedProductOption: any;
  setSelectedProductOption: any;
  getVariantFromSelectOption: any;
  analyticsMode?: string | undefined;
  analyticsSearchTerm?: string | null | undefined;
  analyticsCategory?: string | undefined;
}

const ExpProductOptionsController = (
  props: ExpProductOptionsControllerProps
) => {
  const {
    product,
    productOptions,
    selectedProductOption,
    setSelectedProductOption,
    getVariantFromSelectOption,
    analyticsMode,
    analyticsSearchTerm,
    analyticsCategory,
  } = props;
  const [queryParams] = useSearchParams();

  const [selectedProductOptionValue, setSelectedProductOptionValue] =
    useState<any>({});

  const trackProductVarientViewedEvent = (selectedProductOptions: any) => {
    let selectedVariant;
    if (product?.variants_ej) {
      for (const key in product?.variants_ej) {
        const variant = product?.variants_ej[key];
        let allMatch = true;
        variant?.option_values?.forEach((option: any) => {
          const selectedOption = selectedProductOptions[option.option_id];
          if (!(selectedOption && option.id.toString() === selectedOption)) {
            allMatch = false;
          }
        });
        if (allMatch) {
          selectedVariant = variant;
          break;
        }
      }
    }

    const productOptions: any = [];

    if (selectedVariant?.option_values?.length) {
      selectedVariant?.option_values?.forEach((productOption: any) => {
        const tempOption: any = {};
        tempOption['name'] = productOption?.option_display_name;
        tempOption['value'] = productOption?.label;
        productOptions.push(tempOption);
      });
    }

    let analyticsProductData: any;

    const mode = analyticsMode || queryParams.get('m') || 'direct';
    const searchTerm = analyticsSearchTerm || queryParams.get('st');
    const category =
      analyticsCategory ||
      queryParams.get('c') ||
      analyticsProductData?.category;

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

    AnalyticsService.trackProductVarientViewed({
      sku: product?.sku_for_analytics_esli,
      price: product?.calculated_price_efi,
      searchTerm: searchTerm,
      search_location: analyticsProductData?.search_location,
      mode: mode,
      category: category,
      brand: product.brand_esi,
      name: product.name_esi,
      productCategories: product.category_meta_ej,
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
  };

  const getSelectedOptionValue = useCallback(() => {
    const selectedProductOptionValue: any = {};
    // eslint-disable-next-line array-callback-return
    productOptions.find((option: any) => {
      const value = option?.option_values.find((value: any) => {
        if (
          value.id.toString() === selectedProductOption[option.id].toString()
        ) {
          return value;
        }
        return undefined; // Return undefined when the condition is not met
      });
      selectedProductOptionValue[option.id] = value ? value.label : null; // Handle the case when `value` is null
    });
    setSelectedProductOptionValue(selectedProductOptionValue);
  }, [productOptions, selectedProductOption]);

  const handleSelectedProductOptionChange = useCallback(
    (productOptionId: string, optionId: any, event: any) => {
      event.preventDefault();
      const tempSelectedProductOption = {
        ...selectedProductOption,
        [`${productOptionId}`]: optionId.toString(),
      };
      trackProductVarientViewedEvent(tempSelectedProductOption);
      setSelectedProductOption(tempSelectedProductOption);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedProductOption]
  );

  const handleProductOptionDropDownChange = useCallback(
    (productOptionId: string, event: any) => {
      event.preventDefault();
      const tempSelectedProductOption = {
        ...selectedProductOption,
        [`${productOptionId}`]: event?.target?.value.toString(),
      };
      trackProductVarientViewedEvent(tempSelectedProductOption);
      setSelectedProductOption(tempSelectedProductOption);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedProductOption]
  );

  useEffect(() => {
    if (selectedProductOption) {
      getSelectedOptionValue();
      getVariantFromSelectOption();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductOption]);

  return {
    selectedProductOptionValue,
    handleSelectedProductOptionChange,
    handleProductOptionDropDownChange,
  };
};

export default ExpProductOptionsController;
