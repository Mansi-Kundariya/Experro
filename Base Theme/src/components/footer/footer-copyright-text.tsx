const FooterCopyrightText = ({ pageData }: any) => {
  return (
    <>
      {pageData?.globalSettings?.footer_com &&
        pageData?.globalSettings?.footer_com?.[0]?.copyright_text_et && (
          <p
            className="w-full text-center lg:text-left lg:w-8/12 text-xs leading-7 [&>a]:text-primary [&>a:hover]:underline"
            dangerouslySetInnerHTML={{
              __html:
                pageData?.globalSettings?.footer_com &&
                pageData?.globalSettings?.footer_com[0]?.copyright_text_et,
            }}
          />
        )}
    </>
  );
};

export default FooterCopyrightText;
