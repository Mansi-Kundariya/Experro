import { Fragment } from 'react/jsx-runtime';
import { ExpFormBuilderField } from '../../interface';
import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';
import { useTranslation } from 'react-i18next';

const ExpRadio = ({
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
    <div className="mb-4 uppercase text-sm font-semibold w-full last:mb-0 px-4">
      <label
        className="mb-4 inline-block uppercase text-sm font-semibold "
        htmlFor={formField.id}>
        {formField.properties.fieldLabel}{' '}
        {formField.properties.isRequired && <span className="required">*</span>}
      </label>
      {formField.properties?.choices?.map((choice: any) => (
        <div
          className={`mb-4 last-of-type:mb-0 form-field relative ${formField.properties?.customClass}`}>
          <Fragment key={choice.id}>
            <input
              id={choice.id}
              // here i change for resolve error
              name={formField.id}
              type="radio"
              className="absolute top-[0.313rem] peer  h-4 w-4 min-w-4 min-h-4 cursor-pointer appearance-none border border-neutral-200 rounded-full transition-all checked:border-primary before:w-2 before:h-2 before:min-w-2 before:min-h-2 before:bg-primary before:absolute before:top-[0.15rem] before:left-[0.188rem] before:rounded-full before:opacity-0 before:invisible checked:before:opacity-100 checked:before:visible"
              value={choice.value}
              /**
               * We are seeting checked value of radio button,
               * When we don't have any changes or updated values for the radio button in formFields array,
               * till that time will just be showing 'defautValue' which we have recieved from the formField array.
               * After value for the radio button gets updated in formFields array and found a value in 'formField.value' then will change a preference for selected radio button
               */
              checked={
                formField.value === choice.value ||
                (!formField.value &&
                  formField?.properties?.radioButtonDefaultValue ===
                    choice?.value)
              }
              onChange={(event: any) =>
                ExpFormValidationAndChangeHandler({
                  formField: formField,
                  event: event,
                  formFields: formFields,
                  setFormFields: setFormFields,
                })
              }
            />
            <label
              htmlFor={choice.id}
              className="form-label cursor-pointer text-gray-900 pl-6 mb-0">
              {choice.label}
            </label>
          </Fragment>
        </div>
      ))}
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
export default ExpRadio;
