import React, { useEffect, useState } from 'react';
import { CommonUtilities } from '../../utilities';
import { ContentService } from '../../services';

declare const window: any;

function Header({ headerComponent }: { headerComponent: any }) {
  const Component = headerComponent;
  const pageState = CommonUtilities.getLocalState('_page');
  let page;
  let isLoaded = false;
  // console.log('initial page state', pageState);
  if (pageState) {
    page = pageState.data.Data;
    const globalSettingsState =
      CommonUtilities.getLocalState('gs_cmp_global_scmp');
    page.globalSettings = globalSettingsState.data.Data;
    // page.menu_id_esi = page.globalSettings.header_com[0].navigation_menu_id_et;
    page.Component = true;
    isLoaded = true;
    window.__pageData__ = page;
  }
  const initialState: any = page ? page : {};
  const [pageData, setPageData] = useState(initialState);

  const processPageDataForHeader = () => {
    if (!isLoaded) {
      setPageData(window.__pageData__);
    }
    //favicon-from-pageData
    let link: any = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    let __pageFavicon = window.__pageData__;
    __pageFavicon = __pageFavicon?.globalSettings?.site_com
      ? __pageFavicon?.globalSettings?.site_com[0]?.favicon_media_emd
        ? __pageFavicon?.globalSettings?.site_com[0]?.favicon_media_emd[0]
        : __pageFavicon?.globalSettings?.site_com[0]?.favicon_emd
        ? __pageFavicon?.globalSettings?.site_com[0]?.favicon_emd[0]
        : ''
      : '';
    link.href = `${ContentService.parseImageURL(__pageFavicon)?.imageUrl}`;
  };

  useEffect(() => {
    document.addEventListener('PAGE_DATA_LOADED', processPageDataForHeader);
    return () => {
      document.removeEventListener(
        'PAGE_DATA_LOADED',
        processPageDataForHeader
      );
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="header-container">
      {pageData.Component && <Component pageData={pageData}></Component>}
    </div>
  );
}

export { Header };
