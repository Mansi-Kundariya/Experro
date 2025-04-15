import { useEffect } from 'react';
import { ContentModelDataInterface } from '../../../interfaces/content-model-data.interface';
import { getContentLibraryData } from '../../../utils/get-content-library-data';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils/component-data-dispatcher';
import { CommonUtilities } from 'experro-storefront';

export interface ExpBrandLogoGridControllerProps {
  id: string;
  contentModel: string;
  modelInternalName: string;
}

/**
 * Controller function for the BrandLogoGrid component.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpBrandLogoGridController = (props: ExpBrandLogoGridControllerProps) => {
  const { id, contentModel, modelInternalName } =
    CommonUtilities.propsParser(props);

  const modelKeyForSSR = 'grid-ssr';

  const {
    componentDataDispatcher,
    setComponentDataDispatcher,
    isComponentLoaded,
  } = ExpComponentDataDispatcher({
    id,
    modelInternalName: modelInternalName,
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

  return { componentDataDispatcher, contentModel };
};

export default ExpBrandLogoGridController;
