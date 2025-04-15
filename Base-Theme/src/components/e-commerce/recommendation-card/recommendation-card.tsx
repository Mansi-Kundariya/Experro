import { IsCMSApp } from 'experro-storefront';
import ExpRecommendationCardController from './recommendation-card-controller';
import { Fragment } from 'react';
import { ExpProductCell } from '../product-cell';
import { expWidgetConstants } from '../../../utils';
import { IconArrowLeft } from '../../../assets/icons/left-prod';
import { IconArrowRight } from '../../../assets/icons/right-prod';

export interface ExpRecommendationCardProps {
  id?: string;
  titleColor?: string;
  tagColor?: string;
  component_content?: string;
  showSliderView?: string;
  showSliderArrows?: any;
  titleTextPosition?: string;
  isShowPagination?: string;
  paginationPosition?: string;
  isAutoPlay?: string;
  autoPlaySpeed?: any;

  //props to identify is that this component is used in the E-commerce template or not ?
  isInEcommerceTemplate?: boolean;
  widgetId?: string;
  widgetLabel?: string;
  productIds?: any;
  widgetDescription?: any;
  wrap_container?: any;
  loadImagesLazily?: any;
}

const ExpRecommendationCard = (props: ExpRecommendationCardProps) => {
  const {
    id,
    titleColor,
    tagColor,
    component_content,
    showSliderView = 'on',
    titleTextPosition,
    isShowPagination = 'off',
    paginationPosition,
    showSliderArrows = 'on',
    isInEcommerceTemplate = false,
    widgetLabel = 'You May Also Like',
    widgetId,
    productIds = [],
    isAutoPlay = true,
    widgetDescription,
    wrap_container = 'container',
    loadImagesLazily,
  } = props;

  const {
    title_style,
    tag_style,
    tagLine,
    headingText,
    productsData,
    isLoading,
    selectedIndex,
    scrollSnaps,
    DotButton,
    emblaRef,
    onDotButtonClick,
    scrollNext,
    scrollPrev,
    observedDivId,
  } = ExpRecommendationCardController({
    id,
    titleColor,
    tagColor,
    component_content,
    isInEcommerceTemplate,
    widgetId,
    productIds,
    isAutoPlay,
  });

  return (
    <>
      {!!(
        isInEcommerceTemplate &&
        !isLoading &&
        productsData?.Data?.items?.length
      ) ? (
        <div className="product-set-outer-section mb-12 md:mb-16 lg:mb-28">
          {!!widgetLabel?.length || !!widgetDescription?.length ? (
            <div className="section-title text-center mb-14">
              <div className={wrap_container}>
                <h4
                  className="text-center text-2xl lg:text-3xl xl:text-4xl"
                  dangerouslySetInnerHTML={{
                    __html: widgetLabel,
                  }}
                />
                {!!widgetDescription?.length && (
                  <p
                    className="text-center mt-1"
                    dangerouslySetInnerHTML={{
                      __html: widgetDescription,
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <></>
          )}

          {/*  Product Card For E-commerce Template __START__ */}
          <div
            className="recommendation-widget section-gap product-set-section"
            id={observedDivId}>
            <div className={wrap_container}>
              {productsData?.Data?.items?.length > 4 ? (
                <div className="embla group/top-arrow embla-top-arrow relative">
                  <div
                    className="embla__viewport overflow-hidden"
                    ref={emblaRef}>
                    <div className="embla__container flex -mx-4">
                      {productsData?.Data?.items?.map(
                        (product: any, index: number) => (
                          <div
                            className="embla__slide basis-6/12 sm:basis-4/12 lg:basis-3/12 shrink-0 min-w-0 px-4"
                            key={index}>
                            <ExpProductCell
                              productDetails={product}
                              showActionButtons={false}
                              mode="widget"
                              widgetRuleDetails={
                                productsData?.Data?.rule_details
                              }
                              loadImagesLazily={
                                loadImagesLazily ===
                                expWidgetConstants.WIDGET_CHECK_TRUE
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {showSliderArrows ===
                    expWidgetConstants.WIDGET_CHECK_TRUE && (
                    <>
                      <button
                        className="embla__prev embla__arrow absolute top-2/4 left-0 -translate-y-2/4 group-[.embla-top-arrow]/top-arrow:-top-[5.313rem] lg:group-[.embla-top-arrow]/top-arrow:-top-[5.5rem] xl:group-[.embla-top-arrow]/top-arrow:-top-24 group-[.embla-top-arrow]/top-arrow:right-10 group-[.embla-top-arrow]/top-arrow:left-auto group-[.embla-top-arrow]/top-arrow:translate-y-0 w-6 h-6 flex items-center justify-center focus:outline-none"
                        aria-hidden="true"
                        aria-label="Left Arrow"
                        type="button"
                        onClick={scrollPrev}>
                        <IconArrowLeft />
                      </button>
                      <button
                        className="embla__next embla__arrow absolute top-2/4 left-auto right-0 -translate-y-2/4 group-[.embla-top-arrow]/top-arrow:-top-[5.313rem] lg:group-[.embla-top-arrow]/top-arrow:-top-[5.5rem] xl:group-[.embla-top-arrow]/top-arrow:-top-24 group-[.embla-top-arrow]/top-arrow:right-0 group-[.embla-top-arrow]/top-arrow:translate-y-0 w-6 h-6 flex items-center justify-center focus:outline-none"
                        aria-hidden="true"
                        type="button"
                        aria-label="Right Arrow"
                        onClick={scrollNext}>
                        <IconArrowRight />
                      </button>
                    </>
                  )}
                  {isShowPagination ===
                    expWidgetConstants?.WIDGET_CHECK_TRUE && (
                    <div className={`embla__dots mt-8 ${paginationPosition}`}>
                      {scrollSnaps.map((_: any, index: any) => (
                        <DotButton
                          key={index}
                          onClick={() => onDotButtonClick(index)}
                          className={'embla__dot w-2 h-2 border border-solid border-secondary mr-3 last:mr-0'.concat(
                            index === selectedIndex
                              ? ' embla__dot--selected bg-secondary'
                              : ''
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {productsData?.Data?.items?.map(
                      (product: any, index: number) => (
                        <Fragment key={index.toString()}>
                          <ExpProductCell
                            productDetails={product}
                            showActionButtons={false}
                            mode="widget"
                            widgetRuleDetails={productsData?.Data?.rule_details}
                            loadImagesLazily={
                              loadImagesLazily ===
                              expWidgetConstants.WIDGET_CHECK_TRUE
                            }
                          />
                        </Fragment>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/*  Product Card For E-commerce Template __END__ */}
        </div>
      ) : (
        <div className="product-set-outer-section mb-12 md:mb-16 lg:mb-28">
          {((tagLine?.length || headingText?.length) &&
            IsCMSApp &&
            productsData?.Data?.items?.length) ||
          !IsCMSApp ? (
            <div className="section-title text-center mb-14">
              <div className="container">
                <h4
                  className={`text-2xl lg:text-3xl xl:text-4xl ${titleTextPosition}`}
                  style={title_style}
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{
                    __html: headingText?.length
                      ? headingText
                      : IsCMSApp
                        ? ''
                        : 'Add Heading',
                  }}></h4>
                {((!!tagLine?.length && IsCMSApp) || !IsCMSApp) && (
                  <p
                    className={`mt-1 ${titleTextPosition}`}
                    style={tag_style}
                    dangerouslySetInnerHTML={{
                      __html: tagLine?.length
                        ? tagLine
                        : IsCMSApp
                          ? ''
                          : 'Add Tag Line',
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <></>
          )}

          {/*  Product Card Data __START__ */}
          {!isLoading && productsData?.Data?.items?.length ? (
            <div
              className="recommendation-widget section-gap product-set-section"
              id={observedDivId}>
              <div className="container">
                {showSliderView === expWidgetConstants?.WIDGET_CHECK_TRUE &&
                productsData?.Data?.items?.length > 4 ? (
                  <div className="embla group/top-arrow embla-top-arrow relative">
                    <div
                      className="embla__viewport overflow-hidden"
                      ref={emblaRef}>
                      <div className="embla__container flex -mx-4">
                        {productsData?.Data?.items?.map(
                          (product: any, index: number) => (
                            <div
                              className="embla__slide basis-6/12 sm:basis-4/12 lg:basis-3/12 shrink-0 min-w-0 px-4"
                              key={index}>
                              <ExpProductCell
                                productDetails={product}
                                showActionButtons={false}
                                mode="widget"
                                widgetRuleDetails={
                                  productsData?.Data?.rule_details
                                }
                                loadImagesLazily={
                                  loadImagesLazily ===
                                  expWidgetConstants.WIDGET_CHECK_TRUE
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    {showSliderArrows ===
                      expWidgetConstants.WIDGET_CHECK_TRUE && (
                      <>
                        <button
                          className="embla__prev embla__arrow absolute top-2/4 left-0 -translate-y-2/4 group-[.embla-top-arrow]/top-arrow:-top-[5.313rem] lg:group-[.embla-top-arrow]/top-arrow:-top-[5.5rem] xl:group-[.embla-top-arrow]/top-arrow:-top-24 group-[.embla-top-arrow]/top-arrow:right-10 group-[.embla-top-arrow]/top-arrow:left-auto group-[.embla-top-arrow]/top-arrow:translate-y-0 w-6 h-6 flex items-center justify-center focus:outline-none"
                          aria-hidden="true"
                          aria-label="Left Arrow"
                          type="button"
                          onClick={scrollPrev}>
                          <IconArrowLeft />
                        </button>
                        <button
                          className="embla__next embla__arrow absolute top-2/4 left-auto right-0 -translate-y-2/4 group-[.embla-top-arrow]/top-arrow:-top-[5.313rem] lg:group-[.embla-top-arrow]/top-arrow:-top-[5.5rem] xl:group-[.embla-top-arrow]/top-arrow:-top-24 group-[.embla-top-arrow]/top-arrow:right-0 group-[.embla-top-arrow]/top-arrow:translate-y-0 w-6 h-6 flex items-center justify-center focus:outline-none"
                          aria-hidden="true"
                          type="button"
                          aria-label="Right Arrow"
                          onClick={scrollNext}>
                          <IconArrowRight />
                        </button>
                      </>
                    )}
                    {isShowPagination ===
                      expWidgetConstants?.WIDGET_CHECK_TRUE && (
                      <div className={`embla__dots mt-8 ${paginationPosition}`}>
                        {scrollSnaps.map((_: any, index: any) => (
                          <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot w-2 h-2 border border-solid border-secondary mr-3 last:mr-0'.concat(
                              index === selectedIndex
                                ? ' embla__dot--selected bg-secondary'
                                : ''
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {productsData?.Data?.items?.map(
                      (product: any, index: number) => (
                        <Fragment key={index.toString()}>
                          <ExpProductCell
                            productDetails={product}
                            showActionButtons={false}
                            mode="widget"
                            widgetRuleDetails={productsData?.Data?.rule_details}
                            loadImagesLazily={
                              loadImagesLazily ===
                              expWidgetConstants.WIDGET_CHECK_TRUE
                            }
                          />
                        </Fragment>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : !IsCMSApp ? (
            !isLoading && productsData?.Status === 'success' ? (
              <h4 className="text-center">No Products Found</h4>
            ) : (
              <h4 className="text-center">Select Widget To view Products</h4>
            )
          ) : (
            <></>
          )}
          {/*  Product Card Data __END__ */}
        </div>
      )}
    </>
  );
};

export default ExpRecommendationCard;
