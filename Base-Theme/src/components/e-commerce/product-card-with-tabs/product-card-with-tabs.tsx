import ExpProductListing from '../product-card/product-listing';
import ExpProductCardWithTabsController from './product-card-with-tabs-controller';
import { expDataSourceConstants, expWidgetConstants } from '../../../utils';
import { CommonUtilities, IsCMSApp } from 'experro-storefront';
import { EmblaOptionsType } from 'embla-carousel';

export interface ExpProductCardWIthTabsProps {
  id: string;
  component_content: string;
  showSliderArrows: any;
  isShowPagination: string;
  isAutoPlay?: string;
  autoPlaySpeed?: any;
  loadImagesLazily?: any;
}

const ExpProductCardWIthTabs = (props: ExpProductCardWIthTabsProps) => {
  const {
    id,
    component_content,
    isShowPagination,
    showSliderArrows,
    isAutoPlay,
    autoPlaySpeed,
    loadImagesLazily,
  } = props;

  const attributes = {};
  const displayAs = 'carousel';
  const {
    sliderKey,
    productsData,
    productDataWithTabs,
    dataSource,
    productsDataLoading,
    handleToggleTabs,
  } = ExpProductCardWithTabsController({
    id,
    component_content,
    isAutoPlay,
  });

  const mappingObj = {
    backgroundImage: '',
    headingText: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    sourceKey: 'pr-card-tabs',
    sourceValue: '',
  };

  let sliderArrowsVisibility = true;
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
    delay: parseInt(autoPlaySpeed) || 5000,
  };

  return (
    <>
      {!Object.keys(productDataWithTabs).length ? (
        IsCMSApp ? (
          <div className="loading-section is-loading">
            <div className="loader-wrapper">
              <div className="loader-icon flex" />
            </div>
          </div>
        ) : (
          <div className="col">
            <p className="h5">Please Select Record</p>
          </div>
        )
      ) : (
        (dataSource === expDataSourceConstants?.FREE_FORM ||
          dataSource === expDataSourceConstants?.CONTENT_LIBRARY) && (
          <div
            {...attributes}
            className="product-set-outer-section product-card-with-tabs section-gap">
            <div className="product-card-with-tab-title text-center">
              <div className="container">
                <ul className="list-style-none tab-listing flex align-center justify-center m-b-0">
                  {Object.keys(productDataWithTabs).map((tabKey) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <li
                      className={
                        productDataWithTabs[tabKey].tabName ===
                        productsData?.tabName
                          ? 'active'
                          : ''
                      }
                      onClick={() => handleToggleTabs(tabKey)}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: productDataWithTabs[tabKey].tabName,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="product-set-section">
              {displayAs === 'carousel' && (
                <div className="product-set-inner">
                  <div className="container">
                    <ExpProductListing
                      sliderKey={sliderKey}
                      dataSource={dataSource}
                      mappingObj={mappingObj}
                      productsData={productsData?.Data}
                      productsDataLoading={productsDataLoading}
                      showSliderView="on"
                      settingsForSlids={settingsForSlids}
                      SettingForAutoPlay={SettingForAutoPlay}
                      sliderArrowsVisibility={sliderArrowsVisibility}
                      isShowPagination={isShowPagination}
                      loadImagesLazily={
                        loadImagesLazily ===
                        expWidgetConstants.WIDGET_CHECK_TRUE
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ExpProductCardWIthTabs;
