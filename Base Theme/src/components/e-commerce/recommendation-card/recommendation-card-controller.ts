import { CSSProperties, useCallback, useEffect, useState } from 'react';
import generateQuery from '../../../utils/generate-query';
import { expColorObjectParser, expWidgetConstants } from '../../../utils';
import {
  AnalyticsService,
  CommonUtilities,
  EcommerceService,
} from 'experro-storefront';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  DotButton,
  useDotButton,
} from '../../../utils/embla-carousel-pagination-button';
import { EmblaOptionsType } from 'embla-carousel';

declare const window: any;
interface ExpRecommendationCardControllerProps {
  id?: string;
  titleColor?: any;
  tagColor?: any;
  component_content?: string;
  isAutoPlay?: any;

  //props to identify is that this component is used in the E-commerce template or not ?
  isInEcommerceTemplate?: boolean;
  widgetId?: string;
  productIds?: any;
  autoPlaySpeed?: any;
}

const ExpRecommendationCardController = (
  props: ExpRecommendationCardControllerProps
) => {
  const pageData: any = window['__pageData__'];
  const {
    titleColor,
    tagColor,
    component_content,
    isInEcommerceTemplate,
    widgetId,
    productIds,
    isAutoPlay,
    autoPlaySpeed = 5000,
  } = props;

  const [productsData, setProductsData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [observedDivId, setObservedDivId] = useState<string>('');

  const settingsForSlids: EmblaOptionsType = {
    active: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
    loop: true,
  };

  const SettingForAutoPlay: any = {
    playOnInit: CommonUtilities.isRenderingOnServer()
      ? false
      : isAutoPlay === expWidgetConstants?.WIDGET_CHECK_TRUE,
    delay: parseInt(autoPlaySpeed) || 5000,
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

  const title_style: CSSProperties = {
    color: expColorObjectParser(titleColor),
  };
  const tag_style: CSSProperties = {
    color: expColorObjectParser(tagColor),
  };

  const { limit, tagLine, headingText, recommendationWidget, query, operator } =
    JSON.parse(component_content === undefined ? '{}' : component_content);

  // This function is used for the track Analytics event for widget.
  const triggerAnalyticsForWidget = async (widgetData: any) => {
    const skusForAnalyticsRules: any = [];

    widgetData?.Data?.items?.forEach(async (product: any) => {
      const tempItem: any = {
        sku: product?.sku_for_analytics_esli,
        name: product?.name_esi,
        price: product?.calculated_price_efi,
        brand: product?.brand_esi,
        product_category: product?.category_meta_ej,
        is_primary_algorithm: product?.is_primary_algorithm,
        is_secondary_algorithm: product?.is_secondary_algorithm,
        algorithm: widgetData?.Data?.rule_details?.algorithm,
        is_merchandising: product?.is_merchandising,
        rule: widgetData?.Data?.rule_details?.rule_id,
        rule_type: widgetData?.Data?.rule_details?.rule_type,
        widget_id: widgetData?.Data?.rule_details?.widget_id,
        context_type: widgetData?.Data?.rule_details?.context_type,
        context_data: widgetData?.Data?.rule_details?.context_data,
        variant: widgetData?.Data?.rule_details?.variant,
        rules: product?.rule_details,
      };
      skusForAnalyticsRules.push(tempItem);
    });
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
    // track Analytics event for widget.
    await AnalyticsService.trackWidgetViewed({
      noOfResults: widgetData?.Data?.total_count,
      products_detail: skusForAnalyticsRules,
      sku: widgetData?.Data?.items?.map(
        (elem: any) => elem?.sku_for_analytics_esli
      ),
      algorithm: widgetData?.Data?.rule_details?.algorithm,
      rule: widgetData?.Data?.rule_details?.rule_id,
      rule_type: widgetData?.Data?.rule_details?.rule_type,
      widget_id: widgetData?.Data?.rule_details?.widget_id,
      context_type: widgetData?.Data?.rule_details?.context_type,
      context_data: widgetData?.Data?.rule_details?.context_data,
      category: widgetData?.Data?.rule_details?.category,
      variant: widgetData?.Data?.rule_details?.variant,
      pageType,
      pageMetaId,
      pageDisplayName,
    });
  };

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
    } else if (window.location.pathname === '/checkout/') {
      _contextType = 'checkout';
    }
    return _contextType;
  };

  // This function will be used to get the context-data which includes when, product_detail => id, category_page => category_id, it will be content_model_data_id
  //web_page => need to pass content_model_data_id
  const getContextData = () => {
    let _contextData: string = '';
    const { content_model_internal_name, content_model_data_id } = pageData;

    // This card is dropped in PDP page that time we need to pass the 'id' of the Product
    if (content_model_internal_name?.startsWith('ecommerce_product')) {
      _contextData = content_model_data_id;
    }
    // When this card dropped in category page at that time we need to give category_id to it.
    else if (content_model_internal_name?.startsWith('ecommerce_category')) {
      _contextData = content_model_data_id;
    }
    // When this card dropped in brand page at that time we need to give brand_id to it.
    else if (content_model_internal_name?.startsWith('ecommerce_brand')) {
      _contextData = content_model_data_id;
    }
    //Dropped on 'web-page' that time we just need to give content_model_data_id
    else if (content_model_internal_name === 'web_pages') {
      _contextData = content_model_data_id;
    } else if (window.location.pathname === '/cart/') {
      _contextData = 'cart';
    } else if (window.location.pathname === '/checkout/') {
      _contextData = 'checkout';
    }
    return _contextData;
  };

  // This function will be useful to get the query string
  const getFilterQueryString = useCallback(() => {
    return query
      ?.map((ele: any) => {
        return generateQuery(
          ele['condition'],
          ele['field'],
          ele['value'].split(',').map((i: any) => i.trim())
        );
      })
      .join(` ${operator} `);
  }, [operator, query]);

  // Get product source wise
  const getProducts = async (customQueryFilter?: string) => {
    try {
      const widgetSearchResponse = await EcommerceService.widgetSearch({
        widgetData: {
          widget_id: isInEcommerceTemplate
            ? widgetId
            : recommendationWidget
              ? recommendationWidget?.id
              : '',
          custom_filter: customQueryFilter ? customQueryFilter : '',
          product_ids: isInEcommerceTemplate ? productIds : [],
          context_type: getContextType(),
          context_data: getContextData(),
        },
        fieldsToQuery:
          'brand_esi,brand_page_slug_esi,calculated_price_efi,categories_esai,category_meta_ej,category_tree_ej,custom_url,id,images_ej,name_esi,name_eti,page_slug_esi,price_efi,provider_id_esi,provider_specific_data_ej,retail_price_ef,reviews_count_eii,reviews_rating_sum_eii,sale_price_efi,sku_esi,sku_for_analytics_esli,variant_options_ej,variants_ej',
        skip: '0',
        limit: limit ? `${limit}` : '6',
      });

      // Add category name in response of widgetSResponse in rule_details object for Analytics event when recommendation-card is on category page
      if (
        pageData?.content_model_internal_name?.startsWith(
          'ecommerce_category'
        ) &&
        widgetSearchResponse?.Data?.rule_details
      ) {
        widgetSearchResponse.Data.rule_details['category'] = pageData?.title;
      }
      setProductsData(widgetSearchResponse);
      setIsLoading(false);
      setObservedDivId(CommonUtilities.generateUUID());
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    // Add an IntersectionObserver to the component to trigger an analytics event when it enters the user's viewport.
    const handleIntersection = (entries: any, observer: any) => {
      entries?.forEach((entry: any) => {
        if (entry.isIntersecting) {
          //this will run when component will come in the viewport
          if (
            productsData?.Data?.items?.length &&
            productsData?.Data?.total_count !== 0
          ) {
            triggerAnalyticsForWidget(productsData);
          }
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const element = document.getElementById(observedDivId);

    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    const queryParse = getFilterQueryString();

    const getTheProductsEventHandling = () => {
      if (
        (recommendationWidget !== undefined &&
          Object?.keys(recommendationWidget)?.length) ||
        (queryParse !== undefined && queryParse?.length)
      ) {
        getProducts(queryParse);
      } else if (isInEcommerceTemplate) getProducts();
    };

    getTheProductsEventHandling();

    document.addEventListener('LOGIN_SUCCESSFUL', () => {
      getTheProductsEventHandling();
    });
    document.addEventListener('LOGOUT_SUCCESSFUL', () => {
      getTheProductsEventHandling();
    });

    return (
      document.removeEventListener(
        'LOGIN_SUCCESSFUL',
        getTheProductsEventHandling
      ),
      document.removeEventListener(
        'LOGOUT_SUCCESSFUL',
        getTheProductsEventHandling
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component_content, limit]);

  return {
    title_style,
    tag_style,
    tagLine,
    headingText,
    productsData,
    isLoading,
    selectedIndex,
    scrollSnaps,
    DotButton,
    emblaRef,
    onDotButtonClick,
    scrollNext,
    scrollPrev,
    observedDivId,
  };
};

export default ExpRecommendationCardController;
