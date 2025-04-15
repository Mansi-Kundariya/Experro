import ExpAccountSettingsController from './account-settings-controller';
import { useTranslation } from 'react-i18next';
import { ExpForm } from '../../../../utils';
import { useEffect } from 'react';

const ExpAccountSettings = () => {
  const { dynamicForm, onSubmitAdressesForm, isLoading, formRef, commonData } =
    ExpAccountSettingsController();

  const { t } = useTranslation();

  useEffect(() => {
    Object.entries(commonData).forEach(([key, value]: [string, any]) => {
      if (formRef.current) {
        formRef.current.setValue(key, value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonData, formRef.current]);

  return (
    <>
      {isLoading ? (
        <div className={`loading-section ${isLoading ? 'is-loading' : ''}`}>
          <div className="loader-wrapper">
            <div className="loader-icon flex" />
          </div>
        </div>
      ) : (
        <>
          <ExpForm
            ref={formRef}
            config={dynamicForm}
            isLoading={isLoading}
            onSubmit={onSubmitAdressesForm}
            buttonText={t('common.txt_update_details')}
            buttonClass="button-primary button-large w-full sm:w-auto"
          />
        </>
      )}
    </>
  );
};

export default ExpAccountSettings;
