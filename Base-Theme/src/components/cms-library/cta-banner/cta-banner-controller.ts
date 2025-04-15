import { CSSProperties, useEffect } from 'react';
import { CommonUtilities, ContentService } from 'experro-storefront';
import { expDataSourceConstants } from '../../../utils/constants';
import { getContentLibraryData } from '../../../utils/get-content-library-data';
import { ContentModelDataInterface } from '../../../interfaces/content-model-data.interface';
import { expColorObjectParser } from '../../../utils';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils/component-data-dispatcher';

interface ExpCTABannerControllerProps {
  id: string;
  contentModel: string;
  dataSource: string;
  modelInternalName: string;
  headingText?: string;
  descriptionText?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
  tagLine?: string;
  headingColor?: string;
  subTitleTextColor?: string;
  descriptionColor?: string;
}

/**
 * Controller function for all the ExpCTABanner components.
 * @param props - The controller props.
 * @returns The controller result.
 */

const ExpCTABannerController = (props: ExpCTABannerControllerProps) => {
  const {
    id,
    contentModel,
    dataSource,
    headingText,
    descriptionText,
    backgroundImage,
    buttonText,
    buttonLink,
    modelInternalName,
    tagLine,
    headingColor,
    subTitleTextColor,
    descriptionColor,
  } = CommonUtilities.propsParser(props);

  const modelKeyForSSR = 'cta-ssr';

  const {
    setComponentDataDispatcher,
    componentDataDispatcher,
    isComponentLoaded,
  } = ExpComponentDataDispatcher({
    id,
    modelInternalName,
    modelKeyForSSR,
  });

  let mappingObj: any = {};

  mappingObj = {
    headingText: ContentService.parseVariableSafeValue(headingText),
    descriptionText: ContentService.parseVariableSafeValue(descriptionText),
    backgroundImage: backgroundImage,
    tagLine: ContentService.parseVariableSafeValue(tagLine),
    buttonText: ContentService.parseVariableSafeValue(buttonText),
    buttonLink: ContentService.parseVariableSafeValue(buttonLink),
  };

  let contentLibraryMappingObj: any;
  if (
    dataSource === expDataSourceConstants.CONTENT_LIBRARY &&
    componentDataDispatcher.componentData
  ) {
    contentLibraryMappingObj = {
      headingText: ContentService.parseVariableSafeValue(
        componentDataDispatcher.componentData?.heading_et
      ),
      descriptionText:
        componentDataDispatcher?.componentData?.description_et?.length &&
        componentDataDispatcher?.componentData?.description_et,
      buttonText: ContentService.parseVariableSafeValue(
        componentDataDispatcher.componentData?.button_com
          ? componentDataDispatcher.componentData?.button_com[0]?.button_text_et
          : ''
      ),
      buttonLink: ContentService.parseVariableSafeValue(
        componentDataDispatcher.componentData?.button_com
          ? componentDataDispatcher.componentData?.button_com[0]?.button_link_et
          : ''
      ),
      backgroundImage: componentDataDispatcher.componentData?.cta_image_media_emd
        ? componentDataDispatcher.componentData?.cta_image_media_emd[0]
        : '',
    };
  }
  if (dataSource === expDataSourceConstants?.CONTENT_LIBRARY) {
    mappingObj = Object.assign(mappingObj, contentLibraryMappingObj);
  }

  let parsedContentModel: ContentModelDataInterface | undefined;

  if (contentModel?.trim().length)
    parsedContentModel = JSON.parse(contentModel);

  useEffect(() => {
    if (dataSource === expDataSourceConstants.FREE_FORM) {
      setComponentDataDispatcher({
        type: expCommonDispatcherKeys.initializingFreeForm,
      });
    } else if (dataSource === expDataSourceConstants.CONTENT_LIBRARY) {
      if (isComponentLoaded) {
        setComponentDataDispatcher({
          type: expCommonDispatcherKeys.fetchingData,
        });
        if (contentModel?.trim()?.length) {
          (async () => {
            setComponentDataDispatcher({
              type: expCommonDispatcherKeys.dataFetched,
              data: await getContentLibraryData(
                parsedContentModel,
                modelInternalName,
                modelKeyForSSR,
                id
              ),
            });
          })();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentModel, dataSource]);

  const headingTextStyle: CSSProperties = {
    color: expColorObjectParser({ value: headingColor }),
  };

  const descriptionTextColor: CSSProperties = {
    color: expColorObjectParser({ value: subTitleTextColor }),
  };

  const descriptionStyle: CSSProperties = {
    color: expColorObjectParser({ value: descriptionColor }),
  };

  return {
    mappingObj,
    backgroundImage,
    dataSource,
    contentModel,
    componentDataDispatcher,
    headingTextStyle,
    descriptionTextColor,
    descriptionStyle,
  };
};

export default ExpCTABannerController;
