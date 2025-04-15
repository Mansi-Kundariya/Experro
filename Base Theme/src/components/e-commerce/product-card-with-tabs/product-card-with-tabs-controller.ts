import { useCallback, useEffect, useMemo, useState } from 'react';
import { EcommerceService } from 'experro-storefront';
import generateQuery from '../../../utils/generate-query';

interface ExpProductCardControllerProps {
  id: string;
  component_content?: string;
  isAutoPlay?: string;
}

const ExpProductCardWithTabsController = (
  props: ExpProductCardControllerProps
) => {
  const tabsDataFilterd: any = [];
  const { component_content, isAutoPlay } = props;

  const [productsData, setProductsData] = useState<any>();
  const [productsDataLoading, setProductsDataLoading] = useState<boolean>(true);
  const [productDataWithTabs, setProductDataWithTabs] = useState<any>({});

  const [sliderKey, setSliderKey] = useState<any>(Date.now());

  const { displayAs, tabsData, activeTab }: any = JSON.parse(
    component_content === undefined ? '{}' : component_content
  );
  const finalTabsDatatoUse = useMemo(() => tabsData, [component_content]);

  if (tabsData) {
    Object.keys(tabsData)?.map((tab) => {
      if (tabsData[tab]?.title?.length && tabsData[tab]?.query?.length) {
        const queryString = tabsData[tab]?.query
          ?.map((ele: any) => {
            return generateQuery(
              ele['condition'],
              ele['field'],
              ele['value'].split(',').map((i: any) => i.trim())
            );
          })
          .join(` ${tabsData[tab].operator} `);
        tabsDataFilterd.push({ ...tabsData[tab], queryString: queryString });
      }
    });
  }

  const getProducts = useCallback(async () => {
    try {
      const data: any = {};
      for (let i = 0; i < tabsDataFilterd?.length; i++) {
        if (tabsDataFilterd[i]?.queryString?.length) {
          const productTabData = await EcommerceService.search({
            searchObj: {
              body: {
                filter: {
                  fq: tabsDataFilterd[i]?.queryString,
                },
              },
              fieldsToQuery:
                'brand_esi,brand_page_slug_esi,calculated_price_efi,categories_esai,category_meta_ej,category_tree_ej,custom_url,id,images_ej,name_eti,page_slug_esi,price_efi,provider_id_esi,provider_specific_data_ej,retail_price_ef,reviews_count_eii,reviews_rating_sum_eii,sale_price_efi,sku_esi,sku_for_analytics_esli,variant_options_ej,variants_ej',
              skip: 0,
              limit: 10,
              byPassMerchandising: true,
            },
          });
          if (productTabData?.Status === 'success') {
            data[`tab${i + 1}`] = {
              tabName: tabsDataFilterd[i]?.title,
              Data: productTabData,
            };
          }
        }
      }
      return data;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [finalTabsDatatoUse]);

  const handleToggleTabs = (tabKey: any) => {
    setProductsData(productDataWithTabs[tabKey]);
  };

  useEffect(() => {
    setSliderKey(Date.now());
  }, [isAutoPlay]);

  useEffect(() => {
    getProducts()?.then((res) => {
      if (res) {
        if (res[activeTab]) {
          setProductsData(res[activeTab]);
        } else {
          setProductsData(Object.values(res)[0]);
        }
        setProductDataWithTabs(res);
      }
      setProductsDataLoading(false);
    });
  }, [finalTabsDatatoUse]);

  return {
    sliderKey,
    displayAs,
    productsData,
    productsDataLoading,
    productDataWithTabs,
    dataSource: 'freeForm',
    handleToggleTabs,
  };
};

export default ExpProductCardWithTabsController;
