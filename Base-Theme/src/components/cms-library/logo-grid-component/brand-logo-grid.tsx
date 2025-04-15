import ExpBrandLogoGridController from './brand-logo-grid-controller';
import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
import ExpLinkParser from '../../../utils/link-parser';
import { ExpImage } from '../../common-components/exp-image';

export interface ExpBrandLogoGridProps {
  id: string;
  contentModel: string;
  modelInternalName: string;
}

/**
 * Renders a Brand Logo component.
 * @param props - The Brand Logo component props.
 * @returns The rendered Brand Logo component.
 */
const ExpBrandLogoGrid = (props: ExpBrandLogoGridProps) => {
  const { componentDataDispatcher, contentModel } =
    ExpBrandLogoGridController(props);

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
          <div className="manufacturers-section mb-[7.5rem]">
            <div className="container">
              <div className="flex justify-center">
                <div className="">
                  <div className="flex flex-wrap manufacturers-listing -mx-4">
                    {componentDataDispatcher?.componentData?.logo_list_com
                      ?.length &&
                      componentDataDispatcher?.componentData?.logo_list_com?.map(
                        (item: any, index: number) => {
                          return (
                            <div
                              key={index.toString()}
                              className=" flex align-center justify-center py-5 px-4 lg:w-1/4	md:w-1/3	w-2/4	">
                              {item?.slider_link_et ? (
                                <ExpLinkParser
                                  to={item?.slider_link_et}
                                  ariaLabel="brand image">
                                  <div className="has-img">
                                    {item?.slider_image_media_emd && (
                                      <ExpImage
                                        src={
                                          item?.slider_image_media_emd
                                            ? item?.slider_image_media_emd[0]
                                            : ''
                                        }
                                        height={88}
                                        width={315}
                                        name={`ExpImageComponent_${index}`}
                                      />
                                    )}
                                  </div>
                                </ExpLinkParser>
                              ) : (
                                <ExpLinkParser
                                  to={item?.slider_link_et}
                                  ariaLabel="brand image"
                                  rel="nofollow">
                                  <div className="has-img">
                                    {item?.slider_image_media_emd && (
                                      <ExpImage
                                        src={
                                          item?.slider_image_media_emd
                                            ? item?.slider_image_media_emd[0]
                                            : ''
                                        }
                                        height={88}
                                        width={315}
                                        name={`ExpImageComponent_${index}`}
                                      />
                                    )}
                                  </div>
                                </ExpLinkParser>
                              )}
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default ExpBrandLogoGrid;
