import { CSSProperties, useEffect } from 'react';
import { CommonUtilities, ContentService } from 'experro-storefront';
import { ContentModelDataInterface } from '../../../interfaces/content-model-data.interface';
import { getContentLibraryData } from '../../../utils/get-content-library-data';
import { ExpHandleReactModalData } from '../../../utils/handle-react-model-data';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils/component-data-dispatcher';
import { expColorObjectParser, expDataSourceConstants } from '../../../utils';

interface ExpZigZagControllerProps {
  id: string;
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
}

/**
 * Controller function for all the ZigZag components.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpZigZagController = (props: ExpZigZagControllerProps) => {
  const {
    primaryButtonText,
    primaryButtonLink,
    headingText,
    subHeadingText,
    descriptionText,
    dataSource,
    contentModel,
    modelInternalName,
    imageData,
    headingColor,
    description,
    backgroundColor,
    id,
  } = CommonUtilities.propsParser(props);

  const modelKeyForSSR = 'zig-zag-ssr';

  const {
    setComponentDataDispatcher,
    componentDataDispatcher,
    isComponentLoaded,
  }: any = ExpComponentDataDispatcher({
    id,
    modelInternalName: modelInternalName,
    modelKeyForSSR: modelKeyForSSR,
  });

  let mappingObj = {
    headingText: ContentService.parseVariableValue(headingText),
    subHeadingText: ContentService.parseVariableValue(subHeadingText),
    description: ContentService.parseVariableValue(descriptionText),
    primaryButtonText: ContentService.parseVariableValue(primaryButtonText),
    bannerImageLink: imageData,
    primaryButtonLink: primaryButtonLink,
  };

  let contentLibraryMappingObj: any;
  if (
    dataSource === expDataSourceConstants?.CONTENT_LIBRARY &&
    componentDataDispatcher
  ) {
    contentLibraryMappingObj = {
      headingText: ContentService.parseVariableValue(
        componentDataDispatcher?.componentData?.heading_et
      ),
      subHeadingText: ContentService.parseVariableValue(
        componentDataDispatcher?.componentData?.sub_heading_et
      ),
      description: ContentService.parseVariableValue(
        componentDataDispatcher?.componentData?.description_et
      ),
      primaryButtonText: ContentService.parseVariableValue(
        componentDataDispatcher?.componentData?.primary_button_text_et
          ? componentDataDispatcher?.componentData?.primary_button_text_et
          : componentDataDispatcher?.componentData?.layout_button_com?.length &&
              componentDataDispatcher?.componentData?.layout_button_com[0]
                .button_text_et
      ),
      primaryButtonLink: componentDataDispatcher?.componentData
        ?.primary_button_link_et
        ? componentDataDispatcher?.componentData?.primary_button_link_et
        : componentDataDispatcher?.componentData?.layout_button_com?.length &&
          componentDataDispatcher?.componentData?.layout_button_com[0]
            .button_link_et,
      bannerImageLink: componentDataDispatcher?.componentData?.layout_image_media_emd
        ?.length
        ? componentDataDispatcher?.componentData?.layout_image_media_emd[0]
        : '',
    };
  }

  if (dataSource === expDataSourceConstants.CONTENT_LIBRARY) {
    mappingObj = Object.assign(mappingObj, contentLibraryMappingObj);
  }

  let parsedContentModel: ContentModelDataInterface | undefined;

  if (contentModel?.trim().length)
    parsedContentModel = JSON.parse(contentModel);

  useEffect(() => {
    if (isComponentLoaded) {
      if (dataSource === expDataSourceConstants?.FREE_FORM) {
        setComponentDataDispatcher({
          type: expCommonDispatcherKeys?.initializingFreeForm,
        });
      } else {
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

  const titleStyle: CSSProperties = {
    color: expColorObjectParser({ value: headingColor }),
  };
  const descriptionStyle: CSSProperties = {
    color: expColorObjectParser({ value: description }),
  };
  const backgroundStyle: CSSProperties = {
    backgroundColor: expColorObjectParser({ value: backgroundColor }),
  };

  /** MODAL */
  const { modalData, modalIsOpen, modalToShow, setIsOpen } =
    ExpHandleReactModalData({ componentDataDispatcher });

  return {
    descriptionStyle,
    mappingObj,
    dataSource,
    imageData,
    contentModel,
    titleStyle,
    componentDataDispatcher,
    modalToShow,
    modalIsOpen,
    modalData,
    setIsOpen,
    backgroundStyle,
  };
};

export default ExpZigZagController;
