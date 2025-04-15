import React ,{useState,useCallback,useEffect} from 'react'
import ExpContentModelListDropDown from '../../components/common-components/content-model-list-drop-down'
import { ContentLibraryTraitDataInterface } from '../../interfaces/content-library.interace'
import { TraitInterface } from '../../interfaces/trait.interface';
import {handelEditDataOfContentLibraryFromUiBuilder} from '../../utilities/edit-data-common';

const ExpContentLibraryTrait:React.FC = ({
    value,
    changeHandler,
}:{
    value:any,
    changeHandler:any
})=> {
    const [traitData, setTraitData] = useState<ContentLibraryTraitDataInterface>(JSON.parse(value));
    const {
        contentModel,
        modelInternalName
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
  return (
    <div className='custom-fields'>
      <ExpContentModelListDropDown
      value={contentModel}
      changeHandler={handelInputChange}
      modelInternalName={modelInternalName}
      />
    </div>
  )
};

const expContentLibraryTrait: TraitInterface = {
    traitName: 'contentLibrary',
    component: ExpContentLibraryTrait,
  };


export default expContentLibraryTrait
