import { memo, Dispatch, SetStateAction } from 'react';
import ExpProductActionController from './product-action-controller';
import { IconAlertInfo } from '../../../../assets/icons/alert-info';
import { IconMinus } from '../../../../assets/icons/minus-2';
import { IconPlus } from '../../../../assets/icons/plus';
import { IconHeart } from '../../../../assets/icons/heart';
import { ExpProductShare } from '../product-share';

interface ExpProductActionProps {
  product: {
    brand_esi: string;
    categories_esai: string;
    category_meta_ej: any;
    calculated_price_efi: number;
    inventory_tracking_esi: string;
    inventory_level_eii: number;
    sku_esi: string;
    sku_for_analytics_esli: any;
    name_esi: string;
    provider_id_esi: string;
    provider_specific_data_ej: any;
  };

  selectedVariant: {
    option_values: any[];
    sku: string;
    id: string;
    inventory_level: number;
    purchasing_disabled: any;
    purchasing_disabled_message: string;
  };
  selectedModifiers: any[];
  setIsProductPreviewModalOpen?: Dispatch<SetStateAction<boolean>>;
  analyticsMode?: string | undefined;
  analyticsSearchTerm?: string | null | undefined;
  analyticsCategory?: string | undefined;
  analyticsWidgetId?: string | undefined;
  setWishlistClicked?: any;
}

const ExpProductaction = (props: ExpProductActionProps) => {
  const {
    product,
    selectedVariant,
    selectedModifiers,
    setIsProductPreviewModalOpen,
    analyticsMode,
    analyticsSearchTerm,
    analyticsCategory,
    analyticsWidgetId,
    setWishlistClicked,
  } = props;

  const {
    purchaseDisabledMessage,
    quantityForAddToCart,
    addToCartLoading,
    isBuyNowLoading,
    handleProductQuantityIncDec,
    checkQuantityInputValue,
    addToCart,
    showB2bNinjaButton,
    showQuote,
    addProductToQuote,
    isCheckoutLoading,
  } = ExpProductActionController({
    product,
    selectedVariant,
    selectedModifiers,
    setIsProductPreviewModalOpen,
    analyticsMode,
    analyticsSearchTerm,
    analyticsCategory,
    analyticsWidgetId,
  });

  return (
    <div className="product-detail-action-section pt-4 lg:pt-6 mt-4 lg:mt-6 border-t border-t-solid border-t-gray-200">
      {purchaseDisabledMessage !== '' && (
        <>
          <div className="alertbox productAttributes-message p-4 table my-4  bg-neutral-100">
            <div className="alertbox-icon table-cell pr-2">
              <i className="icon inline-block align-middle min-w-6">
                <IconAlertInfo className="stroke-secondary" />
              </i>
            </div>
            <p className="alertbox-message text-sm mb-0">
              The selected product combination is currently unavailable.
            </p>
          </div>
        </>
      )}
      <div className="flex flex-wrap -mx-2">
        <div className="px-2 product-qty-section w-[9.375rem] mb-4 sm:w-auto sm:mb-0">
          <div className="form-increment flex items-center justify-between py-3.5 px-2 border border-solid border-secondary">
            <button
              className={`button-icon button-decrease flex ${
                quantityForAddToCart < 2 ? 'cursor-not-allowed' : ''
              }`}
              disabled={quantityForAddToCart < 2}
              onClick={handleProductQuantityIncDec.bind(this, 'desc')}>
              <i className="icon">
                <IconMinus className="stroke-primary" />
              </i>
            </button>
            <input
              type="text"
              value={quantityForAddToCart}
              className="text-center text-sm text-primary w-[42px]"
              onBlur={checkQuantityInputValue}
              onChange={handleProductQuantityIncDec.bind(this, 'direct')}
            />
            <button
              className="button-icon button-increase flex"
              onClick={handleProductQuantityIncDec.bind(this, 'inc')}>
              <i className="icon">
                <IconPlus className="stroke-primary" />
              </i>
            </button>
          </div>
        </div>

        <div className="px-2 addtocart-button w-[calc(100%_-_132px)] sm:w-[calc(100%_-_248px)]">
          <button
            className="button-secondary button-large w-full"
            onClick={addToCart.bind(this, false)}
            disabled={purchaseDisabledMessage !== '' || addToCartLoading}>
            {addToCartLoading ? 'Adding to cart' : 'Add to cart'}
          </button>
        </div>

        <div className="px-2 addto-wishlist-button relative">
          <button
            onClick={() => setWishlistClicked(true)}
            className="button button-secondary button-large p-0 w-[3.125rem] h-[3.125rem] flex items-center justify-center">
            <i className="icon w-6 h-6 flex items-center justify-center">
              <IconHeart />
            </i>
          </button>
        </div>

        <ExpProductShare product={product} />

        <div className="buy-button w-full mt-4 lg:mt-6 px-2">
          {!isBuyNowLoading && !isCheckoutLoading ? (
            <button
              onClick={addToCart?.bind(this, true)}
              className="button-primary button-large w-full"
              disabled={purchaseDisabledMessage !== ''}>
              Buy now
            </button>
          ) : (
            <button className="button-primary button-large min-h-12 w-full">
              <div className="relative flex justify-center items-center ml-4">
                <div className="w-3 h-3 rounded-full absolute border-2 border-solid border-primary"></div>
                <div className="w-3 h-3 rounded-full animate-spin absolute border-2 border-solid border-gray-50 border-t-transparent"></div>
              </div>
            </button>
          )}
        </div>

        {process.env.REACT_APP_B2B_NINJA_APP_ENABLE === 'true' &&
          showB2bNinjaButton && (
            <>
              <div className="flex w-100 m-t-16">
                <div className="col col-6">
                  <button
                    onClick={showQuote?.bind(this)}
                    id="qn-cart-to-quote"
                    className="button button-large full-width">
                    View Quote
                  </button>
                </div>
                <div className="col col-6">
                  <button
                    onClick={addProductToQuote?.bind(this)}
                    id="qn-cart-to-quote"
                    className="button button-large full-width">
                    Request Quote
                  </button>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default memo(ExpProductaction);
