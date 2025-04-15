import FooterQuickLinks from "./footer-quick-links";
import FooterInformation from "./footer-information";
import FooterNewsletter from "./footer-newsletter/footer-newsletter";
import FooterCopyright from "./footer-copyright";
// import ExpLinkParser from "../../utils/link-parser";
// import { IconFacebook } from "../../assets/icons/facebook";

export interface FooterProps {
  pageData: {
    globalSettings: {
      footer_com: any[];
      site_com: any[];
      social_links_com: any[];
    };
  };
}

const Footer = ({ pageData }: FooterProps) => {
  return (
    <>
      {/* <footer className="border-t border-secondary footer-section-main">
        <div className="pt-14 pb-8 footer-navigation-section">
          <div className="container">
            <div className="flex flex-wrap -mx-4 footer-navigation-wrapper">
              <div className="w-2/12 px-4 footer-col-nav">
                <p className="mb-6 font-secondary text-lg font-bold footer-nav-title">
                  Navigate
                </p>
                <ul className="*:text-sm *:font-normal flex flex-col gap-5">
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Brands
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Limited Edition
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Sale
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Pages
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Blog
                    </ExpLinkParser>
                  </li>
                </ul>
              </div>
              <div className="w-2/12 px-4 footer-col-nav">
                <p className="mb-6 font-secondary text-lg font-bold footer-nav-title">
                  Categories
                </p>
                <ul className="*:text-sm *:font-normal flex flex-col gap-5">
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Brands
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Limited Edition
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Sale
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Pages
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Blog
                    </ExpLinkParser>
                  </li>
                </ul>
              </div>
              <div className="w-2/12 px-4 footer-col-nav">
                <p className="mb-6 font-secondary text-lg font-bold footer-nav-title">
                  Popular Brands
                </p>
                <ul className="*:text-sm *:font-normal flex flex-col gap-5">
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Brands
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Limited Edition
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Sale
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Pages
                    </ExpLinkParser>
                  </li>
                  <li className="group/level1">
                    <ExpLinkParser
                      to="/"
                      className="block transition-colors group-hover/level1:text-primary"
                    >
                      Blog
                    </ExpLinkParser>
                  </li>
                </ul>
              </div>
              <div className="w-2/12 px-4 footer-col-nav">
                <p className="mb-6 font-secondary text-lg font-bold footer-nav-title">
                  Locate US
                </p>
                <ul className="*:text-sm *:font-normal flex flex-col gap-5">
                  <li>
                    123, Market Street <br />
                    San Francisco <br />
                    CA 94205
                  </li>
                  <li className="group/level1">
                    <p className="flex flex-wrap">
                      Call us at&nbsp;
                      <ExpLinkParser
                        to="/"
                        className="block transition-colors group-hover/level1:text-primary"
                      >
                        (123) 444-6666
                      </ExpLinkParser>
                    </p>
                  </li>
                </ul>
              </div>
              <div className="w-4/12 px-4 footer-col-nav">
                <p className="mb-6 font-secondary text-lg font-bold footer-nav-title">
                  Sign up now and get 15% off
                </p>
                <form action="" className="mb-2">
                  <div className="form-field">
                    <input
                      type="email"
                      name="email"
                      className="form-input-large"
                      placeholder="Your email address"
                    />
                  </div>
                </form>
                <p className="text-sm mb-6">
                  We respect your Privacy and Never Share your Information.
                </p>
                <p className="mb-4 font-secondary text-lg font-bold footer-nav-title">
                  Follow US
                </p>
                <ul className="flex flex-wrap gap-2 social-icons-main">
                  <li>
                    <i className="icon">
                      <ExpLinkParser
                        to="/"
                        target="_blank"
                        className="inline-block w-8 h-8 [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:fill-black"
                      >
                        <IconFacebook />
                      </ExpLinkParser>
                    </i>
                  </li>
                  <li>
                    <i className="icon">
                      <ExpLinkParser
                        to="/"
                        target="_blank"
                        className="inline-block w-8 h-8 [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:fill-black"
                      >
                        <IconFacebook />
                      </ExpLinkParser>
                    </i>
                  </li>
                  <li>
                    <i className="icon">
                      <ExpLinkParser
                        to="/"
                        target="_blank"
                        className="inline-block w-8 h-8 [&>svg]:max-w-full [&>svg]:max-h-full [&>svg]:fill-black"
                      >
                        <IconFacebook />
                      </ExpLinkParser>
                    </i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright-section-main">
          <div className="container">
            <div className="py-5 border-t border-gray-200 footer-copyright-wrapper">
              <p className="text-xs">
                CORE © 2023, All Rights Reserved. Made with{" "}
                <a
                  href="https://www.experro.com/"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Experro
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer> */}
      <footer className="mt-32 border-t border-secondary footer-section-main">
        <div className="py-8 md:pt-14 md:pb-8 footer-navigation-section">
          <div className="container">
            <div className="flex flex-wrap -mx-4 gap-y-0 md:gap-y-0 footer-navigation-wrapper">
              <FooterQuickLinks pageData={pageData} />
              <FooterInformation pageData={pageData} />
              <FooterNewsletter pageData={pageData} />
            </div>
          </div>
        </div>
        <FooterCopyright pageData={pageData} />
      </footer>
    </>
  );
};
export default Footer;
