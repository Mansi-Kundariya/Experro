import { CommonUtilities, IsCMSApp } from 'experro-storefront';
import ExpProductListing from './product-listing';
import ExpProductCardController from './product-card-controller';
import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import { expDataSourceConstants, expWidgetConstants } from '../../../utils';
import { EmblaOptionsType } from 'embla-carousel';

export interface ExpProductCardProps {
  id: string;
  titleColor: string;
  component_content: string;
  showSliderView: string;
  showSliderArrows: any;
  titleTextPosition: string;
  isShowPagination: string;
  paginationPosition: string;
  isAutoPlay?: string;
  autoPlaySpeed?: any;
  loadImagesLazily?: any;
}

const ExpProductCard = (props: ExpProductCardProps) => {
  const {
    id,
    titleColor,
    component_content,
    showSliderView,
    titleTextPosition,
    isShowPagination,
    paginationPosition,
    showSliderArrows,
    isAutoPlay,
    autoPlaySpeed,
    loadImagesLazily,
  } = props;

  const displayAs = 'carousel';
  const {
    productsData,
    dataSource,
    mappingObj,
    componentDataDispatcher,
    productsDataLoading,
    contentModel,
    title_style,
  } = ExpProductCardController({
    id,
    titleColor,
    component_content,
  });

  let sliderArrowsVisibility = false;
  if (showSliderArrows === expWidgetConstants?.WIDGET_CHECK_TRUE) {
    sliderArrowsVisibility = true;
  } else if (showSliderArrows === expWidgetConstants?.WIDGET_CHECK_FALSE) {
    sliderArrowsVisibility = false;
  }

  const settingsForSlids: EmblaOptionsType = {
    active: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
    loop: true,
  };

  const SettingForAutoPlay: any = {
    playOnInit: CommonUtilities.isRenderingOnServer()
      ? false
      : isAutoPlay === expWidgetConstants?.WIDGET_CHECK_TRUE,
    delay: parseInt(autoPlaySpeed) || 1000,
  };

  return (
    <>
      {dataSource === expDataSourceConstants?.CONTENT_LIBRARY && (
        <ExpLoadingPlaceholder
          loaderClassName="section-gap product-set-section"
          contentModel={contentModel}
          isLoading={componentDataDispatcher?.isLoading}
          componentData={componentDataDispatcher?.componentData?.id}
        />
      )}

      {(dataSource === expDataSourceConstants?.FREE_FORM ||
        (dataSource === expDataSourceConstants?.CONTENT_LIBRARY &&
          componentDataDispatcher?.componentData?.id)) && (
        <div className="product-set-outer-section mb-12 md:mb-16 lg:mb-28">
          <div className="section-title text-center mb-14">
            <div className="container">
              {((!!mappingObj?.headingText && IsCMSApp) || !IsCMSApp) && (
                <h4
                  className={` text-2xl lg:text-3xl xl:text-4xl ${titleTextPosition}`}
                  style={title_style}
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{
                    __html:
                      mappingObj?.headingText?.length ||
                      dataSource === expDataSourceConstants?.CONTENT_LIBRARY
                        ? mappingObj?.headingText
                        : IsCMSApp
                          ? ''
                          : 'Add Title',
                  }}></h4>
              )}
              {((!!mappingObj?.description && IsCMSApp) || !IsCMSApp) && (
                <p
                  className="mt-1"
                  dangerouslySetInnerHTML={{
                    __html:
                      mappingObj?.description?.length ||
                      dataSource === expDataSourceConstants?.CONTENT_LIBRARY
                        ? mappingObj?.description
                        : IsCMSApp
                          ? ''
                          : 'Add Tag Line',
                  }}
                />
              )}
            </div>
          </div>

          <div className="section-gap product-set-section">
            {displayAs === 'carousel' && (
              <div className="container">
                <ExpProductListing
                  dataSource={dataSource}
                  mappingObj={mappingObj}
                  productsData={productsData}
                  productsDataLoading={productsDataLoading}
                  SettingForAutoPlay={SettingForAutoPlay}
                  settingsForSlids={settingsForSlids}
                  isShowPagination={isShowPagination}
                  paginationPosition={paginationPosition}
                  sliderArrowsVisibility={sliderArrowsVisibility}
                  showSliderView={showSliderView}
                  loadImagesLazily={
                    loadImagesLazily === expWidgetConstants.WIDGET_CHECK_TRUE
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExpProductCard;
