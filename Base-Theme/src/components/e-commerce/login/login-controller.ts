import { useState } from 'react';
import aes from 'crypto-js/aes';
import {
  IsCMSApp,
  useNavigate,
  AuthService,
  EcommerceService,
  AnalyticsService,
  toast,
} from 'experro-storefront';
import { useTranslation } from 'react-i18next';
import { model_internal_name } from '../../../utils';

interface ExpLoginControllerProps {
  isRedirect: boolean;
  setIsLoginSlide: any;
  setInvalidCredentialError: any;
  isPopUp?: any;
  isModalOpen?: any;
  isAddtoWishlistModalOpen?: any;
  setForgotPopUp: any;
  forgotPopUp: any;
}

interface LoginInterface {
  name: string;
  value?: string;
  isValidInput?: boolean;
  labelValue: string;
  placeholder?: string;
}

const ExpLoginController = (props: ExpLoginControllerProps) => {
  const {
    isRedirect = true,
    setIsLoginSlide,
    setInvalidCredentialError,
    isPopUp,
    isModalOpen,
    isAddtoWishlistModalOpen,
    setForgotPopUp,
  } = props;

  const { t } = useTranslation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = IsCMSApp ? useNavigate() : '';

  const [isLoading, setIsLoading] = useState(false);

  const getLoginResponse = async (formData: {
    email: string;
    password: string;
  }) => {
    return await AuthService.login({
      username: formData.email,
      password: aes
        .encrypt(formData.password, model_internal_name.crypto_password_key)
        .toString(),
    });
  };

  const login = async (formData: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      await AuthService.forceLogout();
      const loginResponse = await getLoginResponse(formData);

      if (loginResponse?.Status !== 'failure' && navigate) {
        const userData = await AuthService.getUserSessionInfo();

        try {
          const cartDetails = await EcommerceService.getCart();
          if (cartDetails && cartDetails.Status !== 'failure') {
            userData.userCartObj = cartDetails;
          }
        } catch (error) {
          console.error(error);
        }
        if (userData) {
          if (userData.userCartObj && userData.userCartObj.id) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const userCartResponse = await EcommerceService.updateCustomerId({
              customerId: userData.userCartObj.id,
            });
            userData.userCartObj = userCartResponse;
          }
          AuthService.setUserDetails(userData);
          AnalyticsService.login(
            formData.email,
            isPopUp ? 'popup' : 'page',
            'email_password'
          );
          AnalyticsService.updateUserDetails(userData?.userInfo);

          if (setInvalidCredentialError) {
            setInvalidCredentialError('');
          }
          document.dispatchEvent(new Event('CART_REFRESH'));
          document.dispatchEvent(
            new CustomEvent('LOGIN_SUCCESSFUL', { detail: userData })
          );

          if (isPopUp) {
            toast.success(t('toast_msg_success.user_logged_success'));
            if (isAddtoWishlistModalOpen) {
              isModalOpen();
              isAddtoWishlistModalOpen();
            } else {
              isModalOpen();
            }
            return;
          } else {
            navigate('/my-account');
          }
          if (isRedirect) {
            navigate('/my-account');
          }
          if (
            window.location.pathname.startsWith('/checkout') ||
            window.location.pathname.startsWith('/login') ||
            window.location.pathname.startsWith('/sign-up')
            // window.location.pathname.startsWith('/my-account')
          ) {
            window.location.reload();
            return;
          }
          setIsLoading(false);
        } else {
          navigate('/login');
          setIsLoginSlide();
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        if (!isRedirect) {
          setInvalidCredentialError('Username or Password Invalid');
        } else {
          toast.error(t('toast_msg_error.user_name_or_password_invalid'));
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast.error(t('toast_msg_error.something_went_wrong'));
      console.error(e);
    }
  };

  // here is the login logic

  const initialValue = [
    {
      name: 'email',
      value: '',
      labelValue: `${t('sign_in.email')}:`,
      placeholder: t('sign_in.email_placeholder'),
    },
    {
      name: 'password',
      value: '',
      labelValue: `${t('sign_up.password')}:`,
      placeholder: t('sign_up.password'),
    },
  ];

  const [loginState, setLoginState] = useState<LoginInterface[]>(initialValue);
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    const updatedFields = loginState.map((field: LoginInterface) => {
      if (field.name === name) {
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
              : value.length > 0,
        };
      }
      return field;
    });
    setLoginState(updatedFields);
  };

  const validateOnSubmit = (field: LoginInterface) => {
    const updatedField: LoginInterface = field;
    if (field.name === 'email') {
      updatedField['isValidInput'] =
        /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i.test(
          field?.value ? field?.value : ''
        );
    } else if (field.name === 'password') {
      updatedField['isValidInput'] =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~` ])[A-Za-z\d!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~` ]{8,}$/.test(
          field?.value ? field?.value : ''
        );
    }
    return updatedField;
  };

  const onSubmitHandler = (e: any, data: LoginInterface[]) => {
    e.preventDefault();
    const updatedFormFields: LoginInterface[] = [];
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

      login(dataToSubmit);
    } else {
      setLoginState(updatedFormFields);
    }
  };
  const handleModal = () => {
    setForgotPopUp();
  };

  return {
    isLoading,
    login,
    onChangeHandler,
    loginState,
    onSubmitHandler,
    handleModal,
  };
};

export default ExpLoginController;
