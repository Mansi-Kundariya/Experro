import { createRef, useEffect, useState } from 'react';
import {
  ContentService,
  EcommerceService,
  // toast,
  IsCMSApp,
  useNavigate,
} from 'experro-storefront';
import { ExpFormLayoutOne, ExpFormLayoutTwo } from './form-layout';
import { ExpFormBuilderField } from './interface';
import ExpFormValidationAndChangeHandler from './validation-and-change-handler';
import ReCAPTCHA from 'react-google-recaptcha';
const recaptchaRef = createRef<ReCAPTCHA>();

let initialValue: ExpFormBuilderField[];
const ExpFormBuilderController = ({
  layout,
  formData,
  hiddenField,
}: {
  layout?: string;
  formData?: any;
  hiddenField?: any;
}) => {
  const [___formData, setFormData] = useState<any>(formData);
  const [formFields, setFormFields] = useState<ExpFormBuilderField[]>([]);
  const [formSubmitStatus, setFormSubmitStatus] = useState(false);
  const [formSubmited, setFormSubmited] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const [token, setToken] = useState<{ data: string; loaded: boolean }>({
    data: '',
    loaded: false,
  });

  function resetToken() {
    setToken({
      data: '',
      loaded: true,
    });
  }
  // here i change
  function onChange(value: any) {
    setToken({ ...token, data: value });
  }

  useEffect(() => {
    setTimeout(() => {
      setToken({ ...token, loaded: true });
    }, 1000);
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate: any = IsCMSApp ? useNavigate() : '';

  const getFormFieldByFormId = async () => {
    try {
      if (formData?.id) {
        const __formField = await ContentService.getFormFieldsByFormId({
          formId: formData?.id,
        });

        if (__formField?.Status === 'success') {
          setFormFields(__formField?.Data?.item?.form_builder);
          initialValue = JSON.parse(
            JSON.stringify(__formField?.Data?.item?.form_builder)
          );
          setIsLoading(false);
          setFormData(__formField?.Data?.item);
        } else {
          setFormData({});
          setFormFields([]);
          setIsLoading(false);
        }
      }
    } catch (e) {
      setFormData(formData || {});
      setFormFields([]);
      setIsLoading(false);
    }
  };

  const ExpLayout: any = (() => {
    switch (layout) {
      case 'layout1':
        return ExpFormLayoutOne;
      case 'layout2':
        return ExpFormLayoutTwo;
      default:
        return ExpFormLayoutOne;
    }
  })();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoadingData(true);

    let updatedFormFields: ExpFormBuilderField[] | undefined = [];

    // here i change
    formFields.forEach((field: ExpFormBuilderField) => {
      const event =
        field?.type !== 'media'
          ? {
              target: {
                name: field?.properties?.internalName,
                value: field?.value,
              },
            }
          : {
              target: {
                name: field?.properties?.internalName,
                files: field?.value,
              },
            };

      updatedFormFields = ExpFormValidationAndChangeHandler({
        formField: field,
        event,
        setFormFields,
        formFields,
        calledBySubmit: true,
        hiddenField: hiddenField,
      });
    });
    setFormFields(updatedFormFields);

    const isInvalidFieldPresent = updatedFormFields.some(
      (val) =>
        val?.isValidInput === false ||
        (val.properties.isRequired === true && !val?.value)
    );

    // If all fields are valid then will prepare final formData
    if (!isInvalidFieldPresent) {
      setFormSubmitStatus(true);
      const formMapping: any = {};
      let formFiles: any = [];
      const _formData = new FormData();

      for (let field = 0; field < formFields.length; field++) {
        if (formFields[field].type === 'checkbox') {
          formMapping[`${formFields[field]?.properties?.internalName}`] =
            formFields[field]?.value?.join(',') || '';
        } else if (formFields[field].type === 'media') {
          const files = formFields[field]?.value || [];
          formMapping[`${formFields[field]?.properties?.internalName}`] =
            Array.from(files)
              ?.map((file: any) => file.name)
              .join(',') || '';
          formMapping[`${formFields[field]?.properties?.internalName}_images`] =
            Array.from(files)?.map((file: any) => file.name) || '';
          formFiles = [...formFiles, ...files];
        } else if (formFields[field].type === 'hiddenField') {
          formMapping[`${formFields[field]?.properties?.internalName}`] =
            hiddenField || formFields[field]?.value || '';
        } else {
          formMapping[`${formFields[field]?.properties?.internalName}`] =
            formFields[field]?.value?.trim() || '';
        }
      }
      try {
        let userIpInfo: any = localStorage.getItem('_user_location');
        if (userIpInfo) {
          userIpInfo = JSON.parse(userIpInfo);
          if (userIpInfo?.user_ip) {
            formMapping['contactIp'] = userIpInfo?.user_ip;
          }
        }
      } catch (error) {
        console.error(error);
      }

      _formData.append(
        'formData',
        JSON.stringify({ form_mapping: formMapping })
      );
      formFiles?.forEach((file: any) => {
        _formData.append('files', file);
      });

      try {
        const response = await EcommerceService.emailTemplateForms(
          formData.id,
          _formData
        );
        if (response?.Status === 'success') {
          setFormFields(initialValue);
          setIsLoadingData(false);
          if (___formData?.success_action?.redirect) {
            const redirectLink: any = ___formData?.success_action?.redirect;
            if (redirectLink?.startsWith('/')) {
              navigate(redirectLink);
            } else {
              if (redirectLink.startsWith(window.location.origin)) {
                navigate(
                  `${redirectLink.slice(window.location.origin.length)}`
                );
              } else {
                window.location.href = redirectLink;
              }
            }
          } else if (___formData?.success_action?.text) {
            setFormSubmited(response?.Data?.item);
            // toast.success(formData.success_action.text);
          } else if (response?.Data?.item) {
            setFormSubmited(response?.Data?.item);
          }
        } else {
          setIsLoadingData(false);
        }
        setFormSubmitStatus(false);
      } catch (e) {
        setFormSubmited('');
        setFormSubmitStatus(false);
        setIsLoadingData(false);
        console.error(e);
      }
    } else {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    /**
     * Form Id will be getting from the direct use of the form and when any one wants to get the form data by id directly at that time it will be useful,
     *  when you dont want to to Drang and drop the form but want to integrate a form with the form builder from the experro admin at that time just need to provide a
     *  form id and it wil be loads a form from it.
     */
    if (formData?.id) {
      setIsLoading(true);
      getFormFieldByFormId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return {
    formFields,
    setFormFields,
    ExpLayout,
    isLoading,
    _formData: ___formData,
    handleSubmit,
    formSubmitStatus,
    formSubmited,
    token,
    loaded: token?.loaded,
    recaptchaRef,
    onChange,
    isLoadingData,
    resetToken,
  };
};

export default ExpFormBuilderController;
