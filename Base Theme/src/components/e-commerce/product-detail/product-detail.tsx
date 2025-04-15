import { Dispatch, SetStateAction } from 'react';
import ExpBreadcrumb from '../../common-components/breadcrumb/breadcrumb';
import ExpLinkParser from '../../../utils/link-parser';
import { ExpProductPrice } from '../product-price';
import ExpProductDetailController from './product-detail-controller';
import { ExpProductImage } from './product-image';
import { ExpProductAverageReview } from './product-average-review';
import { ExpProductReviewModel } from './product-review-model';
import { ExpProductCustomFields } from './product-custom-fields';
import { ExpProductOptions } from './product-options';
import { ExpProductModifiers } from './product-modifiers';
import { ExpProductaction } from './product-action';
import { ExpProductTabSection } from './product-tab-section';
import { ExpDraggablePageBody } from '../../../utils';
import { ExpRecommendationManager } from '../recommendation-manager';
import { ExpWishlistModal } from './product-action/wishlist-modal';

interface ExpProductDetailProps {
  product: any;
  components?: any;
  showFullPageDetails?: boolean;
  setIsProductPreviewModalOpen?: Dispatch<SetStateAction<boolean>>;
  analyticsMode?: string | undefined;
  analyticsSearchTerm?: string | null | undefined;
  analyticsCategory?: string | undefined;
  analyticsWidgetId?: string | undefined;
  isInModalElement?: boolean | undefined;
}

const ExpProductdetail = (props: ExpProductDetailProps) => {
  const {
    product,
    components,
    showFullPageDetails = true,
    setIsProductPreviewModalOpen,
    analyticsMode,
    analyticsSearchTerm,
    analyticsCategory,
    analyticsWidgetId,
    isInModalElement,
  } = props;

  const {
    productOptions,
    selectedVariant,
    setSelectedProductOption,
    selectedProductOption,
    setSelectedModifiers,
    selectedModifiers,
    isModalOpen,
    setIsModalOpen,
    productReviews,
    averageReviewsCount,
    totalReviewCount,
    handleWriteAReviewClick,
    getVariantFromSelectOption,
    getProductReviewsAndAverageReviewCount,
    wishlistClicked,
    setWishlistClicked,
  } = ExpProductDetailController({
    product,
    showFullPageDetails,
  });

  return (
    <>
      <div className="page-body product-page-template">
        {showFullPageDetails ? <ExpBreadcrumb pageData={product} /> : ''}
        {/* Dragable Area - 1*/}
        <ExpDraggablePageBody
          draggableAreaId={'production-details-drop-1'}
          components={components}
          pageData={product}
        />

        <div className="page-content">
          <div className="product-view-section">
            <div className="product-view-section-wrapper mb-12 md:mb-16 lg:mb-[7.5rem]">
              <div className="container">
                <div className="flex flex-wrap justify-between -mx-4">
                  {/* product image section */}
                  <ExpProductImage
                    isInModalElement={isInModalElement}
                    product={product}
                  />

                  {/* product detail section */}
                  <div className="px-4 basis-full lg:basis-7/12 product-detail-section mt-4 lg:mt-0">
                    <div className="product-detail-top-sectio">
                      <p className="product-brand-link mb-2 uppercase text-gray-900">
                        <ExpLinkParser to={product?.brand_page_slug_esi}>
                          {product?.brand_eti}
                        </ExpLinkParser>
                      </p>

                      <h1 className="text-2xl lg:text-4xl product-detail-name text-secondary mb-4 lg:mb-6 capitalize font-secondary">
                        {product?.name_eti}
                      </h1>

                      <ExpProductPrice
                        productDetails={product}
                        selectedVariant={selectedVariant}
                        selectedModifiers={selectedModifiers}
                        salePriceClassName="text-secondary font-bold text-2xl"
                        defaultPriceClassName=""
                        retailPriceClassName=""
                      />

                      <div className="product-rating-section flex items-center flex-wrap mt-4 lg:mt-6">
                        <ul className="mb-0 rating-star-list flex items-center mr-4">
                          <ExpProductAverageReview
                            averageReviewsCount={averageReviewsCount}
                            starFillClassName={
                              'icon w-3.5 h-3.5 flex items-center justify-center fill-amber-300'
                            }
                            starClassName={
                              'icon w-3.5 h-3.5 flex items-center justify-center fill-neutral-300'
                            }
                          />
                        </ul>

                        <ExpProductReviewModel
                          totalReviewCount={totalReviewCount}
                          product={product}
                          setIsModalOpen={setIsModalOpen}
                          isModalOpen={isModalOpen}
                          handleWriteAReviewClick={handleWriteAReviewClick}
                          getProductReviewsAndAverageReviewCount={
                            getProductReviewsAndAverageReviewCount
                          }
                        />
                      </div>
                    </div>

                    <div className="product-options-section pt-4 lg:pt-6 mt-4 lg:mt-6 border-t border-t-solid border-t-gray-200">
                      <form action="" className="form-style">
                        <ExpProductOptions
                          product={product}
                          productOptions={productOptions}
                          setSelectedProductOption={setSelectedProductOption}
                          selectedProductOption={selectedProductOption}
                          getVariantFromSelectOption={
                            getVariantFromSelectOption
                          }
                          analyticsMode={analyticsMode}
                          analyticsSearchTerm={analyticsSearchTerm}
                          analyticsCategory={analyticsCategory}
                        />
                        <ExpProductModifiers
                          product={product}
                          selectedModifiers={selectedModifiers}
                          setSelectedModifiers={setSelectedModifiers}
                        />
                      </form>
                    </div>

                    <ExpProductCustomFields product={product} />

                    <ExpProductaction
                      product={product}
                      selectedVariant={selectedVariant}
                      selectedModifiers={selectedModifiers}
                      setIsProductPreviewModalOpen={
                        setIsProductPreviewModalOpen
                      }
                      setWishlistClicked={setWishlistClicked}
                      analyticsMode={analyticsMode}
                      analyticsSearchTerm={analyticsSearchTerm}
                      analyticsCategory={analyticsCategory}
                      analyticsWidgetId={analyticsWidgetId}
                    />
                  </div>
                </div>
              </div>
            </div>

            {showFullPageDetails && (
              <div className="container">
                <ExpProductTabSection
                  product={product}
                  productReviews={productReviews}
                  averageReviewsCount={averageReviewsCount}
                  totalReviewCount={totalReviewCount}
                  handleWriteAReviewClick={handleWriteAReviewClick}
                />
              </div>
            )}
          </div>
        </div>
        <ExpDraggablePageBody
          draggableAreaId={'production-details-drop-2'}
          components={components}
          pageData={product}
        />
        {/*  Recommendation Product-card __START__  */}
        {showFullPageDetails && (
          <ExpRecommendationManager
            location={'Product Page'}
            pageData={product}
          />
        )}
        {/*  Recommendation Product-card __END__  */}
        <ExpDraggablePageBody
          draggableAreaId={'production-details-drop-3'}
          components={components}
          pageData={product}
        />
      </div>

      <ExpWishlistModal
        product={product}
        wishlistClicked={wishlistClicked}
        setWishlistClicked={setWishlistClicked}
      />
    </>
  );
};
export default ExpProductdetail;
