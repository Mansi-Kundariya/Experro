import React, { Fragment, useEffect, useState } from 'react';
import Modal from "react-modal";
import { CheckBlueIcon } from "../../../../assets/images/icons/check-blue";
import { CloseIcon } from "../../../../assets/images/icons/close-icon";
import SparklesIconWithoutBackground from '../../../../assets/images/icons/sparkles-icon-without-background';
import NoPreviewIcon from '../../../../assets/images/icons/no-preview-icon';
import FavouriteIconWithoutBackground from '../../../../assets/images/icons/favourite-icon-without-background';
import EyeOnIconWithoutBackground from '../../../../assets/images/icons/eye-on-icon-without-background';
import TargetIconWithoutBackground from '../../../../assets/images/icons/target-icon-without-background';
import ShoppingIconWithoutBackground from '../../../../assets/images/icons/shopping-icon-without-background';
import LikeIconWithoutBackground from '../../../../assets/images/icons/like-icon-without-background';
import ShoppingCartIconWithoutBackground from '../../../../assets/images/icons/shopping-cart-icon-without-background';
import MegaphoneIconWithoutBackground from '../../../../assets/images/icons/megaphone-icon-without-background';
import HistoryIconWithoutBackground from '../../../../assets/images/icons/history-icon-without-background';
import FilterIconWithoutBackground from '../../../../assets/images/icons/filter-icon-without-background';
import AwardIconWithoutBackground from '../../../../assets/images/icons/award-icon-without-background';

const ExpWidgetRecordSelectPopUp: React.FC<any> = ({
                                                     isWidgetRecordPopUpOpen,
                                                     setIsWidgetRecordPopUpOpen,
                                                     widgetRecords,
                                                     selectedWidget,
                                                     recordSelectionHandler,
                                                     modalInternalName,
                                                   }) => {
  const [selectedWidgetRecord, setSelectedWidgetRecord] =
    useState<any>();

    const AlgorithamToShow = {
      best_seller:'Best Seller',
      frequently_bought_together:'Frequently Bought Together',
      frequently_viewed_together:'Frequently Viewed Together',
      hot_new_releases:'Hot New Releases',
      inspired_by_your_browsing_history:'Inspired By Your Browsing History',
      pick_up_where_you_left_off:'Pick Up Where You Left Off',
      popular_items:'Popular Items',
      query_based:'Query Based',
      recently_purchased:'Recently Purchased',
      recently_viewed:'Recently Viewed',
      recommended_for_you:'Recommended For You',
      similar_products:'Similar Products',
    }

  const getIconForSelectedAlgo = () => {
    switch(modalInternalName){
      case 'best_seller' :
        return <LikeIconWithoutBackground/>
      break;
      case 'frequently_bought_together' :
        return <ShoppingIconWithoutBackground/>
        break;
      case 'frequently_viewed_together' :
        return <FavouriteIconWithoutBackground/>
      break;
      case 'hot_new_releases' :
        return <SparklesIconWithoutBackground/>
      break;
      case 'inspired_by_your_browsing_history' :
        return <HistoryIconWithoutBackground/>
      break;
      case 'pick_up_where_you_left_off' :
        return <AwardIconWithoutBackground/>
      break;
      case 'popular_items' :
        return <MegaphoneIconWithoutBackground/>
      break;
      case 'query_based' :
        return <FilterIconWithoutBackground/>
      break;
      case 'recently_purchased' :
        return <ShoppingCartIconWithoutBackground/>
      break;
      case 'recently_viewed' :
        return <EyeOnIconWithoutBackground/>
      break;
      case 'recommended_for_you' :
        return <TargetIconWithoutBackground/>
      break;
      case 'similar_products' :
        return <SparklesIconWithoutBackground/>
      break;
    }
  }
  const handelContentModalRecordSelect = (record: any) => {
    setSelectedWidgetRecord(record);
  };

  const handelCloseButtonSelect = () => {
    setIsWidgetRecordPopUpOpen(false);
    setSelectedWidgetRecord(selectedWidget);
  }

  const handelSaveClick = () => {
    recordSelectionHandler(selectedWidgetRecord);
    setIsWidgetRecordPopUpOpen(false);
  };

  useEffect(() => {
    setSelectedWidgetRecord(selectedWidget)
  }, [selectedWidget, widgetRecords]);

  return (
    <Modal
      className="mediumReactModal content-modal-popup storefront-modal"
      isOpen={isWidgetRecordPopUpOpen}
      onRequestClose={() => setIsWidgetRecordPopUpOpen(false)}
      // style={customStyles}
      appElement={document.getElementById("__experro_gjs_iframe__")}
      contentLabel="Widget Record Select"
    >
      <div className="reactModalHeader">
        <h5>Select Widget</h5>
        <button
          onClick={setIsWidgetRecordPopUpOpen.bind(this, false)}
          className="reactModalCloseButton"
          type="button"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="reactModalBody">
        <div className="widgetAlgoPanel">
          <div className="widgetAlgo">
            <span className="widgetAlgoCaption">Algorithm:</span>
            <span className="widgetAlgoIcon">
              {
                getIconForSelectedAlgo()
              }
              </span>
            <span className="widgetAlgoName">{AlgorithamToShow[modalInternalName] || 'Recommendation Widget'}</span>
          </div>
          {/*<button type="button" className="buttonPrimary addWidgetButton">Add Widget</button>*/}
        </div>
        <div className="experroTabs">
          {/* NOTE: Commented Until the Environment wise, recommendation widget records showing is not integrated */}
          {/*<div className="experroTabsNav">*/}
          {/*  <div className="experroTab active">*/}
          {/*    Production*/}
          {/*  </div>*/}
          {/*  <div className="experroTab">*/}
          {/*    Stagging*/}
          {/*  </div>*/}
          {/*  <div className="experroTab">*/}
          {/*    Development*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="experroTabsContentHolder">
            <div className="experroTabsContent">
              {/*<div className="inputRow widgetSearchPanel">*/}
              {/*  <div className="experroIconInput">*/}
              {/*    <div className="iconPrefix">*/}
              {/*      <SearchIcon />*/}
              {/*    </div>*/}
              {/*    <input className="experroInput" type="search" placeholder="Search" />*/}
              {/*  </div>*/}
              {/*  <button type="button" className="buttonDefault buttonWithIcon reloadButton">*/}
              {/*    <span className="buttonIcon"><ReloadIcon /></span>*/}
              {/*    <span>Reload</span>*/}
              {/*  </button>*/}
              {/*</div>*/}
              <div className="tableWrap">
                {widgetRecords?.length ?
                  <table className="table">
                    {
                      widgetRecords?.map((item: any, index: number) => (
                        <Fragment key={index.toString()}>
                          <tr onClick={handelContentModalRecordSelect.bind(this, item)}>
                            <td>
                              <span className="elementName">{item?.name}</span>
                            </td>
                            <td width={40} align="right">
                              {selectedWidgetRecord ? (
                                selectedWidgetRecord?.id === item?.id ? (
                                  <span className="checkBlueIcon">
                                    <CheckBlueIcon />
                                  </span>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </Fragment>
                      ))
                    }
                  </table>
                  :
                  <div className="no-data">
                    <NoPreviewIcon />
                    <h5>No widget found.</h5>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reactModalFooter">
        <button
          type="button"
          onClick={handelCloseButtonSelect}
        >
          Cancel
        </button>
        <button
          onClick={handelSaveClick}
          disabled={!selectedWidgetRecord?.id}
          className="buttonPrimary"
          type="button"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default ExpWidgetRecordSelectPopUp;
