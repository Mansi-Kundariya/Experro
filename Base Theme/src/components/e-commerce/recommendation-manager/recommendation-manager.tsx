import ExpRecommendationManagerController from './recommendation-manager-controller';
import { IconArrowLeft } from '../../../assets/icons/left-prod';
import { IconArrowRight } from '../../../assets/icons/right-prod';
import { ExpProductCell } from '../product-cell';
import { IsCMSApp } from 'experro-storefront';

const ExpRecommendationManager: React.FC<any> = ({
  location,
  pageData,
}: {
  location: string;
  pageData: any;
}) => {
  const {
    recommendationManagerWidgetData,
    recommendationManagerLoading,
    searchText,
    selectedIndex,
    scrollSnaps,
    DotButton,
    emblaRef,
    onDotButtonClick,
    scrollNext,
    scrollPrev,
  }: any = ExpRecommendationManagerController({
    location: location,
    pageData: pageData,
  });

  const getWidgetTitle = (widget_item: any) => {
    let widgetName: string = widget_item?.widget_name;

    if (location === 'Category Page') {
      if (widget_item?.dynamic_name_es?.toLowerCase() === 'prefix') {
        widgetName = `${pageData?.title} ${widgetName}`;
      } else if (widget_item?.dynamic_name_es?.toLowerCase() === 'postfix') {
        widgetName = `${widgetName} ${pageData?.title}`;
      }
    } else if (location === 'Search Page' && searchText?.length) {
      if (widget_item?.dynamic_name_es?.toLowerCase() === 'prefix') {
        widgetName = `${searchText} ${widgetName}`;
      } else if (widget_item?.dynamic_name_es?.toLowerCase() === 'postfix') {
        widgetName = `${widgetName} ${searchText}`;
      }
    }

    return widgetName;
  };

  return (
    <>
      {recommendationManagerLoading ? (
        <div className="cart-loading category-carousel-section product-set">
          <div className="loader-wrapper">
            <div className="loader-main" />
          </div>
        </div>
      ) : (
        <>
          <div className="product-set-outer-section mb-12 md:mb-16 lg:mb-28">
            {recommendationManagerWidgetData?.map((widget_item: any) => (
              <>
                <div className="section-title text-center mb-14">
                  {widget_item?.widget_name?.length ||
                  widget_item?.widget_description?.length ? (
                    <>
                      <div className="container">
                        <h4
                          className="text-left text-2xl lg:text-3xl xl:text-4xl font-secondary text-[#191919]"
                          dangerouslySetInnerHTML={{
                            __html: getWidgetTitle(widget_item),
                          }}
                        />
                        {!!widget_item?.widget_description?.length && (
                          <p
                            className="text-left mt-1"
                            dangerouslySetInnerHTML={{
                              __html: widget_item?.widget_description,
                            }}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="recommendation-widget section-gap product-set-section"
                  id={widget_item?.divID}>
                  <div className="container">
                    {!!(
                      !recommendationManagerLoading &&
                      widget_item?.products?.length
                    ) &&
                      (widget_item?.products?.length > 4 && IsCMSApp ? (
                        <>
                          <div className="embla group/top-arrow embla-top-arrow relative">
                            <div
                              className="embla__viewport overflow-hidden"
                              ref={emblaRef}>
                              <div className="embla__container flex -mx-4">
                                {widget_item?.products?.map(
                                  (product: any, index: number) => (
                                    <div
                                      className="embla__slide basis-6/12 sm:basis-4/12 lg:basis-3/12 shrink-0 min-w-0 px-4"
                                      key={index}>
                                      <ExpProductCell
                                        productDetails={product}
                                        showActionButtons={false}
                                        mode="widget"
                                        widgetRuleDetails={
                                          widget_item?.rule_details
                                        }
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

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

                            <div className="embla__dots mt-8 text-center">
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
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {widget_item?.products?.map(
                              (product: any, index: number) => (
                                <ExpProductCell
                                  key={index.toString()}
                                  productDetails={product}
                                  showActionButtons={false}
                                  mode="widget"
                                  widgetRuleDetails={widget_item?.rule_details}
                                />
                              )
                            )}
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ExpRecommendationManager;
