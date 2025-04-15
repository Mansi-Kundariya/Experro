import { ExpLogin } from "../../components/e-commerce/login";

const LoginPage = () => {
  return (
    <div>
      <div className="page-body">
        <div className="py-8 lg:py-12 page-header-section">
          <div className="container">
            <div className="relative flex flex-col justify-center">
              <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title text-center font-semibold">
                Login
              </h1>
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="container">
            <div className="login-from-wrap">
              <div className="flex align-center justify-center">
                <div className="basis-full lg:basis-4/12 login-form-block">
                  <ExpLogin isRedirect={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
