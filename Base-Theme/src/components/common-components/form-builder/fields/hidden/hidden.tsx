import { ExpFormBuilderField } from '../../interface';
// import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';

const ExpHidden = ({ formField }: { formField: ExpFormBuilderField }) => {
  return (
    // <div>
    <div className={formField.properties?.customClass}>
      <label htmlFor={formField.name}>{formField.properties.fieldLabel}</label>
      <input
        type="hidden"
        id={formField.id}
        name={formField.name}
        placeholder={formField.properties.placeholder}
        defaultValue={formField.properties.defaultValue}
        // className={formField.properties?.customClass}
      />
    </div>
  );
};
export default ExpHidden;
