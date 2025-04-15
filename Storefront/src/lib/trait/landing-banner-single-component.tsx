import React, { useCallback, useState, useEffect } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';
import {
  ExpTextInput,
  ExpDataSourceDropDown,
} from '../../components/common-components';

const ExpLandigComponentTrait: React.FC = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState(JSON.parse(value));
  const [contentModelList, setContentModelList] = useState<any>();

  const { titleText, descriptionText, dataSource, contentModel ,image } = traitData;

  const handleInputChange = useCallback(
    (field: string, event: any) => {
      setTraitData({ ...traitData, [`${field}`]: event.target.value });
    },
    [traitData]
  );

  useEffect(() => {
    setContentModelList([
      { modalName: 'Modal 1', value: 'modal1' },
      { modalName: 'Modal 2', value: 'modal2' },
      { modalName: 'Modal 3', value: 'modal3' },
    ]);
  }, []);

  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
  }, [changeHandler, traitData]);

  return (
    <div className='custom-fields'>
      <ExpDataSourceDropDown
        value={dataSource}
        field={'dataSource'}
        changeHandler={handleInputChange}
      />

      {dataSource === 'contentLibrary' ? (
        <select
          value={contentModel}
          onChange={handleInputChange.bind(this, 'contentModel')}>
          <option value="" disabled hidden>
            Select your content modal
          </option>
          {contentModelList?.map((modal: any, index: number) => (
            <option value={modal?.value} key={index}>
              {modal?.modalName}
            </option>
          ))}
        </select>
      ) : (
        <>
          <ExpTextInput
            inputValue={titleText}
            changeHandler={handleInputChange}
            field={'titleText'}
            label={'Title Text'}
          />
          <ExpTextInput
            inputValue={descriptionText}
            changeHandler={handleInputChange}
            field={'descriptionText'}
            label={'Description Text'}
          />
          <ExpTextInput
            inputValue={image}
            changeHandler={handleInputChange}
            field={'imageText'}
            label={'Enter Image Link'}
          />
        </>
      )}
    </div>
  );
};

const expSingelLandigComponentTrait: TraitInterface = {
  traitName: 'landing-banner',
  component: ExpLandigComponentTrait,
};

export default expSingelLandigComponentTrait;
