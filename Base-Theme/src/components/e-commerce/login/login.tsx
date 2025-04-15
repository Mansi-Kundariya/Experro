import { Link } from 'experro-storefront';

import ExpLoginController from './login-controller';
import { useTranslation } from 'react-i18next';

interface ExpLoginProps {
  isRedirect?: boolean;
  setIsLoginSlide?: any;
  setInvalidCredentialError?: any;
  isPopUp?: any;
  isModalOpen?: any;
  isAddtoWishlistModalOpen?: any;
  setForgotPopUp?: any;
  forgotPopUp?: any;
}

const ExpLogin = (props: ExpLoginProps) => {
  const {
    isRedirect = true,
    setIsLoginSlide,
    setInvalidCredentialError,
    isPopUp,
    isModalOpen,
    isAddtoWishlistModalOpen,
    setForgotPopUp,
    forgotPopUp,
  } = props;

  const { t } = useTranslation();
  const {
    onSubmitHandler,
    isLoading,
    onChangeHandler,
    loginState,
    handleModal,
  } = ExpLoginController({
    isRedirect,
    setIsLoginSlide,
    setInvalidCredentialError,
    isPopUp,
    isModalOpen,
    isAddtoWishlistModalOpen,
    setForgotPopUp,
    forgotPopUp,
  });

  return (
    <div>
      <form
        onSubmit={(event) => onSubmitHandler(event, loginState)}
        className="mb-0">
        {loginState.map((field: any) => {
          return (
            <div key={field?.name} className="relative form-field mb-8">
              <label htmlFor={field?.name} className="form-label">
                {field?.labelValue}
                <span className="required">*</span>
              </label>
              <input
                className="form-input form-input-large"
                autoComplete="off"
                type={field?.name !== 'password' ? 'text' : 'password'}
                placeholder={field?.placeholder}
                name={field?.name}
                value={field?.value ? field?.value : ''}
                onChange={onChangeHandler}
              />
              {Object.keys(field)?.includes('isValidInput') &&
                !field.isValidInput && (
                  <span className="form-error-message">
                    {field?.value?.length
                      ? field?.name === 'email'
                        ? `please enter a valid ${field?.labelValue.substr(
                            0,
                            field?.labelValue.length - 1
                          )} format.`
                        : field?.name === 'password'
                        ? 'Please enter a valid Password format.'
                        : ''
                      : !field?.value?.length &&
                        `${field?.labelValue.substr(
                          0,
                          field?.labelValue.length - 1
                        )} is Required`}
                  </span>
                )}
            </div>
          );
        })}
        <div className="form-submit">
          <button
            type="submit"
            className={`${
              isLoading
                ? 'flex items-center justify-center opacity-30 cursor-not-allowed'
                : ''
            } button-primary button-large w-full`}
            disabled={isLoading === true}>
            {isLoading ? (
              <>
                {t('sign_in.sign_in')}
                <div className="relative flex justify-center items-center ml-4">
                  <div className="w-3 h-3 rounded-full absolute border-2 border-solid border-primary"></div>
                  <div className="w-3 h-3 rounded-full animate-spin absolute border-2 border-solid border-gray-50 border-t-transparent"></div>
                </div>
              </>
            ) : (
              <div>{t('sign_in.sign_in')}</div>
            )}
          </button>
        </div>

        <div className="mt-4">
          <Link
            onClick={isPopUp && (() => handleModal())}
            to={!isPopUp ? '/forgot-password/' : ''}
            className="text-sm text-gray-900 hover:text-secondary">
            {t('sign_in.forgot_pass')}
          </Link>
          <Link
            onClick={isPopUp && (() => isModalOpen())}
            to="/sign-up"
            className="text-sm text-gray-900 hover:text-secondary signup-link before:content-['/'] pl-2 ml-2 relative before:absolute before:-left-1 before:top-0 before:text-neutral-600">
            {t('sign_in.create_acc')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ExpLogin;
