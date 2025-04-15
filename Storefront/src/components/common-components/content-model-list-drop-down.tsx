/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';

import { ContentService } from '../../services';
import { CommonUtilities } from '../../utilities';
import {
  ContentModelListInterface,
  ExpContentModelListDropDownProps,
} from '../../interfaces/content-modal-list-drop-down.interface';
import ExpContentModalPopUp from './content-modal-pop-up';

import { PencilIcon } from '../../assets/images/icons/pencil-icon';
import { LockIcon } from '../../assets/images/icons/lock-icon';

const ExpContentModelListDropDown: React.FC<
  ExpContentModelListDropDownProps
> = ({ value, changeHandler, modelInternalName }) => {
  let workspaceId: string, language: string;
  const parserValue = value?.length ? JSON.parse(value) : '';
  const [contentModelList, setContentModelList] =
    useState<ContentModelListInterface[]>();
  const [selectedRecord, setSelectedRecord] = useState<any>(parserValue);
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
  const [isContentModelPopUpOpen, setIsContentModelPopUpOpen] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const contentModalId = content_model_id
    ? content_model_id
    : contentModelList?.length && contentModelList[0]?.content_model_id;

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
            JSON.stringify(selectedContentModelRecord)
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
    if (!value?.length || JSON.parse(value)?.id !== id) {
      getContentModelList(id);
    } else {
      changeHandler('editDataFlag', value);
    }
  };

  useEffect(() => {
    getContentModelList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
      <div className="gjs-field">
        <div className="gjs-label">Content Model Record</div>
        <div className="selectedProperty">
          <div
            className="selectedPropertyValue"
            title={title ? title : 'Select'}>
            <span>{title ? title : 'Select'}</span>
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
        selectedRecord={parserValue}
        changeHandler={changeHandler}
        isLoading={isLoading}
      />
      {published_version_name && (
        <div className="versionDisplay">
          <span className="versionTitle">Version:</span>
          <span className="versionValue">
            {isLoading ? 'Loading...' : published_version_name}
          </span>
        </div>
      )}
      <div className="custom-fields-two-btn">
        {!!current_version_name && (
          <div
            className="gjs-field"
            onClick={() => {
              // @ts-ignore
              if (parent && parent.window && parent.window.openContentLibrary) {
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
              // @ts-ignore
              if (parent && parent.window && parent.window.openContentLibrary) {
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
    </>
  );
};

export default ExpContentModelListDropDown;
