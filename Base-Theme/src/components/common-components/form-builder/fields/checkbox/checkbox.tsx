import { ExpFormBuilderField } from '../../interface';
import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';
import { Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';
import { IconCheck } from '@icons/check';

const ExpCheckbox = ({
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
    <div
      className={`mb-4 form-field px-4 w-full   ${formField.properties?.customClass}`}>
      <label htmlFor={formField.name} className="form-label">
        {formField.properties.fieldLabel}{' '}
        {formField.properties.isRequired && <span className="required">*</span>}
      </label>
      {formField.properties?.choices?.map((choice: any) => (
        <Fragment key={choice.id}>
          <div
            className={`navList-action relative flex items-center group  mb-4 last-of-type:mb-0 form-field  ${
              formField?.value?.includes(choice.value) ||
              (!formField.value &&
                formField?.properties?.defaultValueSelect?.includes(
                  choice?.value
                ))
                ? 'is-selected'
                : ''
            }`}>
            <input
              id={choice.id}
              name={formField.name}
              type="checkbox"
              value={choice.value}
              className="form-checkbox group peer absolute top-0.5 left-0  h-4 w-4 min-w-4 min-h-4 cursor-pointer appearance-none border border-gray-200 transition-all checked:border-primary checked:bg-primary group-[.facet-block]:w-full group-[.facet-block]:h-full group-[.facet-block]:opacity-0 group-[.facet-block]:top-0 "
              checked={
                formField?.value?.includes(choice.value) ||
                (!formField.value &&
                  formField?.properties?.defaultValueSelect?.includes(
                    choice?.value
                  ))
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

            <i className="icon group-[.facet-block]:hidden absolute text-white transition-opacity opacity-0 pointer-events-none top-[6px] left-[3px]  peer-checked:opacity-100">
              <IconCheck />
            </i>

            <label
              htmlFor={choice.id}
              className="form-label cursor-pointer text-gray-900 pl-6 mb-0 group-[.facet-block]:p-4 group-[.facet-block]:border group-[.facet-block]:w-full group-[.facet-block]:text-center group-[.facet-block]:peer-[.is-selected]:border-black">
              {choice.label}
            </label>
          </div>
        </Fragment>
      ))}
      {Object.keys(formField)?.includes('isValidInput') &&
        !formField?.isValidInput && (
          <span className="validation-message flex mt-1 text-red-600 text-xs capitalize">
            {(!formField?.value?.length &&
              formField.properties.isRequired &&
              formField.properties.validationMessage) ||
              `${formField.properties.fieldLabel}  ${t(
                'form.txt_is_required'
              )}`}
          </span>
        )}
    </div>
  );
};
export default ExpCheckbox;
