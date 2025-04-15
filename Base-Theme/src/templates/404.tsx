import { useTranslation } from 'react-i18next';
const Page404 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="page-body page404-page-template">
        <div className="py-8 lg:py-12 page-header-section">
          <div className="container text-center">
            <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title text-center mb-3">
              {t('common.404_error')}
            </h1>
            <p className="mb-0 mt-3 text-sm">{t('common.404_eror_msg')}</p>
          </div>
        </div>

        <div className="page-content m-t-40">
          <div className="container">
            <div className="flex justify-center">
              <form
                action="/search"
                className="flex basis-full lg:basis-6/12">
                <input type="text" name="q" className="form-input" />
                <button className="button-primary">{t('common.txt_search')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
