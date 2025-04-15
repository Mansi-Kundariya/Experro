import { IsCMSApp } from 'experro-storefront';
import { ExpLoadingPlaceholderProps } from '../../../interfaces/common-component.interface';
import { useTranslation } from 'react-i18next';

const ExpLoadingPlaceholder = (data: ExpLoadingPlaceholderProps) => {
  const { t } = useTranslation();
  const { contentModel, isLoading, componentData, loaderClassName } = data;

  /* Record is not selected yet */
  if (!contentModel?.trim()?.length) {
    return !IsCMSApp ? (
      <div className="py-10">
        <p className="text-3xl font-secondary text-center">{t('common.model_select_msg')}</p>
      </div>
    ) : (
      <></>
    );
    /* Loading Record */
  } else if (
    !!(contentModel?.trim()?.length && isLoading && !componentData?.id)
  ) {
    return (
      <div className={loaderClassName}>
        <div className="relative flex justify-center items-center h-dvh">
          <div className="w-14 h-14 rounded-full absolute border-2 border-solid border-gray-100"></div>
          <div className="w-14 h-14 rounded-full animate-spin absolute border-2 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    );
    /* Record not found */
  } else if (
    !contentModel?.trim()?.length &&
    !isLoading &&
    !componentData?.id
  ) {
    return (
      <div className="section-gap">
        <h3>No data to view</h3>
      </div>
    );
  } else {
    /* Record loaded successfully */
    return <></>;
  }
};

export default ExpLoadingPlaceholder;
