import {
  FieldNames,
  formatPhoneNumber,
  validateDateAndTime,
  mediaValidation,
  updateCheckboxField,
} from './util';
import { ExpFormBuilderField } from './interface';

export default function ExpFormValidationAndChangeHandler({
  formField,
  event,
  setFormFields,
  formFields,
  calledBySubmit,
  hiddenField,
}: {
  formField?: ExpFormBuilderField;
  event?: any;
  setFormFields: any;
  formFields: ExpFormBuilderField[];
  calledBySubmit?: boolean | undefined;
  hiddenField?: any;
}) {
  if (formField && event) {
    const updatedFormFields = validationOnChange({
      formField: formField,
      event: event,
      formFields: formFields,
      calledBySubmit: calledBySubmit,
      hiddenField,
    });
    setFormFields(updatedFormFields);
    return updatedFormFields;
  }
}

/**
 * This function is responsible for handling validation on field changes,
 * can be modified to componsate addons field validation as well.
 */
const validationOnChange = ({
  formField,
  event,
  formFields,
  calledBySubmit,
  hiddenField,
}: {
  formField: ExpFormBuilderField;
  event: any;
  formFields: ExpFormBuilderField[];
  calledBySubmit: boolean | undefined;
  hiddenField?: any;
}) => {
  const {
    SINGLELINETEXT,
    PARAGRAPHTEXT,
    NUMBER,
    DROPDOWN,
    RADIOBUTTON,
    PHONENUMBER,
    CHECKBOX,
    EMAIL,
    HIDDENFIELD,
    MEDIA,
    DATEANDTIME,
  } = FieldNames;

  
  const updatedFormFields = formFields.map((field: ExpFormBuilderField) => {
    let __updatedFormField: ExpFormBuilderField = field;
    if (formField.id === field.id && !calledBySubmit) {
      if (field.type !== 'checkbox' && field.type !== 'media') {
        if (
          (typeof event.target.value === 'string' &&
            event.target.value.trim() !== '') ||
          event.target.value.length === 0
        ) {
          __updatedFormField['value'] = event.target.value;
        }
      }
    }


    // for hiddenfield
    if (field?.type === 'hiddenField' && hiddenField) {
      if (Array.isArray(hiddenField)) {
        hiddenField.forEach((h: any) => {
          if (h.internalName === field?.properties?.internalName) {
            __updatedFormField['value'] = h.value;
          }
        });
      }
    }

    if (
      field?.value === undefined &&
      field?.properties?.defaultValue &&
      field?.type !== 'checkbox' &&
      calledBySubmit &&
      field?.type !== 'radioButton'
    ) {
      __updatedFormField['value'] = field?.properties?.defaultValue;
    } else if (
      field?.value === undefined &&
      field?.properties?.defaultValueSelect &&
      field?.properties?.defaultValueSelect?.length &&
      (field?.type === 'dropdown' || field?.type === 'checkbox') &&
      calledBySubmit
    ) {
      __updatedFormField['value'] = field?.properties?.defaultValueSelect;
    } else if (
      field?.value === undefined &&
      field?.properties?.radioButtonDefaultValue &&
      field?.type === 'radioButton' &&
      calledBySubmit
    ) {
      __updatedFormField['value'] = field?.properties?.radioButtonDefaultValue;
    }

    if (formField.id === field.id) {
      // Check is Required
      if (field.properties.isRequired) {
        if (
          field.type === SINGLELINETEXT ||
          field.type === PARAGRAPHTEXT ||
          field.type === NUMBER ||
          field.type === DROPDOWN ||
          field.type === RADIOBUTTON ||
          field.type === CHECKBOX ||
          field.type === PHONENUMBER ||
          field.type === EMAIL ||
          field.type === DATEANDTIME ||
          field.type === MEDIA ||
          field.type === HIDDENFIELD
        ) {
          // Check length of field value
          if (
            (typeof __updatedFormField['value'] === 'string'
              ? __updatedFormField['value'].trim() === '' &&
                !event.target.value?.trim()?.length
              : !__updatedFormField['value'] && !event.target.value?.length) &&
            field.type !== 'dateAndTime' &&
            field.type !== 'hiddenField'
          ) {
            __updatedFormField['isValidInput'] = false;
          } else if (field.type === 'checkbox') {
            const validateField: {
              isValid: boolean;
              checkboxValue: string[] | undefined;
            } = updateCheckboxField(
              event,
              event.target.value,
              __updatedFormField,
              calledBySubmit
            );
            __updatedFormField['value'] = validateField?.checkboxValue;
            __updatedFormField['isValidInput'] = validateField?.isValid;
          } else if (field.type === 'email') {
            __updatedFormField['value'] = event.target.value;
            __updatedFormField['isValidInput'] =
              /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i.test(event.target.value);
          } else if (field.type === 'phoneNumber') {
            const validateField: any = formatPhoneNumber(
              event.target.value,
              formField?.properties?.phoneFormat
            );
            __updatedFormField['value'] = validateField.value;
            __updatedFormField['isValidInput'] = validateField.isValid;
          } else if (field.type === 'dateAndTime' && !calledBySubmit) {
            const validateField: any = validateDateAndTime(
              formField,
              event.target.value
            );
            __updatedFormField['value'] = validateField.value;
            __updatedFormField['isValidInput'] = validateField.isValid;
          } else if (formField.type === 'dateAndTime' && calledBySubmit) {
            if (formField?.value?.trim()?.length > 0) {
              __updatedFormField['isValidInput'] = true;
              __updatedFormField['value'] = formField.value?.trim();
            } else {
              __updatedFormField['isValidInput'] =
                !formField?.properties?.isRequired;
            }
          } else if (field.type === 'media' && event.target.files) {
            __updatedFormField = {
              ...__updatedFormField,
              ...mediaValidation(event, formField, __updatedFormField),
            };
          } else {
            __updatedFormField['isValidInput'] = true;
          }
        }
      } else {
        // field is not required but if provided value then need to validate
        if (field.type === 'phoneNumber' && event.target.value?.length) {
          const validateField: any = formatPhoneNumber(
            event.target.value,
            formField?.properties?.phoneFormat
          );
          __updatedFormField['value'] = validateField.value;
          __updatedFormField['isValidInput'] = validateField.isValid;
        } else if (field.type === 'email') {
          __updatedFormField['value'] = event.target.value;
          __updatedFormField['isValidInput'] =
            event.target.value === undefined || event.target.value.length === 0
              ? true
              : /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i.test(
                  event.target.value
                );
        } else if (field.type === 'dateAndTime' && !calledBySubmit) {
          const validateField: any = validateDateAndTime(
            formField,
            event.target.value
          );
          __updatedFormField['value'] = validateField.value;
          __updatedFormField['isValidInput'] = validateField.isValid;
        } else if (formField.type === 'dateAndTime' && calledBySubmit) {
          __updatedFormField['isValidInput'] = true;
          __updatedFormField['value'] = formField.value?.trim();

          __updatedFormField['value'] = formField.value || '';
        } else if (field.type === 'checkbox') {
          const validateField: {
            isValid: boolean;
            checkboxValue: string[] | undefined;
          } = updateCheckboxField(
            event,
            event.target.value,
            __updatedFormField,
            calledBySubmit
          );
          __updatedFormField['value'] = validateField?.checkboxValue;
        } else if (field.type === 'media' && event.target.files) {
          __updatedFormField = {
            ...__updatedFormField,
            ...mediaValidation(event, formField, __updatedFormField),
          };
        } else {
          __updatedFormField['isValidInput'] = true;
        }
      }
    }

    return __updatedFormField;
  });

  return updatedFormFields;
};
