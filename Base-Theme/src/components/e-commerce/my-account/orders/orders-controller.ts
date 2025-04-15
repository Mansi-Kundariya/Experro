import { useEffect, useState } from 'react';
import { EcommerceService, useSearchParams } from 'experro-storefront';

const ExpOrdersController = (
  isOrderListLoading: boolean,
  orderDataResponse: any
) => {
  const [queryParams, setQuerParams] = useSearchParams();
  const [ordersData, setOrdersData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailPageVisible, setIsDetailPageVisible] = useState(false);
  const [itemData, setItemData] = useState<any>([]);

  useEffect(() => {
    if (!queryParams.get('order_id')) {
      setIsLoading(true);
    }
    if (!isOrderListLoading) {
      getOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, isOrderListLoading]);

  useEffect(() => {
    if (isDetailPageVisible) {
      document.getElementById('account')?.classList.add('account-fullwidth');
    }
    return () => {
      document.getElementById('account')?.classList.remove('account-fullwidth');
    };
  }, [isDetailPageVisible]);

  const getOrders = async () => {
    const orderData: any = orderDataResponse?.Data?.orders;
    try {
      if (!orderData?.length) {
        setOrdersData([]);
        setIsLoading(false);
        console.log('e');
        return;
      }

      // Extract and process product data
      const enrichedOrderData = await enrichOrderDataWithProductInfo(orderData);

      // Handle detail view if order_id is present
      if (queryParams.get('order_id')) {
        const selectedOrder = enrichedOrderData?.find(
          (item) => item?.id?.toString() === queryParams.get('order_id')
        );

        if (selectedOrder) {
          setItemData(selectedOrder);
          setIsDetailPageVisible(true);
        }
      } else {
        setIsDetailPageVisible(false);
      }
      setOrdersData(enrichedOrderData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrdersData(orderData);
    } finally {
      setIsLoading(false);
    }
  };

  const enrichOrderDataWithProductInfo = async (orderData: any[]) => {
    // Extract all unique product IDs
    const products = orderData.flatMap((order) => order.products);
    const productIds = [
      ...new Set(products.map((product) => product.product_id)),
    ];

    if (!productIds.length) {
      return orderData;
    }

    // Create search query for products
    const searchQuery = `provider_id_esi:(${productIds
      .map(String)
      .map((id) => `"${id}"`)
      .join(',')})`;

    // Fetch product details
    const productResponse = await EcommerceService.search({
      searchObj: {
        fieldsToQuery:
          'images_ej,provider_id_esi,variants_ej,provider_specific_data_ej,brand_esi',
        body: { filter: { fq: searchQuery } },
      },
    });

    if (productResponse?.Status !== 'success' || !productResponse.Data?.items) {
      return orderData;
    }

    // Create a map for quick product lookup
    const productMap = new Map(
      productResponse.Data.items.map((item: any) => [
        item.provider_id_esi.toString(),
        item,
      ])
    );

    // Enrich order data with product information
    return orderData.map((order) => ({
      ...order,
      products: order.products.map((product: any) => {
        const matchingProduct: any = productMap.get(
          product.product_id.toString()
        );
        if (!matchingProduct) return product;

        const matchingVariant = matchingProduct?.variants_ej?.find(
          (variant: any) => variant?.sku === product?.sku
        );

        return {
          ...product,
          inventory_level: matchingVariant?.inventory_level,
          provider_id_esi: matchingProduct.provider_id_esi,
          brand: matchingProduct.brand_esi,
          image:
            matchingVariant?.image_url ||
            matchingProduct?.images_ej?.[0]?.url_standard,
        };
      }),
    }));
  };

  const handleDetailPage = (item: any) => {
    const query = {
      tab: queryParams.get('tab') as string,
      order_id: item?.id,
    };
    setQuerParams(query);
    setItemData(item);
    setIsDetailPageVisible(true);
  };
  return {
    ordersData,
    isLoading,
    isDetailPageVisible,
    handleDetailPage,
    itemData,
  };
};

export default ExpOrdersController;
