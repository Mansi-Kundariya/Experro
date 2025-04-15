import { useEffect, useState } from 'react';
import {
  AuthService,
  EcommerceService,
  useSearchParams,
} from 'experro-storefront';

interface orderData {
  Status: string;
  Data: {
    meta: {
      total: Number;
      totalPages: Number;
    };
    orders: [];
  };
}
const ExpMyAccountSettingsController = () => {
  const initialOrderData: orderData = {
    Status: 'failure',
    Data: {
      meta: {
        total: 0,
        totalPages: 0,
      },
      orders: [],
    },
  };
  const [queryParams, setQueryParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [wishListData, setWishListData] = useState<any>([]);
  const [orderData, setOrderData] = useState<orderData>(initialOrderData);
  const [isOrderListLoading, setIsOrderListLoading] = useState<boolean>(true);
  const [isWishListLoading, setIsWishListLoading] = useState<boolean>(true);

  const tabSelected: any = queryParams.get('tab');

  const onTabChange = (tab: string) => {
    setQueryParams({ tab: tab });
    setSelectedTab(tab);
  };

  const getWishListData = async () => {
    setIsWishListLoading(true);
    try {
      const userWishLists = await EcommerceService.getAllWishlists();
      setWishListData(userWishLists);
    } catch (err) {
      console.error(err);
    }
    setIsWishListLoading(false);
  };

  const getOrderData = async () => {
    setIsOrderListLoading(true);
    try {
      const orderDataresponse: any = await AuthService.getCustomerOrders(
        'sort=date_created:desc'
      );
      setOrderData(orderDataresponse);
    } catch (error) {
      console.error(error);
      setIsOrderListLoading(false);
      setOrderData(initialOrderData);
    }
    setIsOrderListLoading(false);
  };

  useEffect(() => {
    if (selectedTab !== 'wishlist') {
      const element: any = document.querySelector('.account-page');
      element?.classList?.remove('wishlist');
    }
    if (
      tabSelected === 'orders' ||
      tabSelected === 'address' ||
      tabSelected === 'wishlist' ||
      tabSelected === 'account settings' ||
      tabSelected === 'messages'
    ) {
      setSelectedTab(tabSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabSelected]);

  useEffect(() => {
    getWishListData();
    getOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onTabChange,
    selectedTab,
    wishListData,
    getWishListData,
    isWishListLoading,
    orderData,
    isOrderListLoading,
    getOrderData,
  };
};
export default ExpMyAccountSettingsController;
