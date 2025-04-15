/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { lazy } from 'react';
import Modal from 'react-modal';
import { IsCMSApp } from 'experro-storefront';
const ExpProductdetail = lazy(() => import('../product-detail/product-detail'));
import { ExpProductPrice } from '../product-price';
import ExpLinkParser from '../../../utils/link-parser';
import placeHolderCard from '../../../assets/images/placeholder-product-card.jpg';
import ExpProductCellController from './product-cell-controller';
import { IconHeart } from '../../../assets/icons/heart-2';
import { IconCross } from '../../../assets/icons/cross';
import { IconQuickview } from '../../../assets/icons/quickview';
import { IconAddtobag } from '../../../assets/icons/add-to-bag';
import { IconCompare } from '../../../assets/icons/compare';
import { ExpProductAverageReview } from '../product-detail/product-average-review';
import { ExpImage } from '../../common-components/exp-image';
import { ExpWishlistModal } from '../product-detail/product-action/wishlist-modal';

interface ExpProductCellProps {
  productDetails: {
    images_ej: any[];
    sku_esi: string;
    reviews_rating_sum_eii: string;
    reviews_count_eii: string;
    page_slug_esi: any;
    sku_for_analytics_esli: any;
    calculated_price_efi: number;
    name_eti: string;
    brand_esi: string;
    categories_esai: any;
    category_meta_ej: any;
    provider_id_esi: any;
    provider_specific_data_ej: any;
    variant_options_ej: any[];
    brand_page_slug_esi: string;
    rule_details: any;
    is_merchandising?: boolean;
    is_secondary_algorithm?: boolean;
    is_primary_algorithm?: boolean;
    retail_price_ef?: number;
    price_efi?: number;
  };
  nameSuffix?: string;
  handleProductCompare?: (productSku: string) => void;
  productCompareSkus?: any[];
  categoryTree?: any[];
  showActionButtons: boolean;
  mode: string;
  category?: string;
  widgetId?: string;
  widgetRuleDetails?: any;
  productCellIndex?: number;
  productcardclassname?: string;
  loadImagesLazily?: boolean;
}

