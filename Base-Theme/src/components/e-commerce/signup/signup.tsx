/* eslint-disable*/
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'experro-storefront';
import ExpSignUpController from './sign-up-controller';
import { model_internal_name } from '../../../utils';
import { useTranslation } from 'react-i18next';

const ExpSignUp = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    loaded,
    onChange,
    recaptchaRef,
    onChangeHandler,
    onSubmitHandler,
    token,
    signupState,
  } = ExpSignUpController();

  return (
    <div className="row flex justify-center">
      <div className="basis-full lg:basis-4/12">
        <form
          onSubmit={(event) => onSubmitHandler(event, signupState)}
          className="form-style m-b-0">
          {signupState.map((field: any) => {
            return (
              <div key={field?.name} className="relative form-field mb-8">
                <label htmlFor={field?.name} className="form-label">
                  {field?.labelValue}
                  <span className="required">
                    {field.name !== 'company' ? '*' : ''}
                  </span>
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
                {field?.name === 'email' ||
                field?.name === 'phone' ||
                field?.name === 'password'
                  ? Object.keys(field)?.includes('isValidInput') &&
                    !field.isValidInput && (
                      <span className="form-error-message">
                        {field?.value?.length
                          ? field?.name !== 'password'
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
                    )
                  : field?.name !== 'company'
                  ? Object.keys(field).includes('isValidInput') &&
                    !field.isValidInput && (
                      <span className="form-error-message">
                        {!field.value?.length &&
                          `${field?.labelValue.substr(
                            0,
                            field?.labelValue.length - 1
                          )} is Required`}
                      </span>
                    )
                  : ''}
              </div>
            );
          })}

          <div className="gcaptch-style text-center full-width flex flex-wrap justify-center">
            <div className="flex flex-wrap justify-center text-center">
              <div>
                <div>
                  <div style={{ width: '304px', height: '78px' }}>
                    <div>
                      <div className="gcaptch-style text-center full-width flex flex-wrap justify-center ">
                        <div className="flex flex-wrap justify-center text-center">
                          {loaded ? (
                            <ReCAPTCHA
                              ref={recaptchaRef}
                              sitekey={model_internal_name.google_captcha_key}
                              onChange={onChange}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                    <textarea
                      id="g-recaptcha-response"
                      name="g-recaptcha-response"
                      className="g-recaptcha-response"
                      style={{
                        width: '250px',
                        height: '40px',
                        border: '1px solid rgb(193, 193, 193)',
                        margin: '10px 25px',
                        padding: '0px',
                        resize: 'none',
                        display: 'none',
                      }}></textarea>
                  </div>
                  <iframe style={{ display: 'none' }}></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="form-submit mt-4 mb-4">
            <button
              type="submit"
              className={`button-primary button-large w-full ${
                isLoading
                  ? 'flex items-center justify-center opacity-30 cursor-not-allowed'
                  : ''
              } ${
                token?.data?.length === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              disabled={token?.data?.length === 0 || isLoading}>
              {isLoading ? (
                <>
                  {t('common.txt_create')}
                  <div className="relative flex justify-center items-center ml-4">
                    <div className="w-3 h-3 rounded-full absolute border-2 border-solid border-primary"></div>
                    <div className="w-3 h-3 rounded-full animate-spin absolute border-2 border-solid border-gray-50 border-t-transparent"></div>
                  </div>
                </>
              ) : (
                <div>{t('common.txt_create')}</div>
              )}
            </button>
          </div>

          <p className="text-sm text-gray-900">
            {t('common.txt_already_have_account')}
            <Link
              to="/login/"
              className="ml-2 text-gray-900 transition-colors hover:text-secondary">
              {t('common.txt_sign_in')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ExpSignUp;
