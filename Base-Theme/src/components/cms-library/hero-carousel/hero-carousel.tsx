import { CommonUtilities, ContentService } from 'experro-storefront';
import ExpLinkParser from '../../../utils/link-parser';
import ExpHeroCarouselController from './hero-carousel-controller';
import ExpLoadingPlaceholder from '../../common-components/loading-placeholder/loading-placeholder';
import { ExpImage } from '../../common-components/exp-image';
import { HeroIconArrowRight } from '../../../assets/icons/arrow-right-two';
import { HeroIconArrowLeft } from '../../../assets/icons/arrow-left-two';
import { expWidgetConstants } from '../../../utils';
import { expImageOption } from '../../../interfaces/exp-image.interface';

export interface ExpHeroCarouselProps {
  id?: string;
  component_content?: any;
}

/**
 * Renders a Hero Carousel component.
 * @param {ExpHeroCarouselProps} props - The Hero Carousel component props.
 * @returns The rendered Hero Carousel component.
 */

const ExpHeroCarousel = (props: ExpHeroCarouselProps) => {

  const {
    id,
    isShowPagination,
    paginationPosition,
    isShowSubHeading,
    isShowHeading,
    headingTextPosition,
    headingSize,
    headingTag,
    headingTextColor,
    subHeadingTextColor,
    buttonColor,
    buttonTextColor,
    buttonHoverColor,
    buttonTextHoverColor,
    showSliderArrows,
    preLoadImage,
    loadImageLazy,
  } = CommonUtilities.propsParser(props);

  const {
    componentDataDispatcher,
    contentModel,
    selectedIndex,
    scrollSnaps,
    DotButton,
    emblaRef,
    onDotButtonClick,
    scrollNext,
    scrollPrev,
  } = ExpHeroCarouselController(props);

  const { WIDGET_CHECK_TRUE } = expWidgetConstants;
  const { componentData } = componentDataDispatcher;

  const options: expImageOption[] = [
    {
      width: 1920,
    },
    {
      width: 1024,
    },
    {
      width: 768,
      aspect_ratio: '16:10',
      crop_gravity: 'west',
    },
    {
      width: 568,
      aspect_ratio: '16:13',
      crop_gravity: 'west',
    },
    {
      width: 450,
      aspect_ratio: '16:16',
      crop_gravity: 'west',
    },
  ];

  const HeadingTag: any = `${headingTag}`;
  
  return (
    <>
      <ExpLoadingPlaceholder
        loaderClassName="hero-carousel-section"
        contentModel={contentModel}
        isLoading={componentDataDispatcher?.isLoading}
        componentData={componentData}
      />

      {componentData?.id && !componentDataDispatcher?.isLoading && (
        <>
          <style>
            {`#${id} .button-style:hover {
                background-color: ${buttonHoverColor} !important;
                color: ${buttonTextHoverColor} !important;
              }
               #${id} .button-style {
                background-color: ${buttonColor} !important;
                color: ${buttonTextColor} !important;
              }`}
          </style>

          <section className="mb-28 hero-carousal-main">
            <div className="relative embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex">
                {componentData?.hero_carousel_com?.map(
                  (data: any, index: number) => {
                    return (
                      // Add class contentRight with heroSlide for right side content
                      <div
                        key={index.toString()}
                        className={
                          'embla__slide hero-carousal-wrap relative basis-full shrink-0 min-w-0'
                        }>
                        <div className="min-h-[25rem] max-h-[25rem] lg:min-h-[37.5rem] lg:max-h-[37.5rem] [&>picture]:flex [&>picture]:min-h-[inherit] [&>picture]:max-h-[inherit] image-block">
                          <ExpImage
                            src={
                              data?.slide_image_media_emd
                                ? data?.slide_image_media_emd[0]
                                : ''
                            }
                            height={600}
                            width={1920}
                            alt={
                              data?.slide_heading_et
                                ? data?.slide_heading_et
                                : ''
                            }
                            name={`Hero_carousel${id}_${index}`}
                            title={
                              data?.slide_heading_et
                                ? data?.slide_heading_et
                                : ''
                            }
                            retina={false}
                            preLoad={
                              preLoadImage ===
                              expWidgetConstants.WIDGET_CHECK_TRUE
                            }
                            lazyLoad={
                              loadImageLazy ===
                              expWidgetConstants.WIDGET_CHECK_TRUE
                            }
                            options={options}
                            className="w-full object-cover"
                          />
                        </div>
                        <div className="container absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] z-10 text-center content-block">
                          <div
                            className={`content-block-wrap ${headingTextPosition}`}>
                            {isShowHeading === WIDGET_CHECK_TRUE &&
                              data?.slide_heading_et && (
                                <>
                                  <HeadingTag
                                    className={`text-3xl lg:${headingSize} font-secondary mb-4 heading`}
                                    style={{
                                      color: headingTextColor,
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: ContentService.parseVariableValue(
                                        data?.slide_heading_et
                                      ),
                                    }}
                                  />
                                </>
                              )}

                            {isShowSubHeading === WIDGET_CHECK_TRUE &&
                              data?.slide_sub_heading_et && (
                                <p
                                  className="text-sm mb-8 description last:mb-0"
                                  style={{
                                    color: subHeadingTextColor,
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: ContentService.parseVariableValue(
                                      data?.slide_sub_heading_et
                                    ),
                                  }}
                                />
                              )}

                            {data?.slide_button_text_et && (
                              <ExpLinkParser
                                className="button-primary button-large button-style"
                                to={data?.slide_button_link_et}
                                dangerouslySetInnerHTML={{
                                  __html: ContentService.parseVariableValue(
                                    data?.slide_button_text_et
                                  ),
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              <div className="embla__controls">
                <div className="hidden lg:block embla__buttons">
                  {showSliderArrows === WIDGET_CHECK_TRUE && (
                    <>
                      <button
                        aria-label="Arrow Prev"
                        className="absolute left-4 xl:left-[13.75rem] top-2/4 -translate-y-[50%] leading-[0] embla__prev"
                        onClick={scrollPrev}>
                        <i className="icon w-8 h-8 lg:w-12 lg:h-12 [&>svg]:stroke-secondary">
                          <HeroIconArrowLeft />
                        </i>
                      </button>
                      <button
                        aria-label="Arrow Next"
                        className="absolute right-4 xl:right-[13.75rem] top-2/4 -translate-y-[50%] leading-[0] embla__next"
                        onClick={scrollNext}>
                        <i className="icon w-8 h-8 lg:w-12 lg:h-12 [&>svg]:stroke-secondary">
                          <HeroIconArrowRight />
                        </i>
                      </button>
                    </>
                  )}
                </div>
                {isShowPagination === WIDGET_CHECK_TRUE && (
                  <div
                    className={`container flex justify-center gap-x-3 absolute left-2/4 -translate-x-[50%] top-auto bottom-8 leading-[0] embla__dots ${paginationPosition}`}>
                    {scrollSnaps.map((_: any, index: any) => (
                      <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={'w-2 h-2 border border-secondary embla__dot'.concat(
                          index === selectedIndex
                            ? ' bg-secondary embla__dot--selected'
                            : ''
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ExpHeroCarousel;
