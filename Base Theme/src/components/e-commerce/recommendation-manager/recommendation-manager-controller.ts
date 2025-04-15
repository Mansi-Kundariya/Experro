import {
  AnalyticsService,
  CommonUtilities,
  ContentService,
  EcommerceService,
  IsCMSApp,
  useSearchParams,
} from 'experro-storefront';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  DotButton,
  useDotButton,
} from '../../../utils/embla-carousel-pagination-button';
import { EmblaOptionsType } from 'embla-carousel';

const ExpRecommendationManagerController = ({
  location,
  pageData,
}: {
  location: string;
  pageData: any;
}) => {
  const [recommendationManagerWidgetData, setRecommendationManagerWidgetData] =
    useState<any>([]);
  const [recommendationManagerLoading, setRecommendationManagerLoading] =
    useState<boolean>(false);
  let searchText: string = '';
  let queryParams: any;

  const settingsForSlids: EmblaOptionsType = {
    active: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
    loop: true,
  };

  const SettingForAutoPlay: any = {
    playOnInit: CommonUtilities.isRenderingOnServer() ? false : true,
    delay: 5000,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(settingsForSlids, [
    Autoplay(SettingForAutoPlay),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  if (IsCMSApp) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [queryParams] = useSearchParams();
    searchText = queryParams.get('q');
  }

  // This function will be used for the context-type it means in which page you have dropped this widget.
  const getContextType = () => {
    let _contextType: string = '';
    const { content_model_internal_name } = pageData;

    if (content_model_internal_name?.startsWith('ecommerce_product')) {
      _contextType = 'product';
    } else if (content_model_internal_name?.startsWith('ecommerce_category')) {
      _contextType = 'category';
    } else if (content_model_internal_name?.startsWith('ecommerce_brand')) {
      _contextType = 'brand';
    } else if (content_model_internal_name === 'web_pages') {
      _contextType = 'web_page';
    } else if (window.location.pathname === '/cart/') {
      _contextType = 'cart';
    } else if (
      window.location.pathname === '/search' ||
      window.location.pathname === '/search/'
    ) {
      _contextType = 'search';
    } else if (window.location.pathname === '/checkout/') {
      _contextType = 'checkout';
    }
    return _contextType;
  };

  const getContextData = () => {
    let _contextData: string = '';
    const { content_model_internal_name, content_model_data_id } = pageData;

    if (content_model_internal_name?.startsWith('ecommerce_product')) {
      _contextData = content_model_data_id;
    } else if (content_model_internal_name?.startsWith('ecommerce_category')) {
      _contextData = content_model_data_id;
    } else if (content_model_internal_name?.startsWith('ecommerce_brand')) {
      _contextData = content_model_data_id;
    } else if (content_model_internal_name === 'web_pages') {
      _contextData = content_model_data_id;
    } else if (window.location.pathname === '/cart/') {
      _contextData = 'cart';
    } else if (
      window.location.pathname === '/search' ||
      window.location.pathname === '/search/'
    ) {
      _contextData = queryParams.get('q') || '';
    } else if (window.location.pathname === '/checkout/') {
      _contextData = 'checkout';
    }
    return _contextData;
  };

  // This function is used for the track Analytics event for widget.
  const triggerAnalyticsForWidget = async (widgetData: any) => {
    const skusForAnalyticsRules: any = [];
    const pageType: string = getContextType();

    let pageMetaId: string | null;
    let pageDisplayName: string | null;
    if (
      window.location.pathname === '/cart/' ||
      window.location.pathname === '/search/' ||
      window.location.pathname === '/search' ||
      window.location.pathname === '/checkout/'
    ) {
      pageMetaId = null;
      pageDisplayName = getContextData();
    } else {
      pageMetaId = getContextData();
      pageDisplayName = pageData?.title;
    }

    widgetData?.products?.forEach(async (product: any) => {
      const tempItem: any = {
        sku: product?.sku_for_analytics_esli,
        name: product?.name_esi,
        price: product?.calculated_price_efi,
        brand: product?.brand_esi,
        product_category: product?.category_meta_ej,
        is_primary_algorithm: product?.is_primary_algorithm,
        is_secondary_algorithm: product?.is_secondary_algorithm,
        algorithm: widgetData?.rule_details?.algorithm,
        is_merchandising: product?.is_merchandising,
        rule: widgetData?.rule_details?.rule_id,
        rule_type: widgetData?.rule_details?.rule_type,
        widget_id: widgetData?.rule_details?.widget_id,
        context_type: widgetData?.rule_details?.context_type,
        context_data: widgetData?.rule_details?.context_data,
        category: widgetData?.rule_details?.category,
        variant: widgetData?.rule_details?.variant,
        rules: product?.rule_details,
      };
      skusForAnalyticsRules.push(tempItem);
    });

    // track Analytics event for widget.
    await AnalyticsService.trackWidgetViewed({
      noOfResults: widgetData?.total_count,
      products_detail: skusForAnalyticsRules,
      sku: widgetData?.products?.map(
        (elem: any) => elem?.sku_for_analytics_esli
      ),
      algorithm: widgetData?.rule_details?.algorithm,
      rule: widgetData?.rule_details?.rule_id,
      rule_type: widgetData?.rule_details?.rule_type,
      widget_id: widgetData?.rule_details?.widget_id,
      context_type: widgetData?.rule_details?.context_type,
      context_data: widgetData?.rule_details?.context_data,
      category: widgetData?.rule_details?.category,
      variant: widgetData?.rule_details?.variant,
      pageType,
      pageMetaId,
      pageDisplayName,
    });
  };

  const getQueryObjectByLocation = () => {
    let queryObject: any = {
      modelInternalName: 'recommendation_manager',
      ssrKey: `${location}_recommendation_manager`,
      fieldKey: 'id',
      fieldValue: '*',
      fieldsToQuery:
        'widget_id_et,widget_name_et,widget_description_et,dynamic_name_es,no_of_products_es,display_ebi',
    };

    switch (location) {
      case 'Home Page':
        queryObject = {
          ...queryObject,
          filter: 'location_esai:("Home Page") AND display_ebi:true',
        };
        break;
      case 'Product Page':
        queryObject = {
          ...queryObject,
          filter: 'location_esai:("Product Page") AND display_ebi:true',
        };
        break;
      case 'Category Page':
        queryObject = {
          ...queryObject,
          filter: 'location_esai:("Category Page") AND display_ebi:true',
        };
        break;
      case 'Cart Page':
        queryObject = {
          ...queryObject,
          filter: 'location_esai:("Cart Page") AND display_ebi:true',
        };
        break;
      case 'Search Page':
        queryObject = {
          ...queryObject,
          filter: 'location_esai:("Search Page") AND display_ebi:true',
        };
        break;
    }

    return queryObject;
  };

  const getRecommendationProductsByWidgetId = async (widgetIds: any) => {
    try {
      const widgetsProductData: any = [];
      for (let i = 0; i < widgetIds?.length; i++) {
        if (widgetIds[i]?.widget_id_et?.length) {
          const productsByWidgetId = await EcommerceService.widgetSearch({
            widgetData: {
              widget_id: widgetIds[i]?.widget_id_et,
              context_type: getContextType(),
              context_data: getContextData(),
            },
            fieldsToQuery:
              'brand_esi,brand_page_slug_esi,calculated_price_efi,categories_esai,category_meta_ej,category_tree_ej,custom_url,id,images_ej,name_esi,name_eti,page_slug_esi,price_efi,provider_id_esi,provider_specific_data_ej,retail_price_ef,reviews_count_eii,reviews_rating_sum_eii,sale_price_efi,sku_esi,sku_for_analytics_esli,variant_options_ej,variants_ej',
            skip: '0',
            limit: widgetIds[i]?.no_of_products_es || '5',
          });

          if (
            productsByWidgetId?.Status === 'success' &&
            productsByWidgetId?.Data?.items?.length
          ) {
            // Add category name in response of widgetSResponse in rule_details object for Analytics event when recommendation-manager is on category page
            if (
              pageData?.content_model_internal_name?.startsWith(
                'ecommerce_category'
              ) &&
              productsByWidgetId?.Data?.rule_details
            ) {
              productsByWidgetId.Data.rule_details['category'] =
                pageData?.title;
            }
            const tempgeneratedUUID: string = CommonUtilities.generateUUID();
            widgetsProductData.push({
              widget_id: widgetIds[i]?.widget_id_et,
              widget_name: widgetIds[i]?.widget_name_et,
              widget_description: widgetIds[i]?.widget_description_et,
              dynamic_name_es: widgetIds[i]?.dynamic_name_es,
              products: productsByWidgetId?.Data?.items,
              rule_details: productsByWidgetId?.Data?.rule_details,
              total_count: productsByWidgetId?.Data?.total_count,
              divID: tempgeneratedUUID,
            });
          }
        }
      }
      setRecommendationManagerWidgetData(widgetsProductData);
      setRecommendationManagerLoading(false);
    } catch (e) {
      console.error(
        e,
        "Something went wrong while getting products data by widgetId's"
      );
      setRecommendationManagerLoading(false);
    }
  };

  const getRecommendationManagerRecords = async () => {
    try {
      const recommedation_manager_records =
        await ContentService.searchContentModelRecordsByFieldKeyValueGET(
          getQueryObjectByLocation()
        );

      if (
        recommedation_manager_records?.Status === 'success' &&
        recommedation_manager_records?.Data?.items?.length
      ) {
        getRecommendationProductsByWidgetId(
          recommedation_manager_records?.Data?.items
        );
      } else {
        setRecommendationManagerLoading(false);
      }
    } catch (e) {
      console.error(
        e,
        'Something went wrong while getting data of Recommendation Manager'
      );
      setRecommendationManagerLoading(false);
    }
  };

  useEffect(() => {
    // Add an IntersectionObserver to the component to trigger an analytics event when it enters the user's viewport.
    const handleIntersection = (entries: any, observer: any) => {
      entries?.forEach((entry: any) => {
        if (entry.isIntersecting) {
          //this will run when component will come in the viewport
          if (
            recommendationManagerWidgetData &&
            recommendationManagerWidgetData?.length
          ) {
            observer.unobserve(entry.target);
            const productsData = recommendationManagerWidgetData?.find(
              (ele: any) => ele.divID === entry.target.id
            );
            triggerAnalyticsForWidget(productsData);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });
    recommendationManagerWidgetData?.length &&
      recommendationManagerWidgetData?.forEach((item: any) => {
        const element = document.getElementById(item?.divID);
        if (element) {
          observer.observe(element);
        }
      });

    return () => {
      // Disconnect the observer, removing all observations
      observer.disconnect();
    };
  }, [recommendationManagerWidgetData]);

  useEffect(() => {
    getRecommendationManagerRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    recommendationManagerWidgetData,
    recommendationManagerLoading,
    searchText,
    selectedIndex,
    scrollSnaps,
    DotButton,
    emblaRef,
    onDotButtonClick,
    scrollNext,
    scrollPrev,
  };
};

export default ExpRecommendationManagerController;
