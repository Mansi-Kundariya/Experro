import { Link } from 'experro-storefront';
import ExpForgotPasswordPopupController from './forgot-password-popup-controller';
import { useTranslation } from 'react-i18next';

const ExpForgotPasswordPopup = (props: any) => {
  const { setForgotPopUp } = props;
  const {
    email,
    isvalid,
    isAPICallLoading,
    handleEmailChange,
    forgotPassword,
  } = ExpForgotPasswordPopupController({
    setForgotPopUp,
  });

  const { t } = useTranslation();

  return (
    <div className="page-content md:max-w-[17.375rem] mx-auto">
      <div className="mb-8 border-b border-neutral-200 pb-8">
        <form onSubmit={forgotPassword} className="basis-full lg:basis-4/12">
          <div className="relative mb-4 form-group">
            <label htmlFor="email" className="form-label">
              {t('components.e_commerce.product_detail.email')}:
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder={t('sign_in.email_placeholder')}
              value={email}
              onChange={handleEmailChange}
              className="form-input form-input-large"
            />
            <span className="text-xs text-red-500 mt-1">
              {!isvalid &&
                `${t(
                  'components.e_commerce.forgot_password_popup.forgot_password_err_msg'
                )}`}
            </span>
          </div>

          <div className="form-submit">
            <button
              type="submit"
              className={`${
                isAPICallLoading
                  ? 'flex items-center justify-center button-primary button-large w-full'
                  : 'button-primary button-large w-full bg-primary-default text-white border-primary-default hover:text-neutral-900 hover:bg-transparent hover:border-neutral-900'
              }`}>
              {isAPICallLoading ? (
                <>
                  {t('common.txt_submit')}
                  <div className="relative flex justify-center items-center ml-4">
                    <div className="w-3 h-3 rounded-full absolute border-2 border-solid border-primary-default"></div>
                    <div className="w-3 h-3 rounded-full animate-spin absolute border-2 border-solid border-gray-50 border-t-transparent"></div>
                  </div>
                </>
              ) : (
                <div>{t('common.txt_submit')}</div>
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="text-center">
        <p className="font-secondary text-2xl mb-2 text-gray-900">
          {t('components.e_commerce.forgot_password_popup.dont_have_account')}
        </p>
        <Link
          to='/sign-up'
          onClick={setForgotPopUp}
          className="text-gray-900 transition-colors underline text-sm underline-offset-[0.375rem] hover:text-secondary-default">
          {t('components.e_commerce.forgot_password_popup.register_now')}
        </Link>
      </div>
    </div>
  );
};

export default ExpForgotPasswordPopup;
