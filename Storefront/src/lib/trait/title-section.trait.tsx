import React, { useCallback, useState, useEffect } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';
import {
  ExpTextInput,
  ExpDataSourceDropDown,
  ExpContentModelListDropDown,
} from '../../components/common-components';
import { handelEditDataOfContentLibraryFromUiBuilder } from '../../utilities/edit-data-common';

const ExpTitleSectionTrait: React.FC = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState(JSON.parse(value));

  const {
    titleText,
    descriptionText,
    dataSource,
    modelInternalName,
    contentModel,
  } = traitData;

  const handleInputChange = useCallback(
    (field: string, event: any) => {
      if (field === 'dataSource' && event?.target.value === 'freeForm') {
        setTraitData({
          ...traitData,
          ['contentModel']: '',
          [`${field}`]: event.target.value,
        });
      } else {
        if(field === 'editDataFlag'){
          handelEditDataOfContentLibraryFromUiBuilder(traitData, setTraitData, event);
        }else{
          setTraitData({ ...traitData, [`${field}`]: event.target.value });
        }      }
    },
    [traitData]
  );

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
        <ExpContentModelListDropDown
          value={contentModel}
          changeHandler={handleInputChange}
          modelInternalName={modelInternalName}
        />
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
        </>
      )}
    </div>
  );
};

const expTitleSectionTrait: TraitInterface = {
  traitName: 'title-section',
  component: ExpTitleSectionTrait,
};

export default expTitleSectionTrait;
