import React, { useCallback, useState, useEffect } from 'react';

import {
  ExpDataSourceDropDown,
  ExpTextInput,
  ExpContentModelListDropDown,
  ExpCustomImageselector,
} from '../../components/common-components';
import { TraitInterface } from '../../interfaces/trait.interface';
import { handelEditDataOfContentLibraryFromUiBuilder } from '../../utilities/edit-data-common';

const ExpCTABannerTrait: React.FC = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState<any>(JSON.parse(value));

  const {
    dataSource,
    headingText,
    subHeadingText,
    buttonText,
    buttonLink,
    contentModel,
    modelInternalName,
    tagLine,
    bannerType,
  } = traitData;

  const handelInputChange = useCallback(
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
        }
      }
    },
    [traitData]
  );
  // @ts-ignore
  window.mediaManagerCallback = function (file, mediaUrl) {
    setTraitData({ ...traitData, [`backgroundImageLink`]: mediaUrl });
  };
  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
  }, [traitData, changeHandler, bannerType]);

  return (
    <div className='custom-fields'>
      <ExpDataSourceDropDown
        value={dataSource}
        field={'dataSource'}
        changeHandler={handelInputChange}
      />

      {dataSource === 'contentLibrary' ? (
        <ExpContentModelListDropDown
          value={contentModel}
          changeHandler={handelInputChange}
          modelInternalName={modelInternalName}
        />
      ) : (
        <>
          {typeof headingText === 'string' && <ExpTextInput
            inputValue={headingText}
            field={'headingText'}
            label={'Title Text'}
            changeHandler={handelInputChange}
          />}
          {typeof subHeadingText === 'string' && <ExpTextInput
            inputValue={subHeadingText}
            field={'subHeadingText'}
            label={'Sub Heading Text'}
            changeHandler={handelInputChange}
          />}
          {typeof tagLine === 'string' && (
            <ExpTextInput
              inputValue={tagLine}
              field={'tagLine'}
              label={'Tag Line'}
              changeHandler={handelInputChange}
            />
          )}
          {typeof buttonText === 'string' &&  <>
          <ExpTextInput
            inputValue={buttonText}
            field={'buttonText'}
            label={'Button Text'}
            changeHandler={handelInputChange}
          />
          <ExpTextInput
            inputValue={buttonLink}
            field={'buttonLink'}
            label={'Button Link'}
            changeHandler={handelInputChange}
          />
          </>}
          <ExpCustomImageselector
            traitData={traitData}
            setTraitData={setTraitData}
          />
        </>
      )}
    </div>
  );
};

const expCTABannerTrait: TraitInterface = {
  traitName: 'cta-banner-demo-theme',
  component: ExpCTABannerTrait,
};

export default expCTABannerTrait;
