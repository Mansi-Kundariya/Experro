import {
  ExpText,
  ExpTextArea,
  ExpSelect,
  ExpRadio,
  ExpCheckbox,
  ExpNumber,
  ExpPhoneNumber,
  ExpEmail,
  ExpMedia,
} from './fields';
import DatePicker from './fields/date-time/date-time';
import { ExpHTMLInput } from './fields/html';
import { ExpFormBuilderField } from './interface';

const expGenerateFormField = ({
  formFields,
  setFormFields,
}: {
  formFields: ExpFormBuilderField[];
  setFormFields: any;
}) => {
  const getFormField = (formField: ExpFormBuilderField) => {
    switch (formField.type) {
      case 'singleLineText': {
        return (
          <ExpText
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'paragraphText': {
        return (
          <ExpTextArea
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'dropdown': {
        return (
          <ExpSelect
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'radioButton': {
        return (
          <ExpRadio
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'checkbox': {
        return (
          <ExpCheckbox
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'number': {
        return (
          <ExpNumber
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'phoneNumber': {
        return (
          <ExpPhoneNumber
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'email': {
        return (
          <ExpEmail
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'dateAndTime': {
        return (
          <DatePicker
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
      case 'html': {
        return <ExpHTMLInput formField={formField} key={formField?.id} />;
      }
      case 'media': {
        return (
          <ExpMedia
            formField={formField}
            formFields={formFields}
            setFormFields={setFormFields}
            key={formField?.id}
          />
        );
      }
    }
  };

  return (
    <>
      {formFields.map((field: ExpFormBuilderField) => (
        <>{getFormField(field)}</>
      ))}
    </>
  );
};
export default expGenerateFormField;
