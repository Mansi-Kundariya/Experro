import { CSSProperties, useEffect } from 'react';
import { ContentModelDataInterface } from '../../../interfaces/content-model-data.interface';
import { getContentLibraryData } from '../../../utils/get-content-library-data';
import { expColorObjectParser } from '../../../utils';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils/component-data-dispatcher';
import { CommonUtilities } from 'experro-storefront';

export interface ExpUSPControllerProps {
  id: string;
  headingColor?: string;
  contentModel: string;
  modelInternalName: string;
}

/**
 * Controller function for the USP component.
 * @param props - The controller props.
 * @returns  The controller result.
 */

const ExpUSPController = (props: ExpUSPControllerProps) => {
  const { id, headingColor, contentModel, modelInternalName } =
    CommonUtilities.propsParser(props);

  const modelKeyForSSR = 'usp-ssr';

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

  const headingTextStyle: CSSProperties = {
    color: expColorObjectParser({ value: headingColor }),
  };

  return { componentDataDispatcher, contentModel, headingTextStyle };
};

export default ExpUSPController;
