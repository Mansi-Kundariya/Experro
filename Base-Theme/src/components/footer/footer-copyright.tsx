import FooterCopyrightText from "./footer-copyright-text";
import FooterSupportedPayments from "./footer-supported-payments";

const FooterCopyright = ({ pageData }: any) => {
  return (
    <div className="footer-copyright-section-main">
      <div className="container">
        <div className="flex flex-wrap items-center py-4 border-t border-gray-200 footer-copyright-wrapper">
          <FooterCopyrightText pageData={pageData} />
          <FooterSupportedPayments pageData={pageData} />
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;
