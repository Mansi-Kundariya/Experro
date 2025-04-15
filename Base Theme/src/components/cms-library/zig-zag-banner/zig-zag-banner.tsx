import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import { ExpImage } from '../../common-components/exp-image';
import ExpLinkParser from '../../../utils/link-parser';
import ExpZigZagBannerController from './zig-zag-banner-controller';
import { expDataSourceConstants, expWidgetConstants } from '../../../utils';
import { CommonUtilities } from 'experro-storefront';

export interface ExpZigZagBannerProps {
  id: string;
  buttonTextColor?: string;
  buttonTextHoverColor?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  bannerReverse?: string;
  preLoadImage?: string;
  showBackground?: string;
  headingSize?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  headingText?: string;
  subHeadingText?: string;
  descriptionText?: string;
  dataSource: string;
  contentModel: string;
  modelInternalName: string;
  imageData?: string;
  headingColor?: string;
  description?: string;
  backgroundColor?: string;
  headingTag?: string;
}

/**
 * Renders a Zig-zag Banner component.
 * @param props - The Zig-zag Banner component props.
 * @returns The rendered Zig-zag Banner component.
 */

const ExpZigZagBanner = (props: ExpZigZagBannerProps) => {
  const {
    id,
    buttonColor,
    buttonHoverColor,
    buttonTextHoverColor,
    buttonTextColor,
    bannerReverse,
    showBackground,
    headingSize,
    preLoadImage,
    headingTag,
    loadImageLazy = expWidgetConstants.WIDGET_CHECK_TRUE,
  } = CommonUtilities.propsParser(props);

  const {
    componentDataDispatcher,
    contentModel,
    titleStyle,
    descriptionStyle,
    mappingObj,
    dataSource,
    backgroundStyle,
  } = ExpZigZagBannerController(props);

  const options: any = [
    {
      width: 740,
    },
    {
      width: 482,
    },
    {
      width: 768,
      aspect_ratio: '16:10',
      crop_gravity: 'center',
    },
    {
      width: 536,
      aspect_ratio: '16:9',
      crop_gravity: 'center',
    },
    {
      width: 450,
      aspect_ratio: '16:11',
      crop_gravity: 'center',
    },
  ];

  const HeadingTag: any = `${headingTag}`;

  return (
    <>
      <style>
        {`#${id} .button-style:hover {
          background-color: ${buttonHoverColor} !important;
          color: ${buttonTextHoverColor} !important;
        }
          #${id} .button-style{
          background-color: ${buttonColor} !important;
          color: ${buttonTextColor} !important;
        }`}
      </style>

      {dataSource === expDataSourceConstants.CONTENT_LIBRARY && (
        <ExpLoadingPlaceholder
          loaderClassName="section-gap two-column-banner-section"
          contentModel={contentModel}
          isLoading={componentDataDispatcher?.isLoading}
          componentData={componentDataDispatcher?.componentData?.id}
        />
      )}

      {(dataSource === expDataSourceConstants.FREE_FORM ||
        (componentDataDispatcher?.componentData?.id &&
          !componentDataDispatcher?.isLoading)) && (
        <section className="mb-12 md:mb-16 lg:mb-28 zig-zag-section-main">
          <div className="container">
            <div
              className="zigzag-wrapper"
              style={
                showBackground === expWidgetConstants?.WIDGET_CHECK_TRUE
                  ? backgroundStyle
                  : {}
              }>
              <div className="-mx-4 flex flex-wrap items-center">
                <div
                  className={`content-block order-2 px-4 ${
                    bannerReverse === expWidgetConstants.WIDGET_CHECK_TRUE
                      ? 'lg:order-2'
                      : 'lg:order-1'
                  } lg:w-6/12`}>
                  <div
                    className={`content-block-wrap ${
                      showBackground === expWidgetConstants?.WIDGET_CHECK_TRUE
                        ? 'p-4 pt-0 xl:px-20 xl:pb-0'
                        : ''
                    }
                    ${
                      showBackground ===
                        expWidgetConstants?.WIDGET_CHECK_TRUE &&
                      bannerReverse === expWidgetConstants?.WIDGET_CHECK_TRUE
                        ? 'xl:pl-0'
                        : ''
                    }
                    `}>
                    <HeadingTag
                      className={`heading mb-4 font-serif text-2xl lg:mb-6 lg:${headingSize}`}
                      style={titleStyle}
                      dangerouslySetInnerHTML={{
                        __html: mappingObj?.headingText
                          ? mappingObj?.headingText
                          : 'Add Title',
                      }}
                    />
                    <p
                      className="description mb-6 text-sm text-gray-900 lg:text-lg"
                      style={descriptionStyle}
                      dangerouslySetInnerHTML={{
                        __html: mappingObj?.description
                          ? mappingObj?.description
                          : 'Add Description',
                      }}
                    />
                    {mappingObj?.primaryButtonText && (
                      <ExpLinkParser
                        className="button-primary button-large button-style"
                        dangerouslySetInnerHTML={{
                          __html: mappingObj?.primaryButtonText
                            ? mappingObj?.primaryButtonText
                            : 'Add Button Text',
                        }}
                        to={mappingObj?.primaryButtonLink}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`image-block order-1 mb-4 lg:mb-0 px-4 ${
                    bannerReverse === expWidgetConstants.WIDGET_CHECK_TRUE
                      ? 'lg:order-1'
                      : 'lg:order-2'
                  } lg:w-6/12`}>
                  <ExpImage
                    options={options}
                    src={mappingObj?.bannerImageLink}
                    height={mappingObj?.bannerImageLink?.image_height || 490}
                    width={mappingObj?.bannerImageLink?.image_width || 740}
                    name={`ExpZigZagBanner${id}`}
                    lazyLoad={
                      loadImageLazy === expWidgetConstants.WIDGET_CHECK_TRUE
                    }
                    preLoad={
                      preLoadImage === expWidgetConstants?.WIDGET_CHECK_TRUE
                    }
                    alt={mappingObj?.headingText}
                    title={mappingObj?.headingText}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ExpZigZagBanner;
