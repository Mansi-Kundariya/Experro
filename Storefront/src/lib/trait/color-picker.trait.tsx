import React, { useCallback, useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { TraitInterface } from '../../interfaces/trait.interface';
import rgbHex from '../../utilities/rgb-hex';

const ExpColorPickerTrait: React.FC = ({
  value,
  changeHandler,
}: {
  value: any;
  changeHandler: any;
}) => {
  const [color, setColor] = useState<any>(JSON.parse(value));
  const [displayColorPicker, setDisplayColorPicker] = useState<any>(false);

  const changeColor = useCallback(
    (colorHex: any,setFromInput?: boolean) => {
      if(setFromInput === true){
        if(!colorHex?.length){
          setColor({ ...color, value: '#000000'});
        }
        else
          setColor({ ...color, value: `${colorHex}`});
      }
      else{
        setColor({ ...color, value: `#${rgbHex(colorHex?.rgb?.r,colorHex?.rgb?.g,colorHex?.rgb?.b,colorHex?.rgb?.a)}`});
      }
    },
    [color]
  );

  const resetColor = useCallback(() => {
    setColor({
      ...color,
      value: color?.default,
    });
  }, [color]);

  useEffect(() => {
    changeHandler(JSON.stringify(color));
  }, [changeHandler, color]);

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

  const handelInputChange = (event: any) =>{
    changeColor(event.target.value,true);
  }
  return (
    <div className="custom-fields">
      <div className="gjs-field">
        <div className="colorInputWrap">
          <div className="colorInputRow">
            <input type="text"
                   value={color?.value}
                   onChange={(event: any) =>
                     handelInputChange(event)
                   }
            />
            <span
              className="colorInputSwatch"
              style={{
                backgroundColor: color?.value,
                display: 'inline-block',
                width: '16px',
                height: '16px',
              }}
              onClick={() => setDisplayColorPicker(!displayColorPicker)}>
            </span>
            {displayColorPicker ? (
              <div style={popover}>
                <div
                  style={cover}
                  onClick={() => setDisplayColorPicker(!displayColorPicker)}
                />
                <SketchPicker disableAlpha={false} color={color?.value} onChange={changeColor} />
              </div>
            ) : null}
          </div>
        </div>
        <button className="reset-btn" onClick={resetColor}>
          Reset Color
        </button>
      </div>
    </div>
  );
};

const expColorPickerTrait: TraitInterface = {
  traitName: 'color-picker',
  component: ExpColorPickerTrait,
};

export default expColorPickerTrait;
