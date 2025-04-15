import { useRef } from 'react';
import { ExpFormBuilderField } from '../../interface';
import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';
import { useTranslation } from 'react-i18next';

const ExpSelect = ({
  formField,
  formFields,
  setFormFields,
}: {
  formField: ExpFormBuilderField;
  formFields: ExpFormBuilderField[];
  setFormFields: any;
}) => {
  const { t } = useTranslation();
    const selectRef = useRef<HTMLSelectElement | null>(null);


  if (!Object.prototype.hasOwnProperty.call(formField, 'value')) {
    if (selectRef.current) {
      selectRef.current.value='';
    }
  }

  return (
    // <div>
    <div
      className={`mb-4 form-field px-4 ${formField.properties?.customClass}`}>
      <label htmlFor={formField.name} className="form-label">
        {formField.properties.fieldLabel}
        {formField.properties.isRequired && <span className="required">*</span>}
      </label>
      <select
        id={formField.id}
        name={formField.name}
        ref={selectRef}
        value={
          formField?.value === undefined &&
          !!formField.properties?.defaultValueSelect?.length
            ? formField.properties.defaultValueSelect || ''
            : formField?.value
        }
        className="form-select"
        onChange={(event: any) =>
          ExpFormValidationAndChangeHandler({
            formField: formField,
            event: event,
            formFields: formFields,
            setFormFields: setFormFields,
          })
        }>
        {formField.properties?.placeholder?.length &&
        !formField.properties.defaultValueSelect &&
        !formField.value ? (
          <option key={formField.name} value={''} hidden>
            {formField.properties.placeholder}
          </option>
        ) : (
          <option key={formField.name} value={''} hidden>
            {formField?.properties?.placeholder}
          </option>
        )}
        {formField.properties?.choices?.map((option: any) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {Object.keys(formField)?.includes('isValidInput') &&
        !formField.isValidInput && (
          <span className="validation-message flex mt-1 text-red-600 text-xs capitalize">
            {(!formField?.value?.length &&
              formField.properties.isRequired &&
              formField.properties.validationMessage) ||
              `${formField.properties.fieldLabel}  ${t('form.txt_is_required')}`}
          </span>
        )}
    </div>
  );
};
export default ExpSelect;
