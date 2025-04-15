import React, { useState, useCallback, useEffect } from 'react';
import QueryBuilderModalPopup from '../../components/common-components/query-builder-modal-pop-up';
import {
  ExpContentModelListDropDown,
  ExpCustomImageselector,
  ExpDataSourceDropDown,
  ExpTextInput,
} from '../../components/common-components';
import { TraitInterface } from '../../interfaces/trait.interface';
import { handelEditDataOfContentLibraryFromUiBuilder } from '../../utilities/edit-data-common';

const ExpProductCard: React.FC = ({
  value,
  changeHandler,
}: {
  value: any;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState(JSON.parse(value));
  const [isQueryBuilderPopupOpen, setIsQueryBuilderPopupOpen] =
    useState<boolean>(false);

  // const [curruntActiveTab, setCurruntActiveTab] = useState('tab-1');
  // const [tabsData, setTabsData] = useState<any>(
  //   traitData?.tabsData
  //     ? traitData.tabsData
  //     : {
  //         'tab-1': {
  //           source: '',
  //           sourceValue: '',
  //           title: '',
  //         },
  //         'tab-2': {
  //           source: '',
  //           sourceValue: '',
  //           title: '',
  //         },
  //         'tab-3': {
  //           source: '',
  //           sourceValue: '',
  //           title: '',
  //         },
  //       }
  // );
  const {
    contentModel,
    modelInternalName,
    dataSource,
    tagLine,
    image_heading,
    buttonText,
    buttonLink,
    bannerType,
    query,
    operator,
    imageData
  } = traitData;

  const [operatorSelected, setOperatorSelected] = useState<string>(operator?.length ? operator :'AND');
  const [queryBuilder, setQueryBuilder] = useState<any[]>(
    query?.length ? query : []
  );
  
  /********** Handaling Tabs values **************** */
  const handelInputChange = useCallback(
    (field: string, event: any) => {
      if (field === 'dataSource' && event?.target.value === 'freeForm') {
        setTraitData({
          ...traitData,
          ['contentModel']: '',
          [`${field}`]: event.target.value,
        });
      } else {
        if (field === 'editDataFlag') {
          handelEditDataOfContentLibraryFromUiBuilder(
            traitData,
            setTraitData,
            event
          );
        } else {
          setTraitData({ ...traitData, [`${field}`]: event.target.value });
        }
      }
    },
    [traitData]
  );

  /********** Handaling Tabs values **************** */
  // const handelTabChangeValues = useCallback((field: string, event: any) => {
  //   const tempTabsData = { ...tabsData };
  //   const updatedObj  = {...tempTabsData[curruntActiveTab],[`${field}`] : event.target.value}
  //   tempTabsData[`${curruntActiveTab}`] = updatedObj;

  //   setTabsData(tempTabsData);
  // }, [curruntActiveTab, tabsData, setTabsData]);

  // const saveTabsSettings = useCallback(() =>{
  //   setTraitData({ ...traitData, ['tabsData']: tabsData });
  // },[tabsData, traitData])
  //******************************************************* */

  useEffect(() => {
    setTraitData({
      ...traitData,
      query: queryBuilder,
      operator: operatorSelected,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryBuilder, operatorSelected]);

  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traitData, bannerType]);
  return (
    <>
      <div className="custom-fields">
        <>
          <ExpDataSourceDropDown
            value={dataSource}
            field={'dataSource'}
            changeHandler={handelInputChange}
          />
        </>
        {dataSource === 'contentLibrary' ? (
          <>
            <ExpContentModelListDropDown
              value={contentModel}
              changeHandler={handelInputChange}
              modelInternalName={modelInternalName}
            />
          </>
        ) : (
          <>
            <div className="gjs-field">
              <div className="deviceImageTab">
                <div className="deviceImageTab">
                  {typeof tagLine === 'string' &&  <ExpTextInput
                    inputValue={tagLine}
                    changeHandler={handelInputChange}
                    field={'tagLine'}
                    label={'Tag Line'}
                  />}
                  {typeof image_heading === 'string' && <ExpTextInput
                    inputValue={image_heading}
                    changeHandler={handelInputChange}
                    field={'image_heading'}
                    label={'Heading Text'}
                  />}
                  {typeof buttonText === 'string' && <ExpTextInput
                    inputValue={buttonText}
                    changeHandler={handelInputChange}
                    field={'buttonText'}
                    label={'Button Text'}
                  />}
                  {typeof buttonLink === 'string' && <ExpTextInput
                    inputValue={buttonLink}
                    changeHandler={handelInputChange}
                    field={'buttonLink'}
                    label={'Button Link'}
                  />}
                  {typeof imageData !== 'undefined' && <ExpCustomImageselector
                    traitData={traitData}
                    setTraitData={setTraitData}
                  />}
                  <div>
                    <div className="gjs-field">
                      <label className="gjs-label">Condition</label>
                      <div>
                        <button
                          className="grape-btn black-grape-btn full-width-btn"
                          onClick={setIsQueryBuilderPopupOpen.bind(this, true)}>
                          Add or Edit Condition
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <QueryBuilderModalPopup
          initialQuery={query}
          initialOperator={operator}
          setQueryBuilder={setQueryBuilder}
          setOperator={setOperatorSelected}
          isQueryBuilderPopupOpen={isQueryBuilderPopupOpen}
          setIsQueryBuilderPopupOpen={setIsQueryBuilderPopupOpen}
        />

        {typeof traitData?.limit === 'string' && (
          <div className="gjs-field">
            <label className="gjs-label">Limit</label>
            <input
              type="text"
              onChange={(event) => handelInputChange('limit', event)}
              value={traitData?.limit}
            />
          </div>
        )}
      </div>
    </>
  );
};

const expProductCardTrait: TraitInterface = {
  traitName: 'product-card',
  component: ExpProductCard,
};

export default expProductCardTrait;
