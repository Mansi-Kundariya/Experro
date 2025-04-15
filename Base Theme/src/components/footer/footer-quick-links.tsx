import { IconArrowDown } from '../../assets/icons/arrow-down';
import ExpMenu from '../menu';

const FooterQuickLinks = ({ pageData }: any) => {
  const toggleMenu = (event: any) => {
    if (
      event.currentTarget.parentElement?.parentElement?.classList.contains(
        'is-expanded'
      )
    ) {
      event.currentTarget.parentElement?.parentElement.classList.remove(
        'is-expanded'
      );
    } else {
      event.currentTarget.parentElement?.parentElement.classList.add(
        'is-expanded'
      );
    }
  };

  return (
    <>
      <div className="group footer-col-nav w-full md:w-3/12 xl:w-2/12 px-4">
        <div className="footer-nav border-b border-gray-200 md:border-b-0">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_1_title_et && (
              <p
                onClick={(event) => toggleMenu(event)}
                className="footer-nav-title flex items-center justify-between py-3 cursor-pointer md:cursor-auto md:py-0 md:mb-6 font-secondary text-base lg:text-lg font-bold">
                {pageData.globalSettings?.footer_com[0]?.column_1_title_et}
                <i className="flex items-center justify-center rotate-[270deg] transition-transform group-[.is-expanded]:rotate-180 icon [&>svg]:h-[12px] [&>svg]:w-[12px] [&>svg]:stroke-secondary md:hidden">
                  <IconArrowDown />
                </i>
              </p>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_1_navigation_id_et'}
            ulClasses={
              'hidden pb-3 md:pb-0 group-[.is-expanded]:flex *:text-sm *:font-normal md:flex flex-col gap-2 md:gap-5 footer-nav-list'
            }
            liClasses={'group/footerLinks'}
            linkNameClasses={'block w-full transition-colors text-gray-900 group-hover/footerLinks:text-primary'}
          />
        </div>
      </div>

      <div className="group footer-col-nav w-full md:w-3/12 xl:w-2/12 px-4">
        <div className="footer-nav border-b border-gray-200 md:border-b-0">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_2_title_et && (
              <p
                onClick={(event) => toggleMenu(event)}
                className="footer-nav-title flex items-center justify-between py-3 cursor-pointer md:cursor-auto md:py-0 md:mb-6 font-secondary text-base lg:text-lg font-bold">
                {pageData.globalSettings?.footer_com[0]?.column_2_title_et}
                <i className="flex items-center justify-center rotate-[270deg] transition-transform group-[.is-expanded]:rotate-180 icon [&>svg]:h-[12px] [&>svg]:w-[12px] [&>svg]:stroke-secondary md:hidden">
                  <IconArrowDown />
                </i>
              </p>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_2_navigation_id_et'}
            ulClasses={'hidden pb-3 md:pb-0 group-[.is-expanded]:flex *:text-sm *:font-normal md:flex flex-col gap-2 md:gap-5 footer-nav-list'}
            liClasses={'group/footerLinks'}
            linkNameClasses={'block w-full transition-colors text-gray-900 group-hover/footerLinks:text-primary'}
          />
        </div>
      </div>

      <div className="group footer-col-nav w-full md:w-3/12 xl:w-2/12 px-4">
        <div className="footer-nav border-b border-gray-200 md:border-b-0">
          {pageData.globalSettings?.footer_com &&
            pageData.globalSettings?.footer_com[0]?.column_3_title_et && (
              <p
                onClick={(event) => toggleMenu(event)}
                className="footer-nav-title flex items-center justify-between py-3 cursor-pointer md:cursor-auto md:py-0 md:mb-6 font-secondary text-base lg:text-lg font-bold">
                {pageData.globalSettings?.footer_com[0]?.column_3_title_et}
                <i className="flex items-center justify-center rotate-[270deg] transition-transform group-[.is-expanded]:rotate-180 icon [&>svg]:h-[12px] [&>svg]:w-[12px] [&>svg]:stroke-secondary md:hidden">
                  <IconArrowDown />
                </i>
              </p>
            )}
          <ExpMenu
            menuLinkObj={pageData.globalSettings?.footer_com}
            keyValueForMenu={'column_3_navigation_id_et'}
            ulClasses={'hidden pb-3 md:pb-0 group-[.is-expanded]:flex *:text-sm *:font-normal md:flex flex-col gap-2 md:gap-5 footer-nav-list'}
            liClasses={'group/footerLinks'}
            linkNameClasses={'block w-full transition-colors text-gray-900 group-hover/footerLinks:text-primary'}
          />
        </div>
      </div>
    </>
  );
};

export default FooterQuickLinks;
