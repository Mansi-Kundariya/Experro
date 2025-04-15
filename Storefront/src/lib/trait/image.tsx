import React, { useState, useCallback, useEffect } from 'react';

import { TraitInterface } from '../../interfaces/trait.interface';
import { ExpCustomeImageInput } from '../../components/common-components';

const ExpImageTrait: React.FC = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState(JSON.parse(value));

  const { url } = traitData;

  const handelInputChange = useCallback(
    (field: string, event: any) => {
      setTraitData({ ...traitData, [`${field}`]: event.target.value });
    },
    [traitData]
  );

  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
  }, [changeHandler, traitData]);

  return (
    <div>
      <>
        <ExpCustomeImageInput
          handleInputChange={handelInputChange}
          imageLinkInitialValue={url}
          setTraitData={setTraitData}
          traitData={traitData}
          fieldName={'url'}
        />
      </>
    </div>
  );
};

const expImageTrait: TraitInterface = {
  traitName: 'image',
  component: ExpImageTrait,
};

export default expImageTrait;
