import { useState } from 'react';
import {
  AuthService,
  EcommerceService,
  toast,
  useNavigate,
} from 'experro-storefront';
import { useTranslation } from 'react-i18next';

export interface ExpOrderDetailControllerProps {
  itemData: any;
}

const ExpOrderDetailController = (props: ExpOrderDetailControllerProps) => {
  const { itemData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [products, setProducts] = useState(
    itemData?.products?.map((v: any) => ({
      ...v,
      isSelected: false,
    }))
  );
  const { t } = useTranslation();

  const handleItemSelection = (itemData: any) => {
    const findProduct = products?.find(
      (item: any) => item?.id === itemData?.id
    );
    const index = products?.findIndex((item: any) => item?.id === itemData?.id);
    if (itemData?.isSelected) {
      findProduct.isSelected = false;
      const findSelectedProduct = selectedItems.findIndex(
        (item: any) => item?.id === itemData?.id
      );
      const temp = [...selectedItems];
      temp.splice(findSelectedProduct, 1);
      setSelectedItems(temp);
    } else {
      findProduct.isSelected = true;
      setSelectedItems([...selectedItems, findProduct]);
    }
    const temp = [...products];
    temp[index] = findProduct;
    setProducts(temp);
  };

  const handleReOrder = async (e: any) => {
    e.preventDefault();

    //Clearing the flag of purchase_a_d_ for Analyticis Event for External Checkout
    localStorage.removeItem('purchase_a_d_');

    if (selectedItems?.length) {
      setIsLoading(true);
      const userDetails = AuthService.getUserDetails();
      let cartDetails: any;

      // Creating list of products selected by user to re-order.
      const line_items: any = selectedItems?.map((e: any) => ({
        product_id: e?.provider_id_esi && +e?.provider_id_esi,
        quantity: e?.quantity > 0 ? e?.quantity : 1,
        variant_id: e?.variant_id && e?.variant_id,
        option_selections:
          e?.product_options?.length &&
          e?.product_options?.map((obj: any) => {
            return {
              option_id: obj.product_option_id,
              option_value: +obj.value,
            };
          }),
      }));

      if (userDetails?.userCartObj?.id) {
        const cartId = userDetails?.userCartObj?.id;
        cartDetails = await EcommerceService.addToCart({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          cartId,
          line_items,
        });
        if (cartDetails.Status === 'failure') {
          toast.error(cartDetails.Error.message);
          setIsLoading(false);
          return;
        }
      } else {
        let cartId = '';
        if (userDetails?.userInfo?.ecommCustomerId) {
          cartId = userDetails.userInfo?.ecommCustomerId;
        }
        cartDetails = await EcommerceService.createCart({
          customerId: cartId,
          line_items: line_items,
        });
        if (cartDetails.Status === 'failure') {
          toast.error(cartDetails.Error.message);
          setIsLoading(false);
          return;
        }
      }
      const userTemp = { ...userDetails };
      userTemp.userCartObj = cartDetails;
      AuthService.setUserDetails(userTemp);
      document.dispatchEvent(new Event('CART_REFRESH'));
      navigate('/cart');
      setIsLoading(false);
    } else {
      toast.error(t('toast_msg_error.no_item_selected'));
      return;
    }
  };

  return {
    handleReOrder,
    isLoading,
    handleItemSelection,
    selectedItems,
    products,
  };
};

export default ExpOrderDetailController;
