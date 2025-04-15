import ExpLinkParser from '../../../utils/link-parser';
import ExpGridBannerController from './grid-banner-controller';
import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import { linkParserStyle } from '../../../utils/link-parser-style';
import { ExpImage } from '../../../components/common-components/exp-image';
import { expWidgetConstants } from '../../../utils';
import { CommonUtilities } from 'experro-storefront';

export interface ExpTwoColGridBannerProps {
  id: string;
  contentModel: string;
  modelInternalName: string;
  buttonColor: string;
  buttonHoverColor: string;
  buttonTextColor: string;
  buttonTextHoverColor: string;
  contentPosition: string;
  descriptionColor: string;
  headingColor: string;
  headingSize: string;
  showDescriptionText: string;
  showHeadingText: string;
}

/**
 * Renders a two column grid layout component.
 * @param props - The two column grid layout component props.
 * @returns The rendered two column grid layout component.
 */
const ExpTwoColGridBanner = (props: ExpTwoColGridBannerProps) => {
  const {
    id,
    buttonColor,
    buttonHoverColor,
    buttonTextColor,
    buttonTextHoverColor,
    contentPosition,
    headingSize,
    showDescriptionText,
    showHeadingText,
    loadImageLazy = expWidgetConstants.WIDGET_CHECK_TRUE,
  } = CommonUtilities.propsParser(props);

  const options: any = [
    {
      width: 724,
    },
    {
      width: 466,
    },
    {
      width: 708,
    },
    {
      width: 536,
    },
    {
      width: 450,
    },
  ];

  const {
    componentDataDispatcher,
    contentModel,
    descriptionStyle,
    headingStyle,
  } = ExpGridBannerController(props);

  return (
    <>
      <ExpLoadingPlaceholder
        loaderClassName="manufacturers-section column-5 section-gap"
        contentModel={contentModel}
        isLoading={componentDataDispatcher.isLoading}
        componentData={componentDataDispatcher.componentData}
      />

      {componentDataDispatcher.componentData?.id &&
        !componentDataDispatcher.isLoading && (
          <>
            <style>
              {`#${id} .button.button_fill_style:hover {
                background-color: var(--button-hover-bg-color) !important;

                color: var(--button-hover-color) !important;
              }
               #${id} .button.button_style {
                background-color: var(--button-bg-color) !important;

                color: var(--button-color) !important;
              }`}
            </style>

            <div className="two-col-image-section section-gap">
              <div className="container">
                <div className="row">
                  {componentDataDispatcher?.componentData?.promotional_banner_com?.map(
                    (item: any, index: number) => {
                      return (
                        <div
                          key={index?.toString()}
                          className="col col-6 col-tab-12">
                          <div
                            className={`two-col-image-content position-relative ${contentPosition}`}>
                            <div className="two-col-img">
                              <ExpImage
                                src={
                                  item?.banner_image_media_emd
                                    ? item?.banner_image_media_emd[0]
                                    : ''
                                }
                                height={468}
                                width={724}
                                options={options}
                                name={`Two_col_${id}_${index}`}
                                lazyLoad={
                                  loadImageLazy ===
                                  expWidgetConstants.WIDGET_CHECK_TRUE
                                }
                                alt={item?.heading_et}
                                title={item?.heading_et}
                              />
                            </div>
                            {!!(
                              showHeadingText ===
                                expWidgetConstants?.WIDGET_CHECK_TRUE ||
                              showDescriptionText ===
                                expWidgetConstants?.WIDGET_CHECK_TRUE
                            ) && (
                              <div className="image-caption">
                                {showHeadingText ===
                                  expWidgetConstants?.WIDGET_CHECK_TRUE &&
                                  item?.heading_et && (
                                    <h5
                                      style={headingStyle}
                                      className={`${headingSize}`}
                                      dangerouslySetInnerHTML={{
                                        __html: item?.heading_et,
                                      }}
                                    />
                                  )}
                                {showDescriptionText ===
                                  expWidgetConstants?.WIDGET_CHECK_TRUE &&
                                  item?.description_et && (
                                    <p
                                      style={descriptionStyle}
                                      dangerouslySetInnerHTML={{
                                        __html: item?.description_et,
                                      }}
                                    />
                                  )}
                                <ExpLinkParser
                                  ariaLabel={item?.button_text_et}
                                  className="button button_style button_fill_style"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.button_text_et
                                      ? item?.button_text_et
                                      : '',
                                  }}
                                  style={linkParserStyle({
                                    buttonHoverColor: {
                                      value: buttonHoverColor,
                                    },
                                    buttonTextHoverColor: {
                                      value: buttonTextHoverColor,
                                    },
                                    buttonColor: { value: buttonColor },
                                    buttonTextColor: { value: buttonTextColor },
                                  })}
                                  to={item?.button_link_et}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default ExpTwoColGridBanner;
