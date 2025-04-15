import { useEffect, useState } from 'react';
import { toast, useNavigate, } from 'experro-storefront';
import { useTranslation } from 'react-i18next';

const ExpCompareButtonController = () => {
  const navigate = useNavigate();
  const [skuArr, setSkuArr] = useState<any>([]);
  const { t } = useTranslation();

  const handleProductCompreButtonClick = (event: any) => {
    event.preventDefault();
    if (skuArr.length === 1) {
      return toast.error(t('toast_msg_success.min_compare'));
    }
    navigate('/compare/');
  };

  const updateCompareProduct = () => {
    if (localStorage.getItem('_c_p') !== null) {
      setSkuArr(JSON.parse(localStorage.getItem('_c_p') as string));
    }
  };

  /*
  Handling event listners. 
  It manages addEventListner and removeEventListner.
  */
  const initiateEventListners = (
    event: 'addEventListener' | 'removeEventListener'
  ) => {
    document[event]('COMPARE_REFRESH', () => updateCompareProduct());
  };

  useEffect(() => {
    if (localStorage.getItem('_c_p') !== null) {
      const compareProductData = JSON.parse(
        localStorage.getItem('_c_p') as string
      );
      setSkuArr(compareProductData);
    }

    initiateEventListners('addEventListener');
    return initiateEventListners('removeEventListener');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleProductCompreButtonClick, skuArr };
};

export default ExpCompareButtonController;
