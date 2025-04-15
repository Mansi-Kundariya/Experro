/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef, useState } from 'react';
import { AuthService, toast } from 'experro-storefront';
import { useTranslation } from 'react-i18next';

const ExpAddressesController = () => {
  const [userAddresses, setUserAdresses] = useState<{
    data: any;
    isLoading: boolean;
  }>({
    data: [],
    isLoading: true,
  });
  const [isShowAddressesForm, setIsAddressesForm] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<any>([]);
  const [isEditAdressesForm, setEditAdressesForm] = useState<boolean>(false);
  const [addressIndex, setAddressIndex] = useState<number>(0);
  const formRef = useRef<any>(null);

  const { t } = useTranslation();

  const handleCountryChange = async (e: any) => {
    const optionID =
      e.target.childNodes[e.target.selectedIndex].getAttribute('id');
    if (optionID) {
      if (formRef.current) {
        formRef.current.setValue('state_or_province', '');
      }
      const states = await AuthService.getStates(optionID);
      if (states?.Data?.length) {
        states?.Data?.forEach((state: any) => {
          state['label'] = state?.state;
          state['value'] = state?.state;
        });
        setaddressFieldData((previousAddressFieldData: any) =>
          previousAddressFieldData?.map((fieldItem: any) => {
            if (fieldItem?.requisite?.name === 'state_or_province') {
              fieldItem.field = 'dropdown';
              fieldItem.requisite.options = states?.Data;
            }
            return fieldItem;
          })
        );
      } else {
        setaddressFieldData((previousAddressFieldData: any) =>
          previousAddressFieldData?.map((fieldItem: any) => {
            if (fieldItem?.requisite?.name === 'state_or_province') {
              fieldItem.field = 'text';
              delete fieldItem?.requisite?.options;
            }
            return fieldItem;
          })
        );
      }
    }
  };

  const fieldData: any[] = [
    {
      field: 'text',
      requisite: {
        name: 'first_name',
        labelValue: 'First Name',
        placeholder: 'First Name',
        className: 'px-4 basis-full md:basis-6/12',
        validation: {
          required: { value: true, message: 'First Name is required.' },
        },
      },
    },
    {
      field: 'text',
      requisite: {
        name: 'last_name',
        labelValue: 'Last Name',
        placeholder: 'Last Name',
        className: 'px-4 basis-full md:basis-6/12',
        validation: {
          required: { value: true, message: 'Last Name is required.' },
        },
      },
    },
    {
      field: 'text',
      requisite: {
        name: 'phone',
        labelValue: 'Phone',
        placeholder: 'Phone',
        className: 'px-4 basis-full md:basis-6/12',
        validation: {
          required: { value: true, message: 'Phone is required.' },
        },
      },
    },
    {
      field: 'text',
      requisite: {
        name: 'address1',
        labelValue: 'Address Line 1',
        placeholder: 'Address Line 1',
        className: 'px-4 basis-full md:basis-6/12',
        validation: {
          required: { value: true, message: 'Address Line 1 is required.' },
        },
      },
    },
    {
      field: 'text',
      requisite: {
        name: 'address2',
        labelValue: 'Address Line 2',
        placeholder: 'Address Line 2',
        className: 'px-4 basis-full md:basis-6/12',
      },
    },
    {
      field: 'text',
      requisite: {
        name: 'city',
        labelValue: 'City',
        placeholder: 'City',
        className: 'px-4 basis-full md:basis-6/12',
        validation: {
          required: { value: true, message: 'City is required.' },
        },
      },
    },
    {
      field: 'dropdown',
      requisite: {
        name: 'country_code',
        labelValue: 'Country',
        value: '',
        onFieldChange: handleCountryChange,
        placeholder: 'Country',
        className: 'px-4 basis-full md:basis-6/12',
        options: countriesData,
        validation: {
          required: { value: true, message: 'Country is required.' },
        },
      },
    },
    {
      field: 'text',
      requisite: {
        name: 'state_or_province',
        labelValue: 'State/Province',
        placeholder: 'State/Province',
        className: 'px-4 basis-full md:basis-6/12',
        validation: {
          required: { value: true, message: 'State/Province is required.' },
        },
      },
    },
    {
      field: 'text',
      requisite: {
        name: 'postal_code',
        labelValue: 'Zip/Postcode',
        placeholder: 'Zip/Postcode',
        className: 'px-4 basis-full md:basis-6/12',
        validation: {
          required: { value: true, message: 'Zip/Postcode is required.' },
        },
      },
    },
    {
      field: 'dropdown',
      requisite: {
        name: 'address_type',
        labelValue: 'Address type',
        placeholder: 'Choose an address type',
        className: 'px-4 basis-full md:basis-6/12',
        options: [
          {
            label: 'Residential',
            value: 'residential',
            isSelected: true,
            checked: true,
          },
          {
            label: 'Commercial',
            value: 'commercial',
            isSelected: false,
            checked: false,
          },
        ],
        validation: {
          required: { value: true, message: 'Address type is required.' },
        },
      },
    },
  ];
  const [addressFieldData, setaddressFieldData] = useState<any>(fieldData);

  const getAdresses = async () => {
    try {
      const customerAddresses = await AuthService.getCustomerAddresses();
      setUserAdresses({
        isLoading: false,
        data: customerAddresses?.Data,
      });
      if (customerAddresses?.Data?.dynamic_fields?.length) {
        createDynamicFormFields(customerAddresses?.Data);
      }
    } catch (error) {
      setUserAdresses({
        isLoading: false,
        data: [],
      });
    }
  };

  const createDynamicFormFields = (adressesData: any) => {
    adressesData?.dynamic_fields?.forEach((field: any) => {
      const convertedField: any = {
        field: field?.fieldType,
        requisite: {
          name: `${field?.label}_dynamic`,
          labelValue: field?.label,
          className: 'px-4 basis-full md:basis-6/12',
          placeholder: field?.label,
          key: field?.key,
          validation: {
            required: {
              value: field?.required,
              message: `${field?.label} is required.`,
            },
          },
        },
      };
      if (field?.options && field?.fieldType === 'checkbox') {
        //converts the customers response data to the React-Form's radio-input/checkbox-input format
        const convertedOptions = field?.options?.items?.map(
          (item: any, index: number) => ({
            key: index,
            value: item?.label,
            labelValue: item?.label,
            checked: item?.value,
          })
        );
        convertedField.requisite.options = convertedOptions;
      }

      fieldData.push(convertedField);
    });
    setaddressFieldData(fieldData);
  };

  const getCountriesData = async () => {
    try {
      const customersCountryData = await AuthService.getCountries();
      if (customersCountryData?.Data?.length) {
        customersCountryData?.Data?.forEach((Country: any) => {
          Country['label'] = Country?.country;
          Country['value'] = Country?.country_iso2;
        });
        setCountriesData(customersCountryData?.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressesForm = () => {
    setIsAddressesForm(true);
    setEditAdressesForm(false);
  };

  const onDeleteAddress = async (adress: any) => {
    try {
      const deleteAddressResponse = await AuthService.deleteCustomerAddress(
        adress?.id
      );
      if (deleteAddressResponse?.Status === 'success') {
        getAdresses();
        toast.success(t('toast_msg_success.address_delete'));
      } else {
        toast.error(t('toast_msg_error.something_went_wrong'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEditAddress = async (adress: any, index: number) => {
    setAddressIndex(index);
    if (adress?.dynamic_field_values) {
      const dynamic_field_values = adress?.dynamic_field_values || {};
      const updatedObj = Object.keys(dynamic_field_values)?.reduce(
        (dynamicField: any, key: any) => {
          const newKey = `${key}_dynamic`;
          dynamicField[newKey] = dynamic_field_values[key];
          return dynamicField;
        },
        {}
      );
      Object.assign(adress, updatedObj);
      delete adress?.dynamic_field_values;
    }

    if (adress?.state_or_province) {
      const selectedCountry = countriesData?.filter(
        (country: any) =>
          country?.country_iso2 === adress?.country_code ||
          country?.country_iso3 === adress?.country_code
      );
      if (selectedCountry?.length) {
        const states = await AuthService.getStates(selectedCountry?.[0]?.id);
        if (states?.Data?.length) {
          states?.Data?.forEach((state: any) => {
            state['label'] = state?.state;
            state['value'] = state?.state;
          });
          setaddressFieldData((previousAddressFieldData: any) =>
            previousAddressFieldData?.map((fieldItem: any) => {
              if (fieldItem?.requisite?.name === 'state_or_province') {
                fieldItem.field = 'dropdown';
                fieldItem.requisite.options = states?.Data;
              }
              return fieldItem;
            })
          );
        } else {
          setaddressFieldData((previousAddressFieldData: any) =>
            previousAddressFieldData?.map((fieldItem: any) => {
              if (fieldItem?.requisite?.name === 'state_or_province') {
                fieldItem.field = 'text';
              }
              return fieldItem;
            })
          );
        }
      }
    }

    setIsAddressesForm(true);
    setEditAdressesForm(true);
  };

  const onSubmitAddressesForm = async (bodyData: any) => {
    const formFields: any = [];
    let adressResponse: any;
    for (const key of Object.keys(bodyData)) {
      const dynamicIndex = key.indexOf('_dynamic');
      if (dynamicIndex > -1) {
        formFields.push({
          name: key.substring(0, dynamicIndex),
          value: bodyData[key],
        });
        delete bodyData[key];
      }
    }
    try {
      if (isEditAdressesForm) {
        adressResponse = await AuthService.updateCustomerAddress({
          ...bodyData,
          form_fields: formFields,
        });
        if (adressResponse?.Status === 'success') {
          toast.success(t('toast_msg_success.address_update'));
          setEditAdressesForm(false);
        }
      } else {
        adressResponse = await AuthService.createCustomerAddress({
          ...bodyData,
          form_fields: formFields,
        });
        if (adressResponse?.Status === 'success') {
          toast.success(t('toast_msg_success.address_added'));
        }
      }
      if (adressResponse?.Status === 'success') {
        getAdresses();
        setIsAddressesForm(false);
      } else {
        toast.error(t('toast_msg_error.something_went_wrong'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCancelAddressesForm = (e: any) => {
    e.preventDefault();
    setIsAddressesForm(false);
  };

  useEffect(() => {
    getAdresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let tempAddressFieldData: any = [...addressFieldData];
    tempAddressFieldData = tempAddressFieldData.map((field: any) => {
      if (field?.requisite?.name === 'country_code') {
        field.requisite.options = countriesData;
      }
      return field;
    });
    setaddressFieldData(tempAddressFieldData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesData]);

  useEffect(() => {
    if (isShowAddressesForm && countriesData?.length === 0) {
      getCountriesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowAddressesForm]);

  return {
    userAddresses,
    handleAddressesForm,
    isShowAddressesForm,
    onDeleteAddress,
    onCancelAddressesForm,
    fieldData,
    addressFieldData,
    onEditAddress,
    onSubmitAddressesForm,
    formRef,
    isEditAdressesForm,
    addressIndex,
  };
};

export default ExpAddressesController;
