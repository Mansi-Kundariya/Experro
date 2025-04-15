import { useCallback, useEffect, useState } from 'react';
import { EcommerceService, toast } from 'experro-storefront';
import { useTranslation } from 'react-i18next';

const ExpProductCompareController = () => {
  const [product, setProduct] = useState<{ data: any[]; loading: boolean }>({
    data: [],
    loading: true,
  });
  const { t } = useTranslation();

  const handleProductRemove = (sku: string) => {
    if (product?.data?.length <= 2) {
      return toast.error(
        'At least 2 products are needed to make a valid comparison.'
      );
    }
    const skus = JSON.parse(localStorage.getItem('_c_p') as string);
    const newSKu = skus?.filter((elem: string) => elem !== sku);
    localStorage.setItem('_c_p', JSON.stringify(newSKu));
    getProductsBySku(newSKu);
    toast.success(t('toast_msg_success.remove_product_from_compare'));
  };

  const handelClearComparePage = () => {
    if (JSON.parse(localStorage.getItem('_c_p') as string)) {
      localStorage.setItem('_c_p', '[]');
      getProductsBySku([]);
      toast.success(t('toast_msg_success.compare_product_cleard'));
    } else {
      toast.success(t('toast_msg_success.min_compare'));
    }
  };

  const getProductsBySku = useCallback(async (skuArr: any[]) => {
    try {
      if (skuArr.length) {
        const productResponse = await EcommerceService.search({
          searchObj: {
            skip: 0,
            limit: 4,
            fieldsToQuery:
              'availability_description_es,brand_eti,custom_fields_ej,calculated_price_efi,description_eti,id,images_ej,name_eti,page_slug_esi,price_efi,retail_price_ef,sale_price_efi,sku_esi',
            body: {
              filter: {
                sku_esi: skuArr,
              },
            },
            byPassMerchandising: true,
          },
        });
        if (productResponse.Status === 'success') {
          setProduct({ loading: false, data: productResponse?.Data?.items });
        }
      } else {
        setProduct({ loading: false, data: [] });
      }
    } catch (err) {
      setProduct({ ...product, loading: false });
      toast.error(t('toast_msg_error.something_went_wrong'));
      // eslint-disable-next-line no-console
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem('_c_p')) {
      const sku = JSON.parse(localStorage.getItem('_c_p') as string);
      if (sku.length) {
        getProductsBySku(sku);
      } else {
        setProduct({ ...product, loading: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    productData: product?.data,
    isLoading: product?.loading,
    handleProductRemove,
    handelClearComparePage,
  };
};

export default ExpProductCompareController;
