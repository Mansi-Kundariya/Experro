interface ExpFormBuilderChoices {
  label?: string;
  value?: string;
  id?: string;
}

interface ExpFormBuilderField {
  id: string;
  name: string;
  type:
    | 'singleLineText'
    | 'paragraphText'
    | 'html'
    | 'number'
    | 'dropdown'
    | 'radioButton'
    | 'checkbox'
    | 'dateAndTime'
    | 'media'
    | 'hiddenField'
    | 'phoneNumber'
    | 'email';
  description?: string;
  image?: any;
  properties: {
    fieldLabel?: string;
    internalName?: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    validationMessage?: string;
    customClass?: string;
    isRequired?: boolean;
    choices?: ExpFormBuilderChoices[];
    isShowValueEnabled?: boolean;
    radioButtonDefaultValue?: string; // For Radio button Type
    defaultValueSelect?: string[]; // For Checkbox default selection
    isAllowMultipleFileUploads?: boolean; // For Midea field to allow multiple
    mediaUploadExtension?: string; // For Midea field to allow extensions to be uploaded
    mediaUploadPath?: string;
    mediaMaximumFiledUploadSize?: number;
    mediaFileUploadLimit?: number;
    phoneFormat?: string; // For Phone Number field
    dateFormat?: string; // For dateAndTimd fields Format Date
    timeFormat?: string; // For dateAndTimd fields Format Time
    dateFieldType?: any;
  };
  isValidInput?: boolean;
  value?: any;
  validationMessage?: string;
  fieldSettings?: string[];
  children?: any[];
}

export type { ExpFormBuilderChoices, ExpFormBuilderField };
