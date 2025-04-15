import React ,{useState,useCallback,useEffect} from 'react'
import { ExpTextInput } from '../../components/common-components';
import ExpContentModelListDropDown from '../../components/common-components/content-model-list-drop-down'
import { TraitInterface } from '../../interfaces/trait.interface';
import { handelEditDataOfContentLibraryFromUiBuilder } from '../../utilities/edit-data-common';

const ExpSmallTwoColBanner:React.FC = ({
    value,
    changeHandler,
}:{
    value:any,
    changeHandler:any
})=> {
    const [traitData, setTraitData] = useState(JSON.parse(value));   
    const {
        contentModel,
        modelInternalName,
        backgroundImage,
      } = traitData; 
      useEffect(() => {
        changeHandler(JSON.stringify(traitData));
      }, [traitData, changeHandler]);
    
      const handelInputChange = useCallback(
        (field: string, event: any) => {
          if(field === 'editDataFlag'){
            handelEditDataOfContentLibraryFromUiBuilder(traitData, setTraitData, event);
          }else{
            setTraitData({ ...traitData, [`${field}`]: event.target.value });
          }
        },
        [traitData]
      );
      // const handleButtonClick = () => {
      //   //TODO : Need to remove below one line 
      //   setTraitData({ ...traitData, [`backgroundImage`]: 'https://images.unsplash.com/photo-1602866813929-6bc4933c7013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' });
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
    <div className='custom-fields'>
      <ExpContentModelListDropDown
      value={contentModel}
      changeHandler={handelInputChange}
      modelInternalName={modelInternalName}
      />
       <ExpTextInput
            inputValue={backgroundImage}
            changeHandler={handelInputChange}
            field={'backgroundImage'}
            label={'Background Image Link'}
          />
      {/* <a href='#' onClick={handleButtonClick}>
        Choose file from media manager
      </a> */}
    </div>
  )
};

const expSmallTwoColBannerTrait: TraitInterface = {
    traitName: 'small-two-col-banner',
    component: ExpSmallTwoColBanner,
  };
  

export default expSmallTwoColBannerTrait