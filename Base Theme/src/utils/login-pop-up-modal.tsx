import Modal from 'react-modal';
import { IconCross } from '../assets/icons/cross';
import { ExpLogin } from '../components/e-commerce/login';
import { useState } from 'react';
import ExpForgotPasswordModal from './forgot-password-pop-up-modal';

interface ExpLoginModelProps {
  isOpen?: any;
  onClose?: any;
  isAddtoWishlistModalOpen?: any;
}

const ExpLoginModel = (props: ExpLoginModelProps) => {
  const { isOpen, onClose, isAddtoWishlistModalOpen } = props;
  const [forgotPopUp, setForgotPopUp] = useState<boolean>(false);

  const isForgotPassPopUpClose = () => {
    onClose();
    setForgotPopUp(false);
  };

  return (
    <>
      {forgotPopUp ? (
        <ExpForgotPasswordModal
          isOpen={isOpen}
          onClose={onClose}
          isForgotPassPopUpClose={isForgotPassPopUpClose}
        />
      ) : (
        <Modal
          onRequestClose={() => onClose()}
          isOpen={isOpen}
          className="modal-quickview relative w-full max-w-[90%] sm:max-w-[37.5rem] h-[27rem] bg-white shadow-md focus-visible:outline-none"
          ariaHideApp={false}
          overlayClassName="flex items-center justify-center fixed w-full h-screen top-0 left-0 bg-black bg-opacity-20 z-[99]">
          <div
            onClick={onClose}
            className="popup-close-link absolute top-6 sm:top-6 right-6 cursor-pointer z-30">
            <i className="icon w-5 h-5 md:w-4 md:h-4 flex items-center justify-center p-1 md:p-0">
              <IconCross className="stroke-neutral-900 w-full h-full" />
            </i>
          </div>
          <div className="model-body p-4 sm:py-8 sm:px-6 h-full overflow-auto custom-scrollbar">
            <div className="modal-content relative z-20 ">
              <h5 className="text-2xl lg:text-3xl font-secondary text-center mb-4">
                Login
              </h5>
              <ExpLogin
                isPopUp={true}
                isModalOpen={onClose}
                isAddtoWishlistModalOpen={isAddtoWishlistModalOpen}
                setForgotPopUp={() => setForgotPopUp(true)}
                forgotPopUp={forgotPopUp}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ExpLoginModel;
