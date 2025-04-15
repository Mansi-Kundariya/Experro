import ExpResetPasswordController from './reset-password-controller';

const ExpResetPassword = () => {
  const {
    resetPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    isLoading,
  } = ExpResetPasswordController();

  return (
    <div className="page-body mt-8">
      <div className="py-8 lg:py-12 page-header-section">
        <div className="container text-center">
          <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title text-center">Reset your Password</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="flex align-center justify-center">
            <form className="basis-full lg:basis-4/12 login-form-block" onSubmit={resetPassword}>
              <div className="relative mb-8 form-field">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="form-input form-input-large"
                  required
                />
                {passwordError && <p className="error">{passwordError}</p>}
              </div>
              <div className="relative mb-8 form-field">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="form-input form-input-large"
                  required
                />
                {confirmPasswordError && (
                  <p className="error">{confirmPasswordError}</p>
                )}
              </div>

              <button
                className={`${
                  isLoading ? 'opacity-30 pointer-events-none' : ' button-primary button-large w-full'
                }`}
                type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpResetPassword;
