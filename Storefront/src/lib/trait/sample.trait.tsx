import React, {useState} from "react";
import {TraitInterface} from "../../interfaces/trait.interface";

const SampleTrait = ({value, changeHandler}: { value: any, changeHandler: any }) => {
  const [color, setColor] = useState(value);

  function onBlur(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setColor(event.target.value);
    changeHandler(color);
  }

  function onChange(event: any) {
    setColor(event.target.value);
  }

  return (
    <form>
      <input type="text"
             value={color}
             onBlur={onBlur}
             onChange={onChange}
      />
    </form>
  );
};
const sampleTrait: TraitInterface = {
  traitName: 'sample_trait',
  component: SampleTrait
}
export default sampleTrait;
