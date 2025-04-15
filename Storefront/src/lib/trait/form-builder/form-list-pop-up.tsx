import { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ContentService } from '../../../services';
import { CloseIcon } from '../../../assets/images/icons/close-icon';
import { CheckBlueIcon } from '../../../assets/images/icons/check-blue';
import React from 'react';
import NoPreviewIcon from '../../../assets/images/icons/no-preview-icon';

const FormListPopUp = ({
  isPopUpOpen,
  setIsPopUpOpen,
  setSelectedFormData,
  selectedFormData,
  setFormList,
  formList,
  setListIsLoading,
}: {
  setSelectedFormData?: any;
  isPopUpOpen?: any;
  setIsPopUpOpen?: any;
  selectedFormData?: any;
  setFormList?: any;
  formList?: any;
  setListIsLoading?: any;
}) => {
  const [selectedFormRecord, setSelectedFormRecord] =
    useState<any>(selectedFormData);
  const [isLoading, setIsLoading] = useState<any>(true);
  const handelContentModalRecordSelect = (record: any) => {
    setSelectedFormRecord(record);
  };

  const parseFormObj = (formRecord: any) => {
    try {
      return {
        ...formRecord,
        form_builder: JSON.parse(formRecord?.form_builder),
      };
    } catch {
      return formRecord;
    }
  };

  const handelCloseButtonSelect = () => {
    setIsPopUpOpen(false);
    setSelectedFormData(parseFormObj(selectedFormRecord));
  };

  const handelSaveClick = () => {
    setSelectedFormData(parseFormObj(selectedFormRecord));
    setIsPopUpOpen(false);
  };

  const getFormList = async () => {
    try {
      const formList = await ContentService.getForms();
      if (formList?.Status === 'success') {
        setFormList(formList?.Data?.item?.items);
      }
      setIsLoading(false);
      setListIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setListIsLoading(false);
    }
  };

  useEffect(() => {
    getFormList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      className={'smallReactModal content-modal-popup storefront-modal'}
      isOpen={isPopUpOpen}
      onRequestClose={() => setIsPopUpOpen(false)}
      appElement={document.getElementById('__experro_gjs_iframe__')}
      contentLabel="Content Model Select">
      <div className="reactModalHeader">
        <h5>Select Record</h5>
        <button
          onClick={setIsPopUpOpen.bind(this, false)}
          className="reactModalCloseButton"
          type="button">
          <CloseIcon />
        </button>
      </div>
      <div className="reactModalBody">
        <div className="tableWrap">
          {!isLoading ? (
            formList?.length ? (
              <table className="table">
                {formList?.map((item: any, index: number) => (
                  <Fragment key={index.toString()}>
                    <tr
                      className={`${
                        selectedFormRecord?.id === item?.id ? 'selectedRow' : ''
                      }`}
                      onClick={handelContentModalRecordSelect.bind(this, item)}>
                      <td>
                        <span className="elementName">
                          {item?.display_name}
                        </span>
                      </td>
                      <td width={40} align="right">
                        {selectedFormRecord ? (
                          selectedFormRecord?.id === item?.id ? (
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
            ) : (
              <div className="no-data">
                <>
                  <NoPreviewIcon />
                </>
                <h5>No record found.</h5>
              </div>
            )
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="reactModalFooter">
        <button type="button" onClick={handelCloseButtonSelect}>
          Cancel
        </button>
        <button
          onClick={handelSaveClick}
          disabled={!selectedFormRecord}
          className="buttonPrimary"
          type="button">
          Save
        </button>
      </div>
    </Modal>
  );
};

export default FormListPopUp;
