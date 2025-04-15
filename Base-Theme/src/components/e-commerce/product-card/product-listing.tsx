import { Fragment } from 'react';
import { ExpProductCell } from '../product-cell';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DotButton, useDotButton } from '../../../utils/embla-carousel-pagination-button';
import { useCallback } from 'react';
import { expWidgetConstants } from '../../../utils';
import { IconArrowLeft } from '../../../assets/icons/left-prod';
import { IconArrowRight } from '../../../assets/icons/right-prod';

export interface ExpProductListingProps {
  productsData: any;
  productsDataLoading: any;
  mappingObj: any;
  dataSource: string;
  sliderKey?: any;
  settingsForSlids?: object;
  SettingForAutoPlay?: object;
  isShowPagination?: string;
  paginationPosition?: string;
  sliderArrowsVisibility?: boolean;
  showSliderView?: string;
  loadImagesLazily?: boolean;
}

const ExpProductListing = (props: ExpProductListingProps) => {
  const {
    productsData,
    productsDataLoading,
    mappingObj,
    settingsForSlids,
    SettingForAutoPlay,
    paginationPosition,
    isShowPagination,
    sliderArrowsVisibility,
    showSliderView,
    loadImagesLazily
  } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(settingsForSlids, [
    Autoplay(SettingForAutoPlay),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <>
      {/* If No Data Found */}
      {!!(
        !productsData?.Data?.items?.length &&
        !productsDataLoading &&
        mappingObj?.sourceKey?.length &&
        mappingObj?.sourceValue?.length
      ) && (
        <div className="col">
          <p className="h5">No data found</p>
        </div>
      )}
      {/* If Source is not selected or source value not filled */}
      {!!(
        !productsData?.Data?.items?.length &&
        !productsDataLoading &&
        !mappingObj?.sourceKey?.length &&
        !mappingObj?.sourceValue?.length
      ) && (
        <div className="col">
          <p className="h5">Please Select Source</p>
        </div>
      )}

      {/* Fetching Products */}
      {!!(!productsData?.Data?.items?.length && productsDataLoading) && (
        <div className="position-relative" style={{ height: '300px' }}>
          <div className={'cart-loading'}>
            <div className="loader-wrapper">
              <div className="loader-main flex" />
            </div>
          </div>
        </div>
      )}

      {/* Products fetched successfully */}
      {!!productsData?.Data?.items?.length && (
        <>
          {productsData?.Data?.items?.length > 4 &&
          showSliderView === expWidgetConstants.WIDGET_CHECK_TRUE ? (
            <div className="embla group/top-arrow embla-top-arrow relative">
              <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex -mx-4">
                  {productsData?.Data?.items?.map(
                    (product: any, index: number) => (
                      <div className="embla__slide basis-6/12 sm:basis-4/12 lg:basis-3/12 shrink-0 min-w-0 px-4" key={index}>
                        <ExpProductCell
                          productDetails={product}
                          showActionButtons={false}
                          mode="direct"
                          loadImagesLazily={loadImagesLazily}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
              {sliderArrowsVisibility && (
                <>
                  <button
                    type="button"
                    className="embla__prev embla__arrow absolute top-2/4 left-0 -translate-y-2/4 group-[.embla-top-arrow]/top-arrow:-top-[5.313rem] lg:group-[.embla-top-arrow]/top-arrow:-top-[5.5rem] xl:group-[.embla-top-arrow]/top-arrow:-top-24 group-[.embla-top-arrow]/top-arrow:right-10 group-[.embla-top-arrow]/top-arrow:left-auto group-[.embla-top-arrow]/top-arrow:translate-y-0 w-6 h-6 flex items-center justify-center focus:outline-none"
                    aria-label="Left Arrow"
                    onClick={scrollPrev}>
                    <IconArrowLeft />
                  </button>
                  <button
                    type="button"
                    className="embla__next embla__arrow absolute top-2/4 left-auto right-0 -translate-y-2/4 group-[.embla-top-arrow]/top-arrow:-top-[5.313rem] lg:group-[.embla-top-arrow]/top-arrow:-top-[5.5rem] xl:group-[.embla-top-arrow]/top-arrow:-top-24 group-[.embla-top-arrow]/top-arrow:right-0 group-[.embla-top-arrow]/top-arrow:translate-y-0 w-6 h-6 flex items-center justify-center focus:outline-none"
                    aria-label="Right Arrow"
                    onClick={scrollNext}>
                    <IconArrowRight />
                  </button>
                </>
              )}
              {isShowPagination === expWidgetConstants?.WIDGET_CHECK_TRUE && (
                <div
                className={`embla__dots mt-8 ${paginationPosition}`}>
                  {scrollSnaps.map((_: any, index: any) => (
                    <DotButton
                      key={index}
                      onClick={() => onDotButtonClick(index)}
                      className={'embla__dot w-2 h-2 border border-solid border-secondary mr-3 last:mr-0'.concat(
                        index === selectedIndex ? ' embla__dot--selected bg-secondary' : ''
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {productsData?.Data?.items?.map((product: any, index: number) => (
                <Fragment key={index.toString()}>
                  <ExpProductCell
                    productDetails={product}
                    showActionButtons={false}
                    mode="direct"
                    loadImagesLazily={loadImagesLazily}
                  />
                </Fragment>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExpProductListing;
