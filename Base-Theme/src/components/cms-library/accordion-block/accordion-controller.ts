import { CSSProperties, useEffect } from 'react';
import { CommonUtilities, IsCMSApp } from 'experro-storefront';
import { getContentLibraryData } from '../../../utils/get-content-library-data';
import { expColorObjectParser } from '../../../utils';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils/component-data-dispatcher';
import { slideUp, slideDown } from './utils';
import { schemaInjector } from '../../../utils/schema-org/schema-org';

interface ExpAccordionBlockControllerProps {
  id: string;
  contentModel: string;
  modelInternalName: string;
  headingColor?: string;
  subHeadingTextColor?: string;
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

/**
 * Controller function for the ExpAccordionBlock component.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpAccordionBlockController = (
  props: ExpAccordionBlockControllerProps
) => {
  const {
    id,
    contentModel,
    modelInternalName,
    headingColor,
    subHeadingTextColor,
    backgroundColor,
    titleColor,
    descriptionColor,
  } = CommonUtilities.propsParser(props);

  const modelKeyForSSR = 'faq-ssr';
  let parsedContentModel: any;

  const handleElement = (element: any) => {
    const headingTag = element?.target;
    const descriptionTag = headingTag.nextSibling;
    const descriptionClassList = headingTag.nextSibling?.classList;
    /*
    here there are three possibilities 
    1. opening any tab for 1st time
    2. it would be same tab (for closing the current tab) 
    3. opening another tab after viewing any tab
    */
    if (!Object.values(descriptionClassList || []).includes('is-expanded')) {
      const parantialChildList =
        headingTag?.parentElement?.parentElement?.childNodes;
      parantialChildList?.forEach((item: any) => {
        if (
          Object.values(item?.childNodes[1]?.classList || []).includes(
            'is-expanded'
          )
        ) {
          item?.childNodes[0]?.classList?.remove('is-expanded');
          item?.childNodes[1]?.classList?.remove('is-expanded');
          slideUp(item?.childNodes[1]);
        }
      });
      headingTag?.classList?.add('is-expanded');
      headingTag.nextSibling?.classList?.add('is-expanded');
      slideDown(descriptionTag);
    } else {
      headingTag?.classList?.remove('is-expanded');
      headingTag.nextSibling?.classList?.remove('is-expanded');
      slideUp(descriptionTag);
    }
  };

  if (contentModel?.trim().length)
    parsedContentModel = JSON.parse(contentModel);
  const {
    setComponentDataDispatcher,
    componentDataDispatcher,
    isComponentLoaded,
  } = ExpComponentDataDispatcher({
    id,
    modelInternalName,
    modelKeyForSSR,
  });

  useEffect(() => {
    if (isComponentLoaded) {
      setComponentDataDispatcher({
        type: expCommonDispatcherKeys.fetchingData,
      });
      if (contentModel?.trim()?.length) {
        (async () => {
          setComponentDataDispatcher({
            type: expCommonDispatcherKeys.dataFetched,
            data: await getContentLibraryData(
              parsedContentModel,
              modelInternalName,
              modelKeyForSSR,
              id
            ),
          });
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentModel]);

  useEffect(() => {
    if (IsCMSApp) {
      Array.from(
        document.querySelectorAll<HTMLElement>('.accordion-description')
      ).forEach((element: HTMLElement) => {
        if (element?.style) {
          element.style.display = 'none';
        }
      });
    } else {
      const gjsFrame = document.querySelector(
        '.gjs-frame'
      ) as HTMLIFrameElement | null;
      if (gjsFrame) {
        const iframeDocument =
          gjsFrame.contentDocument || gjsFrame.contentWindow?.document;
        Array.from(
          iframeDocument?.querySelectorAll<HTMLElement>(
            '.accordion-description'
          ) || []
        ).forEach((element: HTMLElement) => {
          if (element?.style) {
            element.style.display = 'none';
          }
        });
      }
    }
  }, [componentDataDispatcher?.componentData?.faqs_com]);

  useEffect(() => {
    if (!componentDataDispatcher?.isLoading) {
      if (componentDataDispatcher?.componentData?.accordion_com?.length) {
        schemaInjector({
          type: 'FAQ',
          data: componentDataDispatcher?.componentData?.accordion_com,
          id: `${id}-faq`,
        });
      }
    }
  }, [componentDataDispatcher]);

  const headingStyle: CSSProperties = {
    color: expColorObjectParser({ value: headingColor }),
  };
  const subHeadingStyle: CSSProperties = {
    color: expColorObjectParser({ value: subHeadingTextColor }),
  };
  const titleStyle: CSSProperties = {
    color: expColorObjectParser({ value: titleColor }),
  };
  const descriptionStyle: CSSProperties = {
    color: expColorObjectParser({ value: descriptionColor }),
  };
  const backgroundStyle: CSSProperties = {
    backgroundColor: expColorObjectParser({ value: backgroundColor }),
  };

  return {
    componentDataDispatcher,
    contentModel,
    headingStyle,
    subHeadingStyle,
    titleStyle,
    descriptionStyle,
    backgroundStyle,
    handleElement,
  };
};

export default ExpAccordionBlockController;
