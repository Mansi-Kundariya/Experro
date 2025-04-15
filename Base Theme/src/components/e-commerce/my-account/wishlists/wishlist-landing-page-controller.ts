import { useEffect, useState } from 'react';
import { toast, useSearchParams, } from 'experro-storefront';
import { getWishListById } from '../../../../utils/wishlist-common-function';
import { useTranslation } from 'react-i18next';

const ExpWishlistLandingPageController = () => {
  const [queryParams] = useSearchParams();
  const [wishlistProducts, setWishlistProducts] = useState<any>([]);
  const [wishlistName, setWishlistName] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const wishlistId: string = queryParams.get('id') as string;
  const { t } = useTranslation();

  const getWishlistData = async () => {
    try {
      const wishListResponse = await getWishListById(wishlistId);
      setWishlistName(wishListResponse?.wishlistName);
      setWishlistProducts(wishListResponse?.productData);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error(t('toast_msg_error.something_went_wrong'));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (wishlistId) {
      getWishlistData();
    }else{
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    wishlistName,
    wishlistProducts,
    isLoading,
  };
};

export default ExpWishlistLandingPageController;
