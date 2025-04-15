import React, { useState, useCallback, useEffect } from 'react';
import QueryBuilderModalPopup from '../../../components/common-components/query-builder-modal-pop-up';
import {
  ExpTextInput,
} from '../../../components/common-components';
import { TraitInterface } from '../../../interfaces/trait.interface';
import { handelEditDataOfContentLibraryFromUiBuilder } from '../../../utilities';
import ExpWidgetRecordSelectPopUp from './widget-record-pop-up/widget-record-pop-up';
import { EcommerceService } from '../../../services';
const ExpRecommendationWidget: React.FC = ({
                                    value,
                                    changeHandler,
                                  }: {
  value: any;
  changeHandler: any;
}) => {
  const [traitData, setTraitData] = useState(JSON.parse(value));
  const [operatorSelected, setOperatorSelected] = useState<string>('AND');
  const [isQueryBuilderPopupOpen, setIsQueryBuilderPopupOpen] =
    useState<boolean>(false);
  const [queryBuilder, setQueryBuilder] = useState<any[]>([]);

  const [isWidgetRecordPopUpOpen,setIsWidgetRecordPopUpOpen] = useState<boolean>(false);
  const [widgetsList,setWidgetsList] = useState([]);
  const [selectedWidget,setSelectedWidget] = useState({});

  const {
    headingText,
    tagLine,
    query,
    operator,
    recommendationWidget,
    modalInternalName,
  } = traitData;



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

  //Get the Widgets Data from API
  const getWidgetsRecords = async () => {
    try{
      const widgetListResponse = await EcommerceService.getPersonalizationWidgetList(modalInternalName,'id,name,algorithm_name')
      setWidgetsList(widgetListResponse?.Data?.items);
    }catch (e){
      console.error(e)
    }
  }

  useEffect(() => {
    setTraitData({
      ...traitData,
      query: queryBuilder,
      operator: operatorSelected,
      recommendationWidget: selectedWidget,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryBuilder, operatorSelected, selectedWidget]);

  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traitData]);

  useEffect(() => {
    if(recommendationWidget?.id){
      setSelectedWidget(recommendationWidget);
    }
    if(query && Object.keys(query)){
      setQueryBuilder(query)
    }
    if(operator){
      setOperatorSelected(operator)
    }
    getWidgetsRecords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="custom-fields">
          <>
            <div className="gjs-field">
              <div className="deviceImageTab">
                <div className="deviceImageTab">
                  {typeof headingText === 'string' && <ExpTextInput
                    inputValue={headingText}
                    changeHandler={handelInputChange}
                    field={'headingText'}
                    label={'Heading Text'}
                  />}
                  {typeof tagLine === 'string' &&  <ExpTextInput
                    inputValue={tagLine}
                    changeHandler={handelInputChange}
                    field={'tagLine'}
                    label={'Tag Line'}
                  />}
                  <div>
                    <div className="gjs-field">
                      <label className="gjs-label">Widget</label>
                      <div>
                        <button
                          className="grape-btn black-grape-btn full-width-btn"
                          onClick={setIsWidgetRecordPopUpOpen.bind(this, true)}>
                          Select Widget
                        </button>
                      </div>
                    </div>
                  </div>

                  {/*<div>*/}
                  {/*  <div className="gjs-field">*/}
                  {/*    <label className="gjs-label">Custom Filter</label>*/}
                  {/*    <div>*/}
                  {/*      <button*/}
                  {/*        className="grape-btn black-grape-btn full-width-btn"*/}
                  {/*        onClick={setIsQueryBuilderPopupOpen.bind(this, true)}>*/}
                  {/*        Add Custom Filter*/}
                  {/*      </button>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </>

        <ExpWidgetRecordSelectPopUp
          isWidgetRecordPopUpOpen={isWidgetRecordPopUpOpen}
          setIsWidgetRecordPopUpOpen={setIsWidgetRecordPopUpOpen}
          widgetRecords={widgetsList}
          selectedWidget={recommendationWidget}
          recordSelectionHandler={setSelectedWidget}
          modalInternalName = {modalInternalName}
        />

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

const expRecommendationWidgetTrait: TraitInterface = {
  traitName: 'exp-recommendation-widget',
  component: ExpRecommendationWidget,
};

export default expRecommendationWidgetTrait;
