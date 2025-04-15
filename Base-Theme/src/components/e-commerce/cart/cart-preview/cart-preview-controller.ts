import { useEffect, useRef, useState } from 'react';
import { AuthService } from 'experro-storefront';

interface ExpCartPreviewControllerProps {
  isCartPreview: boolean;
  setIsCartPreview: (value: boolean) => void;
  basketRef: any;
}

const ExpCartPreviewController = (props: ExpCartPreviewControllerProps) => {
  const { isCartPreview, setIsCartPreview, basketRef } = props;
  const [defaultCurrency, setDefaultCurrency] = useState<any>({});
  const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false);

  const divRef: any = useRef(null);
  const [cartItems, setCartItems] = useState<any>([]);

  const updateCartItems = (userDetails: any) => {
    if (userDetails?.userCartObj?.line_items?.physical_items) {
      setCartItems(userDetails?.userCartObj?.line_items?.physical_items);
    } else {
      setCartItems([]);
    }
  };
  const getCurrencyData = () => {
    const currenyObj = AuthService.getUserDetails()?.defaultCurrency;
    if (currenyObj) {
      setDefaultCurrency(currenyObj);
    }
  };

  const updateUserDetails = () => {
    const userUpdatedDetails = AuthService.getUserDetails();
    updateCartItems(userUpdatedDetails);
  };

  /*
  Handling event listners. 
  It manages addEventListner and removeEventListner.
  */
  const initiateEventListners = (
    event: 'addEventListener' | 'removeEventListener'
  ) => {
    document[event]('CART_REFRESH', () => updateUserDetails());
    document[event]('CURRENCY_UPDATE', () => getCurrencyData());
  };

  useEffect(() => {
    initiateEventListners('addEventListener');
    getCurrencyData();

    return initiateEventListners('removeEventListener');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        divRef.current &&
        !divRef.current?.contains(event.target) &&
        isCartPreview &&
        !basketRef.current.contains(event.target)
      ) {
        setIsCartPreview(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divRef, isCartPreview, setIsCartPreview]);

  return {
    cartItems,
    divRef,
    defaultCurrency,
    setIsCheckoutLoading,
    isCheckoutLoading,
  };
};

export default ExpCartPreviewController;
