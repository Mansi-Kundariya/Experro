import { ExpFormBuilderField } from '../../interface';
import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';
import { useTranslation } from 'react-i18next';

const ExpEmail = ({
  formField,
  formFields,
  setFormFields,
}: {
  formField: ExpFormBuilderField;
  formFields: ExpFormBuilderField[];
  setFormFields: any;
}) => {
  const { t } = useTranslation();

  return (
    // <div>
    <div className={`mb-4 form-field px-4 ${formField.properties?.customClass}`}>
      <label htmlFor={formField.name} className="form-label">
        {formField.properties.fieldLabel}
        {formField.properties.isRequired && <span className="required">*</span>}
      </label>
      <input
        type="text"
        id={formField.id}
        name={formField.name}
        placeholder={
          formField.properties.placeholder || `${t('form.txt_email_example')} `
        }
        // here i changed value
        // defaultValue={formField.properties.defaultValue}
        value={
          formField?.value === undefined
            ? formField.properties.defaultValue || ''
            : formField?.value
        }
        className="form-input"
        onChange={(event: any) =>
          ExpFormValidationAndChangeHandler({
            formField: formField,
            event: event,
            formFields: formFields,
            setFormFields: setFormFields,
          })
        }
      />
      {Object.keys(formField)?.includes('isValidInput') &&
        !formField.isValidInput && (
          <span className="validation-message flex mt-1 text-red-600 text-xs capitalize">
            {formField.properties.isRequired
              ? formField?.value?.length
                ? formField.properties.validationMessage ||
                  `${formField.properties.fieldLabel} ${t('components.common_components.form_builder.fields.email.should_valid_format')}`
                : !formField?.value?.length
                  ? `${formField.properties.fieldLabel} ${t('form.txt_is_required')}`
                  : ''
              : formField?.value?.length
                ? formField.properties.validationMessage ||
                  `${formField.properties.fieldLabel}  ${t('components.common_components.form_builder.fields.email.should_valid_format')}`
                : ''}
          </span>
        )}
    </div>
  );
};
export default ExpEmail;
