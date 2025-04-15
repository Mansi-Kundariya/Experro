import React, { useState, useCallback, useEffect } from 'react';
import QueryBuilderModalPopup from '../../../components/common-components/query-builder-modal-pop-up';

const ExpProductCardWithTabsCustom: React.FC = ({
  field,
  changeHandler,
  inputValue,
}: {
  field: string;
  changeHandler: any;
  inputValue: any;
}) => {
  const [traitData, setTraitData] = useState(inputValue);
  const { query, operator } = traitData;
  const [tabQueries, setTabQueries] = useState(query);
  const [tabOperator, setTabOperator] = useState(operator);
  const [curruntActiveTab, setCurruntActiveTab] = useState('tab1');
  const [operatorSelected, setOperatorSelected] = useState<string>(
    operator?.length ? operator : 'AND'
  );
  const [queryBuilder, setQueryBuilder] = useState<any[]>(
    query?.length ? query : []
  );
  const [isQueryBuilderPopupOpen, setIsQueryBuilderPopupOpen] =
    useState<boolean>(false);
  const [tabsData, setTabsData] = useState<any>(
    traitData?.tabsData
      ? traitData.tabsData
      : {
          tab1: {
            title: '',
            query: [],
            operator: '',
          },
          tab2: {
            title: '',
            query: [],
            operator: '',
          },
          tab3: {
            title: '',
            query: [],
            operator: '',
          },
        }
  );

  /********** Handaling Tabs values **************** */
  const handelTabChangeValues = useCallback(
    (fields: string, event: any) => {
      const tempTabsData = { ...tabsData };
      const updatedObj = {
        ...tempTabsData[curruntActiveTab],
        [`${fields}`]: event.target.value,
      };
      tempTabsData[`${curruntActiveTab}`] = updatedObj;
      setTabsData(tempTabsData);
    },
    [curruntActiveTab, tabsData, setTabsData]
  );

  const saveTabsSettings = useCallback(
    (active: string) => {
      setTabQueries(tabsData[active]?.query);
      setTabOperator(
        tabsData[active]?.operator ? tabsData[active]?.operator : 'AND'
      );
      setCurruntActiveTab(active);
      setTraitData({
        ...traitData,
        query: tabsData[active]?.query,
        operator: tabsData[active]?.operator.length
          ? tabsData[active]?.operator
          : [
              {
                field: '',
                condition: '',
                value: '',
                id: 1,
                type: '',
              },
            ],
        tabsData,
        activeTab: active,
      });
    },
    [tabsData, traitData, curruntActiveTab]
  );
  //******************************************************* */

  useEffect(() => {
    changeHandler(field, traitData, 'exp_productCard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traitData, tabsData, curruntActiveTab]);

  useEffect(() => {
    const tempTabsData = { ...tabsData };
    for (const key in tabsData) {
      if (key === curruntActiveTab) {
        tabsData[key]['query'] = queryBuilder;
        tabsData[key]['operator'] = operatorSelected;
      }
    }
    setTabsData(tempTabsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryBuilder, operatorSelected]);

  return (
    <>
      <div className="custom-fields">
        <div className="gjs-field">
          <div className="deviceImageTab">
            <div className="deviceImageTabButton">
              <button
                className={curruntActiveTab === 'tab1' ? 'active' : ''}
                onClick={() => {
                  saveTabsSettings('tab1');
                }}>
                Tab 1
              </button>
              <button
                className={curruntActiveTab === 'tab2' ? 'active' : ''}
                onClick={() => {
                  saveTabsSettings('tab2');
                }}>
                Tab 2
              </button>
              <button
                className={curruntActiveTab === 'tab3' ? 'active' : ''}
                onClick={() => {
                  saveTabsSettings('tab3');
                }}>
                Tab 3
              </button>
              <button
                className={curruntActiveTab === 'tab4' ? 'active' : ''}
                onClick={() => {
                  saveTabsSettings('tab4');
                }}>
                Tab 4
              </button>
              <button
                className={curruntActiveTab === 'tab5' ? 'active' : ''}
                onClick={() => {
                  saveTabsSettings('tab5');
                }}>
                Tab 5
              </button>
            </div>
            <div>
              {/* <div className="gjs-field gjs-field-select">
                <label className="gjs-label deviceImageTabTitle">
                  Source {curruntActiveTab}
                </label>
              </div> */}
            </div>
            <div>
              <div className="gjs-field gjs-field-select">
                <label className="gjs-label deviceImageTabTitle">
                  Source {curruntActiveTab}
                </label>
              </div>
              <div className="gjs-field">
                <label className="gjs-label deviceImageTabTitle">
                  Title {curruntActiveTab}
                </label>
                <input
                  type="text"
                  placeholder="Product main title"
                  onChange={(event) => handelTabChangeValues('title', event)}
                  value={tabsData[`${curruntActiveTab}`]?.title}
                />
              </div>
              <div className="gjs-field">
                <label className="gjs-label">Condition</label>
                <div>
                  <button
                    className="grape-btn black-grape-btn full-width-btn"
                    onClick={setIsQueryBuilderPopupOpen.bind(this, true)}>
                    Add or Edit Condition
                  </button>
                </div>
                <QueryBuilderModalPopup
                  initialQuery={tabQueries}
                  initialOperator={tabOperator}
                  setQueryBuilder={setQueryBuilder}
                  setOperator={setOperatorSelected}
                  isQueryBuilderPopupOpen={isQueryBuilderPopupOpen}
                  setIsQueryBuilderPopupOpen={setIsQueryBuilderPopupOpen}
                />
              </div>
              <div className="footerButton">
                <button
                  className="grape-btn"
                  onClick={() => {
                    setTraitData({
                      ...traitData,
                      activeTab: curruntActiveTab,
                      tabsData,
                      tabName: tabsData[curruntActiveTab].title,
                    });
                  }}>{`Save`}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpProductCardWithTabsCustom;
