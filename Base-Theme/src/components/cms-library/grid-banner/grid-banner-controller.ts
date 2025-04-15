import { CSSProperties, useEffect } from 'react';
import { ContentModelDataInterface } from '../../../interfaces/content-model-data.interface';
import { getContentLibraryData, expColorObjectParser } from '../../../utils';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils/component-data-dispatcher';
import { CommonUtilities } from 'experro-storefront';

export interface ExpGridBannerControllerProps {
  id: string | undefined;
  contentModel: string;
  modelInternalName: string;
  descriptionColor?: string;
  headingColor?: string;
}

/**
 * Controller function for all the ExpGridBanner components.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpGridBannerController = (props: ExpGridBannerControllerProps) => {
  const {
    id,
    contentModel,
    modelInternalName,
    descriptionColor,
    headingColor,
  } = CommonUtilities.propsParser(props);

  const modelKeyForSSR = 'grid-banner-ssr';

  const {
    componentDataDispatcher,
    setComponentDataDispatcher,
    isComponentLoaded,
  }: any = ExpComponentDataDispatcher({
    id,
    modelInternalName,
    modelKeyForSSR: modelKeyForSSR,
  });

  let parsedContentModel: ContentModelDataInterface | undefined;

  if (contentModel?.trim().length)
    parsedContentModel = JSON.parse(contentModel);

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentModel]);

  const descriptionStyle: CSSProperties = {
    color: expColorObjectParser({ value: descriptionColor }),
  };
  const headingStyle: CSSProperties = {
    color: expColorObjectParser({ value: headingColor }),
  };

  return {
    componentDataDispatcher,
    contentModel,
    descriptionStyle,
    headingStyle,
  };
};

export default ExpGridBannerController;
