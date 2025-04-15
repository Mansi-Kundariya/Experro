import { useEffect, useRef, useState } from 'react';
import { AuthService, toast } from 'experro-storefront';
import { useTranslation } from 'react-i18next';


interface CommonDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  accepts_product_review_abandoned_cart_emails?: boolean;
}

interface CustomerDetailsResponse {
  common_details: CommonDetails;
  dynamic_details: any;
}

const ExpAccountSettingsController = () => {
  const [dynamicForm, setDynamicForm] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commonData, setCommonData] = useState<any>([]);

  const { t } = useTranslation();
  const formRef = useRef<any>(null);

  const passwordFields = [
    {
      field: 'password',
      requisite: {
        name: 'password',
        labelValue: 'Password',
        placeholder: 'Password',
        className: 'px-4 basis-full md:basis-6/12',
      },
    },
    {
      field: 'password',
      requisite: {
        name: 'confirm_password',
        labelValue: 'Confirm Password',
        placeholder: 'Confirm Password',
        className: 'px-4 basis-full md:basis-6/12',
      },
    },
  ];

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
        name: 'email',
        labelValue: 'E-mail',
        placeholder: 'E-mail',
        className: 'px-4 basis-full md:basis-6/12',
        validation: {
          required: { value: true, message: 'E-mail is required.' },
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
  ];
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async () => {
    try {
      const userDetail = await AuthService.getCustomerDetails();
      setIsLoading(false);
      const customerData: CustomerDetailsResponse = userDetail?.Data;
      delete customerData?.common_details[
        'accepts_product_review_abandoned_cart_emails'
      ];
      setCommonData(customerData?.common_details);
      const convertedFormFieldArray = customerData?.dynamic_details?.map(
        (field: any, index: number) => {
          const convertedField: any = {
            key: index,
            field: field?.fieldType,
            requisite: {
              name: field?.label,
              labelValue: field?.label,
              className: 'px-4 basis-full md:basis-6/12',
              placeholder: field?.label,
              validation: {
                required: {
                  value: field?.required,
                  message: `${field?.label} is required.`,
                },
              },
            },
          };

          if (field?.options) {
            convertedField.requisite.options = field?.options.items;

            const convertedObject = convertedField?.requisite?.options?.map(
              (item: any) => ({
                value: item?.label,
                label: item?.label,
                isSelected: field?.value
                  ? typeof field?.value === 'object'
                    ? field?.value.includes(item?.label)
                    : field?.value === item?.label
                      ? true
                      : false
                  : false,
              })
            );
            convertedField.requisite.options = convertedObject;
          }

          return convertedField;
        }
      );

      convertedFormFieldArray.push(passwordFields[0]);
      convertedFormFieldArray.push(passwordFields[1]);
      setDynamicForm([...fieldData, ...convertedFormFieldArray]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (CommonDataObject: any, dynamicDataObject: any) => {
    try {
      if (dynamicDataObject.password === dynamicDataObject.confirm_password) {
        if (dynamicDataObject.password && dynamicDataObject.password.length) {
          CommonDataObject.password = dynamicDataObject.password;
          delete dynamicDataObject.confirm_password;
          delete CommonDataObject?.company;
          delete dynamicDataObject.password;
          const resp: any = await AuthService.updateCustomerDetails(
            CommonDataObject,
            dynamicDataObject
          );

          if (resp) {
            toast.success(t('toast_msg_success.user_detail_update'));
          }
        } else {
          delete dynamicDataObject.confirm_password;
          delete dynamicDataObject.password;
          delete CommonDataObject?.company;
          const resp: any = await AuthService.updateCustomerDetails(
            CommonDataObject,
            dynamicDataObject ? dynamicDataObject : {}
          );
          if (resp) {
            toast.success(t('toast_msg_success.user_detail_update'));
          }
        }
      } else {
        toast.error(t('toast_msg_error.pass_and_confirm_pass_match'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitAdressesForm = async (bodyData: any) => {
    const CommonDataObject: any = {};
    const dynamicDataObject: any = {};

    for (const key in bodyData) {
      if (commonData.hasOwnProperty(key) && bodyData.hasOwnProperty(key)) {
        CommonDataObject[key] = bodyData[key];
      } else {
        dynamicDataObject[key] = bodyData[key];
      }
    }

    updateUser(CommonDataObject, dynamicDataObject);
  };

  return {
    dynamicForm,
    onSubmitAdressesForm,
    isLoading,
    formRef,
    commonData,
  };
};

export default ExpAccountSettingsController;
