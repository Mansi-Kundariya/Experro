import { useMemo } from 'react';
import { CommonUtilities, IsCMSApp } from 'experro-storefront';
import ExpFormBuilderController from './form-builder-controller';
import { expWidgetConstants } from '../../../utils';
import { model_internal_name } from '../../../utils';
import { useTranslation } from 'react-i18next';

const ExpFormBuilder = (props: any) => {
  const {
    layout,
    formBuilderData,
    formTitle,
    formDescription,
    formId,
    hiddenField,
    margin = 'mb-0',
  } = CommonUtilities.propsParser(props);

  const formData = useMemo(() => {
    try {
      if (formId) {
        return { id: formId };
      }
      return JSON.parse(formBuilderData || '{}');
    } catch {
      return {};
    }
  }, [formBuilderData, formId]);

  const {
    formFields,
    formSubmitStatus,
    formSubmited,
    setFormFields,
    ExpLayout,
    isLoading,
    isLoadingData,
    handleSubmit,
    token,
    loaded,
    recaptchaRef,
    onChange,
    _formData,
    resetToken,
  }: any = ExpFormBuilderController({
    layout,
    formData,
    hiddenField,
  });

  const { t } = useTranslation();

  return (
    <>
      {!isLoading && formFields?.length ? (
        formSubmited?.length ? (
          <div
            className="lg:w-8/12 mx-auto text-center mt-6 lg:mt-8 [&_p]:mb-8 [&_p]:text-sm [&_p]:text-neutral-700 [&_h1]:font-secondary [&_h2]:font-secondary [&_h3]:font-secondary [&_h4]:font-secondary [&_h5]:font-secondary [&_h6]:font-secondary [&_h1]:mb-4  [&_h2]:mb-4 [&_h3]:mb-4 [&_h4]:mb-4 [&_h5]:mb-4 [&_h6]:mb-4 [&_p>br]:hidden [&_h1]:text-2xl lg:[&_h1]:text-2xl [&_h2]:text-2xl lg:[&_h2]:text-6xl [&_h3]:text-2xl lg:[&_h3]:text-5xl [&_h4]:text-2xl lg:[&_h4]:text-4xl [&_h5]:text-2xl lg:[&_h5]:text-3xl"
            dangerouslySetInnerHTML={{
              __html: formSubmited,
            }}
          />
        ) : (
          <div className={`${margin ? margin : ''}`}>
            {!!(
              (!!_formData?.display_name?.length &&
                formTitle === expWidgetConstants.WIDGET_CHECK_TRUE) ||
              (!!_formData?.description?.length &&
                formDescription === expWidgetConstants.WIDGET_CHECK_TRUE)
            ) && (
              <div className="container mb-8 text-center">
                {!!_formData?.display_name?.length &&
                  formTitle === expWidgetConstants.WIDGET_CHECK_TRUE && (
                    <h2 className="text-3xl mb-2">
                      {_formData?.display_name}
                    </h2>
                  )}
                {!!_formData?.description?.length &&
                  formDescription === expWidgetConstants.WIDGET_CHECK_TRUE && (
                    <p className="text-neutral-600 text-sm">
                      {_formData?.description}
                    </p>
                  )}
              </div>
            )}

            <ExpLayout
              handleSubmit={handleSubmit}
              formFields={formFields}
              setFormFields={setFormFields}
              loaded={loaded}
              recaptchaRef={recaptchaRef}
              model_internal_name={model_internal_name}
              onChange={onChange}
              resetToken={resetToken}
              formSubmitStatus={formSubmitStatus}
              token={token}
              isLoadingData={isLoadingData}
              formData={_formData}
            />
          </div>
        )
      ) : !IsCMSApp ? (
        _formData?.id &&
        (!_formData?.form_builder || !_formData?.form_builder?.length) ? (
          <h5 className="text-center">
            {t(
              'components.common_components.form_builder.form_not_have_fields_to_show_or_form_data_not_found'
            )}
          </h5>
        ) : (
          <h5 className="text-center">
            {' '}
            {t(
              'components.common_components.form_builder.please_select_form_record'
            )}
          </h5>
        )
      ) : (
        ''
      )}
    </>
  );
};

export default ExpFormBuilder;
