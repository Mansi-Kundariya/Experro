import SocialIcons from '../social-icons';
import ExpFooterNewsletterController from './footer-newsletter-controller';

const FooterNewsletter = ({ pageData }: any) => {
  const {
    isLoading,
    signUpHandler,
    handleEmailChange,
    emailValue,
    emailError,
  } = ExpFooterNewsletterController();

  return (
    <div className="footer-col-nav md:mt-10 xl:mt-0 w-full xl:w-4/12 px-4">
      {pageData.globalSettings?.footer_com &&
        pageData.globalSettings?.footer_com[0]?.newsletter_form_heading_et && (
          <p className="mb-4 lg:mb-6 font-secondary text-base lg:text-lg font-bold footer-nav-title">
            {pageData.globalSettings?.footer_com &&
              pageData.globalSettings?.footer_com[0]
                ?.newsletter_form_heading_et}
          </p>
        )}
      <form
        action=""
        target="_self"
        className="flex flex-wrap mb-2 has-[.form-error-message]:mb-5"
        onSubmit={(e) => {
          e.preventDefault();
          signUpHandler();
        }}>
        <div className="relative w-[calc(100%_-_7rem)]">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="abc@xyz.com"
            value={emailValue}
            onChange={handleEmailChange}
            className="form-input"
          />
          {emailError && (
            <span className="form-error-message">{emailError}</span>
          )}
        </div>
        <button
          type="submit"
          className={`${isLoading ? 'opacity-30 pointer-events-none'
            : 'button-primary w-28'}
           `}
          aria-label="Submit Button">
          Sign Up
        </button>
      </form>
      {pageData.globalSettings?.footer_com &&
        pageData.globalSettings?.footer_com[0]
          ?.newsletter_form_description_et && (
          <p className="text-sm mb-6 text-gray-900">
            {pageData.globalSettings?.footer_com &&
              pageData.globalSettings?.footer_com[0]
                ?.newsletter_form_description_et}
          </p>
        )}
      <SocialIcons pageData={pageData} />
    </div>
  );
};

export default FooterNewsletter;
