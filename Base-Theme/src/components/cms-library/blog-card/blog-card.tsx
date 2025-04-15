import { Fragment } from 'react';
import ExpBlogCardController from './blog-card-controller';
import ExpBlogItem from '../../../templates/blog/blog-item';
import { expWidgetConstants } from '../../../utils';
import { IconArrowLeft } from '../../../assets/icons/left-prod';
import { IconArrowRight } from '../../../assets/icons/right-prod';
import { CommonUtilities, IsCMSApp } from 'experro-storefront';

const ExpBlogCard = (props: any) => {
  const { is_slider_enable, slider_arrows_visibility } =
    CommonUtilities.propsParser(props);

  const { WIDGET_CHECK_TRUE } = expWidgetConstants;

  const { postData, isLoading, title, emblaRef, scrollNext, scrollPrev } =
    ExpBlogCardController(props);

  return (
    <>
      {/* Initialize Component data */}
      {!isLoading && !postData?.length && !IsCMSApp && (
        <h4>Please select and save record</h4>
      )}
      {/* Fetching Data */}
      {isLoading && !postData?.length && <></>}
      {/* Data Fetched */}
      {!isLoading && postData?.length ? (
        <>
          <div className="page-content blog-card overflow-hidden">
            <div className={`section-title mb-10`}>
              <div className="container">
                <div className={`flex items-center justify-between`}>
                  <div className={`w-[calc(100%_-48px)]`}>
                    <h4 suppressHydrationWarning>{title}</h4>
                  </div>

                  {slider_arrows_visibility ===
                    expWidgetConstants.WIDGET_CHECK_TRUE &&
                    is_slider_enable ===
                      expWidgetConstants.WIDGET_CHECK_TRUE && (
                      <>
                        <div className="w-12">
                          <button
                            type="button"
                            className="embla__prev embla__arrow"
                            aria-label="Left Arrow"
                            onClick={scrollPrev}>
                            <IconArrowLeft />
                          </button>
                          <button
                            type="button"
                            className="embla__next embla__arrow"
                            aria-label="Right Arrow"
                            onClick={scrollNext}>
                            <IconArrowRight />
                          </button>
                        </div>
                      </>
                    )}
                </div>
              </div>
            </div>
            <div className="container">
              <div
                className={`${
                  is_slider_enable === WIDGET_CHECK_TRUE ? '' : 'row'
                } gutter-large `}>
                {is_slider_enable === WIDGET_CHECK_TRUE ? (
                  <>
                    <div className="embla embla_top_arrow">
                      <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container flex -mx-6">
                          {postData?.map((item: any, index: number) => (
                            <div className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33%]" key={index}>
                              <ExpBlogItem blogItemData={item} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap -mx-6">
                      {postData?.map((item: any) => (
                        <Fragment key={item.id}>
                          <ExpBlogItem blogItemData={item} />
                        </Fragment>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExpBlogCard;
