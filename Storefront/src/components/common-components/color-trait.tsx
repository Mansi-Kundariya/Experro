import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import rgbHex from '../../utilities/rgb-hex';

const ExpColor: React.FC<any> = ({
  changeHandler,
  field,
  inputValue,
  type,
  label,
}) => {
  const value = inputValue;
  const [displayColorPicker, setDisplayColorPicker] = useState<any>(false);

  const changeColor = (colorHex: any, setFromInput?: boolean) => {
    if (setFromInput === true) {
      if (!colorHex?.length) {
        changeHandler(field, '#', type);
      } else {
        changeHandler(field, `${colorHex}`, type);
      }
    } else {
      changeHandler(
        field,
        `#${rgbHex(
          colorHex?.rgb?.r,
          colorHex?.rgb?.g,
          colorHex?.rgb?.b,
          colorHex?.rgb?.a
        )}`,
        type
      );
    }
  };

  const resetColor = () => {
    changeHandler(
      field,
      undefined,
      type,
    );
  };

  const popover: any = {
    position: 'absolute',
    zIndex: '2',
  };
  const cover: any = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '100px',
    left: '0px',
  };

  const handelInputChange = (event: any) => {
    changeColor(event.target.value, true);
  };
  return (
    <div className="custom-fields custom-color-picker">
      <div className="gjs-field">
        <div className="colorInputWrap">
          <div className="colorInputRow">
          <label className='gjs-label'>{label}</label>
          <div className='colorInputCol'>
          <input
              type="text"
              value={value || 'Default'}
              onChange={(event: any) => handelInputChange(event)}
            />
            <span
              className="colorInputSwatch"
              style={{
                backgroundColor: value,
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }}
              onClick={() => setDisplayColorPicker(!displayColorPicker)}></span>
            {displayColorPicker ? (
              <div style={popover}>
                <div
                  style={cover}
                  onClick={() => setDisplayColorPicker(!displayColorPicker)}
                />
                <SketchPicker
                  disableAlpha={false}
                  color={value}
                  onChange={changeColor}
                />
              </div>
            ) : null}
          </div>
          </div>
        </div>
        <button className="reset-btn" onClick={resetColor}>
          Reset Color
        </button>
      </div>
    </div>
  );
};

export default ExpColor;
