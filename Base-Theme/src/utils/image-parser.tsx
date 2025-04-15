import { ContentService } from 'experro-storefront';

/**
 * Retrives parsed object of image that contain URL, alternative text, caption.
 * @param imageData - The id or strigify JSON object.
 * @returns Object containing Image based data.
 */
const ExpImageParser = (imageData: any) => {
  const imgObj = ContentService.parseImageURL(imageData);

  return imgObj;
};

export { ExpImageParser };
