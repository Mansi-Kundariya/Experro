import { useState } from 'react';
import { AuthService, toast } from 'experro-storefront';
import { useTranslation } from 'react-i18next';

const ExpForgotPasswordController = () => {
  const [email, setEmail] = useState<string>('');
  const [isvalid, setIsvalid] = useState<boolean>(true);
  const [isAPICallLoading, setIsAPICallIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const forgotPassword = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setIsvalid(false);
      return;
    }

    setIsAPICallIsLoading(true);
    const isForgotPassword = await AuthService.forgotPassword({
      email: email,
    });
    setIsAPICallIsLoading(false);

    if (isForgotPassword) {
      setIsvalid(true);
      toast.success(t('toast_msg_success.forgot_pass'));
    } else toast.error(t('toast_msg_error.forgot_password_failed'));

    setEmail('');
  };

  return {
    email,
    isvalid,
    isAPICallLoading,
    handleEmailChange,
    forgotPassword,
  };
};

export default ExpForgotPasswordController;
