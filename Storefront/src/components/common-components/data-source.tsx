import React from 'react';

interface ExpDataSourceDropDownProps {
  dataSource: string;
  disableSource?: boolean;
  changeHandler(field: string, event: React.FormEvent<HTMLSelectElement>, type?: string): void;
}

const ExpDataSourceDropDown: React.FC<ExpDataSourceDropDownProps> = ({
  dataSource,
  changeHandler,
  disableSource,
}) => {
  return (
    <div className="gjs-field">
      <div className="gjs-label">Source</div>
      <div className="gjs-field gjs-field-select">
        <select
          disabled={disableSource}
          value={dataSource}
          onChange={(e) => changeHandler('dataSource', e, 'exp_dataSourceDropDown')}>
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
