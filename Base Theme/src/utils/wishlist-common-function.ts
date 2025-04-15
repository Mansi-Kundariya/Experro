import { AuthService, EcommerceService, toast } from 'experro-storefront';

export const handleAddToWishListClick = async (
  wishlistData: any,
  providerId: string,
  setShowAddToWishlistPopup: any,
  varientId: string,
  t: any
) => {
  try {
    const wishlistObj: any = { product_id: parseInt(providerId) };

    if (varientId) {
      wishlistObj['variant_id'] = varientId;
    }
    const addToWishListResponse = await EcommerceService.addItemToWishlist({
      wishlistId: wishlistData.id,
      body: {
        items: [wishlistObj],
      },
    });
    if (addToWishListResponse.Status === 'failure') {
      return toast.error(addToWishListResponse.Error.message);
    }
    setShowAddToWishlistPopup(false);
    toast.success(t('toast_msg_success.product_added_to_whish_list'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const handleWishlistPopupToggle = async (
  setIsWishListLoading: any,
  setShowAddToWishlistPopup: any,
  showAddToWishlistPopup: boolean,
  setWishlists: any,
  navigate: any
) => {
  if (!AuthService.isUserLoggedIn()) {
    return navigate('/login');
  }

  setShowAddToWishlistPopup(!showAddToWishlistPopup);
  if (!showAddToWishlistPopup && AuthService.isUserLoggedIn()) {
    try {
      setIsWishListLoading(true);
      const wishlistResponse = await EcommerceService.getAllWishlists();
      if (wishlistResponse) {
        setWishlists(wishlistResponse);
      }
      setIsWishListLoading(false);
    } catch (err) {
      setIsWishListLoading(false);
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};

export const handleCreateNewWishlistButtonClick = (
  setShowCreateNewWishListPopUp: any,
  setShowAddToWishlistPopup: any,
  event: any
) => {
  event.preventDefault();
  setShowCreateNewWishListPopUp(true);
  setShowAddToWishlistPopup(false);
};

export const getWishListById = async (id: string) => {
  const returnObj: {
    ogWishlist: any[];
    productData: any[];
    wishlistName: string;
  } = {
    ogWishlist: [],
    productData: [],
    wishlistName: '',
  };

  if (id) {
    try {
      const wishListId = id;
      const wishlist = await EcommerceService.getWishlistById(wishListId);
      returnObj.wishlistName = wishlist?.name;
      returnObj['ogWishlist'] = wishlist?.items;
      try {
        if (wishlist?.items?.length) {
          const wishlistProductIds = wishlist?.items?.map((item: any) => {
            return item.product_id;
          });
          const stringTuple = wishlistProductIds
            .map(String)
            .map((num: any) => `"${num}"`)
            .join(',');
          const finalString = `provider_id_esi:(${stringTuple})`;

          const productResponse: any = await EcommerceService.search({
            searchObj: {
              fieldsToQuery:
                'images_ej,name_eti,name_esi,price_efi,page_slug_esi,page_slug,provider_id_esi,inventory_tracking_esi,inventory_level_eii,inventory_tracking_esi,',
              body: { filter: { fq: `${finalString}` } },
            },
          });
          if (productResponse?.Status === 'success') {
            returnObj['productData'] = productResponse.Data?.items;
          }
        } else {
          returnObj['productData'] = [];
        }
      } catch (err) {
        throw new Error(err as string);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
  return returnObj;
};
