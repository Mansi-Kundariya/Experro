import { useState, useRef, useEffect } from 'react';
import { ExpDatePicker } from '../../../date-picker';
import { ExpFormBuilderField } from '../../interface';
import ExpFormValidationAndChangeHandler from '../../validation-and-change-handler';
import { IconDatePicker } from '../../../../../assets/icons/icon-date-picker';
import { useTranslation } from 'react-i18next';

const ExpDateAndTime = ({
  formField,
  formFields,
  setFormFields,
}: {
  formField: ExpFormBuilderField;
  formFields: ExpFormBuilderField[];
  setFormFields: any;
}) => {
  const format =
    formField?.properties?.dateFieldType === 'dateAndTime'
      ? `${formField.properties.dateFormat} ${formField.properties.timeFormat}`
      : formField.properties.dateFormat || formField.properties.timeFormat;
  const [isValid] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [datePickerConfig, setDatePickerConfig] = useState<{
    yearMonthDropDown: boolean;
    showTimePicker: boolean;
    use12HourFormat: boolean;
    timePickerOnly: boolean;
    fieldType: 'date' | 'time' | 'datetime';
    defaultDate?: Date;
  }>({
    yearMonthDropDown: true,
    showTimePicker: false,
    use12HourFormat: false,
    timePickerOnly: false,
    fieldType: 'date',
    defaultDate: new Date(),
  });

  const datePickerRef = useRef<any>(null);

  const handleDateSelect = (pickerValue: any) => {
    setDatePickerConfig({
      ...datePickerConfig,
      defaultDate: pickerValue?.fullDate,
    });
    ExpFormValidationAndChangeHandler({
      formField: formField,
      event: {
        target: {
          value: pickerValue,
        },
      },
      formFields: formFields,
      setFormFields: setFormFields,
    });
  };

  const prepateDatePickerConfig = () => {
    const fieldProperties: any = formField?.properties;
    switch (fieldProperties.dateFieldType) {
      case 'date':
        setDatePickerConfig({
          yearMonthDropDown: true,
          showTimePicker: false,
          use12HourFormat: false,
          timePickerOnly: false,
          fieldType: 'date',
          defaultDate: new Date(),
        });
        break;
      case 'time':
        setDatePickerConfig({
          yearMonthDropDown: false,
          showTimePicker: true,
          use12HourFormat: fieldProperties.timeFormat === '12-hours',
          timePickerOnly: true,
          fieldType: 'time',
          defaultDate: new Date(),
        });
        break;
      case 'dateAndTime':
        setDatePickerConfig({
          yearMonthDropDown: true,
          showTimePicker: true,
          use12HourFormat: fieldProperties.timeFormat === '12-hours',
          timePickerOnly: false,
          fieldType: 'datetime',
          defaultDate: new Date(),
        });
        break;
    }
  };

  useEffect(() => {
    prepateDatePickerConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  return (
    <div
      className="mb-6 last-of-type:mb-0 form-field date-picker"
      ref={datePickerRef}>
      <label htmlFor={formField.name} className="form-label">
        {formField.properties.fieldLabel}{' '}
        {formField.properties.isRequired && <span className="required">*</span>}
      </label>
      {/* <div className="w-full max-w-80 py-[0.5625rem] leading-none px-3 font-[inherit] relative border border-gray-300"> */}
      <div className="w-full max-w-80 py-[0.5625rem] leading-none px-3 font-[inherit] relative border border-gray-300 bg-transparent text-sm">
        <input
          name={formField.name}
          type="text"
          // className="bg-transparent text-sm"
          disabled
          value={formField?.value || ''}
          placeholder={format}
        />
        <i
          className="inline-block w-5 h-5 cursor-pointer absolute right-3 [&>svg]:max-w-full icon"
          onClick={() => {
            setShowPicker(!showPicker);
          }}>
          <IconDatePicker />
        </i>
        {showPicker && (
          <ExpDatePicker
            onSelect={handleDateSelect}
            yearMonthDropDown={datePickerConfig.yearMonthDropDown}
            showTimePicker={datePickerConfig.showTimePicker}
            use12HourFormat={datePickerConfig.use12HourFormat}
            timePickerOnly={datePickerConfig.timePickerOnly}
            defaultDate={datePickerConfig?.defaultDate}
          />
        )}
      </div>
      {Object.keys(formField)?.includes('isValidInput') &&
        !formField.isValidInput && (
          <span className="validation-message flex mt-1 text-red-600 text-xs capitalize">
            {!formField?.value?.length &&
              !formField.properties?.defaultValue &&
              formField.properties.isRequired &&
              `${formField.properties.validationMessage} ${t('form.txt_is_required')}`}
          </span>
        )}
      {!isValid && (
        <span className="error">
          {t(
            'components.common_components.form_builder.fields.date_time.invalid_date_format'
          )}
        </span>
      )}
    </div>
  );
};

export default ExpDateAndTime;
