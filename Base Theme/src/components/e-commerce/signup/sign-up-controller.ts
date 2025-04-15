/* eslint-disable*/
import { createRef, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import aes from 'crypto-js/aes';
import {
  AnalyticsService,
  AuthService,
  toast,
  useNavigate,
} from 'experro-storefront';
import { model_internal_name } from '../../../utils';
import { useTranslation } from 'react-i18next';

const recaptchaRef = createRef<ReCAPTCHA>();


interface SignupInterface {
  name: string,
  value?: string,
  isValidInput?: boolean,
  labelValue: string,
  placeholder?: string
}

const ExpSignUpController = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<{ data: string; loaded: boolean }>({
    data: '',
    loaded: false,
  });

  const signUp = async (formData: any) => {
    AnalyticsService.trackEvent({
      eventName: 'sign_up',
      count: 1,
      sum: 0,
      dur: 0,
      eventData: { method: 'Website' },
    });
    setIsLoading(true);
    const signUpData = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      password: aes.encrypt(
        formData.password,
        model_internal_name.crypto_password_key
      ).toString(),
      phone: formData.phone,
      company: formData.company,
      customFields: [],
      gctoken: token?.data,
    };
    await AuthService.forceLogout();
    const signUpResponse = await AuthService.signup(signUpData);
    if (signUpResponse === true) {
      toast.success(t('toast_msg_success.user_registered', {
        duration: 5000,
      }));

      const loginResponse = await AuthService.login({
        username: formData.email,
        password: aes.encrypt(
          formData.password,
          model_internal_name.crypto_password_key
        ).toString(),
      });
      if (loginResponse) {
        const userData = await AuthService.getUserSessionInfo();
        AuthService.setUserDetails(userData);
        await AnalyticsService.login(formData.email);
        await AnalyticsService.updateUserDetails(userData?.userInfo);
      }
      document.dispatchEvent(new Event('LOGIN_SUCCESSFUL'));
      setIsLoading(false);
      navigate('/my-account/');
    } else if (signUpResponse.Error) {
      recaptchaRef.current?.reset();
      const Error = signUpResponse.Error;
      if(Error?.name === 'AlreadyExist')
      toast.error(t('toast_msg_error.user_exists'));
      else
      toast.error(t('toast_msg_error.something_went_wrong'));
      setToken({ ...token, data: '' });
      setIsLoading(false);
    } else {
      recaptchaRef.current?.reset();
      toast.error(t('toast_msg_error.sign_up_failed'));
      setToken({ ...token, data: '' });
      setIsLoading(false);
    }
  };

  function onChange(value: any) {
    setToken({ ...token, data: value });
  }

  useEffect(() => {
    setTimeout(() => {
      setToken({ ...token, loaded: true });
    }, 1000);
  }, []);


  // here is the signup logic

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
      name: 'firstname',
      value: '',
      labelValue: `${t('sign_up.first_name') }:`,
      placeholder: t('sign_up.first_name'),
    },
    {
      name: 'lastname',
      value: '',
      labelValue: `${t('sign_up.last_name') }:`,
      placeholder: t('sign_up.last_name'),
    },
    {
      name: 'email',
      value: '',
      labelValue: `${t('sign_up.email_address') }:`,
      placeholder: t('sign_up.email_address'),
    },
    {
      name: 'password',
      value: '',
      labelValue: `${t('sign_up.password') }:`,
      placeholder: t('sign_up.password'),
    },
    {
      name: 'phone',
      value: '',
      labelValue: `${t('common.txt_phone') }:`,
      placeholder: t('common.txt_phone'),
    },
    {
      name: 'company',
      value: '',
      labelValue: `${t('sign_up.company') }:`,
      placeholder: t('sign_up.company'),
    },
  ]

  const [signupState, setSignupState] = useState<SignupInterface[]>(initialValue);
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    
      const updatedFields = signupState.map((field: SignupInterface) => {
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
            const validateField: any = formatPhoneNumber(value);
            const validInput = /^[0-9(]+$/.test(value);
            if (validInput || value.length === 0) {
              return {
                ...field,
                value: !!value.length ? validateField.value : value,
                isValidInput: !!value.length ? validateField?.isValid : false,
              };
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
                : name === 'password'
                  ? /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~` ])[A-Za-z\d!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~` ]{8,}$/.test(
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
    setSignupState(updatedFields);
  }

  const validateOnSubmit = (field: SignupInterface) => {
     const updatedField: SignupInterface = field;
    if (field.name === 'email') {
      updatedField['isValidInput'] =
        /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i.test(
          field?.value ? field?.value : ''
        );
    } else if (field.name === 'password') {
       updatedField['isValidInput'] = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~` ])[A-Za-z\d!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~` ]{8,}$/.test(
        field?.value ? field?.value : ''
      );
    } else if (field.name === 'phone') {
      updatedField['isValidInput'] = formatPhoneNumber(
        field?.value ? field?.value : ''
      ).isValid;
    } else if (field.name !== 'company') {
      updatedField['isValidInput'] = !field?.value
        ? false
        : field?.value.length > 0;
    }
    return updatedField;
  }

  const onSubmitHandler = (e: any, data: SignupInterface[]) => {
     e.preventDefault();
    const updatedFormFields: SignupInterface[] = [];
    data.forEach((field) => {
      updatedFormFields.push(validateOnSubmit(field));
    });
    const isInValidFeildPresent = updatedFormFields.some(
      (val) => val?.isValidInput === false
    );
    if (!isInValidFeildPresent) {
      const dataToSubmit = data.reduce((acc: any, curr: any) => {
        acc[curr.name] = curr?.value || '';
        return acc;
      }, {});

      signUp(dataToSubmit);
    } else {
      setSignupState(updatedFormFields);
    }
  }


  return {
    isLoading,
    signUp,
    loaded: token?.loaded,
    onChange,
    recaptchaRef,
    token,

    onChangeHandler,
    onSubmitHandler,
    signupState,
  };
};

export default ExpSignUpController;
