import {
  AnalyticsService,
  EcommerceService,
  toast,
  useNavigate,
} from 'experro-storefront';

const useExpCommonCheckout = ({ setIsCheckoutLoading }: any) => {
  const navigate = useNavigate();

  const analyticsProducts = (cartObj: any) => {
    const products: any = [];
    let analyticisData: any = [];
    try {
      if (localStorage.getItem('a_d_')) {
        analyticisData = JSON.parse(localStorage.getItem('a_d_') as string);
      }
    } catch (e) {
      console.error('error in getting localStorage', e);
    }
    if (cartObj && cartObj.line_items && cartObj.line_items.physical_items) {
      for (const elem of cartObj.line_items.physical_items) {
        // eslint-disable-next-line
        const data = analyticisData?.find((item: any) => {
          if (item.sku === elem.sku || item.varientSku === elem.sku) {
            return item;
          }
        });
        let tempAnalyticsProduct: any = {};

        if (elem) {
          const modeDetails: any = {
            search_term: data?.searchTerm,
            search_location: data?.search_location,
            category: data?.category,
            is_primary_algorithm: data?.is_primary_algorithm,
            is_secondary_algorithm: data?.is_secondary_algorithm,
            algorithm: data?.algorithm,
            is_merchandising: data?.is_merchandising,
            rule: data?.rule,
            rule_type: data?.rule_type,
            widget_id: data?.widget_id,
            context_type: data?.context_type,
            context_data: data?.context_data,
            variant: data?.variant,
            rules: data?.rules,
          };
          tempAnalyticsProduct = {
            sku: data?.sku_for_analytics_esli,
            product_category: data?.product_categories,
            variant_sku: elem?.sku,
            mode: data?.mode || 'direct',
            search_term: data?.searchTerm,
            category: data?.category,
            totalValue: elem.extended_sale_price,
            total_value: elem.extended_sale_price,
            coupon_amount: elem?.coupon_amount,
            discount_amount: elem?.discount_amount,
            extended_list_price: elem?.extended_list_price,
            extended_sale_price: elem?.extended_sale_price,
            list_price: elem?.list_price,
            sale_price: elem?.sale_price,
            original_price: elem?.original_price,
            quantity: elem.quantity,
            search_location: data?.search_location,
            is_primary_algorithm: data?.is_primary_algorithm,
            is_secondary_algorithm: data?.is_secondary_algorithm,
            algorithm: data?.algorithm,
            is_merchandising: data?.is_merchandising,
            rule: data?.rule,
            rule_type: data?.rule_type,
            widget_id: data?.widget_id,
            context_type: data?.context_type,
            context_data: data?.context_data,
            variant: data?.variant,
            rules: data?.rules,
            mode_details: modeDetails,
          };
        }
        products.push(tempAnalyticsProduct);
      }
    }
    return products;
  };

  const onCheckoutClick = async () => {
    if (process.env.REACT_APP_EXTERNAL_CHECKOUT === 'true') {
      setIsCheckoutLoading(true);
      try {
        const cartObj = await EcommerceService.getCartRedirectUrls();

        if (cartObj?.checkout_url) {
          let qty = 0;
          cartObj?.line_items?.physical_items?.forEach((item: any) => {
            qty += item?.quantity;
          });
          const products: any = analyticsProducts(cartObj);
          AnalyticsService.trackCheckoutInitiated({
            items: cartObj?.line_items?.physical_items,
            totalQuantity: qty,
            cartId: cartObj?.id,
            totalValue: cartObj?.cart_amount,
            products,
          });

          window.open(cartObj?.checkout_url, '_self');
          setTimeout(() => {
            setIsCheckoutLoading(false);
          }, 3000);
        } else {
          setIsCheckoutLoading(false);
          toast.error('Something went wrong plase try again');
        }
      } catch (err) {
        console.error(err);
        setIsCheckoutLoading(false);
        toast.error('Something went wrong plase try again');
      }
    } else {
      navigate('/checkout');
    }
  };
  return { onCheckoutClick };
};
export { useExpCommonCheckout };
