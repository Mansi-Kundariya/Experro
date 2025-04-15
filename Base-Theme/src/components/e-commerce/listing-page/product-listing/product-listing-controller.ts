import { useEffect, useMemo, useState } from 'react';
import {
  AnalyticsService,
  EcommerceService,
  toast,
  useSearchParams,
} from 'experro-storefront';
import { useTranslation } from 'react-i18next';
import { schemaInjector } from '../../../../utils/schema-org/schema-org';

export interface ExpProductListingControllerProps {
  pageData: any;
  changeQueryParamFilter: any;
  setSearchResults: (value: any) => void;
  convertAmountToBaseCurrency: any;
}

const ExpProductListingController = (
  props: ExpProductListingControllerProps
) => {
  const {
    pageData,
    changeQueryParamFilter,
    setSearchResults,
    convertAmountToBaseCurrency,
  } = props;
  const [queryParams] = useSearchParams();
  const _fs = useMemo(() => queryParams.getAll('_fs'), [queryParams]);
  const _fsr = useMemo(() => queryParams.getAll('_fsr'), [queryParams]);
  const searchText = useMemo(() => queryParams.get('q'), [queryParams]);
  const isAutoCompleteSearch = useMemo(
    () => queryParams.get('ac'),
    [queryParams]
  );
  const _pageNumber: number = useMemo(
    () => Number(queryParams.get('from')) || 1,
    [queryParams]
  );
  const { t } = useTranslation();

  const detectMode = () => {
    let tempMode: string;
    if (
      pageData?.title &&
      pageData?.content_model_data_id &&
      !(
        pageData &&
        pageData?.content_model_internal_name &&
        pageData?.content_model_internal_name?.indexOf('ecommerce_brand') > -1
      )
    ) {
      tempMode = 'category';
    } else if (
      pageData &&
      pageData?.content_model_internal_name &&
      pageData?.content_model_internal_name?.indexOf('ecommerce_brand') > -1
    ) {
      tempMode = 'direct';
    } else {
      tempMode = 'search';
    }
    return tempMode;
  };

  const mode = detectMode();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [product, setProduct] = useState<{
    data: any;
    isLoading: boolean;
  }>({
    data: {},
    isLoading: true,
  });
  const [productList, setProductList] = useState<{
    skip: number;
    sortBy: string;
    productCompareSku: any[];
  }>({
    skip: 0,
    sortBy: 'relevance',
    productCompareSku: [],
  });

  const showClearFiltersButton = useMemo(() => {
    return (
      Boolean(queryParams.getAll('_fs')?.length) ||
      Boolean(queryParams.getAll('_fsr')?.length) ||
      Boolean(queryParams.getAll('_fss')?.length)
    );
  }, [queryParams]);

  const handleFacets = (facetType: string | undefined) => {
    switch (facetType) {
      case '_fs':
        return [
          ...queryParams.getAll('_fs').map((facet: any) => {
            const tmp = facet.split(';;');
            return {
              field_internal_name: tmp[0],
              value: tmp[1],
            };
          }),
        ];

      default:
        return handleFacetRangeOrSliderRange(facetType || '');
    }
  };

  const handleFacetRangeOrSliderRange = (facetType: string) => {
    return queryParams.getAll(facetType)?.map((_f: any) => {
      const tmp = _f?.split(';;');
      return {
        field_internal_name: tmp[0],
        min: convertAmountToBaseCurrency(tmp[1]) || '*',
        max: convertAmountToBaseCurrency(tmp[2]) || '*',
      };
    });
  };

  const facetInRequestObj = () => {
    let facetsFilters: any = [];
    let facetRange: any = [];
    let sliderFacetRange: any = [];

    if (queryParams.has('_fs')) {
      facetsFilters = handleFacets('_fs');
    }
    if (queryParams.has('_fsr')) {
      facetRange = handleFacets('_fsr');
    }
    if (queryParams.has('_fss')) {
      sliderFacetRange = handleFacets('_fss');
    }

    return [...facetRange, ...sliderFacetRange, ...facetsFilters];
  };

  const handlePageCategory = (requestObj: any) => {
    if (
      pageData &&
      pageData?.content_model_internal_name &&
      pageData?.content_model_internal_name?.indexOf('ecommerce_brand') > -1
    ) {
      requestObj.body['filter'] = {
        fq: `brand_id_esi:${pageData?.provider_id_esi}`,
      };
    } else if (pageData?.title && pageData?.content_model_data_id) {
      requestObj.body['categories'] = pageData?.title;
      requestObj.body['category_id'] = pageData?.content_model_data_id;
    } else {
      if (queryParams.has('q')) {
        requestObj.body.search_terms = queryParams.get('q');
      } else {
        setProduct({
          ...product,
          isLoading: false,
        });
        return;
      }
    }
  };

  const handleProductSKUs = (
    productSku: string,
    productCompareSkus: any,
    tempSkus: any[]
  ) => {
    if (
      productCompareSkus?.find((_sku: string) => _sku === productSku)?.length
    ) {
      tempSkus.splice(
        tempSkus.findIndex((_sku) => _sku === productSku),
        1
      );
      return toast.success(t('toast_msg_success.product_removed_from_compare'));
    } else if (tempSkus?.length === 4) {
      return toast.error(t('toast_msg_error.max_compare_items'));
    } else if (tempSkus?.length <= 4) {
      tempSkus?.push(productSku);
      return toast.success(t('toast_msg_success.product_added_compare'));
    } else {
      tempSkus = [...productCompareSkus];
      toast.error(t('toast_msg_error.something_went_wrong'));
    }
  };

  const handleProductCompare = (productSku: string) => {
    let productCompareSkus: any = [];
    if (localStorage.getItem('_c_p') !== null) {
      productCompareSkus = JSON.parse(localStorage.getItem('_c_p') as string);
    }
    const tempSkus = [...productCompareSkus];

    handleProductSKUs(productSku, productCompareSkus, tempSkus);

    localStorage.setItem('_c_p', JSON.stringify(tempSkus));
    setProductList({ ...productList, productCompareSku: tempSkus });
    document.dispatchEvent(new Event('COMPARE_REFRESH'));
  };

  const getProducts = async (skipProducts: any) => {
    try {
      if (queryParams.has('sort')) {
        setProductList({
          ...productList,
          sortBy: queryParams.get('sort') as string,
        });
      } else {
        setProductList({
          ...productList,
          sortBy: 'relevance',
        });
      }

      const requestObj: any = {
        skip: skipProducts,
        limit: 12,
        sortBy: queryParams.get('sort')?.split(':')[0] || 'relevance',
        orderBy: queryParams.get('sort')?.split(':')[1],
        body: {},
        fieldsToQuery:
          'brand_esi,brand_page_slug_esi,calculated_price_efi,categories_esai,category_meta_ej,category_tree_ej,custom_url,id,images_ej,name_eti,page_slug_esi,price_efi,provider_id_esi,provider_specific_data_ej,retail_price_ef,reviews_count_eii,reviews_rating_sum_eii,sale_price_efi,sku_esi,sku_for_analytics_esli,variant_options_ej,variants_ej',
      };

      requestObj.body['facets'] = [...facetInRequestObj()];

      handlePageCategory(requestObj);
      const productDataPromise = [];
      const productDataApiPromise = EcommerceService.search({
        searchObj: requestObj,
        isAuto: !!queryParams.get('q'),
        searchTerm: queryParams.get('q'),
      });
      productDataPromise.push(productDataApiPromise);
      const searchCountApiPromise = EcommerceService.getSearchCount({
        searchObj: requestObj,
        key: 'product-listing-search-count',
        componentId: 'exp-product-listing-search-count',
      });
      productDataPromise.push(searchCountApiPromise);
      const [productDataResponse, productDataSearchCountResponse] =
        await Promise.all(productDataPromise);
      if (productDataSearchCountResponse?.Status === 'success') {
        productDataResponse.Data.total_count =
          productDataSearchCountResponse.Data.total_count;
      }
      if (productDataResponse.Status === 'success') {
        if (productDataResponse?.Data?.items) {
          /**
           * Here we are adding handling for the schema
           */
          if (
            pageData?.content_model_internal_name &&
            (pageData?.content_model_internal_name?.indexOf(
              'ecommerce_category'
            ) > -1 ||
              pageData?.content_model_internal_name?.indexOf(
                'ecommerce_brand'
              ) > -1)
          ) {
            const data_for_category = {
              category_data: pageData,
              products: productDataResponse?.Data?.items,
            };
            schemaInjector({ type: 'Category', data: data_for_category });
          } else if (searchText) {
            const data_for_search = {
              query: searchText,
              products: productDataResponse?.Data?.items,
            };
            schemaInjector({ type: 'Search', data: data_for_search });
          }

          productDataResponse?.Data?.items?.forEach((element: any) => {
            element?.rule_details?.forEach((rule: any) => {
              delete rule?.rule_name;
              rule?.conditions?.forEach((condtion: any) => {
                delete condtion?.name;
              });
            });
          });
        }
        setProduct({ data: productDataResponse?.Data, isLoading: false });
        setSearchResults(productDataResponse?.Data);
        const skusForAnalyticsRules: any = [];
        productDataResponse?.Data?.items?.forEach((item: any) => {
          const tempItem: any = {};
          tempItem['sku'] = item?.sku_for_analytics_esli;
          tempItem['rules'] = item?.rule_details;
          skusForAnalyticsRules.push(tempItem);
        });
        if (
          searchText &&
          typeof productDataResponse?.Data?.total_count === 'number'
        ) {
          AnalyticsService.trackProductSearched({
            search_location: isAutoCompleteSearch ? 'autocomplete' : 'page',
            searchTerm: searchText,
            noOfResults: productDataResponse?.Data?.total_count,
            products_detail: skusForAnalyticsRules,
            sku: productDataResponse?.Data?.items?.map(
              (elem: any) => elem?.sku_for_analytics_esli
            ),
          });
        }
        if (
          pageData?.content_model_internal_name?.startsWith(
            'ecommerce_category'
          ) &&
          !(
            pageData &&
            pageData?.content_model_internal_name &&
            pageData?.content_model_internal_name?.indexOf('ecommerce_brand') >
              -1
          )
        ) {
          AnalyticsService.trackCategoryViewed({
            categoryName: pageData?.name_esi,
            categoryId: pageData?.id,
            provider_id_esi: pageData?.provider_id_esi,
            items: productDataResponse.Data?.items,
            products_detail: skusForAnalyticsRules,
            sku: productDataResponse?.Data?.items?.map(
              (elem: any) => elem?.sku_for_analytics_esli
            ),
          });
        }
        return productDataResponse?.Data;
      }
    } catch (err) {
      setProduct({
        ...product,
        isLoading: false,
      });
    }
  };

  const handleSortByChange = (event: any) => {
    changeQueryParamFilter({ sort: event?.target?.value });
  };

  const clearAllFilters = () => {
    changeQueryParamFilter({ _fs: [], _fsr: [], _fss: [] });
  };

  useEffect(() => {
    (async () => {
      setProduct({
        data: {
          ...product?.data,
          items: [],
        },
        isLoading: true,
      });
      const products = await getProducts(((_pageNumber - 1) * 12).toString());
      setProduct({
        isLoading: false,
        data: products,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_pageNumber, _fs, _fsr]);

  const setScrollPositionToSessionStorage = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    sessionStorage.setItem('scr', `${scrollPosition}`);
  };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scr');
    if (scrollPosition) {
      setTimeout(() => {
        window.scroll({ top: parseInt(scrollPosition), behavior: 'smooth' });
        sessionStorage.removeItem('scr');
      }, 1000);
    }

    (async () => {
      if (productList.skip > 0) {
        setProduct({
          ...product,
          isLoading: true,
        });
        const products = await getProducts(productList.skip);

        setProduct({
          data: {
            ...product?.data,
            items: [...product?.data?.items, ...products?.items],
          },
          isLoading: false,
        });
      }
    })();
    if (localStorage.getItem('_c_p') !== null) {
      setProductList({
        ...productList,
        productCompareSku: JSON.parse(localStorage.getItem('_c_p') as string),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    mode,
    pageNumber,
    product,
    productList,
    setPageNumber,
    showClearFiltersButton,
    handleSortByChange,
    handleProductCompare,
    clearAllFilters,
    setScrollPositionToSessionStorage,
  };
};

export default ExpProductListingController;
