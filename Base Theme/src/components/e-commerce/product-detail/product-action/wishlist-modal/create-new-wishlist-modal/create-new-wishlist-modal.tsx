import React, { memo } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { IconCross } from '@icons/cross';

interface ExpCreateNewWishlistModalProps {
  handleCloseModal: () => void;
  handleCreateWishList: any;
  setwishlistName: any;
  wishlistName: string | undefined;
  wishlistModalOpen: any;
}

const ExpCreateNewWishlistModal = (props: ExpCreateNewWishlistModalProps) => {
  const {
    handleCloseModal,
    handleCreateWishList,
    setwishlistName,
    wishlistName,
    wishlistModalOpen,
  } = props;

  const { t } = useTranslation();
  const rootElementRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    Modal.setAppElement(rootElementRef.current as HTMLElement);
  }, []);

  return (
    <>
      <div className="modal" ref={rootElementRef}>
        <Modal
          onRequestClose={() => handleCloseModal()}
          isOpen={wishlistModalOpen}
          className="modal-quickview relative w-full max-w-[90%] sm:max-w-[37.5rem] h-auto max-h-[90%] overflow-hidden bg-white shadow-md focus-visible:outline-none"
          ariaHideApp={false}
          overlayClassName="flex items-center justify-center fixed w-full h-screen top-0 left-0 bg-black bg-opacity-20 z-[99]">

          <div className="model-body p-4 sm:p-8 h-full overflow-auto custom-scrollbar">
            <div className="modal-content relative z-20  w-full">
              <>
                <div className='mb-8 pb-4 border-b border-b-neutral-200'>
                  <div className='relative'>
                    <h6 className="text-2xl lg:text-3xl font-secondary">
                      {t('components.e_commerce.product_cell.create_wishlist')}
                    </h6>
                    <div
                      onClick={handleCloseModal}
                      className="popup-close-link absolute top-2/4 -translate-y-2/4 right-0 cursor-pointer z-30">
                      <i className="icon w-8 h-8 flex items-center justify-center">
                        <IconCross className="stroke-neutral-900 w-full h-full hover:stroke-primary-default" />
                      </i>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-700 mb-8 text-sm">
                  {t('components.e_commerce.product_cell.click_save_when_done')}
                </p>

                <label htmlFor="wishlistName" className="form-label">
                  {t('components.e_commerce.product_cell.txt_wishlist_name')}
                  <span className="required"> *</span>
                </label>
                <div className="flex flex-wrap flex-row justify-center">
                  <input
                    type="text"
                    id="wishlistName"
                    name="wishlistName"
                    value={wishlistName}
                    onChange={(e) => setwishlistName(e.target.value)}
                    className="form-input w-full text-neutral-900"
                  />

                  <button
                    onClick={() => handleCreateWishList(wishlistName)}
                    className="button-primary w-full sm:w-auto mt-8">
                    {t('components.e_commerce.product_cell.save')}
                  </button>
                </div>
              </>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default memo(ExpCreateNewWishlistModal);
