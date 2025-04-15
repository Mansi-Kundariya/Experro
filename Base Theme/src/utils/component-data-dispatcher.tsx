import { useReducer } from 'react';
import { CommonUtilities } from 'experro-storefront';

const expCommonDispatcherKeys: {
  initializingFreeForm: string;
  fetchingData: string;
  dataFetched: string;
} = {
  initializingFreeForm: 'initializingFreeForm',
  fetchingData: 'fetchingData',
  dataFetched: 'dataFetched',
};

/**
 * Component data dispatcher for managing component data and loading state.
 * @param id - The unique identifier of the component.
 * @param modelInternalName - The internal name of the model associated with the component.
 * @param modelKeyForSSR - The model key for server-side rendering.
 * @returns The component data dispatcher object.
 */
const ExpComponentDataDispatcher = ({
  id,
  modelInternalName,
  modelKeyForSSR,
}: any) => {
  const isRenderingOnServer =
    CommonUtilities.isRenderingOnServer() ||
    CommonUtilities.isRenderingInHeadlessBrowser();

  const apiDataResp = CommonUtilities.getLocalState(
    `${modelInternalName}_${id}-${modelKeyForSSR}`
  );
  let isComponentLoaded = true;

  let initialState: { componentData: any; isLoading: boolean } = {
    componentData: {},
    isLoading: true,
  };
  if (apiDataResp) {
    initialState = { componentData: apiDataResp.data.Data, isLoading: false };
    isComponentLoaded = false;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const dispatcher = (state: any, actions: { type: string; data?: any }) => {
    switch (actions.type) {
      case expCommonDispatcherKeys.initializingFreeForm:
        return (state = { componentData: {}, isLoading: false });

      case expCommonDispatcherKeys.fetchingData:
        return (state = { componentData: {}, isLoading: true });

      case expCommonDispatcherKeys.dataFetched:
        return (state = { componentData: actions.data, isLoading: false });

      default:
        // eslint-disable-next-line no-console
        console.error('Something went wrong in useReducer');
        return (state = initialState);
    }
  };

  const [componentDataDispatcher, setComponentDataDispatcher] = useReducer<
    (
      componentData: { componentData: any; isLoading: boolean },
      actions: { type: string; data?: any }
    ) => { componentData: any; isLoading: boolean }
  >(dispatcher, initialState);

  return {
    componentDataDispatcher,
    setComponentDataDispatcher,
    isRenderingOnServer,
    isComponentLoaded,
  };
};
export { ExpComponentDataDispatcher, expCommonDispatcherKeys };
