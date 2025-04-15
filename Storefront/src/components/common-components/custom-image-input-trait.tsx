import React, { useCallback, useEffect, useState, useMemo } from 'react';

import ExpTextAreaInput from './textarea-input';
import ExpTextInput from './text-input';

const ExpCustomeImageInput: React.FC<any> = ({
  handleInputChange,
  imageLinkInitialValue,
  setTraitData,
  traitData,
  fieldName,
}) => {
  const [widths, setWidths] = useState<any>({
    width1: traitData?.widths?.length && traitData?.widths[0] ?  traitData?.widths[0] : '',
    width2: traitData?.widths?.length && traitData?.widths[1] ?  traitData?.widths[1] : '',
    width3: traitData?.widths?.length && traitData?.widths[2] ?  traitData?.widths[2] : '',
    width4: traitData?.widths?.length && traitData?.widths[3] ?  traitData?.widths[3] : '',
  });
  const isValid = useMemo(
    () => !traitData[`${fieldName}`],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [traitData[`${fieldName}`]]
  );

  const handelWidthInputChange = useCallback(
    (field: string, event: any) => {
      setWidths({ ...widths, [`${field}`]: event.target.value });
    },
    [widths]
  );

  const handleButtonClick = () => {
    // @ts-ignore
    if (parent && parent.window && parent.window.openMediaManager) {
      // @ts-ignore
      parent.window.openMediaManager();
    }
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  window.mediaManagerCallback = function (file, mediaUrl) {
    if (file?.length) {
      if (typeof file[0] !== 'string') {
        setTraitData({...traitData, ['mediaManagerImageUrl']: JSON.stringify(file[0]), [`${fieldName}`]: '' });
      } else {
        setTraitData({...traitData, ['mediaManagerImageUrl']: file[0], [`${fieldName}`]: '' });
      }
    }
  };

  useEffect(() => {
    const arr = [widths.width1, widths.width2, widths.width3, widths.width4];
    setTraitData({ ...traitData, ['widths']: arr });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widths]);

  useEffect(() => {
    if (traitData[`${fieldName}`]?.trim()?.length) {
      setTraitData({ ...traitData, ['mediaManagerImageUrl']: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traitData[`${fieldName}`]]);

  return (
    <div className="custom-fields">
      <ExpTextAreaInput
        changeHandler={handleInputChange}
        inputValue={imageLinkInitialValue}
        field={fieldName}
        label={'Image Link'}
        rows={3}
        cols={20}
      />

      <a href='#' onClick={handleButtonClick}>
        Choose file from media manager
      </a>

      {isValid && (
        <>
          <ExpTextInput
            changeHandler={handelWidthInputChange}
            inputValue={widths.width1}
            field={'width1'}
            label={'Width 1 (Media Width 1280px)'}
          />
          <ExpTextInput
            changeHandler={handelWidthInputChange}
            inputValue={widths.width2}
            field={'width2'}
            label={'Width 2 (Media Width 768px)'}
          />
          <ExpTextInput
            changeHandler={handelWidthInputChange}
            inputValue={widths.width3}
            field={'width3'}
            label={'Width 3 (Media Width 568px)'}
          />
          <ExpTextInput
            changeHandler={handelWidthInputChange}
            inputValue={widths.width4}
            field={'width4'}
            label={'Width 4 (Media Width 200px)'}
          />
        </>
      )}
    </div>
  );
};

export default ExpCustomeImageInput;
