import { CommonUtilities, IsCMSApp } from 'experro-storefront';
import ExpLinkParser from '../../../utils/link-parser';
import ExpCTABannerController from './cta-banner-controller';
import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import { expDataSourceConstants, expWidgetConstants } from '../../../utils';
import { ExpImage } from '../../common-components/exp-image';
import { expImageOption } from '../../../interfaces/exp-image.interface';

export interface ExpCTABannerProps {
  id: string;
  contentModel: string;
  dataSource: string;
  modelInternalName: string;
  titleColor: string;
  tagLineTextColor: string;
  buttonTarget: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonHoverColor: string;
  buttonTextHoverColor: string;
  showHeadingText: string;
  showDescription: string;
  contentPosition: string;
  contentAlignment: string;
  bannerType: string;
  preLoadImage?: string;
  showButton?: string;
  headingText?: string;
  subHeadingText?: string;
  buttonText?: string;
  buttonLink?: string;
}

/**
 * Renders a CTA Banner component.
 * @param props - The CTA banner component props.
 * @returns The rendered CTA banner component.
 */

const ExpCTABannerV2 = (props: ExpCTABannerProps) => {
  const {
    id,
    buttonTarget,
    buttonColor,
    buttonTextColor,
    buttonHoverColor,
    buttonTextHoverColor,
    showHeadingText,
    showDescription,
    contentPosition,
    contentAlignment,
    preLoadImage,
    showButton,
    loadImageLazy = expWidgetConstants.WIDGET_CHECK_TRUE,
  } = CommonUtilities.propsParser(props);

  const { CONTENT_LIBRARY, FREE_FORM } = expDataSourceConstants;

  const {
    mappingObj,
    componentDataDispatcher,
    dataSource,
    contentModel,
    headingTextStyle,
    descriptionStyle,
  } = ExpCTABannerController(props);

  const options: expImageOption[] = [
    {
      width: 1903,
      aspect_ratio: '16:5',
    },
    {
      width: 1280,
      aspect_ratio: '16:10',
    },
    {
      width: 768,
      aspect_ratio: '16:10',
      crop_gravity: 'center',
    },
    {
      width: 568,
      aspect_ratio: '16:9',
      crop_gravity: 'center',
    },
    {
      width: 450,
      aspect_ratio: '16:11',
      crop_gravity: 'center',
    },
  ];

  return (
    <>
      {!!(dataSource === CONTENT_LIBRARY) && (
        <ExpLoadingPlaceholder
          loaderClassName="cta-banner position-relative flex align-center justify-center section-gap"
          contentModel={contentModel}
          isLoading={componentDataDispatcher.isLoading}
          componentData={componentDataDispatcher.componentData}
        />
      )}

      {(dataSource === FREE_FORM ||
        (componentDataDispatcher.componentData &&
          !componentDataDispatcher.isLoading)) && (
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
          {!!(
            mappingObj.headingText?.length ||
            mappingObj.subHeadingText?.length ||
            mappingObj.buttonText?.length ||
            mappingObj?.backgroundImage ||
            (dataSource === FREE_FORM && !IsCMSApp)
          ) && (
            <section
              className="mb-12 md:mb-16 lg:mb-28 cta-section-main"
              suppressHydrationWarning>
              <div className="cta-section-wrap relative basis-full shrink-0 overflow-hidden">
                <div className="min-h-[25rem] max-h-[25rem] [&>picture]:flex [&>picture]:h-full [&>picture]:min-h-[inherit] [&>picture]:max-h-[inherit] image-block">
                  <ExpImage
                    src={mappingObj?.backgroundImage}
                    height={mappingObj?.backgroundImage?.image_height || 600}
                    width={mappingObj?.backgroundImage?.image_width || 1920}
                    options={options}
                    name={`CTA_${id}_v2`}
                    className="w-full object-cover"
                    preLoad={
                      preLoadImage === expWidgetConstants.WIDGET_CHECK_TRUE
                    }
                    lazyLoad={
                      loadImageLazy === expWidgetConstants.WIDGET_CHECK_TRUE
                    }
                    alt={mappingObj.headingText}
                    title={mappingObj.headingText}
                  />
                </div>
                <div
                  className={`container absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] z-10 text-center flex ${contentPosition} content-block`}>
                  <div
                    className={`lg:w-6/12 py-10 content-block-wrap text-left ${contentAlignment}`}>
                    {showHeadingText ===
                      expWidgetConstants.WIDGET_CHECK_TRUE && (
                      <h3
                        style={headingTextStyle}
                        suppressHydrationWarning
                        className="text-2xl lg:text-5xl font-secondary mb-6 heading"
                        dangerouslySetInnerHTML={{
                          __html:
                            mappingObj.headingText?.length ||
                            dataSource === CONTENT_LIBRARY
                              ? mappingObj.headingText
                              : IsCMSApp
                                ? ''
                                : 'Please Enter Title',
                        }}
                      />
                    )}
                    {showDescription ===
                      expWidgetConstants.WIDGET_CHECK_TRUE && (
                      <p
                        style={descriptionStyle}
                        suppressHydrationWarning
                        className="text-sm lg:text-base mb-6 description last:mb-0"
                        dangerouslySetInnerHTML={{
                          __html:
                            mappingObj.descriptionText?.length ||
                            dataSource === CONTENT_LIBRARY
                              ? mappingObj.descriptionText
                              : IsCMSApp
                                ? ''
                                : 'Please Enter Tag Line',
                        }}
                      />
                    )}

                    {showButton === expWidgetConstants.WIDGET_CHECK_TRUE && (
                      <>
                        {!!mappingObj.buttonText?.length && (
                          <ExpLinkParser
                            target={buttonTarget}
                            dangerouslySetInnerHTML={{
                              __html: mappingObj.buttonText,
                            }}
                            to={mappingObj.buttonLink}
                            className="button-primary button-large button-style"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ExpCTABannerV2;
