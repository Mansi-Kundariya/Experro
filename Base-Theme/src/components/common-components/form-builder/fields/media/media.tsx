import { useRef } from 'react';
import { IconCross } from '../../../../../assets/icons/cross';
import { IconChooseFile } from '../../../../../assets/icons/icon-choose-file';
import { ExpFormBuilderField } from '../../interface';
import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';
import { useTranslation } from 'react-i18next';

const ExpMedia = ({
  formField,
  formFields,
  setFormFields,
}: {
  formField: ExpFormBuilderField;
  formFields: ExpFormBuilderField[];
  setFormFields: any;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const formatSupportedFormats = (formats: string) => {
    return formats
      .split(',')
      .map((format) => format.replace('.', ''))
      .map((format) => format.charAt(0).toUpperCase() + format.slice(1))
      .join(', ');
  };

  const handleFileRemove = () => {
    const updatedFormFields = formFields.map((field) =>
      field.id === formField.id
        ? {
          ...field,
          value: undefined,
          isValidInput: undefined,
          validationMessage: '',
        }
        : field
    );
    setFormFields(updatedFormFields);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const { t } = useTranslation();

  return (
    <div
      className={`mb-4 last-of-type:mb-0 form-field w-full px-4 media-field ${formField.properties?.customClass}`}>
      <label htmlFor={formField.id} className="form-label">
        {formField.properties.fieldLabel}{' '}{formField.properties.isRequired && <span className="required">*</span>}
      </label>
      <div
        className={`media-field-wrapper relative min-h-28 bg-white flex items-center justify-center flex-col border border-dashed border-neutral-300 p-4 w-full `}>
        <i className="inline-block w-10 h-10 mb-2 icon">
          <IconChooseFile />
        </i>

        <span className=" text-sm text-center mb-1 text-neutral-700 flex items-center flex-wrap ">
          {formField?.value
            ? Array.from(formField?.value)
                ?.map((file: any) => file?.name)
                ?.join(',')
            : `${t('components.common_components.form_builder.fields.media.Drag_drop_file_here_or_browse_file_from_device')}`}
          {formField?.value && !!formField?.value.length && (
            <span
              className="flex items-center justify-center w-4 h-4 ml-2 p-1 rounded-full bg-neutral-500  cursor-pointer relative z-[9999999]"
              onClick={handleFileRemove}>
              {' '}
              <i className="icon w-full h-full">
                {' '}
                <IconCross className="stroke-white" />{' '}
              </i>{' '}
            </span>
          )}
        </span>
        <span className="text-center text-xs text-neutral-400">
          {t(
            'components.common_components.form_builder.fields.media.supported_formate'
          )}
          :{' '}
          {formField.properties?.mediaUploadExtension &&
            formatSupportedFormats(formField.properties?.mediaUploadExtension)}
        </span>
        <input
          type="file"
          id={formField.id}
          name={formField.name}
          accept={formField.properties?.mediaUploadExtension?.replace(/\b(?<!\.)\w+/g, '.$&')}
          multiple={formField.properties?.isAllowMultipleFileUploads}
          ref={inputRef}
          // className={formField.properties?.customClass}
          className="form-input  opacity-0 absolute top-0 left-0 right-0 bottom-0 z-[99999]"
          onChange={(event: any) =>
            ExpFormValidationAndChangeHandler({
              formField: formField,
              event: event,
              formFields: formFields,
              setFormFields: setFormFields,
            })
          }
        />
      </div>
      {Object.keys(formField)?.includes('isValidInput') &&
        !formField.isValidInput && (
          <span className="validation-message flex mt-1 text-red-600 text-xs capitalize">
            {!formField?.value && formField.properties.isRequired
              ? formField?.validationMessage ||
                formField.properties.validationMessage ||
                `${formField.properties.fieldLabel} ${t('form.txt_is_required')}`
              : formField?.isValidInput !== undefined &&
                formField?.validationMessage &&
                `${formField.validationMessage}`}
          </span>
        )}
    </div>
  );
};
export default ExpMedia;
