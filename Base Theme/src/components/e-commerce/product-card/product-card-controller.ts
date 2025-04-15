import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { ContentService, EcommerceService } from 'experro-storefront';
import generateQuery from '../../../utils/generate-query';
import { expDataSourceConstants } from '../../../utils/constants';
import { getContentLibraryData } from '../../../utils/get-content-library-data';
import { ContentModelDataInterface } from '../../../interfaces/content-model-data.interface';
import { expColorObjectParser } from '../../../utils';
import {
  ExpComponentDataDispatcher,
  expCommonDispatcherKeys,
} from '../../../utils/component-data-dispatcher';

interface ExpProductCardControllerProps {
  id: string;
  titleColor?: any;
  component_content?: string;
}

const ExpProductCardController = (props: ExpProductCardControllerProps) => {
  const { id, titleColor, component_content } = props;
  let contentLibraryMappingObj: any;
  let parsedContentModel: ContentModelDataInterface | undefined;
  const modelKeyForSSR = 'ps-ssr';
  const [productsData, setProductsData] = useState<any>();
  const [productsDataLoading, setProductsDataLoading] =
    useState<boolean>(false);
  const title_style: CSSProperties = {
    color: expColorObjectParser(titleColor),
  };

  const {
    displayAs,
    dataSource,
    limit,
    contentModel,
    modelInternalName,
    imageData,
    description,
    image_heading,
    buttonText,
    buttonLink,
    sourceKey,
    sourceValue,
    query,
    operator,
  } = JSON.parse(component_content === undefined ? '{}' : component_content);

  let mappingObj = {
    backgroundImage: imageData,
    headingText: ContentService.parseVariableSafeValue(image_heading),
    description: ContentService.parseVariableSafeValue(description),
    buttonText: ContentService.parseVariableSafeValue(buttonText),
    buttonLink: ContentService.parseVariableSafeValue(buttonLink),
    sourceKey: sourceKey,
    sourceValue: sourceValue,
  };

  const {
    setComponentDataDispatcher,
    componentDataDispatcher,
    isComponentLoaded,
  } = ExpComponentDataDispatcher({
    id,
    modelInternalName,
    modelInternalNameSuffix: modelKeyForSSR,
  });

  if (dataSource === expDataSourceConstants?.CONTENT_LIBRARY) {
    contentLibraryMappingObj = {
      headingText: ContentService.parseVariableSafeValue(
        componentDataDispatcher?.componentData?.heading_et
      ),
      description: ContentService.parseVariableSafeValue(
        componentDataDispatcher?.componentData?.description_et
      ),
      buttonText: ContentService.parseVariableSafeValue(
        componentDataDispatcher?.componentData?.title_image_button_com
          ? componentDataDispatcher?.componentData?.title_image_button_com[0]
              ?.button_text_et
          : ''
      ),
      buttonLink: ContentService.parseVariableSafeValue(
        componentDataDispatcher?.componentData?.title_image_button_com
          ? componentDataDispatcher?.componentData?.title_image_button_com[0]
              ?.button_link_et
          : ''
      ),
      backgroundImage: componentDataDispatcher?.componentData?.title_image_media_emd
        ?.length
        ? componentDataDispatcher?.componentData?.title_image_media_emd[0]
        : '',
      sourceKey: componentDataDispatcher?.componentData
        ?.products_by_filter_query_et
        ? 'filter'
        : componentDataDispatcher?.componentData.product_by_sku_list_et
          ? 'sku'
          : '',
      sourceValue: componentDataDispatcher?.componentData
        .products_by_filter_query_et
        ? componentDataDispatcher?.componentData.products_by_filter_query_et
        : componentDataDispatcher?.componentData.product_by_sku_list_et
          ? componentDataDispatcher?.componentData.product_by_sku_list_et
          : '',
    };
  }

  if (dataSource === expDataSourceConstants?.CONTENT_LIBRARY) {
    mappingObj = Object.assign(mappingObj, contentLibraryMappingObj);
  }

  if (contentModel?.trim().length) {
    parsedContentModel = JSON.parse(contentModel);
  }

  // Get product source wise
  const getProducts = useCallback(
    async ({
      queryParse,
    }: {
      queryParse: string;
      freeFormSourceKey: any;
      freeFromSourceValue: any;
    }) => {
      setProductsDataLoading(true);
      let apiProdutsData;
      try {
        if (
          dataSource === expDataSourceConstants?.CONTENT_LIBRARY &&
          mappingObj?.sourceKey?.length &&
          mappingObj?.sourceValue?.length
        ) {
          apiProdutsData = await EcommerceService.search({
            searchObj: {
              body: {
                filter:
                  mappingObj?.sourceKey === 'filter'
                    ? { fq: mappingObj?.sourceValue }
                    : {
                        sku_esi: mappingObj?.sourceValue?.split(','),
                      },
              },
              fieldsToQuery:
                'brand_esi,brand_page_slug_esi,calculated_price_efi,categories_esai,category_meta_ej,category_tree_ej,custom_url,id,images_ej,name_eti,page_slug_esi,price_efi,provider_id_esi,provider_specific_data_ej,retail_price_ef,reviews_count_eii,reviews_rating_sum_eii,sale_price_efi,sku_esi,sku_for_analytics_esli,variant_options_ej,variants_ej',
              skip: 0,
              limit: limit ? limit : 4,
              byPassMerchandising: true,
            },
          });
          setProductsData(apiProdutsData);
        }
        if (dataSource === expDataSourceConstants?.FREE_FORM && queryParse) {
          apiProdutsData = await EcommerceService.search({
            searchObj: {
              body: {
                filter: {
                  fq:
                    queryParse.includes('AND') || queryParse.includes('OR')
                      ? `(${queryParse})`
                      : queryParse,
                },
              },
              fieldsToQuery:
                'brand_esi,brand_page_slug_esi,calculated_price_efi,categories_esai,category_meta_ej,category_tree_ej,custom_url,id,images_ej,name_eti,page_slug_esi,price_efi,provider_id_esi,provider_specific_data_ej,retail_price_ef,reviews_count_eii,reviews_rating_sum_eii,sale_price_efi,sku_esi,sku_for_analytics_esli,variant_options_ej,variants_ej',
              skip: 0,
              limit: limit ? limit : 4,
              byPassMerchandising: true,
            },
          });
          setProductsData(apiProdutsData);
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      setProductsDataLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dataSource,
      limit,
      componentDataDispatcher,
      modelInternalName,
      parsedContentModel?.current_version_id,
      parsedContentModel?.id,
    ]
  );

  useEffect(() => {
    if (dataSource === expDataSourceConstants.FREE_FORM) {
      setComponentDataDispatcher({
        type: expCommonDispatcherKeys.initializingFreeForm,
      });
    } else if (dataSource === expDataSourceConstants.CONTENT_LIBRARY) {
      if (isComponentLoaded) {
        setComponentDataDispatcher({
          type: expCommonDispatcherKeys.fetchingData,
        });
        if (contentModel?.trim()?.length) {
          (async () => {
            setComponentDataDispatcher({
              type: expCommonDispatcherKeys.dataFetched,
              data: await getContentLibraryData(
                parsedContentModel,
                modelInternalName,
                modelKeyForSSR,
                id
              ),
            });
          })();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentModel, dataSource]);

  const getQueryParse = useCallback(() => {
    const string = query
      ?.map((ele: any) => {
        return generateQuery(
          ele['condition'],
          ele['field'],
          ele['value'].split(',').map((i: any) => i.trim())
        );
      })
      .join(` ${operator} `);
    return string;
  }, [operator, query]);

  useEffect(() => {
    const queryParse = getQueryParse();
    getProducts({
      freeFormSourceKey: sourceKey,
      freeFromSourceValue: sourceValue,
      queryParse,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // componentDataDispatcher,
    mappingObj?.sourceKey,
    mappingObj?.sourceValue,
    limit,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getQueryParse(),
  ]);

  return {
    title_style,
    displayAs,
    productsData,
    dataSource,
    imageData,
    mappingObj,
    productsDataLoading,
    contentModel,
    componentDataDispatcher,
  };
};

export default ExpProductCardController;
