import Modal from 'react-modal';
import ExpCreateNewWishlist from './create-new-wishlist';
import { IconCross } from '../../../assets/icons/cross';

export interface ExpWishlistProps {
  isWishlistModalOpen: boolean;
  setIsWishlistModalOpen: any;
  product_id: string;
  variant_id: string;
  setShowAddToWishlistPopup: any;
}

const ExpWishlist = (props: ExpWishlistProps) => {
  const {
    isWishlistModalOpen,
    setIsWishlistModalOpen,
    product_id,
    variant_id,
    setShowAddToWishlistPopup,
  } = props;

  document.addEventListener('DOMContentLoaded', function () {
    function clickHandler(event: any) {
      if (
        !event.target.closest(
          '.ReactModal__Content.ReactModal__Content--after-open'
        )
      ) {
        setIsWishlistModalOpen(false);
      }
    }

    if (isWishlistModalOpen) {
      document.body.addEventListener('click', clickHandler);
    } else {
      document.body.removeEventListener('click', clickHandler);
    }
  });

  const productDetails: any = {};
  if (product_id) {
    productDetails['product_id'] = parseInt(product_id as string);
  }

  if (variant_id) {
    productDetails['variant_id'] = parseInt(variant_id as string);
  }

  return (
    <>
      {isWishlistModalOpen && (
        <div className="text-center">
          <Modal
            className="modalpopup wishlist-modal w-[61.875rem] bg-white shadow-md max-h-[90%] max-w-[90%] relative"
            isOpen={isWishlistModalOpen}
            ariaHideApp={false}>
            <div
              onClick={() => setIsWishlistModalOpen(false)}
              className="popup-close-link cursor-pointer absolute right-5 top-7 z-10">
              <i className="icon h-4 w-4 block">
                <IconCross className="stroke-black" />
              </i>
            </div>

            <ExpCreateNewWishlist
              productDetails={productDetails}
              setIsWishlistModalOpen={setIsWishlistModalOpen}
              setShowAddToWishlistPopup={setShowAddToWishlistPopup}
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default ExpWishlist;