const ExpProductCell = (props: ExpProductCellProps) => {
  const {
    productDetails,
    handleProductCompare,
    productCompareSkus,
    categoryTree,
    showActionButtons = true,
    mode,
    category,
    widgetId,
    widgetRuleDetails,
    productCellIndex,
    productcardclassname,
    loadImagesLazily,
    nameSuffix = '',
  } = props;

  const {
    averageReviewsCount,
    images,
    isModalOpen,
    isCartLoading,
    isQuickViewLoading,
    productData,
    productNavigationUrl,
    queryParams,
    selectedSku,
    colorVarients,
    colorOption,
    selectedVarient,
    getVarient,
    setIsModalOpen,
    handleModalOpen,
    handleCloseModal,
    handleAddToCartButtonClick,
    handleViewDetailsClick,
    handelProductClicked,
    options,
    wishlistClicked,
    setWishlistClicked,
  } = ExpProductCellController({
    category,
    categoryTree,
    mode,
    productCompareSkus,
    productDetails,
    widgetId,
    widgetRuleDetails,
  });
  const rootElementRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    Modal.setAppElement(rootElementRef.current as HTMLElement);
  }, []);
  return (
    <div className={`product-card ${productcardclassname}`}>
      <div className="card-inner relative h-full flex flex-col group overflow-hidden">
        <div className="card-figure mb-4 relative">
          {!!productDetails?.retail_price_ef &&
            productDetails?.retail_price_ef !== productDetails?.price_efi && (
              <div className="sale-flag uppercase absolute z-10 top-3 left-3">
                <span>Sale</span>
              </div>
            )}
          <div className="card-image-item w-full h-full relative bg-gray-50 overflow-hidden before:bg-white before:transition-all before:absolute before:top-0 before:left-0 before:bottom-0 before:h-full before:w-full before:z-[1] before:opacity-0 group-hover:before:blur-[3px] group-hover:before:opacity-30">
            <ExpLinkParser
              onClick={handelProductClicked}
              to={productNavigationUrl}
              className="absolute top-0 left-0 bottom-0 w-full h-full z-[1] overlay-link"
              ariaLabel={productDetails?.name_eti}></ExpLinkParser>
            <ExpLinkParser
              onClick={handelProductClicked}
              to={productNavigationUrl}
              ariaLabel={productDetails?.name_eti}
              className="block w-full h-fll">
              <ExpImage
                src={
                  images?.length
                    ? `${images[0]?.url_zoom?.replace(
                        'https://cdn11.bigcommerce.com',
                        'https://product-images.experro.app'
                      )}`
                    : placeHolderCard
                }
                height={346}
                width={346}
                options={options}
                /* When we get 'loadImagesLazily' prop then will be giving priority to it which will be prop-drilled from the component's like product-card,
                 * else for normal listing will be just relaing on the ProdutCellIndex
                 * to load limited front few images as 'eager' loading. *
                 */
                lazyLoad={
                  loadImagesLazily === true || loadImagesLazily === false
                    ? loadImagesLazily
                    : productCellIndex
                    ? productCellIndex >= 3
                    : false
                }
                name={`ExpProductCell_${productDetails?.name_eti}_`}
                pictureClassName="flex items-center h-full justify-center max-h-full max-w-full relative w-full before:content-[ ] before:block before:h-0 before:pb-[100%] before:w-full"
                className="bottom-0 h-full left-0 object-contain absolute top-0 right-0 w-full mix-blend-multiply m-auto duration-700 group-hover:scale-105 group-hover:transition-transform group-hover:duration-700 p-6"
                alt={productDetails?.name_eti}
                title={productDetails?.name_eti}
              />
            </ExpLinkParser>
          </div>
          <div className="product-action-hover opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 flex items-center justify-center z-10">
            {!!handleProductCompare && (
              <div className="card-compare-button mx-2 has-tooltip relative">
                <i
                  onClick={() => handleProductCompare(productDetails.sku_esi)}
                  className={`peer icon product-action compare-product w-10 h-10 flex items-center justify-center bg-secondary rounded-full cursor-pointer hover:bg-primary ${
                    selectedSku ? 'is-selected bg-primary' : ''
                  }`}>
                  <IconCompare className="w-5 h-5" />
                </i>
                <span className="hidden min-w-[6.875rem] text-center peer-hover:inline-block absolute -top-full left-2/4 -translate-x-2/4 px-2 py-1 bg-secondary rounded text-white text-sm not-italic font-normal leading-6 tooltip before:border-[6px] before:border-transparent before:border-b-0 before:border-t-secondary before:absolute before:-bottom-2 before:left-2/4 before:-translate-x-2/4 before:w-2 before:h-2">
                  Compare
                </span>
              </div>
            )}
            <div className="card-quick-view-button mx-2 has-tooltip relative">
              <i
                className="icon peer product-action compare-product w-10 h-10 flex items-center justify-center bg-secondary rounded-full cursor-pointer hover:bg-primary"
                onClick={handleModalOpen}>
                <IconQuickview className="stroke-white" />
              </i>
              <span className="hidden min-w-[6.875rem] text-center peer-hover:inline-block absolute -top-full left-2/4 -translate-x-2/4 px-2 py-1 bg-secondary rounded text-white text-sm not-italic font-normal leading-6 tooltip before:border-[6px] before:border-transparent before:border-b-0 before:border-t-secondary before:absolute before:-bottom-2 before:left-2/4 before:-translate-x-2/4 before:w-2 before:h-2">
                Quickview
              </span>
            </div>
            {!productDetails?.provider_specific_data_ej?.modifiers?.length &&
            !productDetails?.variant_options_ej?.length ? (
              <div className="card-addcart-button mx-2 has-tooltip relative">
                <i
                  className="icon peer product-action compare-product w-10 h-10 flex items-center justify-center bg-secondary rounded-full cursor-pointer hover:bg-primary"
                  onClick={() =>
                    !isCartLoading && handleAddToCartButtonClick()
                  }>
                  <IconAddtobag className="stroke-white" />
                </i>
                <span className="hidden min-w-[6.875rem] text-center peer-hover:inline-block absolute -top-full left-2/4 -translate-x-2/4 px-2 py-1 bg-secondary rounded text-white text-sm not-italic font-normal leading-6 tooltip before:border-[6px] before:border-transparent before:border-b-0 before:border-t-secondary before:absolute before:-bottom-2 before:left-2/4 before:-translate-x-2/4 before:w-2 before:h-2">
                  Add to Cart
                </span>
              </div>
            ) : (
              <div className="card-addcart-button mx-2  has-tooltip relative">
                <i
                  className="icon peer product-action compare-product w-10 h-10 flex items-center justify-center bg-secondary rounded-full cursor-pointer hover:bg-primary"
                  onClick={handleViewDetailsClick}>
                  <IconAddtobag className="stroke-white" />
                </i>
                <span className="hidden min-w-[6.875rem] text-center peer-hover:inline-block absolute -top-full left-2/4 -translate-x-2/4 px-2 py-1 bg-secondary rounded text-white text-sm not-italic font-normal leading-6 tooltip before:border-[6px] before:border-transparent before:border-b-0 before:border-t-secondary before:absolute before:-bottom-2 before:left-2/4 before:-translate-x-2/4 before:w-2 before:h-2">
                  Add to Cart
                </span>
              </div>
            )}
          </div>
          {showActionButtons && (
            <div className="product-actions absolute top-4 right-4 flex items-center justify-center z-10 cursor-pointer">
              <div className="has-tooltip">
                <i
                  onClick={() => setWishlistClicked(true)}
                  className="icon product-action like-product w-4 h-4">
                  <IconHeart />
                </i>
              </div>
            </div>
          )}
        </div>
        <div className="card-description flex flex-col flex-1">
          <div className="card-description-info flex-1">
            <div className="card-brand-rating flex flex-wrap align-center justify-between">
              {productDetails?.brand_esi &&
                productDetails?.brand_page_slug_esi && (
                  <ExpLinkParser to={productDetails?.brand_page_slug_esi}>
                    <p className="card-brandname text-sm text-gray-700 tracking-wider uppercase">
                      {productDetails?.brand_esi}
                    </p>
                  </ExpLinkParser>
                )}
              <ul className="rating-star-list flex flex-wrap items-center">
                <ExpProductAverageReview
                  averageReviewsCount={averageReviewsCount}
                  starFillClassName={
                    'icon w-3 h-3 flex items-center justify-center fill-amber-300'
                  }
                  starClassName={
                    'icon w-3 h-3 flex items-center justify-center fill-neutral-300'
                  }
                />
              </ul>
            </div>
            {IsCMSApp ? (
              <h4 className="card-title capitalize text-base lg:text-lg font-normal mt-2 mb-6">
                <ExpLinkParser
                  onClick={handelProductClicked}
                  to={productNavigationUrl}
                  dangerouslySetInnerHTML={{ __html: productDetails?.name_eti }}
                />
                {nameSuffix?.length ? (
                  <p className="mb-0 text-sm text-gray-900 font-normal">
                    {nameSuffix}
                  </p>
                ) : (
                  ''
                )}
              </h4>
            ) : (
              <h4 className="card-title capitalize text-base lg:text-lg font-normal mt-2 mb-6">
                {productDetails?.name_eti}
                {nameSuffix?.length ? (
                  <p className="mb-0 text-sm text-gray-900 font-normal">
                    {nameSuffix}
                  </p>
                ) : (
                  ''
                )}
              </h4>
            )}
          </div>
          <ExpProductPrice
            productDetails={productDetails}
            selectedVariant={selectedVarient}
            salePriceClassName="text-secondary font-bold"
            defaultPriceClassName=""
            retailPriceClassName=""
          />
        </div>
      </div>
      {!!colorVarients?.length && !!colorVarients[0]?.option_values?.length && (
        <div className="swatch-list flex justify-start align-center hidden">
          {colorVarients.map((object: any) =>
            object?.option_values.map((option: any, index: number) => {
              return (
                option?.value_data?.colors?.length && (
                  <div
                    key={index.toString()}
                    className="form-radio-item m-b-15 swatch-item"
                    onClick={() => getVarient(option)}>
                    <input
                      type="radio"
                      className={`swatch-radio ${
                        (index === 0 && !colorOption) ||
                        colorOption === option?.value_data?.colors?.[0]
                          ? 'is-selected'
                          : ''
                      }`}
                      aria-label="swathc-radio"
                    />
                    <label className="swatch-label">
                      <span
                        style={{
                          backgroundColor: option?.value_data?.colors?.[0],
                        }}></span>
                    </label>
                  </div>
                )
              );
            })
          )}
        </div>
      )}
      {isModalOpen && (
        <div className="modal" ref={rootElementRef}>
          <Modal
            isOpen={isModalOpen}
            className="modal-quickview relative w-[89.5rem] max-w-[90%] max-h-[90%] overflow-hidden bg-white shadow-md focus-visible:outline-none"
            ariaHideApp={false}
            overlayClassName="flex items-center justify-center fixed w-full h-screen top-0 left-0 bg-black bg-opacity-20 z-[99]">
            <div
              onClick={handleCloseModal}
              className="popup-close-link absolute top-5 right-5 cursor-pointer z-30">
              <i className="icon w-4 h-4 flex items-center justify-center">
                <IconCross className="stroke-neutral-900 w-full h-full" />
              </i>
            </div>
            <div className="modal-content relative lg:py-10 max-h-[75vh] min-h-[40vh] overflow-auto">
              {!isQuickViewLoading && productData ? (
                <ExpProductdetail
                  isInModalElement={true}
                  product={productData?.Data?.items[0]}
                  showFullPageDetails={false}
                  analyticsMode={mode}
                  setIsProductPreviewModalOpen={setIsModalOpen}
                  analyticsSearchTerm={queryParams.get('q')}
                  analyticsCategory={category || widgetRuleDetails?.category}
                  analyticsWidgetId={widgetId}
                />
              ) : (
                <div className="loading-section">
                  <div className="loader-wrapper">
                    <div className="loader-icon flex" />
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </div>
      )}
      <ExpWishlistModal
        product={productDetails}
        wishlistClicked={wishlistClicked}
        setWishlistClicked={setWishlistClicked}
      />
    </div>
  );
};

export default ExpProductCell;
