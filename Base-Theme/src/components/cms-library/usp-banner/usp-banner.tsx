import ExpUSPController from './usp-controller';
import ExpLinkParser from '../../../utils/link-parser';
import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import { ExpImage } from '../../common-components/exp-image';
import { expWidgetConstants } from '../../../utils';
import { CommonUtilities } from 'experro-storefront';

export interface ExpUSPBannerProps {
  id: string;
  showHeadingText: string;
  headingSize: string;
  headingPosition: string;
  headingColor: string;
  contentModel: string;
  modelInternalName: string;
}

/**
 * Renders an USP Banner component.
 * @param props - The USP Banner component props.
 * @returns Rendered USP Banner component.
 */
const ExpUSPBanner = (props: ExpUSPBannerProps) => {
  const { showHeadingText, headingSize, headingPosition } =
    CommonUtilities.propsParser(props);

  const { componentDataDispatcher, contentModel, headingTextStyle } =
    ExpUSPController(props);

  return (
    <>
      <ExpLoadingPlaceholder
        loaderClassName="usp-banner section-gap"
        contentModel={contentModel}
        isLoading={componentDataDispatcher.isLoading}
        componentData={componentDataDispatcher.componentData}
      />

      {componentDataDispatcher?.componentData?.id &&
        !componentDataDispatcher?.isLoading && (
          <div className="usp-banner mb-[7.5rem]">
            {componentDataDispatcher?.componentData?.heading_et &&
              showHeadingText === expWidgetConstants?.WIDGET_CHECK_TRUE && (
                <h4
                  className={`${headingSize} ${headingPosition} mb-[3.5rem] font-secondary`}
                  style={headingTextStyle}
                  dangerouslySetInnerHTML={{
                    __html: componentDataDispatcher?.componentData?.heading_et,
                  }}
                />
              )}
            <div className="container">
              <div className="usp-banner-inner usp-banner-bg">
                <div className="flex flex-wrap justify-center lg:justify-between">
                  {componentDataDispatcher.componentData?.usp_banner_com?.map(
                    (item: any, index: number) => (
                      <div
                        key={index.toString()}
                        className="w-6/12 sm:w-2/6 m-0 lg:p-0 px-2.5 py-6	lg:w-1/5 flex usp-item justify-center">
                        <ExpLinkParser
                          to={`${item?.usp_link_et ? item?.usp_link_et : ''}`}
                          className="flex flex-wrap flex-col items-center">
                          <div className="usp-icon w-10	h-10 mb-4">
                            <ExpImage
                              src={
                                item?.usp_icon_media_emd ? item?.usp_icon_media_emd[0] : ''
                              }
                              height={80}
                              width={80}
                              name={`ExpUSPBanner_${index}`}
                              alt={item?.usp_title_et}
                              title={item?.usp_title_et}
                            />
                          </div>
                          <div className="usp-name w-full">
                            <p
                              className="mb-0"
                              dangerouslySetInnerHTML={{
                                __html:
                                  item?.usp_title_et && item?.usp_title_et,
                              }}
                            />
                          </div>
                        </ExpLinkParser>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default ExpUSPBanner;
