import React, { useCallback, useState, useEffect } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';
import {
  ExpTextInput,
  ExpDataSourceDropDown,
  ExpContentModelListDropDown,
  ExpTextAreaInput,
  ExpCustomImageselector,
} from '../../components/common-components';
import { handelEditDataOfContentLibraryFromUiBuilder } from '../../utilities/edit-data-common';

const ExpLandingBannerTrait: React.FC = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState(JSON.parse(value));

  const {
    headingText,
    subHeadingText,
    dataSource,
    contentModel,
    modelInternalName,
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

  // const handleButtonClick = () => {
  //   // @ts-ignore
  //   if (parent && parent.window && parent.window.openMediaManager) {
  //     // @ts-ignore
  //     parent.window.openMediaManager();
  //   }
  // };

  // @ts-ignore
  window.mediaManagerCallback = function (file, mediaUrl) {
    setTraitData({ ...traitData, [`backgroundImage`]: mediaUrl });
  };

  return (
    <div className="custom-fields">
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
          {typeof headingText !== 'undefined' &&<>
            <ExpTextInput
            inputValue={headingText}
            changeHandler={handleInputChange}
            field={'headingText'}
            label={'Heading Text'}
          />
          <ExpTextAreaInput
            rows={6}
            cols={20}
            inputValue={subHeadingText}
            changeHandler={handleInputChange}
            field={'subHeadingText'}
            label={'Sub Heading Text'}
          /></>}
          {/* <ExpTextInput
            inputValue={backgroundImage}
            changeHandler={handleInputChange}
            field={'backgroundImage'}
            label={'Background Image Link'}
          /> */}
          <ExpCustomImageselector
            traitData={traitData}
            setTraitData={setTraitData}
          />
          {/* <a href="#" onClick={handleButtonClick}>
            Choose file from media manager
          </a> */}
        </>
      )}
    </div>
  );
};

const expLandingBannerTrait: TraitInterface = {
  traitName: 'landing-banner',
  component: ExpLandingBannerTrait,
};

export default expLandingBannerTrait;
