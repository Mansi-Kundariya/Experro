import { Link } from 'experro-storefront';
import ExpCartPreviewController from './cart-preview-controller';
import {
  CurrencyFormat,
  convertCurrency,
  useExpCommonCheckout,
} from '../../../../utils';

export interface ExpCartPreviewProps {
  isCartPreview: boolean;
  setIsCartPreview: (value: boolean) => void;
  basketRef: any;
}

const ExpCartPreview = (props: ExpCartPreviewProps) => {
  const { isCartPreview, setIsCartPreview, basketRef } = props;

  const {
    cartItems,
    divRef,
    defaultCurrency,
    setIsCheckoutLoading,
    isCheckoutLoading,
  } = ExpCartPreviewController({
    isCartPreview,
    setIsCartPreview,
    basketRef,
  });
  const { onCheckoutClick } = useExpCommonCheckout({ setIsCheckoutLoading });

  const onCheckoutButtonClick = () => {
    onCheckoutClick();
    if (process.env.REACT_APP_EXTERNAL_CHECKOUT !== 'true') {
      setIsCartPreview(false);
    }
  };

  return (
    <div
      ref={divRef}
      className={`${isCartPreview ? 'is-open' : 'hidden'} min-w-[25.5rem] bg-white flex flex-col items-center justify-center mt-3 absolute right-0 top-[3.0625rem] min-h-40 border border-gray-200 shadow z-[11] cart-preview-box-main`}>
      {cartItems.length > 0 ? (
        <ul className="preview-cart-list w-full max-h-96 custom-scrollbar overflow-x-hidden">
          {cartItems?.map((item: any, index: number) => {
            const itemUrl = item?.url
              .replace('https://', '')
              .split('/')
              .splice(1)
              .join('/');

            return (
              <li
                key={index}
                className="p-3 border-t border-gray-200 first:border-t-0 preview-cart-item">
                <div className="flex items-center gap-3">
                  <div className="preview-cart-item-image">
                    <Link to={`/${itemUrl}`}>
                      <img
                        src={item.image_url}
                        alt="Product"
                        className="min-w-28 max-w-28 h-28 object-contain"
                      />
                    </Link>
                  </div>
                  <div className="preview-cart-item-content">
                    {item.brand && (
                      <span className="preview-cart-item-brand">
                        {item.brand}
                      </span>
                    )}

                    <h6 className="text-base font-medium leading-6 mb-1 preview-cart-item-name">
                      <Link to={`/${itemUrl}`}>{item.name}</Link>
                    </h6>

                    <span className="text-sm text-gray-900 font-normal preview-cart-item-sku">
                      <span className="preview-cart-item-sku-key">SKU:</span>
                      <span>
                        {item.sku} {item.variant_id ? '/ ' : ''}
                      </span>
                      <span className="preview-cart-item-sku-value">
                        {item.variant_id}
                      </span>
                    </span>
                    <span className="block text-sm text-gray-900 font-normal preview-cart-item-price">
                      <CurrencyFormat
                        value={
                          process.env.REACT_APP_MULTI_CURRENCY_ENABLE ===
                            'true' && defaultCurrency?.currency_exchange_rate
                            ? convertCurrency(
                                item?.sale_price,
                                defaultCurrency?.currency_exchange_rate
                              )
                            : item?.sale_price
                        }
                        thousandSeparator={','}
                        decimalSeparator={'.'}
                        prefixSymbol={
                          process.env.REACT_APP_MULTI_CURRENCY_ENABLE ===
                            'true' && defaultCurrency?.token
                            ? defaultCurrency?.token
                            : '$'
                        }
                      />
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h6 className="text-center p-l-20 p-r-20 font-normal font-primary">
          Your cart is empty
        </h6>
      )}
      {cartItems.length > 0 ? (
        <div className="flex items-center justify-between gap-3 p-3 border-t border-gray-200 w-full preview-cart-action">
          <div className="w-full preview-cart-action-checkout">
            {/* <Link
              to="/checkout/"
              onClick={() => setIsCartPreview(false)}
              rel="nofollow"
              className="w-full text-center button-primary">
              Checkout now
            </Link> */}
            <button
              disabled={isCheckoutLoading}
              className={`w-full text-center button-primary ${isCheckoutLoading ? 'min-h-10' : ''}`}
              onClick={() => onCheckoutButtonClick()}>
              {isCheckoutLoading ? (
                <div className="relative flex justify-center items-center">
                  <div className="w-3 h-3 rounded-full absolute border-2 border-solid border-primary"></div>
                  <div className="w-3 h-3 rounded-full animate-spin absolute border-2 border-solid border-gray-50 border-t-transparent"></div>
                </div>
              ) : (
                'Checkout now'
              )}
            </button>
          </div>

          <div className="w-full preview-cart-action-view-cart">
            <Link
              to="/cart/"
              onClick={() => setIsCartPreview(false)}
              className="w-full text-center button-secondary">
              View Cart
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ExpCartPreview;
