import { useEffect, useState } from 'react';
import { ContentService } from 'experro-storefront';

/**
 * A custom component that sets the screen view based on the window size and handles background image rendering.
 * @param imageData - The data object containing image URLs for different screen views.
 * @param mappingObj - The object used for mapping properties.
 * @param backgroundImage - The background image URL.
 * @returns Object containing the windowSizeChange function and the current view state.
 */
const ExpSetScreenView = ({
  imageData,
  mappingObj,
  backgroundImage,
}: {
  imageData: any;
  mappingObj: any;
  backgroundImage: any;
}) => {
  const [view, setView] = useState('desktop');

  const addBackgroundImage = () => {
    mappingObj['backgroundImage'] = ContentService.parseVariableSafeValue(
      typeof imageData === 'object'
        ? imageData[view].imageUrl.length
          ? imageData[view].imageUrl
          : imageData[view].mediaManagerUrl.length &&
            imageData[view].mediaManagerUrl
        : backgroundImage
    );
  };

  const windowSizeChange = () => {
    if (typeof imageData === 'object') {
      switch (true) {
        case window.innerWidth <= 767:
          setView('mobile');
          break;

        case window.innerWidth <= 1024:
          setView('tablet');
          break;

        default:
          setView('desktop');
          break;
      }
    }
  };

  useEffect(() => {
    addBackgroundImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return { windowSizeChange, view };
};

export { ExpSetScreenView };
