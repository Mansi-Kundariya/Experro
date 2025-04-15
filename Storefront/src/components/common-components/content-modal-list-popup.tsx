/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';

import { ContentService } from '../../services';
import { CommonUtilities } from '../../utilities';
import { ContentModelListInterface } from '../../interfaces/content-modal-list-drop-down.interface';
import ExpContentModalPopUp from './content-modal-pop-up';

import { PencilIcon } from '../../assets/images/icons/pencil-icon';
import { LockIcon } from '../../assets/images/icons/lock-icon';
import { IconTrash } from '../../assets/images/icons/trash';
import { DragIcon } from '../../assets/images/icons/drag-icon';

const ExpContentModelListPopUp: React.FC<any> = ({
  contentModalData,
  changeHandler,
  modelInternalName,
  field,
  multiSelect,
  label,
}) => {
  let workspaceId: string, language: string;
  const parserValue = contentModalData?.length
    ? JSON.parse(contentModalData)
    : multiSelect
    ? []
    : {};
  const [contentModelList, setContentModelList] =
    useState<ContentModelListInterface[]>();
  const [selectedRecord, setSelectedRecord] = useState<any>(parserValue);
  const [highlightIndex, setHighlightIndex] = useState<any>(-1);
  const [dragStartIndex, setDragStartIndex] = useState<any>('');

  const {
    id,
    content_model_id,
    content_model_name,
    current_version_name,
    current_version_id,
    published_version_name,
    title,
    record_data_language,
  } = selectedRecord;
  let multiRecorTitle = '';
  if (multiSelect === 'on') {
    multiRecorTitle = selectedRecord
      ?.map((elem: any) => elem.title)
      ?.join(', ');
  }
  const [isContentModelPopUpOpen, setIsContentModelPopUpOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [draggedRecord, setDraggedRecord] = useState<any>({});

  const contentModalId =
    content_model_id ||
    (contentModelList?.length ? contentModelList[0]?.content_model_id : '');

  const callChgangeHandler = (data: any) => {
    let contentModalData;
    if (data?.length) {
      contentModalData = {
        target: {
          value: JSON.stringify(data),
        },
      };
    } else {
      contentModalData = {
        target: {
          value: '',
        },
      };
    }
    changeHandler(
      field ? field : 'contentModel',
      contentModalData,
      'exp_contentModalPopUp'
    );
  };
  
  const handelDeleteButtonClick = (recordToDelete: any) => {
    const filteredRecord = selectedRecord?.filter(
      (record: any) => recordToDelete.id !== record.id
    );
    setSelectedRecord(filteredRecord);
    callChgangeHandler(filteredRecord);
  };

  const onDragStart = (index: number) => {
    setDraggedRecord(selectedRecord[index]);
  };

  let itemsCopy: any = '';
  const onDragOver = (index, e) => {
    if (e.type === 'dragend') {
      if (itemsCopy) {
        callChgangeHandler(itemsCopy);
        setSelectedRecord(itemsCopy);
        setDraggedRecord(null);
      }
      const draggableDivArr = document.getElementsByClassName('imagesListItem');
      if (draggableDivArr) {
        for (let i = 0; i < draggableDivArr?.length; i++) {
          draggableDivArr[i]?.removeAttribute('draggable');
        }
      }
      return;
    }
    itemsCopy = selectedRecord.filter(
      (item: any) => item.id !== draggedRecord.id
    );
    itemsCopy.splice(index, 0, draggedRecord);
  };

  const handleDragMouseDown = () => {
    const draggableDivArr = document.getElementsByClassName('imagesListItem');
    if (draggableDivArr?.length > 1) {
      for (let i = 0; i < draggableDivArr?.length; i++) {
        draggableDivArr[i]?.setAttribute('draggable', 'true');
      }
    }
  };

  const handleDragMouseUp = () => {
    const draggableDivArr = document.getElementsByClassName('imagesListItem');
    if (draggableDivArr) {
      for (let i = 0; i < draggableDivArr?.length; i++) {
        draggableDivArr[i]?.removeAttribute('draggable');
      }
    }
  };

  const getContentModelList = async (id?: string) => {
    try {
      setIsLoading(true);
      const contentModelListResponse =
        await ContentService.getCollectionRecordsByCollectionInternalName({
          modelInternalName: modelInternalName,
        });
      setContentModelList(contentModelListResponse?.items);
      if (!id) {
        const updatedRecord = contentModelListResponse?.items?.find(
          (elem: any) => elem.id === parserValue?.id
        );
        if (updatedRecord) {
          setSelectedRecord(updatedRecord);
        }
      }
      setIsLoading(false);
      if (id) {
        const selectedContentModelRecord =
          contentModelListResponse?.items?.find(
            (record: any) => record.id === id
          );
        if (selectedContentModelRecord) {
          setSelectedRecord(selectedContentModelRecord);
          changeHandler(
            'editDataFlag',
            JSON.stringify(selectedContentModelRecord),
            'exp_contentModalPopUp'
          );
        }
      }
    } catch (error: any) {
      //TODO: add proper error message
      console.error(error);
      setIsLoading(false);
    }
  };

  if (contentModelList) {
    workspaceId = CommonUtilities.getWorkspaceId();
    language = CommonUtilities.getLanguage();
  }
  //@ts-ignore
  window.contentLibraryCallBack = (id: string) => {
    if (
      !contentModalData?.length ||
      (contentModalData?.length && JSON.parse(contentModalData)?.id !== id)
    ) {
      getContentModelList(id);
    } else {
      getContentModelList(JSON.parse(contentModalData || '{}')?.id);
    }
  };

  useEffect(() => {
    getContentModelList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!field && (
        <div className="gjs-field">
          <div className="gjs-label">Content Model</div>
          <div className="contentModelDisplay">
            <div className="contentModelName">
              {contentModelList
                ? contentModelList[0]?.content_model_name
                : content_model_name}
            </div>
            <div className="contentModelLocked">
              <LockIcon />
            </div>
          </div>
        </div>
      )}
      <div className="gjs-field">
        <div className="selectedProperty">
          <div
            onClick={setIsContentModelPopUpOpen.bind(this, true)}
            className="selectedPropertyValue"
            title={
              multiRecorTitle ? multiRecorTitle : title ? title : 'Select'
            }>
            <span>Choose {label}</span>
          </div>
          <button
            onClick={setIsContentModelPopUpOpen.bind(this, true)}
            className="iconButton">
            <PencilIcon />
          </button>
        </div>
      </div>
      <ExpContentModalPopUp
        setSelectedRecord={setSelectedRecord}
        isContentModalPopUpOpen={isContentModelPopUpOpen}
        setIsContentModalPopUpOpen={setIsContentModelPopUpOpen}
        contentModalList={contentModelList}
        selectedRecord={
          contentModalData?.length ? JSON.parse(contentModalData) : ''
        }
        multiSelect={multiSelect}
        field={field}
        changeHandler={changeHandler}
        isLoading={isLoading}
      />
      {published_version_name && !field && (
        <div className="versionDisplay">
          <span className="versionTitle">Version:</span>
          <span className="versionValue">
            {isLoading ? 'Loading...' : published_version_name}
          </span>
        </div>
      )}
      {!field && (
        <div className="custom-fields-two-btn">
          {current_version_name && (
            <div
              className="gjs-field"
              onClick={() => {
                if (
                  parent &&
                  parent.window &&
                  // @ts-ignore
                  parent.window.openContentLibrary
                ) {
                  // @ts-ignore
                  parent.window.openContentLibrary(
                    content_model_id,
                    id,
                    current_version_id,
                    modelInternalName,
                    CommonUtilities.getLanguage(),
                    record_data_language
                  );
                }
              }}>
              <button className="grape-btn">View content</button>
            </div>
          )}

          {!!contentModalId && (
            <div
              className="gjs-field"
              onClick={() => {
                if (
                  parent &&
                  parent.window &&
                  // @ts-ignore
                  parent.window.openContentLibrary
                ) {
                  // @ts-ignore
                  parent.window.openAddNewRecordModal(
                    contentModalId,
                    modelInternalName,
                    CommonUtilities.getLanguage()
                  );
                }
              }}>
              <button className="grape-btn">Add record</button>
            </div>
          )}
        </div>
      )}
      <div className="imagesListPanel">
        {multiSelect === 'on' &&
          selectedRecord?.length > 0 &&
          selectedRecord?.map((elem: any, index: number) => (
            <div
              id={`${index}`}
              onDragOver={onDragOver.bind(this, index)}
              onDragEnd={onDragOver.bind(this, index)}
              onDragStart={onDragStart.bind(this, index)}
              key={elem.id}
              className={`imagesListItem ${
                index === highlightIndex ? 'highlight' : ''
              } ${
                highlightIndex > dragStartIndex && index === highlightIndex
                  ? 'highlightdown'
                  : ''
              } ${
                highlightIndex < dragStartIndex && index === highlightIndex
                  ? 'highlightup'
                  : ''
              }`}>
              <div className="imageNameWrap">
                <span
                  onMouseDown={handleDragMouseDown}
                  onMouseUp={handleDragMouseUp}
                  className="dragIcon">
                  <DragIcon />
                </span>
                <span className="imageName">{elem.title}</span>
              </div>
              <button
                onClick={handelDeleteButtonClick?.bind(this, elem)}
                className="deleteIcon">
                <IconTrash />
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default ExpContentModelListPopUp;
