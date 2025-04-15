import { useState } from 'react';

/**
 * Custom hook for handling data related to a React modal component.
 * @param componentDataDispatcher - The data of the component dispatcher object containing component data and loading status.
 * @returns - An object containing the modal state and functions.
 */
const ExpHandleReactModalData = ({
  componentDataDispatcher,
}: {
  componentDataDispatcher: { componentData: any; isLoading: boolean };
}) => {
  const [modalIsOpen, setIsOpen] = useState<any>(false);
  const [modalData, setModalData] = useState<any>({});

  const modalToShow = (modalId: any) => {
    if (
      componentDataDispatcher?.componentData?.popup_com &&
      componentDataDispatcher?.componentData?.popup_com?.length
    ) {
      setModalData({
        heading: componentDataDispatcher?.componentData?.popup_com[
          parseInt(modalId.split('-')[1]) - 1
        ]?.heading_et
          ? componentDataDispatcher?.componentData?.popup_com[
              parseInt(modalId.split('-')[1]) - 1
            ]?.heading_et
          : '',
        description: componentDataDispatcher?.componentData?.popup_com[
          parseInt(modalId.split('-')[1]) - 1
        ]?.description_et
          ? componentDataDispatcher?.componentData?.popup_com[
              parseInt(modalId.split('-')[1]) - 1
            ]?.description_et
          : '',
      });
    } else setModalData({});
    setIsOpen(true);
  };

  return { modalIsOpen, modalData, modalToShow, setIsOpen };
};

export { ExpHandleReactModalData };
