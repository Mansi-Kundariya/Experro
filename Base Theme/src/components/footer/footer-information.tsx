const FooterInformation = ({ pageData }: any) => {
  return (
    <>
      <div className="footer-col-nav w-full md:w-3/12 xl:w-2/12 px-4 mb-6 md:mb-0">
        {pageData.globalSettings?.footer_com &&
          pageData.globalSettings?.footer_com[0]?.column_4_title_et && (
            <p className="py-3 md:py-0 md:mb-6 font-secondary text-base lg:text-lg font-bold footer-nav-title">
              {pageData.globalSettings?.footer_com &&
                pageData.globalSettings?.footer_com[0]?.column_4_title_et}
            </p>
          )}
        <ul className="*:text-sm *:font-normal *:text-gray-900 flex flex-col gap-5">
          <li
            dangerouslySetInnerHTML={{
              __html:
                pageData.globalSettings?.site_com?.length &&
                pageData.globalSettings?.site_com[0].address_et,
            }}
          />
          <li className="group/level1">
            <p className="flex flex-wrap">
              Call us at&nbsp;
              <a
                className="block transition-colors group-hover/level1:text-primary"
                href={`tel:${pageData.globalSettings?.site_com?.length &&
                  pageData.globalSettings?.site_com[0].phone_et
                  }`}
                dangerouslySetInnerHTML={{
                  __html:
                    pageData.globalSettings?.site_com?.length &&
                    pageData.globalSettings?.site_com[0].phone_et,
                }}
              />
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FooterInformation;
