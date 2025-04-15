import React from 'react';

interface ExpDataSourceDropDownProps {
  value: string;
  field: string;
  disableSource?: boolean;
  changeHandler(field: string, event: React.FormEvent<HTMLInputElement>): void;
}

const ExpDataSourceDropDown: React.FC<ExpDataSourceDropDownProps> = ({
  value,
  changeHandler,
  field,
  disableSource,
}) => {
  return (
    <div className="gjs-field">
      <div className="gjs-label">Source</div>
      <div className="gjs-field gjs-field-select">
        <select disabled={disableSource} value={value} onChange={changeHandler.bind(this, field)}>
          <option value="contentLibrary">Content Library</option>
          <option value="freeForm">Free Form</option>
        </select>
        <div className="gjs-sel-arrow">
          <div className="gjs-d-s-arrow"></div>
        </div>
      </div>
    </div>
  );
};

export default ExpDataSourceDropDown;
