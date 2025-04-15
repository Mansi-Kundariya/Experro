import React, { useCallback, useState, useEffect } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';
import {
  ExpTextInput,
  ExpDataSourceDropDown,
  ExpTextAreaInput,
  ExpContentModelListDropDown,
  ExpCustomImageselector,
} from '../../components/common-components';
import {handelEditDataOfContentLibraryFromUiBuilder} from "../../utilities";

const ExpZigZagBannerTrait: React.FC = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState<any>(JSON.parse(value));
  const {
    titleText,
    descriptionText,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondryButtonLink,
    headingText,
    subHeadingText,
    tagLine,
    videoLink,
    dataSource,
    contentModel,
    modelInternalName,
    disableSource,
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
        }
      }
    },
    [traitData]
  );

  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
  }, [changeHandler, dataSource, traitData]);

  return (
    <div className="custom-fields">
      <ExpDataSourceDropDown
        value={dataSource}
        disableSource={disableSource}
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
          {typeof headingText === 'string' && (
            <ExpTextInput
              inputValue={headingText}
              changeHandler={handleInputChange}
              field={'headingText'}
              label={'Heading'}
            />
          )}
          {typeof subHeadingText === 'string' && (
            <ExpTextInput
              inputValue={subHeadingText}
              changeHandler={handleInputChange}
              field={'subHeadingText'}
              label={'Sub Heading'}
            />
          )}
          {typeof titleText === 'string' && (
            <ExpTextInput
              inputValue={titleText}
              changeHandler={handleInputChange}
              field={'titleText'}
              label={'Title'}
            />
          )}
          {typeof descriptionText === 'string' && (
            <ExpTextAreaInput
              inputValue={descriptionText}
              changeHandler={handleInputChange}
              field={'descriptionText'}
              label={'Sub Title'}
              rows={10}
              cols={30}
            />
          )}
          {typeof tagLine === 'string' && (
            <ExpTextInput
              inputValue={tagLine}
              changeHandler={handleInputChange}
              field={'tagLine'}
              label={'Tag Line'}
            />
          )}
          {typeof primaryButtonText === 'string' && (
            <>
              <ExpTextInput
                inputValue={primaryButtonText}
                changeHandler={handleInputChange}
                field={'primaryButtonText'}
                label={'Button 1 Text'}
              />
              <ExpTextInput
                inputValue={primaryButtonLink}
                changeHandler={handleInputChange}
                field={'primaryButtonLink'}
                label={'Button 1 Link'}
              />
            </>
          )}
          {typeof secondaryButtonText === 'string' && (
            <>
              <ExpTextInput
                inputValue={secondaryButtonText}
                changeHandler={handleInputChange}
                field={'secondaryButtonText'}
                label={'Button 2 Text'}
              />
              <ExpTextInput
                inputValue={secondryButtonLink}
                changeHandler={handleInputChange}
                field={'secondryButtonLink'}
                label={'Button 2 Link'}
              />
            </>
          )}
          {typeof videoLink === 'string' && (
            <ExpTextInput
              inputValue={videoLink}
              changeHandler={handleInputChange}
              field={'videoLink'}
              label={'Video Link'}
            />
          )}
          <ExpCustomImageselector
            traitData={traitData}
            setTraitData={setTraitData}
          />
        </>
      )}
    </div>
  );
};

const expZigZagBannerTrait: TraitInterface = {
  traitName: 'zig-zag-banner',
  component: ExpZigZagBannerTrait,
};

export default expZigZagBannerTrait;
