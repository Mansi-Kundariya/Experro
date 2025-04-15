import React, { useEffect, useState } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';
import { ExpCustomImageselector } from '../../components/common-components';

const ExpImageSelectorTrait = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState<any>(JSON.parse(value));
  
  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
}, [changeHandler, traitData])

  return (
    <ExpCustomImageselector traitData={traitData} setTraitData={setTraitData} />
  );
};

const expImageSelectorTrait: TraitInterface = {
  traitName: 'image-selector',
  component: ExpImageSelectorTrait,
};

export default expImageSelectorTrait;
