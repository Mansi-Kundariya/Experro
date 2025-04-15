import Modal from 'react-modal';
import { IconCross } from '../assets/icons/cross';
import { ExpForgotPasswordPopup } from '../components/e-commerce/forgot-password-popup';
import { useTranslation } from 'react-i18next';

interface ExpForgotPasswordModalProps {
  isOpen?: any;
  onClose?: any;
  isForgotPassPopUpClose?: any;
}

const ExpForgotPasswordModal = (props: ExpForgotPasswordModalProps) => {
  const { isOpen, onClose, isForgotPassPopUpClose } = props;
  const { t } = useTranslation();
  return (
    <Modal
      onRequestClose={() => onClose()}
      isOpen={isOpen}
      className="relative w-full max-w-[90%] sm:max-w-[46.25rem] h-auto bg-white shadow-md focus-visible:outline-none"
      ariaHideApp={false}
      overlayClassName="flex items-center justify-center fixed w-full h-screen top-0 left-0 bg-black bg-opacity-20 z-[99]">
      <div
        onClick={onClose}
        className="popup-close-link absolute top-0 right-0 w-8 h-8 flex justify-center items-center cursor-pointer z-30">
        <i className="icon w-4 h-4 flex items-center justify-center p-0.5">
          <IconCross className="stroke-neutral-900 w-full h-full hover:stroke-primary-default" />
        </i>
      </div>
      <div className="model-body p-8 sm:py-16 sm:px-8 h-full overflow-auto custom-scrollbar">
        <div className="modal-content relative z-20">
          <div className="md:max-w-[17.375rem] mx-auto mb-8">
            <h5 className="text-2xl lg:text-3xl font-secondary text-center mb-4 last:mb-0">
              {t('components.e_commerce.forgot_password_popup.forgot_password')}
            </h5>
            <p className="text-sm text-neutral-900 text-center">
              {t(
                'components.e_commerce.forgot_password_popup.forgot_password_text'
              )}
            </p>
          </div>
          <ExpForgotPasswordPopup setForgotPopUp={isForgotPassPopUpClose} />
        </div>
      </div>
    </Modal>
  );
};

export default ExpForgotPasswordModal;
