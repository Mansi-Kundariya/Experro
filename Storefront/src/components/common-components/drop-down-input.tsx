import React from 'react';

interface Option {
  value: string;
  name: string;
}

interface ExpDropDownInputProps {
  inputValue: string;
  field: string;
  label: string;
  changeHandler(field: string, event: React.FormEvent<HTMLSelectElement>, type?: string): void;
  type: string;
  options: Option[];
}

const ExpDropDownInput: React.FC<ExpDropDownInputProps> = ({
  inputValue,
  changeHandler,
  field,
  label,
  type,
  options,
}) => {
  return (
    <div className="gjs-field">
      <label className="gjs-label">{label}</label>
      <select
        value={inputValue}
        onChange={(e) => changeHandler(field, e, type)}>
        {options?.length > 0 &&
          options.map((opt: Option, index: number) => (
            <React.Fragment key={index.toString()}>
                <option value={''} hidden>Select {label}</option>
              <option value={opt.value ? opt.value : opt.name}>
                {opt.name ? opt.name : opt.value}
              </option>
            </React.Fragment>
          ))}
      </select>
    </div>
  );
};

export default ExpDropDownInput;
