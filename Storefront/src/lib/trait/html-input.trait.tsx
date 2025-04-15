import React, { useState } from 'react';
import { ExpTextAreaInput } from '../../components/common-components';
import { TraitInterface } from '../../interfaces/trait.interface';
import { CommonUtilities } from '../../utilities';

const ExpHtmlInputTrait = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  let defaultValue;
  try {
    defaultValue = CommonUtilities.b64_to_utf8(value);
  } catch {
    defaultValue = value;
  }
  const [initialValue, setInitialValue] = useState<string>(defaultValue);

  const handelBlurChange = () => {
    changeHandler(CommonUtilities.utf8_to_b64(initialValue));
  };

  const handelOnChange = (field, event) => {
    setInitialValue(event.target.value);
  };

  return (
    <div className="custom-fields">
      <ExpTextAreaInput
        rows={50}
        cols={40}
        inputValue={initialValue}
        field={'htmlText'}
        label={'Html Input'}
        changeHandler={handelOnChange}
        onBlurHandler={handelBlurChange}
      />
    </div>
  );
};

const expHtmlInputTrait: TraitInterface = {
  traitName: 'html-input',
  component: ExpHtmlInputTrait,
};

export default expHtmlInputTrait;
