import { useState } from 'react';
import { EcommerceService, toast, useSearchParams, } from 'experro-storefront';
import { useTranslation } from 'react-i18next';

const ExpWhishlistsController = (getWishListData: any) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const [updateWishList, setUpdateWishList] = useState([]);
  const [openWishListModal, setOpenWishListModal] = useState(false);
  const tabSelected: any = queryParams.get('id');

  const { t } = useTranslation();

  const handleWishListButtonClick = (
    wishlistId: string,
    shareWishList: boolean
  ) => {
    const query: { tab: string; id: string; s?: string } = {
      tab: queryParams.get('tab') as string,
      id: wishlistId,
    };
    if (shareWishList) {
      query['s'] = 'true';
    }
    setQueryParams(query);
  };

  const handleCreateWishList = async (e: any, wishList: any) => {
    e.preventDefault();
    if (!wishList?.name?.trim()?.length) {
      toast.error(t('toast_msg_error.enter_wish_list_name'));
      return;
    }
    const requestObj = {
      name: wishList.name,
      is_public: wishList.is_public,
      items: wishList.items,
    };

    try {
      const response = await EcommerceService.createWishlist({
        body: requestObj,
      });
      if (response.Status === 'failure') {
        return toast.error(response.Error.message);
      }
      toast.success(t('toast_msg_success.whish_list_create'));
      setOpenWishListModal(false);
      getWishListData();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const updateData = async (id: any, body: any) => {
    delete body.id;
    try {
      const response = await EcommerceService.updateWishlist(id, body);
      if (response.Status === 'failure') {
        return toast.error(response.Error.message);
      }
      getWishListData();
      setOpenWishListModal(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleEditWishList = (e: any, wishList: any) => {
    e.preventDefault();
    setUpdateWishList(wishList);
    setOpenWishListModal(true);
  };

  const handleDeleteWishList = async (wishList: any) => {
    try {
      await EcommerceService.deleteWishlist(wishList.id);
      getWishListData();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleEditWishListButton = (e: any, wishList: any) => {
    e.preventDefault();
    if (!wishList?.name?.trim()?.length) {
      toast.error(t('toast_msg_error.enter_wish_list_name'));
      return;
    }
    updateData(wishList.id, wishList);
  };

  return {
    handleCreateWishList,
    handleEditWishList,
    handleEditWishListButton,
    handleDeleteWishList,
    updateWishList,
    setUpdateWishList,
    openWishListModal,
    setOpenWishListModal,
    tabSelected,
    handleWishListButtonClick,
  };
};

export default ExpWhishlistsController;
