import { EcommerceService, toast } from 'experro-storefront';
import { useState } from 'react';

const ExpFooterNewsletterController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i;
    if (!email) {
      setEmailError('Email is required.');
      return false;
    } else if (!regex.test(email)) {
      setEmailError('Email should be in valid format.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const signUpHandler = async () => {
    if (!validateEmail(emailValue)) return;

    setIsLoading(true);
    const formSubmit = await EcommerceService.subscribeToNewsLetter(emailValue);
    setIsLoading(false);

    if (formSubmit?.Status === 'success') {
      toast.success(formSubmit.Data);
    } else {
      toast.error(
        formSubmit?.Error?.message || 'Failed to subscribe to newsletter.'
      );
    }
    setEmailValue('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    validateEmail(e.target.value);
  };

  return {
    isLoading,
    signUpHandler,
    handleEmailChange,
    emailValue,
    emailError,
  };
};

export default ExpFooterNewsletterController;
