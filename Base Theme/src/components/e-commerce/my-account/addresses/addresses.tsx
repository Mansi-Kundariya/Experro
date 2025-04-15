import ExpAddressesController from './addresses-controller';
import { IconWarning } from '../../../../assets/icons/warning-icon';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExpForm } from '../../../../utils';

const ExpAddresses = () => {
  const {
    userAddresses,
    handleAddressesForm,
    isShowAddressesForm,
    onDeleteAddress,
    onEditAddress,
    onCancelAddressesForm,
    addressFieldData,
    onSubmitAddressesForm,
    formRef,
    isEditAdressesForm,
    addressIndex,
  } = ExpAddressesController();

  const { t } = useTranslation();

  useEffect(() => {
    if (
      !userAddresses?.isLoading &&
      isShowAddressesForm &&
      isEditAdressesForm
    ) {
      Object.entries(userAddresses?.data?.addresses[addressIndex]).forEach(
        ([key, value]) => {
          if (formRef.current) formRef.current.setValue(key, value);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddresses, isShowAddressesForm, isEditAdressesForm, addressIndex]);

  return (
    <>
      {userAddresses?.isLoading ? (
        <div
          className={`loading-section ${userAddresses.isLoading ? 'is-loading' : ''
            }`}>
          <div className="loader-wrapper">
            <div className="loader-icon flex" />
          </div>
        </div>
      ) : (
        <>
          {!isShowAddressesForm && (
            <div className="account-body">
              <>
                {!!(userAddresses?.data?.addresses?.length === 0) && (
                  <div className="alertbox p-4 table my-8 mx-auto bg-neutral-100">
                    <div className="alertbox-icon table-cell pr-5">
                      <i className="icon inline-block align-middle min-w-6">
                        <IconWarning />
                      </i>
                    </div>
                    <p className="alertbox-message font-bold mb-0">
                      {t('common.txt_no_address_msg')}
                    </p>
                  </div>
                )}

                <ul className="flex flex-wrap addresslist list-style-none m-b-0 -mx-4">
                  {userAddresses?.data?.addresses?.map(
                    (adress: any, index: number) => (
                      <li
                        className="px-4 basis-full md:basis-6/12 lg:basis-4/12 address mb-4"
                        key={adress?.id}>
                        <div className="panel panel-body relative border border-solid border-neutral-200 min-h-[17.5rem] p-5 pb-16 h-full cursor-pointer">
                          {!!(adress?.first_name || adress?.last_name) && (
                            <h5 className="address-title text-base font-medium mb-2">
                              {adress?.first_name} {adress?.last_name}
                            </h5>
                          )}

                          <ul className="address-details list-style-none m-b-0">
                            {!!adress?.address1 && (
                              <li className="text-sm">{adress?.address1}</li>
                            )}
                            {!!adress?.address2 && (
                              <li className="text-sm">{adress?.address2}</li>
                            )}
                            {!!adress?.city && (
                              <li className="text-sm">
                                {adress?.city}, {adress?.state_or_province}
                                {adress?.postal_code}
                              </li>
                            )}
                            {adress?.country && (
                              <li className="text-sm">{adress?.country}</li>
                            )}
                          </ul>

                          {!!adress?.address_type && (
                            <dl className="address-details">
                              <dt className="address-label inline-block text-sm mr-1">
                                {t('common.txt_address_type')}:
                              </dt>
                              <dd className="address-description inline-block text-sm">
                                {adress?.address_type}
                              </dd>
                            </dl>
                          )}

                          {!!adress?.phone && (
                            <dl className="address-details">
                              <dt className="address-label inline-block text-sm mr-1">
                                {t('common.txt_phone')}:
                              </dt>
                              <dd className="address-description inline-block text-sm">
                                {adress?.phone}
                              </dd>
                            </dl>
                          )}
                          <>
                            {Object?.keys(
                              adress?.dynamic_field_values || {}
                            )?.map((field: any, index: number) => {
                              return (
                                <React.Fragment key={index.toString()}>
                                  {Boolean(
                                    adress?.dynamic_field_values[field]
                                  ) && (
                                      <dl className="address-details">
                                        <dt className="address-label inline-block text-sm mr-1">
                                          {field}:
                                        </dt>
                                        <dd className="address-description inline-block text-sm">
                                          {adress?.dynamic_field_values[field]}
                                        </dd>
                                      </dl>
                                    )}
                                </React.Fragment>
                              );
                            })}
                          </>

                          <div className="form-address-actions mt-4 px-5 absolute left-0 right-0 bottom-4">
                            <button
                              className="button button-primary button-small"
                              onClick={() => onEditAddress(adress, index)}>
                              {t('common.txt_edit')}
                            </button>
                            <button
                              className="button button-secondary button-small ml-4"
                              onClick={() => onDeleteAddress(adress)}>
                              {t('common.txt_delete')}
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  )}

                  <li className="px-4 basis-full md:basis-6/12 lg:basis-4/12 address mb-4">
                    <div
                      className="panel text-center relative border border-solid border-neutral-200 min-h-[17.5rem] p-5 pb-10 h-full cursor-pointer"
                      onClick={() => handleAddressesForm()}>
                      <span className="address-addnew absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                        <span className="address-icon text-5xl text-black">
                          +
                        </span>
                        <h5 className="address-title font-medium text-base mb-0">
                          {t('common.txt_new_address')}
                        </h5>
                      </span>
                    </div>
                  </li>
                </ul>
              </>
            </div>
          )}
        </>
      )}

      {!!isShowAddressesForm && (
        <>
          <ExpForm
            ref={formRef}
            config={addressFieldData}
            onSubmit={onSubmitAddressesForm}
            buttonText={t('common.txt_save_address')}
            buttonClass="button-primary button-large w-full md:w-auto"
          />
          <div className="form-actions text-center mt-4">
            <button
              className="button-secondary button-large sm:ml-4 lg:ml-0 w-full sm:w-auto mt-2 sm:mt-0"
              onClick={(e) => onCancelAddressesForm(e)}>
              {t('common.txt_cancel')}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ExpAddresses;
