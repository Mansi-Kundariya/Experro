import React, { useImperativeHandle, forwardRef } from 'react';

interface ExpFormProps {
  config: any[];
  buttonText?: string;
  buttonClass?: string;
  isLoading?: boolean;
  onSubmit: (data: { [key: string]: any }) => void;
}

const ExpForm = forwardRef((props: ExpFormProps, ref) => {
  const { config, buttonText, buttonClass, onSubmit, isLoading } = props;
  const [formData, setFormData] = React.useState<{ [key: string]: any }>({});
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  useImperativeHandle(ref, () => ({
    setValue: (name: string, value: any) => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
  }));

  const validateField = (fieldConfig: any, value: any) => {
    const { validation } = fieldConfig.requisite;
    if (validation?.required?.value && !value) {
      return validation.required.message;
    }
    if (validation?.pattern?.value && !validation.pattern.value.test(value)) {
      return validation.pattern.message;
    }
    return '';
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const fieldConfig = config.find((field) => field.requisite.name === name);
      if (fieldConfig) {
        const error = validateField(fieldConfig, value);
        return {
          ...prevErrors,
          [name]: error,
        };
      }
      return prevErrors;
    });

    const fieldConfig = config.find((field) => field.requisite.name === name);
    if (fieldConfig?.requisite.onFieldChange) {
      fieldConfig.requisite.onFieldChange(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors: { [key: string]: string } = {};

    config.forEach((fieldConfig) => {
      const value = formData[fieldConfig.requisite.name];
      const error = validateField(fieldConfig, value);
      if (error) {
        formIsValid = false;
        newErrors[fieldConfig.requisite.name] = error;
      }
    });

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="flex flex-wrap -mx-4">
        {config.map((fieldConfig, index) => (
          <div className={fieldConfig.requisite.className} key={index}>
            <div className='form-field mb-8 relative'>
              <label
                htmlFor={fieldConfig.requisite.name}
                className="form-label">
                {fieldConfig.requisite.labelValue}
                {fieldConfig?.requisite?.validation?.required?.value && (
                  <span className="required">*</span>
                )}
              </label>
              {fieldConfig.field === 'text' ||
                fieldConfig.field === 'password' ? (
                <input
                  className={`${fieldConfig.field === 'text'
                    ? 'form-input'
                    : fieldConfig.field === 'password'
                      ? 'form-password'
                      : ''
                    } form-input form-input-large`}
                  type={fieldConfig.field}
                  name={fieldConfig.requisite.name}
                  placeholder={fieldConfig.requisite.placeholder}
                  value={formData[fieldConfig.requisite.name] || ''}
                  onChange={handleChange}
                />
              ) : fieldConfig.field === 'multiline' ? (
                <div>
                  <textarea
                    className="form-textarea"
                    name={fieldConfig.requisite.name}
                    placeholder={fieldConfig.requisite.placeholder}
                    value={formData[fieldConfig.requisite.name] || ''}
                    onChange={handleChange}
                  />
                </div>
              ) : fieldConfig.field === 'dropdown' ? (
                <select
                  name={fieldConfig.requisite.name}
                  className="form-select form-select-large"
                  value={formData[fieldConfig.requisite.name] || ''}
                  onChange={handleChange}>
                  <option value="" disabled>
                    {fieldConfig.requisite.placeholder}
                  </option>
                  {fieldConfig.requisite.options?.map((option: any) => (
                    <option
                      id={option?.id}
                      key={option.value}
                      value={option.value}
                      selected={option.isSelected}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : fieldConfig.field === 'checkbox' ? (
                <input
                  type="checkbox"
                  className="form-checkbox"
                  name={fieldConfig.requisite.name}
                  checked={formData[fieldConfig.requisite.name] || false}
                  onChange={handleChange}
                />
              ) : fieldConfig.field === 'file' ? (
                <input
                  type="file"
                  name={fieldConfig.requisite.name}
                  onChange={handleChange}
                />
              ) : fieldConfig.field === 'radio' ? (
                fieldConfig.requisite.radio_fields?.map(
                  (radioOption: any, idx: number) => (
                    <div key={idx}>
                      <input
                        type="radio"
                        name={fieldConfig.requisite.name}
                        value={radioOption.value}
                        checked={
                          formData[fieldConfig.requisite.name] ===
                          radioOption.value
                        }
                        onChange={handleChange}
                      />
                      <label>{radioOption.label}</label>
                    </div>
                  )
                )
              ) : null}
              {errors[fieldConfig.requisite.name] && (
                <span className="form-error-message">
                  {errors[fieldConfig.requisite.name]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className={`${isLoading ? 'opacity-30 pointer-events-none' : buttonClass
            } `}>
          {buttonText || 'Submit'}
        </button>
      </div>
    </form>
  );
});

export default ExpForm;
