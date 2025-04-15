import { useState } from 'react';
import { AuthService, toast, useParams } from 'experro-storefront';
import aes from 'crypto-js/aes';
import { model_internal_name } from '../../../utils';
import { useTranslation } from 'react-i18next';

const ExpResetPasswordController = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const location = useParams();

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{7,}$/i;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!newPassword) {
      setPasswordError('Password is required.');
    } else if (!validatePassword(newPassword)) {
      setPasswordError(
        'Passwords must be at least 7 characters and contain both alphabetic and numeric characters.'
      );
    } else {
      setPasswordError('');
    }
    setConfirmPasswordError(
      newPassword === confirmPassword ? '' : 'Passwords do not match.'
    );
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(
      password === newConfirmPassword ? '' : 'Passwords do not match.'
    );
  };

  const resetPassword = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t('toast_msg_error.pass_and_confirm_pass_match'));
      return;
    }

    if (!password || !validatePassword(password)) {
      toast.error(t('toast_msg_error.invalid_password'));
      return;
    }

    setIsLoading(true);
    const isReset = await AuthService.setNewPassword({
      emailToken: location?.token || '',
      password: aes
        .encrypt(password, model_internal_name.crypto_password_key)
        .toString(),
    });
    setIsLoading(false);

    if (isReset) {
      toast.success(t('toast_msg_success.password_reset'));
      window.location.href = '/login';
    } else {
      toast.error(t('toast_msg_error.password_reset_failed'));
    }
  };

  return {
    resetPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    isLoading,
  };
};

export default ExpResetPasswordController;
