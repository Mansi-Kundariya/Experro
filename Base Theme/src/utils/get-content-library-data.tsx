import { ContentService } from 'experro-storefront';

/**
 * Retrieves content library data based on the provided parameters.
 * @param parsedContentModel - The parsed content model object containing the ID and current version ID.
 * @param modelInternalName - The internal name of the model.
 * @param modelKeyForSSR - The key for server-side rendering.
 * @param id - The ID of the component.
 * @returns Promise that resolves to the retrieved content library data.
 */
const getContentLibraryData = async (
  parsedContentModel: any,
  modelInternalName: any,
  modelKeyForSSR: any,
  id: any
) => {
  try {
    return await ContentService.getCollectionTypeContentById({
      id: parsedContentModel?.id,
      versionId: parsedContentModel?.current_version_id,
      modelName: modelInternalName,
      componentId: modelInternalName,
      ssrKey: `${id}-${modelKeyForSSR}`,
      enableSSR: true,
    });
  } catch (error: any) {
    //TODO: add proper error message
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};

export { getContentLibraryData };
