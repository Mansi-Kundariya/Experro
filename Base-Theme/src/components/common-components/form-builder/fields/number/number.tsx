import { ExpFormBuilderField } from '../../interface';
import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';
import { useTranslation } from 'react-i18next';

const ExpNumber = ({
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
    <div className={formField.properties?.customClass}>
      <label htmlFor={formField.name}>
        {formField.properties.fieldLabel}{' '}{formField.properties.isRequired && <span className="required">*</span>}
      </label>
      <input
        type="number"
        step="1"
        id={formField.id}
        name={formField.name}
        placeholder={formField.properties.placeholder}
        value={
          formField?.value === undefined
            ? formField.properties.defaultValue || ''
            : formField?.value
        }
        // className={formField.properties?.customClass}
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
export default ExpNumber;
