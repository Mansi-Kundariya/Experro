import React, { useEffect, useState } from 'react';
import { CommonUtilities } from '../../utilities';
declare const window: any;

function PencilBanner({ pencilBanner }: { pencilBanner: any }) {
  const Component = pencilBanner;
  const pageState = CommonUtilities.getLocalState('_page');
  let page;
  let isLoaded = false;
  if (pageState) {
    page = pageState.data.Data;
    const globalSettingsState =
      CommonUtilities.getLocalState('gs_cmp_global_scmp');
    page.globalSettings = globalSettingsState.data.Data;
    page.Component = true;
    isLoaded = true;
    window.__pageData__ = page;
  }
  const initialState: any = page ? page : {};

  const [pageData, setPageData] = useState(initialState);
  useEffect(() => {
    document.addEventListener('PAGE_DATA_LOADED', function () {
      if (!isLoaded) {
        setPageData(window.__pageData__);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="pencil-banner-wrapper">
      {pageData.Component && <Component pageData={pageData}></Component>}
    </div>
  );
}

export { PencilBanner };
