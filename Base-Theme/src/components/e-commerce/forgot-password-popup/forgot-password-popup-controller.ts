import { useState } from 'react';
import { AuthService, toast } from 'experro-storefront';
import { useTranslation } from 'react-i18next';

const ExpForgotPasswordPopupController = (props: any) => {
  const { setForgotPopUp } = props;
  const [email, setEmail] = useState<string>('');
  const [isvalid, setIsvalid] = useState<boolean>(true);
  const [isAPICallLoading, setIsAPICallIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const forgotPassword = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setIsvalid(false);
      return;
    }
    setIsAPICallIsLoading(true);
    const isForgotPassword = await AuthService.forgotPassword({
      email: email.trim(),
    });

    if (typeof isForgotPassword === 'boolean' && isForgotPassword === true) {
      setIsvalid(true);
      toast.success(t('toast_msg_success.forgot_pass'));
    } else
      toast.error(
        'please try again and provide the email address associated with your account.'
      );

    setIsAPICallIsLoading(false);
    setEmail('');
    setForgotPopUp();
  };

  return {
    email,
    isvalid,
    isAPICallLoading,
    handleEmailChange,
    forgotPassword,
  };
};

export default ExpForgotPasswordPopupController;
