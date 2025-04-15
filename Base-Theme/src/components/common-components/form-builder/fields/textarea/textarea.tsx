import { ExpFormBuilderField } from '../../interface';
import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';
import { useTranslation } from 'react-i18next';

const ExpTextArea = ({
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
    <div className={`mb-4 form-field px-4 w-full ${formField.properties?.customClass}`}>
      <label htmlFor={formField.name} className="form-label">{formField.properties.fieldLabel}{formField.properties.isRequired && <span className="required">*</span>}</label>
      <textarea
        id={formField.id}
        name={formField.name}
        placeholder={formField.properties.placeholder}
        value={
          formField?.value === undefined
            ? formField.properties.defaultValue || ''
            : formField?.value
        }
        className="form-textarea"
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
            {(!formField?.value?.length &&
              formField.properties.isRequired &&
              formField.properties.validationMessage) ||
              `${formField.properties.fieldLabel} ${t('form.txt_is_required')}`}
          </span>
        )}
    </div>
  );
};
export default ExpTextArea;
