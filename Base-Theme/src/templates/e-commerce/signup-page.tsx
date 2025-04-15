import { ExpSignUp } from "../../components/e-commerce/signup";
import { useTranslation } from "react-i18next";

/* eslint-disable*/
// TODO: Disabled eslint due to component is not used anywhere
const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="page-body mt-8">
        <div className="py-8 lg:py-12 page-header-section">
          <div className="container">
            <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title text-center font-semibold">
              {t("sign_in.create_acc")}
            </h1>
          </div>
        </div>
        <div className="page-content">
          <div className="container">
            <div className="signup-from-wrap">
              <ExpSignUp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
