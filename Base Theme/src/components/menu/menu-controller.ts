import { useCallback, useEffect, useState } from 'react';
import { CommonUtilities, ContentService } from 'experro-storefront';

interface ExpMenuControllerProps {
  menuLinkObj: any;
  childMenuItem?: any;
  keyValueForMenu: string;
}
const ExpMenuController = (props: ExpMenuControllerProps) => {
  const { menuLinkObj, childMenuItem, keyValueForMenu } = props;

  let menuId = menuLinkObj && menuLinkObj[0];
  menuId = menuId && menuId[keyValueForMenu];

  // Component Already loaded then will get the data from LocalState
  let isComponentLoaded = false;
  const menuDataResponse = CommonUtilities.getLocalState(
    `${menuId}_menu-exp-cmp`
  );
  let initialState: any = [];
  if (menuDataResponse) {
    initialState = menuDataResponse.data?.Data?.item?.content_ej;
    isComponentLoaded = true;
  }

  // State to Store the Menu Data
  const [menuData, setMenuData] = useState<any>(
    menuLinkObj ? initialState : childMenuItem
  );

  // Function to get the Menu Data from Admin panel with the help of the menu-id
  const getMenuObj = useCallback(async () => {
    if (menuLinkObj && menuId) {
      const menuDataResponse = await ContentService.getMenuById(menuId);
      if (menuDataResponse.Status === 'success') {
        setMenuData(menuDataResponse?.Data?.item?.content_ej);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuLinkObj]);

  // If we got the data from the [CommonUtilities.getLocalState()] then will not make a call
  // to the function we have created above for getting menu data from Admin panel
  useEffect(() => {
    if (!isComponentLoaded) {
      getMenuObj();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get flatten string as replacing space with '-' and replacing other then alphabet with '' [blank space]
  const filterNavStringForClass = (menuName: string) => {
    if (!menuName) return false;

    return menuName
      ?.replace(/[^a-zA-Z]/g, ' ')
      ?.split(' ')
      ?.join('-')
      ?.toLowerCase();
  };

  const getMenuNameToShow = (menuItem: any) => {
    return menuItem.content_model_internal_name === 'custom_links'
      ? menuItem.name_esi ||
          menuItem?.navigation_label ||
          menuItem.menu_title_es ||
          menuItem.navigation_title ||
          menuItem.title
      : menuItem?.navigation_label ||
          menuItem.menu_title_es ||
          menuItem.navigation_title ||
          menuItem.title;
  };

  const toggleMenuWithChild = (id: any) => {
    const liTag = document.getElementById(id);
    if (liTag?.classList.contains('is-expanded')) {
      liTag.classList.remove('is-expanded');
    } else {
      liTag?.classList.add('is-expanded');
    }
  };

  return {
    menuData,
    filterNavStringForClass,
    getMenuNameToShow,
    toggleMenuWithChild,
  };
};
export default ExpMenuController;
