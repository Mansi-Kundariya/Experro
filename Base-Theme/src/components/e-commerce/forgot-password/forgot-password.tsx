import { Link } from 'experro-storefront';
import ExpForgotPasswordController from './forgot-password-controller';

const ExpForgotPassword = () => {
  const { email, isvalid, isAPICallLoading, handleEmailChange, forgotPassword } =
    ExpForgotPasswordController();

  return (
    <div>
      <div className="page-body mt-8">
        <div className="py-8 lg:py-12 page-header-section">
          <div className="container text-center">
            <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title text-center">
              Reset Your Password
            </h1>
          </div>
        </div>

        <div className="page-content">
          <div className="container">
            <div className="flex justify-center forgot-from-wrap">
              <form
                onSubmit={forgotPassword}
                className="basis-full lg:basis-4/12">
                <div className="relative mb-8 form-group">
                  <label htmlFor="email" className="form-label">
                    Email:
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="abc@xyz.com"
                    value={email}
                    onChange={handleEmailChange}
                    className="form-input form-input-large"
                  />
                  <span className="form-error-message">
                    {!isvalid && 'Email is required.'}
                  </span>
                </div>

                <div className="form-submit mb-4">
                  <button
                    type="submit"
                    className={`${isAPICallLoading ? 'flex items-center justify-center button-primary button-large w-full'
                      : 'button-primary button-large w-full'}`}>
                    Submit
                  </button>
                </div>

                <p className="text-sm text-gray-900">
                  Go back to
                  <Link
                    to="/login/"
                    className="ml-2 text-gray-900 transition-colors hover:text-secondary">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpForgotPassword;
