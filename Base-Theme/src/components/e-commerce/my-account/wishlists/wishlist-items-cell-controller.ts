import { useEffect, useState } from 'react';
import { EcommerceService, toast, useSearchParams } from 'experro-storefront';
import { getWishListById } from '../../../../utils/wishlist-common-function';
import { useTranslation } from 'react-i18next';

const ExpWishListItemCellController = ({ getWishListData }: any) => {
  const [queryParams] = useSearchParams();
  const [wishListProducts, setWishlistProducts] = useState<any[]>([]);
  const [ogWishlistData, setOgWishlistData] = useState<any[]>([]);
  const [wishListProductsLoading, setWishListProductsLoading] = useState(true);
  const shareWishListFlag = queryParams.get('s');
  const { t } = useTranslation();

  const getDataFromParams = async () => {
    if (queryParams.get('id')) {
      try {
        const { ogWishlist, productData } = await getWishListById(
          queryParams.get('id') as string
        );
        const productList = ogWishlist?.map((item) => {
          const productDetail = productData?.find(
            (product) => `${item?.product_id}` === `${product?.provider_id_esi}`
          );
          const isInStock = checkIsProductInStock(productDetail);

          if (productDetail?.id)
            return {
              ...productDetail,
              isInStock,
              wishListDetail: item,
              isDiscontinued: true,
            };
          else
            return {
              ...productDetail,
              isInStock,
              wishListDetail: item,
              isDiscontinued: false,
            };
        });

        setWishlistProducts(productList);
        setOgWishlistData(ogWishlist);
      } catch (err) {
        console.error(err);
        toast.error(t('toast_msg_error.something_went_wrong'));
      }
    }
    setWishListProductsLoading(false);
  };

  const deleteItemFromWishList = async (itemProviderId: number) => {
    setWishListProductsLoading(true);
    try {
      const productToRemove: any = ogWishlistData?.find(
        (elem: any) => elem.product_id === itemProviderId
      );
      const body = {
        wishlistId: queryParams.get('id'),
        itemId: productToRemove?.id,
      };
      await EcommerceService.deleteItemFromWishlistById(body);
      getDataFromParams();
      getWishListData();
    } catch (err) {
      setWishListProductsLoading(false);
      console.error(err);
      toast.error(t('toast_msg_error.something_went_wrong'));
    }
  };

  const checkIsProductInStock = (product: any) => {
    if (
      product?.inventory_tracking_esi === 'product' &&
      product?.inventory_level_eii <= 0
    ) {
      return false;
    } else if (
      product?.inventory_level_eii <= 0 &&
      (product?.inventory_tracking_esi === null ||
        product?.inventory_tracking_esi === 'none' ||
        !product?.inventory_tracking_esi)
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    getDataFromParams();
    document.getElementById('account')?.classList.add('account-fullwidth');
    return () => {
      document.getElementById('account')?.classList.remove('account-fullwidth');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    wishListProductsLoading,
    wishListProducts,
    deleteItemFromWishList,
    shareWishListFlag,
  };
};

export default ExpWishListItemCellController;
