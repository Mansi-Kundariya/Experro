import { ContentService, Link } from 'experro-storefront';
import ExpMenuController from './menu-controller';
import { IconArrowDown } from '../../assets/icons/arrow-down';

interface ExpMenuInterface {
  menuLinkObj?: any;
  ulClasses?: string;
  liClasses?: string;
  linkNameClasses?: string;
  childMenuItem?: any;
  keyValueForMenu: string;
  iconForNavChild?: any;
  index?: number;
}
const ExpMenu = (props: ExpMenuInterface) => {
  const {
    menuLinkObj,
    ulClasses,
    liClasses,
    linkNameClasses,
    childMenuItem,
    keyValueForMenu,
    iconForNavChild,
    index = 0,
  } = props;

  const {
    menuData,
    filterNavStringForClass,
    getMenuNameToShow,
    toggleMenuWithChild,
  } = ExpMenuController({ menuLinkObj, childMenuItem, keyValueForMenu });

  const getIcon = (group_index: number) => {
    return (
      <i
        className={`${
          group_index === 0
            ? 'lg:group-hover:rotate-180 lg:group-hover:[&>svg]:stroke-primary'
            : `group-hover/level${group_index}:[&>svg]:stroke-primary group-hover/level${group_index}:rotate-180`
        } icon menu-arrow-icon ml-2 transition-transform [&>svg]:min-h-[10px] [&>svg]:h-[10px] [&>svg]:min-w-[10px] [&>svg]:w-[10px] [&>svg]:stroke-secondary`}>
        <IconArrowDown />
      </i>
    );
  };

  return (
    <ul className={`${ulClasses} ${index > 0 ? `level-${index}` : ''}`}>
      {menuData &&
        !!menuData.length &&
        menuData?.map((menuItem: any) => {
          if (
            (menuItem?.page_slug && menuItem?.page_slug !== '#') ||
            (menuItem?.link_es && menuItem?.link_es !== '#')
          ) {
            menuItem.redirectLink =
              menuItem?.type === 'link'
                ? menuItem?.link_es
                : menuItem?.page_slug;

            if (
              menuItem?.redirectLink &&
              menuItem?.redirectLink?.indexOf('//') !== -1
            ) {
              if (
                new URL(menuItem?.redirectLink).host ===
                new URL(window.location.href)?.host
              )
                menuItem.redirectLink = new URL(
                  menuItem?.redirectLink
                )?.pathname;
              else menuItem.isExternalLink = true;
            }
          } else {
            menuItem.isExternalLink = true;
            menuItem.isNull = true;
          }

          return (
            <li
              id={menuItem?.id}
              key={menuItem?.id}
              className={`${
                menuItem?.children?.length ? 'has-subnav-item relative' : ''
              } ${liClasses} nav-item-${
                menuItem?.content_model_internal_name === 'custom_links'
                  ? filterNavStringForClass(menuItem?.name_esi)
                  : filterNavStringForClass(menuItem?.menu_title_es) ||
                    filterNavStringForClass(menuItem?.title)
              } ${menuItem?.class_name ? menuItem?.class_name : ''}`}>
              {!menuItem?.isExternalLink ? (
                <div
                  className={`link-wrap flex w-full items-center ${
                    index === 0 ? '' : `pl-3 lg:pl-0`
                  }`}
                  onClick={() =>
                    window.matchMedia('(max-width: 1023px)').matches &&
                    toggleMenuWithChild(menuItem?.id)
                  }>
                  <Link
                    to={ContentService.parseVariableValue(
                      menuItem?.redirectLink
                    )}
                    className={linkNameClasses}
                    target={
                      menuItem?.link_target === 'New Tab' ? '_blank' : ''
                    }>
                    {getMenuNameToShow(menuItem)}
                    {!!menuItem?.children?.length && getIcon(index)}
                  </Link>
                </div>
              ) : !menuItem.isNull ? (
                <a
                  href={ContentService.parseVariableValue(
                    menuItem?.redirectLink
                  )}
                  className={linkNameClasses}
                  target={menuItem?.link_target === 'New Tab' ? '_blank' : ''}
                  rel="noreferrer">
                  {getMenuNameToShow(menuItem)}
                  {getIcon(index)}
                </a>
              ) : (
                <div
                  className={`link-wrap flex w-full items-center ${
                    index === 0 ? '' : `pl-3 lg:pl-0`
                  }`}
                  onClick={() =>
                    window.matchMedia('(max-width: 1023px)').matches &&
                    toggleMenuWithChild(menuItem?.id)
                  }>
                  <p
                    className={`flex cursor-pointer items-center transition-colors w-full ${
                      index === 0
                        ? 'py-4 lg:py-5 lg:group-hover:text-primary'
                        : `w-full py-2 group-hover/level${index}:text-primary`
                    } no-link`}>
                    {getMenuNameToShow(menuItem)}
                    {getIcon(index)}
                  </p>
                </div>
              )}
              {!!menuItem?.children?.length && (
                <ExpMenu
                  childMenuItem={menuItem?.children}
                  ulClasses={`hidden bg-white ${
                    index === 0
                      ? 'group-[.is-expanded]:block lg:group-hover:block'
                      : `group-[.is-expanded]/level${index}:block lg:group-hover/level${index}:block left-full top-0`
                  } static lg:absolute lg:top-full lg:shadow py-2 lg:min-w-[240px] lg:border lg:border-gray-300 z-10 *:text-sm *:font-normal has-subnav`}
                  liClasses={`lg:mx-6 group/level${index + 1}`}
                  keyValueForMenu={keyValueForMenu}
                  linkNameClasses={`w-full block py-2 transition-colors group-hover/level${
                    index + 1
                  }:text-primary`}
                  iconForNavChild={iconForNavChild}
                  index={index + 1}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default ExpMenu;
