import React, { useState, useEffect, Fragment } from 'react';
import { TraitInterface } from '../../../interfaces/trait.interface';
import FormListPopUp from './form-list-pop-up';
import { PencilIcon } from '../../../assets/images/icons/pencil-icon';

const ExpFormBuilder: React.FC = ({
  value,
  changeHandler,
}: {
  value: string;
  changeHandler: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFormData, setselectedFormData] = useState<any>(
    value ? JSON.parse(value) : {}
  );
  const [formList, setFormList] = useState<any>([]);
  const [listIsLoading, setListIsLoading] = useState<any>(true);

  useEffect(() => {
    changeHandler(JSON.stringify(selectedFormData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFormData, changeHandler]);

  return (
    <>
      <div className="gjs-field">
        <div className="gjs-label">Form Record</div>
        <div className="selectedProperty">
          <div
            className={`selectedPropertyValue ${
              !formList?.length ? 'disabled' : ''
            }`}
            onClick={formList?.length && setIsModalOpen.bind(this, true)}
            title={
              selectedFormData?.display_name
                ? selectedFormData?.display_name
                : 'Select'
            }>
            <span>
              {formList?.length && !listIsLoading
                ? selectedFormData?.display_name
                  ? selectedFormData?.display_name
                  : 'Select'
                : listIsLoading
                ? 'Loading...'
                : 'No Form Record Available'}
            </span>
          </div>
          <button
            disabled={!formList?.length}
            onClick={setIsModalOpen.bind(this, true)}
            className="iconButton">
            <PencilIcon />
          </button>
        </div>
      </div>
      <FormListPopUp
        isPopUpOpen={isModalOpen}
        setIsPopUpOpen={setIsModalOpen}
        setSelectedFormData={setselectedFormData}
        selectedFormData={selectedFormData}
        setFormList={setFormList}
        formList={formList}
        setListIsLoading={setListIsLoading}
      />
    </>
  );
};

const expFormBuilderTrait: TraitInterface = {
  traitName: 'form-builder',
  component: ExpFormBuilder,
};

export default expFormBuilderTrait;
