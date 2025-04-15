import { ExpFormBuilderField } from "../interface";

const checkboxValidate = (
    event:any,
    value: string,
    updatedValue: string[] | undefined,
    calledBySubmit: boolean | undefined
) => {
    if (calledBySubmit) {
        if (!updatedValue?.length) {
      return { isValid: false, checkboxValue: updatedValue };
    } else {
      return { isValid: true, checkboxValue: updatedValue };
    }
    }
    else{
        if (!updatedValue || updatedValue?.length === 0) {
            if (event.target.checked) {
                updatedValue = [value];
                return { isValid: true, checkboxValue: updatedValue };
            } else {
                updatedValue = [];
                return { isValid: false, checkboxValue: updatedValue };
            }
        } else {
            if (event.target.checked) {
                updatedValue.push(event.target.value);
                return { isValid: true, checkboxValue: updatedValue };
            } else {                
                updatedValue.splice(updatedValue.indexOf(event.target.value), 1);
                if (updatedValue?.length === 0) {
                    return { isValid: false, checkboxValue: updatedValue };
                }
                return { isValid: true, checkboxValue: updatedValue };
            }
        }
    }
};

// here i change code

const updateCheckboxField = (event:any, value: string, __updatedFormField: ExpFormBuilderField, calledBySubmit: boolean | undefined) => {
        if (
        __updatedFormField['value'] === undefined &&
        __updatedFormField.properties?.defaultValueSelect?.length
    ) {
        if (
            Array.isArray(__updatedFormField.properties?.defaultValueSelect)
        ) {
            __updatedFormField['value'] =
            __updatedFormField.properties?.defaultValueSelect;
        } else {
            __updatedFormField['value'] = [
                __updatedFormField.properties?.defaultValueSelect,
            ];            
        }
    }
    const validateField: { isValid: boolean; checkboxValue: string[] | undefined } = checkboxValidate(
        event,
        value,
        Array.isArray(__updatedFormField['value']) ? __updatedFormField['value'] : __updatedFormField['value']!==undefined ? [__updatedFormField['value']]:undefined , calledBySubmit
    );
    return validateField;
}


export { updateCheckboxField };