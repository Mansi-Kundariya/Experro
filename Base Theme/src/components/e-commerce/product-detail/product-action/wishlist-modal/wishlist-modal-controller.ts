import { AuthService, EcommerceService, toast } from 'experro-storefront';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ExpWishlistModalController = ({
  wishlistClicked,
  setWishlistClicked,
}: {
  wishlistClicked:any;
  setWishlistClicked:any;
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateWishlistModalOpen, setIsCreateWishlistModalOpen] =
  useState<boolean>(false);
  const [wishlistName, setwishlistName] = useState<any>('');
  const [wishlists, setWishlists] = useState<any>([]);

  const { t } = useTranslation();


  const addToWishlist = async (productDetails: any, option: any) => {
    try {
      const wishlistObj: any = { product_id: +productDetails?.provider_id_esi };

      const addToWishListResponse = await EcommerceService.addItemToWishlist({
        wishlistId: option.id,
        body: {
          items: [wishlistObj],
        },
      });

      if (addToWishListResponse.Status === 'failure') {
        return toast.error(addToWishListResponse.Error.message);
      }
      toast.success(t('toast_msg_success.product_added_to_whish_list'));
     setIsModalOpen(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleCreateWishList = async (wishList: any) => {
    setwishlistName('');

    if (!wishList?.trim()?.length) {
      toast.error(t('toast_msg_error.enter_wish_list_name'));
      return;
    }
    const requestObj = {
      name: wishList,
      is_public: true,
      items: [],
      test:''
    };

    try {
      const response = await EcommerceService.createWishlist({
        body: requestObj,
      });
      if (response.Status === 'failure') {
        return toast.error(response.Error.message);
      }
      toast.success(t('toast_msg_success.whish_list_create'));
      setIsCreateWishlistModalOpen(false);
      getWishlistData();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };
  const isAddtoWishlistModalOpen = () => {
    setIsModalOpen(true);
    getWishlistData();
  };
  const getWishlistData = async () => {
    try {
      const response = await EcommerceService.getAllWishlists();
      if (response.Status === 'failure') {
        return toast.error(response.Error.message);
      }
      setWishlists(response);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };
  useEffect(()=>{
    if(wishlistClicked){
     if(AuthService.isUserLoggedIn()){
      setIsModalOpen(true);
      getWishlistData();
     } else{
      setIsLoginModalOpen(true);
     }
     setWishlistClicked(false);
    }
  }, [wishlistClicked])
  


  return {
    setIsLoginModalOpen,
    isLoginModalOpen,
    setIsModalOpen,
    isModalOpen,
    isCreateWishlistModalOpen,
    setIsCreateWishlistModalOpen,
    addToWishlist,
    isAddtoWishlistModalOpen,
    handleCreateWishList,
    setwishlistName,
    wishlistName,
    wishlists, 
  };
};

export default ExpWishlistModalController;
