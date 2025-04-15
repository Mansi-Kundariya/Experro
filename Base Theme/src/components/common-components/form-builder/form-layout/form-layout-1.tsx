import ReCAPTCHA from 'react-google-recaptcha';
import expGenerateFormField from '../generate-form-field';
import { ExpFormBuilderField } from '../interface';
import { useTranslation } from 'react-i18next';

const ExpFormLayoutOne = ({
  handleSubmit,
  formFields,
  setFormFields,
  loaded,
  recaptchaRef,
  model_internal_name,
  onChange,
  resetToken,
  formSubmitStatus,
  token,
  isLoadingData,
  formData,
}: {
  handleSubmit: any;
  formFields: ExpFormBuilderField[];
  setFormFields: any;
  loaded: boolean;
  recaptchaRef: any;
  model_internal_name: any;
  onChange: (value: any) => void;
  resetToken: () => void;
  formSubmitStatus: boolean;
  token: any;
  isLoadingData: boolean;
  formData: any;
}) => {
  const { t } = useTranslation();

  const isInvalidFieldPresent = formFields.some(
    (val) =>
      val?.isValidInput === false ||
      (val.properties.isRequired === true &&
        (!val?.value || !val?.value?.length) &&
        !val?.properties?.defaultValue &&
        !val?.properties?.defaultValueSelect &&
        !val?.properties?.radioButtonDefaultValue)
  );

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-wrap -mx-4">
          {expGenerateFormField({ formFields, setFormFields })}
        </div>
        {formData?.is_captcha_enabled && (
          <div className="gcaptch-style text-center full-width flex flex-wrap justify-center mb-4 sm:mb-8">
            <div className="flex flex-wrap justify-center text-center">
              {loaded ? (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={model_internal_name.google_captcha_key}
                  onChange={onChange}
                  onExpired={resetToken}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        )}
        <div className="text-center">
          <button
            type="submit"
            className={`button-primary ${
              formSubmitStatus ||
              isInvalidFieldPresent ||
              (formData?.is_captcha_enabled && token?.data?.length === 0)
                ? 'opacity-30 cursor-not-allowed'
                : ''
            }`}
            disabled={
              formSubmitStatus ||
              isInvalidFieldPresent ||
              (formData?.is_captcha_enabled && token?.data?.length === 0)
            }>
            {isLoadingData ? (
              <>
                <>{formData?.submit_btn_txt || `${t('common.txt_submit')}`}</>
                <div className="relative flex justify-center items-center ml-4">
                  <div className="w-3 h-3 rounded-full absolute border-2 border-solid border-primary"></div>
                  <div className="w-3 h-3 rounded-full animate-spin absolute border-2 border-solid border-gray-50 border-t-transparent"></div>
                </div>
              </>
            ) : (
              <>{formData?.submit_btn_txt || `${t('common.txt_submit')}`}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpFormLayoutOne;
