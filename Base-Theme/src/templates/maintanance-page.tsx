import { Link } from 'experro-storefront';
import logo from '../assets/images/logo-white.png';
import { useTranslation } from 'react-i18next';

const MaintanancePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="page-body maintanance-page-template">
        <div className="page-content">
          <div className="container text-center">
            <div className="flex flex-wrap align-center flex-direction justify-center maintanance-body">
              <Link to="/">
                <img
                  src={logo}
                  alt="Maintanance"
                  title="Maintanance"
                  width={260}
                  height={40}
                />
              </Link>
              <h1 className="text-center m-b-15">
                {t('common.txt_heading_maintenance')}
              </h1>
              <p className="m-b-0">
                {t('common.txt_heading_maintenance_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintanancePage;
