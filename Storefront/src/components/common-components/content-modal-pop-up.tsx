import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CheckBlueIcon } from '../../assets/images/icons/check-blue';
import { CloseIcon } from '../../assets/images/icons/close-icon';
import SpinIcon from '../../assets/images/icons/spin-icon';
import NoPreviewIcon from '../../assets/images/icons/no-preview-icon';
import { ExternalLinkIcon } from '../../assets/images/icons/external-link-icon';
import { CommonUtilities } from '../../utilities';

const ExpContentModalPopUp: React.FC<any> = ({
  isContentModalPopUpOpen,
  setIsContentModalPopUpOpen,
  contentModalList,
  selectedRecord,
  changeHandler,
  setSelectedRecord,
  field = 'contentModel',
  multiSelect,
  isLoading,
}) => {
  const initialValue = multiSelect ? [] : {};
  const [selectedContentModel, setSelectedContentModel] = useState<any>(
    selectedRecord || initialValue
  );
  const [searchText, setSearchText] = useState<any>('');
  const [showList, setShowList] = useState<any>(contentModalList);

  const handelContentModalRecordSelect = (record: any) => {
    if (multiSelect === 'on') {
      const tempSelectedContentModel = [...selectedContentModel];
      const foundContentModel = tempSelectedContentModel?.find(
        (elem: any) => elem.id === record.id
      );
      if (foundContentModel) {
        const updatedArr = tempSelectedContentModel?.filter(
          (elem: any) => elem.id !== record.id
        );
        setSelectedContentModel(updatedArr);
      } else {
        tempSelectedContentModel.push(record);
        setSelectedContentModel(tempSelectedContentModel);
      }
    } else {
      setSelectedContentModel(record);
    }
  };

  const handelCloseButtonSelect = () => {
    setSearchText('');
    setIsContentModalPopUpOpen(false);
    setSelectedContentModel(selectedRecord);
  };

  const handelSaveClick = () => {
    let contentModalData;
    if (
      (selectedContentModel?.length && multiSelect === 'on') ||
      (multiSelect !== 'on' && selectedContentModel?.id)
    ) {
      contentModalData = {
        target: {
          value: JSON.stringify(selectedContentModel),
        },
      };
    } else {
      contentModalData = {
        target: {
          value: '',
        },
      };
    }
    setSearchText('');
    setSelectedRecord(selectedContentModel);
    changeHandler(field, contentModalData, 'exp_contentModalPopUp');
    setIsContentModalPopUpOpen(false);
  };

  const checkContentModelIsSelected = (record: any) => {
    if (multiSelect === 'on') {
      const ids = selectedContentModel?.map((elem: any) => elem.id);
      if (ids.includes(record.id)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (record.id === selectedContentModel?.id) {
        return true;
      } else {
        return false;
      }
    }
  };

  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
    filterDataBySearch(e);
  };

  const filterDataBySearch = (e) => {
    const matchedData = showList.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    const un_matched_data = showList.filter(
      (item) => !item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    const finalSearchedData = [...matchedData, ...un_matched_data];
    setShowList(finalSearchedData);
  };

  const highlightSearchedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="searchHighlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleModelClose = () => {
    setSearchText('');
    setIsContentModalPopUpOpen(false);
  };

  useEffect(() => {
    setSelectedContentModel(selectedRecord);
  }, [selectedRecord]);

  useEffect(() => {
    setShowList(contentModalList);
  }, [contentModalList]);

  return (
    <Modal
      className={'smallReactModal content-modal-popup storefront-modal'}
      isOpen={isContentModalPopUpOpen}
      onRequestClose={() => handleModelClose()}
      appElement={document.getElementById('__experro_gjs_iframe__')}
      contentLabel="Content Model Select">
      <div className="reactModalHeader">
        <h5>Select Record </h5>
        <button
          onClick={() => handleModelClose()}
          className="reactModalCloseButton"
          type="button">
          <CloseIcon />
        </button>
      </div>

      <div className="reactModalBody">
        <div className="modalSearchPanel">
          <input
            type="text"
            placeholder="Search record"
            className="searchInput"
            onChange={onChangeHandler}></input>
        </div>
        <div className="tableWrap">
          {contentModalList && showList && showList.length && !isLoading ? (
            <table className="table">
              {showList?.map((item: any, index: number) => (
                <Fragment key={index.toString()}>
                  <tr
                    className={`${
                      selectedContentModel?.id === item?.id ? 'selectedRow' : ''
                    }`}
                    onClick={handelContentModalRecordSelect.bind(this, item)}>
                    <td>
                      <span className="elementName">
                        <span className="elementNameText">
                          {highlightSearchedText(item.title, searchText)}
                        </span>
                        <span className="linkIcon">
                          <a
                            target="_blank"
                            className=""
                            href={`https://${
                              window.location.hostname
                            }/workspaces/${CommonUtilities.getWorkspaceId()}/content-library/collection-type/${
                              item?.content_model_id && item?.content_model_id
                            }/field/${item?.id}/version/${
                              item?.current_version_id
                            }/language/en-us?is_iframe=false`}
                            rel="noreferrer">
                            <ExternalLinkIcon />
                          </a>
                        </span>
                      </span>
                    </td>
                    <td width={40} align="right">
                      {selectedContentModel ? (
                        checkContentModelIsSelected(item) ? (
                          <span className="checkBlueIcon">
                            <CheckBlueIcon />
                          </span>
                        ) : (
                          ''
                        )
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                </Fragment>
              ))}
            </table>
          ) : isLoading ? (
            <div className="loader">
              <div className="spinner">
                <SpinIcon />
              </div>
            </div>
          ) : (
            <div className="no-data">
              <>
                <NoPreviewIcon />
              </>
              <h5>No record found.</h5>
              <span>Please try again after you publish the records.</span>
            </div>
          )}
        </div>
      </div>
      <div className="reactModalFooter">
        <button type="button" onClick={handelCloseButtonSelect}>
          Cancel
        </button>
        <button
          onClick={handelSaveClick}
          disabled={
            (multiSelect !== 'on' && !selectedContentModel?.id) ||
            !showList?.length
          }
          className="buttonPrimary"
          type="button">
          Save
        </button>
      </div>
    </Modal>
  );
};

export default ExpContentModalPopUp;
