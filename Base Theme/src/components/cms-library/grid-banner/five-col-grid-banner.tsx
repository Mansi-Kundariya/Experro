import ExpLinkParser from '../../../utils/link-parser';
import ExpGridBannerController from './grid-banner-controller';
import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import { linkParserStyle } from '../../../utils/link-parser-style';
import { ExpImage } from '../../../components/common-components/exp-image';
import { expWidgetConstants } from '../../../utils';
import { CommonUtilities } from 'experro-storefront';

export interface ExpFiveColGridBannerProps {
  id: string;
  contentModel: string;
  modelInternalName: string;
  linkLinkColor: string;
  linkTextColor: string;
  linkTextHoverColor: string;
  contentPosition: string;
  descriptionColor: string;
  headingColor: string;
  headingSize: string;
  showDescriptionText: string;
  showHeadingText: string;
}

/**
 * Renders a five column Grid layout component.
 * @param props - The five column Grid layout component props.
 * @returns The rendered five column Grid layout component.
 */
const ExpFiveColGridBanner = (props: ExpFiveColGridBannerProps) => {
  const {
    id,
    linkLinkColor,
    linkTextColor,
    linkTextHoverColor,
    contentPosition,
    headingSize,
    showDescriptionText,
    showHeadingText,
  } = CommonUtilities.propsParser(props);

  const options: any = [
    {
      width: 472,
    },
    {
      width: 300,
    },
    {
      width: 300,
    },
    {
      width: 280,
    },
    {
      width: 280,
    },
  ];

  const {
    componentDataDispatcher,
    contentModel,
    descriptionStyle,
    headingStyle,
  } = ExpGridBannerController(props);

  const large_div_content = componentDataDispatcher?.componentData
    ?.collage_banner_com
    ? { ...componentDataDispatcher?.componentData?.collage_banner_com[0] }
    : {};

  const small_div_content = componentDataDispatcher?.componentData
    ?.collage_banner_com
    ? [...componentDataDispatcher?.componentData?.collage_banner_com].splice(1)
    : [];

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
              {`#${id} .show-link.button_fill_style:hover {
                color: var(--link-hover-color) !important;
              }
               #${id} .show-link.button_style {
                text-decoration-color: var(--link-decor-color) !important;

                color: var(--link-color) !important;
              }`}
            </style>

            <div className="five-grid-section section-gap">
              <div className="container">
                <div className="row">
                  <div className="five-grid-layout">
                    {!!componentDataDispatcher?.componentData
                      ?.collage_banner_com?.length && (
                      <div className="div-large position-relative">
                        <div className="col">
                          <div className="large-img has-image-fill">
                            {!!componentDataDispatcher?.componentData
                              ?.collage_banner_com[0]?.banner_image_media_emd && (
                              <ExpImage
                                src={
                                  large_div_content?.banner_image_media_emd
                                    ? large_div_content?.banner_image_media_emd[0]
                                    : ''
                                }
                                height={700}
                                width={472}
                                options={options}
                                name={`ExpFiveColGrid_${id}`}
                                alt={large_div_content?.heading_et}
                                title={large_div_content?.heading_et}
                              />
                            )}
                          </div>

                          <div className={`image-caption ${contentPosition}`}>
                            {!!(
                              showHeadingText ===
                                expWidgetConstants?.WIDGET_CHECK_TRUE &&
                              large_div_content?.heading_et
                            ) && (
                              <h5
                                style={headingStyle}
                                className={`${headingSize}`}
                                dangerouslySetInnerHTML={{
                                  __html: large_div_content?.heading_et,
                                }}
                              />
                            )}

                            {!!(
                              showDescriptionText ===
                                expWidgetConstants?.WIDGET_CHECK_TRUE &&
                              large_div_content?.description_et
                            ) && (
                              <p
                                style={descriptionStyle}
                                dangerouslySetInnerHTML={{
                                  __html: large_div_content?.description_et,
                                }}
                              />
                            )}

                            {!!large_div_content?.button_text_et && (
                              <ExpLinkParser
                                ariaLabel={large_div_content?.button_text_et}
                                className="show-link button_style button_fill_style"
                                dangerouslySetInnerHTML={{
                                  __html: large_div_content?.button_text_et
                                    ? large_div_content?.button_text_et
                                    : '',
                                }}
                                style={linkParserStyle({
                                  linkTextHoverColor: {
                                    value: linkTextHoverColor,
                                  },
                                  linkLinkColor: { value: linkLinkColor },
                                  linkTextColor: { value: linkTextColor },
                                })}
                                to={large_div_content?.button_link_et}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {small_div_content?.map((item: any, index: number) => {
                      return (
                        <div className="div-small position-relative">
                          <div key={index} className="col">
                            <div className="small-img has-image-fill">
                              {item?.banner_image_media_emd && (
                                <ExpImage
                                  src={
                                    item?.banner_image_media_emd
                                      ? item?.banner_image_media_emd[0]
                                      : ''
                                  }
                                  height={334}
                                  width={472}
                                  options={options}
                                  name={`FiveGrid_${id}_${index}`}
                                  alt={item?.heading_et}
                                  title={item?.heading_et}
                                />
                              )}
                            </div>

                            <div className={`image-caption ${contentPosition}`}>
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
                                className="show-link button_style button_fill_style"
                                dangerouslySetInnerHTML={{
                                  __html: item?.button_text_et
                                    ? item?.button_text_et
                                    : '',
                                }}
                                style={linkParserStyle({
                                  linkTextHoverColor: {
                                    value: linkTextHoverColor,
                                  },
                                  linkLinkColor: { value: linkLinkColor },
                                  linkTextColor: { value: linkTextColor },
                                })}
                                to={item?.button_link_et}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default ExpFiveColGridBanner;
