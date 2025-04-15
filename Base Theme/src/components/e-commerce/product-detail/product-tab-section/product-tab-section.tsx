/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { memo } from 'react';
import ExpProductTabSectionController from './product-tab-section-controller';
import { ExpProductAverageReview } from '../product-average-review';
import { IconDownarrow } from '../../../../assets/icons/down-arrow';
import { IconUparrow } from '../../../../assets/icons/up-arrow';
import { ExpProductReviews } from '../product-reviews';

interface ExpProductTabSectionProps {
  product: {
    brand_esi: string;
    description_eti: string;
    categories_esai: string;
    calculated_price_efi: number;
    inventory_tracking_esi: string;
    inventory_level_eii: number;
    sku_esi: string;
    warranty_es: string;
    sku_for_analytics_esli: any;
    name_esi: string;
    custom_fields_ej: any;
    provider_id_esi: string;
  };
  productReviews: any;
  averageReviewsCount: any;
  totalReviewCount: any;
  handleWriteAReviewClick: any;
}

const ExpProductTabSection = (props: ExpProductTabSectionProps) => {
  const {
    product,
    productReviews,
    averageReviewsCount,
    totalReviewCount,
    handleWriteAReviewClick,
  } = props;

  const { selectedTab, onTabChange, reviewTabRef, tabRef } =
    ExpProductTabSectionController({
      product,
    });

  return (
    <div
      className="product-tab-section mb-12 md:mb-16 lg:mb-[7.5rem]"
      ref={tabRef}>
      {product?.description_eti && (
        <div className="tab-row mb-12 product-description-block">
          {product?.description_eti ? (
            <div
              className={`tab-list group ${
                selectedTab === 'description' ? 'tab-active ' : ''
              }`}>
              <h6
                className="tab-title tab-title mb-6 pb-2 border-b border-b-solid border-b-gray-200 text-xl lg:text-2xl font-medium tracking-wide leading-[30px] relative cursor-pointer group-[.tab-active]:text-primary"
                onClick={() => onTabChange('description')}>
                Description
                {selectedTab === 'description' ? (
                  <i className="icon minus  w-4 h-4 absolute right-0 pointer-events-none top-2/4 -translate-y-2/4 -mt-1">
                    <IconUparrow className="stroke-neutral-400" />
                  </i>
                ) : (
                  <i className="icon plus  w-4 h-4 absolute right-0 pointer-events-none top-2/4 -translate-y-2/4 -mt-1">
                    <IconDownarrow className="stroke-neutral-400" />
                  </i>
                )}
              </h6>
            </div>
          ) : (
            ''
          )}

          {product?.description_eti && (
            <div className="tab-content-section">
              {selectedTab === 'description' ? (
                <div className="tab-content [&_.bullets-section>li]:mb-2 [&_.bullets-section>li]:relative [&_.bullets-section>li]:before:content-[''] [&_.bullets-section>li]:before:absolute [&_.bullets-section>li]:before:left-0 [&_.bullets-section>li]:before:top-2.5 [&_.bullets-section>li]:before:w-1.5 [&_.bullets-section>li]:before:h-1.5 [&_.bullets-section>li]:before:bg-neutral-700 [&_.bullets-section>li]:before:rounded-full [&_.bullets-section>li]:pl-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product?.description_eti,
                    }}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      )}
      {product?.warranty_es?.length > 0 && (
        <div className="tab-row mb-12">
          <div
            className={`tab-list group ${
              selectedTab === 'details' ? 'tab-active' : ''
            }`}>
            <h6
              className="tab-title tab-title mb-6 pb-2 border-b border-b-solid border-b-gray-200 text-xl lg:text-2xl font-medium tracking-wide leading-[30px] relative cursor-pointer group-[.tab-active]:text-primary"
              onClick={() => onTabChange('details')}>
              Warranty
              {selectedTab === 'details' ? (
                <i className="icon minus  w-4 h-4 absolute right-0 pointer-events-none top-2/4 -translate-y-2/4 -mt-1">
                  <IconUparrow className="stroke-neutral-400" />
                </i>
              ) : (
                <i className="icon plus  w-4 h-4 absolute right-0 pointer-events-none top-2/4 -translate-y-2/4 -mt-1">
                  <IconDownarrow className="stroke-neutral-400" />
                </i>
              )}
            </h6>
          </div>

          <div className="tab-content-section">
            {selectedTab === 'details' ? (
              <div className="tab-content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: product?.warranty_es,
                  }}></p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
      {!!product?.custom_fields_ej?.length && (
        <div className="tab-row mb-12 additional-info">
          <div
            className={`tab-list group ${
              selectedTab === 'Additional Information' ? 'tab-active' : ''
            }`}>
            <h6
              className="tab-title tab-title mb-6 pb-2 border-b border-b-solid border-b-gray-200 text-xl lg:text-2xl font-medium tracking-wide leading-[30px] relative cursor-pointer group-[.tab-active]:text-primary"
              onClick={() => onTabChange('Additional Information')}>
              Additional Information
              {selectedTab === 'Additional Information' ? (
                <i className="icon minus  w-4 h-4 absolute right-0 pointer-events-none top-2/4 -translate-y-2/4 -mt-1">
                  <IconUparrow className="stroke-neutral-400" />
                </i>
              ) : (
                <i className="icon plus  w-4 h-4 absolute right-0 pointer-events-none top-2/4 -translate-y-2/4 -mt-1">
                  <IconDownarrow className="stroke-neutral-400" />
                </i>
              )}
            </h6>
          </div>

          <div className="tab-content-section">
            {selectedTab === 'Additional Information' ? (
              <>
                {!!product?.custom_fields_ej?.length && (
                  <div className="tab-content">
                    <ul className="list-style-none flex flex-wrap -mx-2">
                      {product?.custom_fields_ej.map((obj: any) => (
                        <li className="px-2 w-full md:w-6/12" key={obj.id}>
                          <span className="product-detail-title w-6/12 inline-block text-[#666666] pr-4">
                            {obj?.name}
                          </span>
                          <span className="w-6/12 inline-block text-[#666666]">
                            {obj?.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      )}

      {productReviews?.length ? (
        <div className="tab-row mb-12" ref={reviewTabRef}>
          <div
            className={`tab-list group ${
              selectedTab === 'Customer Reviews' ? 'tab-active' : ''
            }`}>
            <h6
              className="tab-title tab-title mb-6 pb-2 border-b border-b-solid border-b-gray-200 text-xl lg:text-2xl font-medium tracking-wide leading-[30px] relative cursor-pointer group-[.tab-active]:text-primary"
              onClick={() => onTabChange('Customer Reviews')}>
              Customer Reviews
              {selectedTab === 'Customer Reviews' ? (
                <i className="icon minus  w-4 h-4 absolute right-0 pointer-events-none top-2/4 -translate-y-2/4 -mt-1">
                  <IconUparrow className="stroke-neutral-400" />
                </i>
              ) : (
                <i className="icon plus  w-4 h-4 absolute right-0 pointer-events-none top-2/4 -translate-y-2/4 -mt-1">
                  <IconDownarrow className="stroke-neutral-400" />
                </i>
              )}
            </h6>
          </div>

          <div className="tab-content-section" id="review-tab-content">
            {selectedTab === 'Customer Reviews' ? (
              <div className="tab-content">
                <div className="row flex justify-between items-end pb-8 border-b border-b-gray-100">
                  <div className="col">
                    <ul className="mb-4 rating-star-list flex items-center space-x-2">
                      <ExpProductAverageReview
                        averageReviewsCount={averageReviewsCount}
                        starFillClassName={
                          'icon icon-big w-6 h-6 flex items-center justify-center fill-amber-300'
                        }
                        starClassName={
                          'icon icon-big w-6 h-6 flex items-center justify-center fill-neutral-300'
                        }
                      />
                    </ul>
                    <p className="medium m-b-0 m-t-16 text-gray900">
                      Based on {totalReviewCount} Reviews
                    </p>
                  </div>
                  <div className="col">
                    <div
                      className="medium underline pointer"
                      onClick={() => handleWriteAReviewClick()}>
                      Write a Review
                    </div>
                  </div>
                </div>

                {product &&
                  product?.provider_id_esi &&
                  product?.provider_id_esi.length && (
                    <ExpProductReviews productId={product?.provider_id_esi} />
                  )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default memo(ExpProductTabSection);
