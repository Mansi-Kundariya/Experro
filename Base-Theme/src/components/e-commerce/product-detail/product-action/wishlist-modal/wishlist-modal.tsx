import React, { memo } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { IconCross } from '@icons/cross';
import { ExpCreateNewWishlistModal } from './create-new-wishlist-modal';
import ExpLoginModel from '../../../../../utils/login-pop-up-modal';
import ExpWishlistModalController from './wishlist-modal-controller';

interface ExpWishlistModalProps {
  product: any;
  wishlistClicked: any;
  setWishlistClicked: any;
}

const ExpWishlistModal = (props: ExpWishlistModalProps) => {
  const { product, wishlistClicked, setWishlistClicked } = props;

  const {
    addToWishlist,
    isAddtoWishlistModalOpen,
    handleCreateWishList,
    setwishlistName,
    wishlistName,
    setIsLoginModalOpen,
    isLoginModalOpen,
    setIsModalOpen,
    isModalOpen,
    isCreateWishlistModalOpen,
    setIsCreateWishlistModalOpen,
    wishlists,
  } = ExpWishlistModalController({
    wishlistClicked: wishlistClicked,
    setWishlistClicked: setWishlistClicked,
  });

  const { t } = useTranslation();
  const rootElementRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    Modal.setAppElement(rootElementRef.current as HTMLElement);
  }, []);

  return (
    <>
      {isModalOpen && (
        <div className="modal" ref={rootElementRef}>
          <Modal
            onRequestClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            className="modal-quickview relative w-full max-w-[90%] sm:max-w-[37.5rem] h-auto max-h-[90%] overflow-hidden bg-white shadow-md focus-visible:outline-none"
            ariaHideApp={false}
            overlayClassName="flex items-center justify-center fixed w-full h-screen top-0 left-0 bg-black bg-opacity-20 z-[99]">
            <div className="model-body p-4 sm:p-8 h-full overflow-auto custom-scrollbar">
              <div className="modal-content relative z-20 w-full">
                <>
                  <div className="mb-8 pb-4 border-b border-b-neutral-200">
                    <div className="relative">
                      <h6 className="text-2xl lg:text-3xl font-secondary">
                        {t(
                          'components.e_commerce.product_cell.txt_add_to_wishlist'
                        )}
                      </h6>
                      <div
                        onClick={() => setIsModalOpen(false)}
                        className="popup-close-link absolute top-2/4 -translate-y-2/4 right-0 cursor-pointer z-30">
                        <i className="icon w-8 h-8 flex items-center justify-center">
                          <IconCross className="stroke-neutral-900 w-full h-full hover:stroke-primary-default" />
                        </i>
                      </div>
                    </div>
                  </div>
                  <div className="form-field mb-8">
                    <select
                      className="form-select text-neutral-900"
                      onChange={(e) => {
                        const selectedOption = wishlists.find(
                          (option: any) => option.name === e.target.value
                        );
                        if (selectedOption) {
                          addToWishlist(product, selectedOption);
                        }
                      }}>
                      <option>
                        {t(
                          'components.e_commerce.product_cell.select_wishlist'
                        )}
                      </option>

                      {wishlists &&
                        wishlists.length &&
                        wishlists?.map((option: any) => (
                          <option key={option.id} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => setIsCreateWishlistModalOpen(true)}
                      className="button-secondary">
                      {t('components.e_commerce.product_cell.txt_newWishlist')}
                    </button>
                  </div>
                </>
              </div>
            </div>
          </Modal>
        </div>
      )}
      {isCreateWishlistModalOpen && (
        <ExpCreateNewWishlistModal
          handleCloseModal={() => {
            setIsCreateWishlistModalOpen(false);
            setIsModalOpen(false);
          }}
          handleCreateWishList={handleCreateWishList}
          setwishlistName={setwishlistName}
          wishlistName={wishlistName}
          wishlistModalOpen={isModalOpen}
        />
      )}
      {isLoginModalOpen && (
        <ExpLoginModel
          isAddtoWishlistModalOpen={isAddtoWishlistModalOpen}
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </>
  );
};

export default memo(ExpWishlistModal);
