import { DraggableArea, EcommerceService, toast } from 'experro-storefront';
import { useTranslation } from 'react-i18next';
import components from '../components';
import ExpBreadcrumb from '../components/common-components/breadcrumb/breadcrumb';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { currentDate, model_internal_name } from '../utils';

interface ContactusInterface {
  name: string;
  value?: string;
  isValidInput?: boolean;
  labelValue: string;
  placeholder?: string;
}

export interface ContactPageProps {
  pageData: any;
}

const ContactPage = (props: ContactPageProps) => {
  const { pageData } = props;

  // change createref to useRef
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<{ data: string; loaded: boolean }>({
    data: '',
    loaded: false,
  });

  const { t } = useTranslation();

  const formHandling: any = document.getElementById('contact-us-form');
  const formId = 'a587478a-62c7-40eb-be61-fa693ec4e67f';

  function onChange(value: any) {
    setToken({ ...token, data: value });
  }

  const submitForm = async (data: any) => {
    const date = currentDate();
    setIsLoading(true);
    const formMapping = {
      form_mapping: { ...data, date },
    };

    if (formId?.length) {
      const formData = new FormData();
      formData.append('formData', JSON.stringify(formMapping));
      const formDataResponse = await EcommerceService.emailTemplateForms(
        formId,
        formData
      );

      if (formDataResponse?.Status === 'success') {
        setContactusState(initialValue);
        toast.success(
          formDataResponse?.Data?.item || t('toast_msg_success.request_sent')
        );

        if (formHandling.reset) {
          formHandling?.reset();
          recaptchaRef.current?.reset();
        }
      } else {
        toast.error(t('toast_msg_error.form_id_not_found'));
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setToken({ ...token, loaded: true });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatPhoneNumber(input: string) {
    // Remove non-digit characters from input
    let phoneNumber: any = input?.replace(/\D/g, '');
    if (phoneNumber?.length <= 3) {
      phoneNumber = `(${phoneNumber}`;
    } else if (phoneNumber?.length <= 6) {
      phoneNumber = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
        3
      )}`;
    } else if (phoneNumber?.length <= 10) {
      phoneNumber = phoneNumber = `(${phoneNumber.substring(
        0,
        3
      )}) ${phoneNumber.substring(3, 6)} - ${phoneNumber.substring(6, 10)}`;
    } else {
      phoneNumber = phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    // Match the phone number pattern
    const phoneNumberPattern = /^\(\d{3}\) ?\d{3} ?- ?\d{4}$/;

    if (phoneNumberPattern.test(phoneNumber)) {
      return { value: phoneNumber, isValid: true };
    } else {
      return { value: phoneNumber, isValid: false };
    }
  }

  const initialValue = [
    {
      name: 'name',
      value: '',
      labelValue: 'Name:',
      placeholder: 'Enter your name',
    },
    {
      name: 'email',
      value: '',
      labelValue: 'Email:',
      placeholder: 'Enter your email',
    },

    {
      name: 'phone',
      value: '',
      labelValue: 'Phone:',
      placeholder: 'Enter your phone number',
    },
  ];

  const [contactusState, setContactusState] =
    useState<ContactusInterface[]>(initialValue);
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;

    const updatedFields = contactusState.map((field: ContactusInterface) => {
      if (field.name === name) {
        if (field.name === 'phone') {
          if (
            field?.value &&
            field?.value?.length &&
            field?.value?.length > 1
          ) {
            const phoneValue = {
              ...field,
            };
            const validateField: any = formatPhoneNumber(value);
            phoneValue['value'] = validateField.value;
            phoneValue['isValidInput'] = validateField.isValid;
            return phoneValue;
          } else {
            const validInput = /^[0-9(]+$/.test(value);
            if (validInput || value.length === 0) {
              return { ...field, value, isValidInput: false };
            }
          }
        } else {
          return {
            ...field,
            value,
            isValidInput:
              name === 'email'
                ? /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i.test(
                    value
                  )
                : name !== 'company'
                  ? value.length > 0
                  : true,
          };
        }
      }
      return field;
    });
    setContactusState(updatedFields);
  };

  const validateOnSubmit = (field: ContactusInterface) => {
    const updatedField: ContactusInterface = field;
    if (field.name === 'email') {
      updatedField['isValidInput'] =
        /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i.test(
          field?.value ? field?.value : ''
        );
    } else {
      updatedField['isValidInput'] = !field?.value
        ? false
        : field?.value.length > 0;
    }
    return updatedField;
  };

  const onSubmitHandler = (e: any, data: ContactusInterface[]) => {
    e.preventDefault();

    const updatedFormFields: ContactusInterface[] = [];
    data.forEach((field) => {
      updatedFormFields.push(validateOnSubmit(field));
    });
    const isInValidFeildPresent = updatedFormFields.some(
      (val) => val?.isValidInput === false
    );
    if (!isInValidFeildPresent) {
      const dataToSubmit = {
        name: data[0]?.value || '',
        email: data[1]?.value || '',
        phone: data[2]?.value || '',
      };
      submitForm(dataToSubmit);
    } else {
      setContactusState(updatedFormFields);
    }
  };

  return (
    <div className="page-body">
      <DraggableArea
        style={{ width: 'auto' }}
        cssClass={''}
        id={'cms-page-drop1'}
        components={components}
        modelField={''}
        pageData={pageData}
      />

      {pageData?.seo_com?.length && <ExpBreadcrumb pageData={pageData} />}

      {pageData?.page_title_esi &&
        pageData?.settings_com &&
        pageData?.settings_com[0]?.show_page_title_eb && (
          <div className="page-header-section mt-8">
            <div className="container">
              <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title text-center">
                {pageData?.page_title_esi}
              </h1>
            </div>
          </div>
        )}

      <div className="page-content">
        <div className="container">
          {pageData?.description_eti && (
            <div
              className="mt-10 page-content-style"
              dangerouslySetInnerHTML={{
                __html: pageData?.description_eti,
              }}
            />
          )}
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="basis-full md:basis-6/12 lg:basis-4/12">
              <form
                id="contact-us-form"
                onSubmit={(event) => onSubmitHandler(event, contactusState)}>
                {contactusState.map((field: any) => {
                  return (
                    <div key={field?.name} className="relative form-field mb-8">
                      <label htmlFor={field?.name} className="form-label">
                        {field?.labelValue}
                        <span className="required">
                          {field.name !== 'company' ? '*' : ''}
                        </span>
                      </label>
                      <input
                        className="form-input form-input-large"
                        autoComplete="off"
                        type={field?.name !== 'password' ? 'text' : 'password'}
                        placeholder={field?.placeholder}
                        name={field?.name}
                        value={field?.value ? field?.value : ''}
                        onChange={onChangeHandler}
                      />
                      {field?.name === 'email' || field?.name === 'phone'
                        ? Object.keys(field)?.includes('isValidInput') &&
                          !field.isValidInput && (
                            <span className="form-error-message">
                              {field?.value?.length
                                ? `please enter a valid ${field?.labelValue.substr(
                                    0,
                                    field?.labelValue.length - 1
                                  )} format.`
                                : !field?.value?.length &&
                                  `${field?.labelValue.substr(
                                    0,
                                    field?.labelValue.length - 1
                                  )} is Required`}
                            </span>
                          )
                        : Object.keys(field).includes('isValidInput') &&
                          !field.isValidInput && (
                            <span className="form-error-message">
                              {!field.value?.length &&
                                `${field?.labelValue.substr(
                                  0,
                                  field?.labelValue.length - 1
                                )} is Required`}
                            </span>
                          )}
                    </div>
                  );
                })}

                <div className="gcaptch-style text-center full-width flex flex-wrap">
                  <div className="flex flex-wrap">
                    <div>
                      <div>
                        <div style={{ width: '304px', height: '78px' }}>
                          <div>
                            <div className="gcaptch-style text-center full-width flex flex-wrap">
                              <div className="flex flex-wrap">
                                {token?.loaded ? (
                                  <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={
                                      model_internal_name.google_captcha_key
                                    }
                                    onChange={onChange}
                                  />
                                ) : (
                                  ''
                                )}
                              </div>
                            </div>
                          </div>
                          <textarea
                            id="g-recaptcha-response"
                            name="g-recaptcha-response"
                            className="g-recaptcha-response"
                            style={{
                              width: '250px',
                              height: '40px',
                              border: '1px solid rgb(193, 193, 193)',
                              margin: '10px 25px',
                              padding: '0px',
                              resize: 'none',
                              display: 'none',
                            }}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-action-cnt mt-8 text-left">
                  <button
                    type="submit"
                    className={`${
                      isLoading
                        ? 'flex items-center button-primary button-large opacity-30 cursor-not-allowed'
                        : 'button-primary button-large'
                    } ${token?.data?.length === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                    disabled={token?.data?.length === 0}>
                    {isLoading ? (
                      <>
                        {t('common.txt_submit')}
                        <div className="relative flex justify-center items-center ml-4">
                          <div className="w-3 h-3 rounded-full absolute border-2 border-solid border-primary"></div>
                          <div className="w-3 h-3 rounded-full animate-spin absolute border-2 border-solid border-gray-50 border-t-transparent"></div>
                        </div>
                      </>
                    ) : (
                      <div>{t('common.txt_submit')}</div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <DraggableArea
        style={{ width: 'auto' }}
        cssClass={''}
        id={'cms-page-drop2'}
        components={components}
        modelField={''}
        pageData={pageData}
      />
    </div>
  );
};

export default ContactPage;
