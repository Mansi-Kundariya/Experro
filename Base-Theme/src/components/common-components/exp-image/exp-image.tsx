import { IsCMSApp } from 'experro-storefront';
import { useEffect, useState } from 'react';
import { ExpImageParser } from '../../../utils/image-parser';
import { model_internal_name, expDataSourceConstants } from '../../../utils';
import { expImageProps } from '../../../interfaces/exp-image.interface';
import ExpLinkParser from '../../../utils/link-parser';

/**
 * Renders a custom image based on the provided props and data source. Works for both FREE_FROM and CONTENT_LIBRARY
 * @param src - This contains the image object as string for the Content Library Data and For free form it has direct object of the desktop, tablet and mobile
 * @param name - The name of the image NOTE :: Name must be unique for the image
 * @param height - The height of the image.
 * @param width - The width of the image.
 * @param alt - The alt text for the image.
 * @param title - The title of the image.
 * @param style - The style for the image tag
 * @param lazyLoad - The flag to load the image lazyly
 * @param preLoad -The flag to preload image
 * @param className - The class name for the image tag
 * @param retina - This boolean value will be specifying the to add 2x images to srcSet for Retina display
 * @param preLoad - This option will indicate to preload the image or not
 * @param options - This prop will be used to specify the image options for the picture tag and the image optimization.
 * @returns Rendered Image component.
 */
import ImagePlaceholder from '@images/no-image-placeholder.svg';
const ExpImage = (props: expImageProps) => {
  const [breakPoints, setBreakPoints] = useState<number[]>([
    1280, 1024, 768, 568, 450,
  ]);

  const {
    src,
    name,
    height,
    width,
    alt,
    title,
    style,
    lazyLoad = true,
    retina = false,
    preLoad = false,
    options,
    navigationUrl,
    navigationTargert,
    className,
    pictureClassName,
  } = props;

  let imageObj: any = {};

  /**
   * Assigning a Data source from the src we got, if the src we got from the FreeForm then it's
   * type will be Object else it will be a string for contentLibrary
   **/
  const dataSource: string =
    typeof src === 'object'
      ? expDataSourceConstants.FREE_FORM
      : expDataSourceConstants.CONTENT_LIBRARY;
  const freeFormImageData =
    dataSource === expDataSourceConstants.FREE_FORM ? src : {};
  const contentLibraryImageData =
    dataSource === expDataSourceConstants.CONTENT_LIBRARY ? src : '';

  const { CONTENT_LIBRARY, FREE_FORM } = expDataSourceConstants;

  const viewTypeArr = ['desktop', 'tablet', 'mobile'];
  /**
   * To handel the breakPoints we have got from the Options and if not valid then will use default breakPoints.
   **/
  const handelImageBreakPoints = () => {
    let foundBreakPointsForAllOptions: boolean = true;
    const newBreakPointsFromOptions: number[] = [];
    if (options?.length) {
      for (let i: number = 0; i < options?.length; i++) {
        if (!('breakPoint' in options[i])) {
          foundBreakPointsForAllOptions = false;
          break;
        } else {
          newBreakPointsFromOptions.push(parseInt(options[i]?.breakPoint));
        }
      }
      if (foundBreakPointsForAllOptions) {
        setBreakPoints(newBreakPointsFromOptions);
      }
    }
  };

  const handleFreeFormImageData = () => {
    viewTypeArr.forEach((view: string) => {
      if (freeFormImageData[view]?.mediaManagerUrl?.length) {
        if (
          !freeFormImageData[view]?.mediaManagerUrl?.includes(
            model_internal_name.image_url_prefix
          )
        ) {
          const image = ExpImageParser(
            freeFormImageData[view]?.mediaManagerUrl
          );
          freeFormImageData[view]['mediaManagerUrl'] = image?.imageUrl;
          freeFormImageData[view]['altText'] = image?.altText;
          freeFormImageData[view]['caption'] = image?.caption;
        }
      }
    });
  };

  if (dataSource === CONTENT_LIBRARY || contentLibraryImageData?.length) {
    imageObj = ExpImageParser(contentLibraryImageData);
  } else if (
    dataSource === FREE_FORM &&
    Object.keys(freeFormImageData)?.length
  ) {
    handleFreeFormImageData();
  }

  /**
   *
   * @param image_url | image URL
   * @returns | a image URL with width appended to it's query parma's
   */
  const getImageSrcSet = (image_url: string) => {
    return image_url;
  };

  /**
   * @param imageSrcSet | imageSrcSet which is unique for all the srcsets for the image or source of a picture tag
   * @returns | boolean value for status that image is already set to preload or not
   **/
  const checkPreLoadImage = (imageSrcSet: string) => {
    const preloadElements = document.querySelectorAll('link[as="image"]');
    let foundPreload: boolean = false;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const preloadElement of preloadElements) {
      if (preloadElement.getAttribute('imagesrcset') === imageSrcSet) {
        foundPreload = true;
        break;
      }
    }
    return foundPreload;
  };

  /**
   * @param imageSrcSet | imageSrcSet
   * @param imageWidth | image width for which image is getting preloaded
   * @param minWidth  | minimum width for the image to load
   * @param maxWidth   | maximum width for the image to load
   * Function will be used to preloading the imageSrcSet, It will have main imageWidth which will be used to
   **/
  const expPreLoadImage = ({
    imageSrcSet,
    imageWidth,
    minWidth,
    maxWidth,
  }: {
    imageSrcSet: string;
    imageWidth?: string;
    minWidth?: number;
    maxWidth?: number;
  }) => {
    /**
     * If link with this window key added, and it's value is true then no need to add it again
     **/
    const windowObjectKey: string = `__${name}${
      imageWidth ? `_${imageWidth}` : ''
    }`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window[`${windowObjectKey}`]) {
      return;
    }
    /**
     * Check if already link is created and preloaded then not to load it again
     **/
    let link: any = '';
    if (imageSrcSet && !checkPreLoadImage(imageSrcSet) && imageWidth) {
      if (retina) {
        if (maxWidth && minWidth && minWidth !== 0 && maxWidth !== 0) {
          link = `<link rel="preload" imagesrcset="${imageSrcSet}" as="image"  media="(min-width:${minWidth}px) and (max-width:${
            maxWidth - 1
          }px)" fetchPriority="high"/>`;
        } else if (minWidth) {
          link = `<link rel="preload" imagesrcset="${imageSrcSet}" as="image"  media="(min-width:${minWidth}px)" fetchPriority="high"/>`;
        } else if (maxWidth) {
          link = `<link rel="preload" imagesrcset="${imageSrcSet}" as="image"  media="(max-width:${
            maxWidth - 1
          }px)" fetchPriority="high"/>`;
        } else {
          link = `<link rel="preload" imagesrcset="${imageSrcSet}" as="image" fetchPriority="high"/>`;
        }
      } else {
        if (maxWidth && minWidth && minWidth !== 0 && maxWidth !== 0) {
          link = `<link rel="preload" imagesrcset="${imageSrcSet}" as="image"  media="(min-width:${minWidth}px) and (max-width:${
            maxWidth - 1
          }px)" fetchPriority="high"/>`;
        } else if (minWidth) {
          link = `<link rel="preload" imagesrcset="${imageSrcSet}" as="image"  media="(min-width:${minWidth}px)" fetchPriority="high"/>`;
        } else if (maxWidth) {
          link = `<link rel="preload" imagesrcset="${imageSrcSet}" as="image"  media="(max-width:${
            maxWidth - 1
          }px)" fetchPriority="high"/>`;
        } else {
          link = `<link rel="preload" imagesrcset="${imageSrcSet}" as="image" fetchPriority="high"/>`;
        }
      }
    }
    // const preloadLink: any = document.querySelector('meta[name="viewport"]');
    // if (preloadLink) {
    //   preloadLink.insertAdjacentHTML('afterend', link);
    // }
    const firstLinkTag = document.querySelector(
      'link[rel="preload"][as="font"]'
    );
    if (firstLinkTag && firstLinkTag.parentNode && link) {
      firstLinkTag.insertAdjacentHTML('beforebegin', link);
    }
  };

  /**
   *  Preload image and then set falg not to load image again
   **/
  const setPreLoadImage = () => {
    if (dataSource === CONTENT_LIBRARY && imageObj?.imageUrl) {
      const newBreakPointArray = JSON.parse(
        JSON.stringify(breakPoints)
      ).reverse();

      if (options?.length < newBreakPointArray?.length) {
        newBreakPointArray.shift(newBreakPointArray?.length - options?.length);
      }
      if (options?.length) {
        const newOptions = JSON.parse(JSON.stringify(options)).reverse();
        newOptions?.forEach((__option: any, __option_index: number) => {
          const imageSrcSet = processSrcSet(imageObj?.imageUrl, __option);
          let minWidth: number = 0;
          const imageWidth = __option?.width || __option?.height;

          let maxWidth: number = 0;

          if (__option_index !== 0) {
            minWidth = parseInt(newBreakPointArray[__option_index]);
          }

          if (
            __option_index !== 0 &&
            __option_index + 1 < newBreakPointArray.length
          ) {
            maxWidth = parseInt(newBreakPointArray[__option_index + 1]);
          }

          if (__option_index === 0) {
            maxWidth = newBreakPointArray[1];
          }

          expPreLoadImage({
            imageSrcSet,
            imageWidth,
            minWidth,
            maxWidth,
          });
        });
      }
    } else if (dataSource === expDataSourceConstants.FREE_FORM) {
      if (freeFormImageData?.desktop?.mediaManagerUrl) {
        const imageSrcSet = getImageSrcSet(
          freeFormImageData?.desktop?.mediaManagerUrl
        );
        const imageWidth = '1280px';
        expPreLoadImage({ imageSrcSet, imageWidth });
      } else if (freeFormImageData?.desktop?.imageUrl) {
        const imageSrcSet = freeFormImageData?.desktop?.imageUrl;
        const imageWidth = '1280px';
        expPreLoadImage({ imageSrcSet, imageWidth });
      }
      //tablet view
      if (freeFormImageData?.tablet?.mediaManagerUrl) {
        const imageSrcSet = getImageSrcSet(
          freeFormImageData?.tablet?.mediaManagerUrl
        );
        const imageWidth = '768px';
        expPreLoadImage({ imageSrcSet, imageWidth });
      } else {
        const imageSrcSet = freeFormImageData?.tablet?.imageUrl;
        const imageWidth = '768px';
        expPreLoadImage({ imageSrcSet, imageWidth });
      }
      //mobile view
      if (freeFormImageData?.mobile?.mediaManagerUrl) {
        const imageSrcSet = getImageSrcSet(
          freeFormImageData?.mobile?.mediaManagerUrl
        );
        const imageWidth = '320';
        expPreLoadImage({ imageSrcSet, imageWidth });
      } else {
        const imageSrcSet = freeFormImageData?.mobile?.imageUrl;
        const imageWidth = '320';
        expPreLoadImage({ imageSrcSet, imageWidth });
      }
    }
  };

  /**
   * @returns a image URL
   **/
  const getImageUrl = () => {
    if (dataSource === CONTENT_LIBRARY && imageObj?.imageUrl) {
      return `${imageObj.imageUrl}${
        options?.length
          ? getQueryString(options[options?.length - 1], imageObj.imageUrl)
          : ''
      }`;
    } else if (freeFormImageData?.desktop?.mediaManagerUrl) {
      return freeFormImageData.desktop.mediaManagerUrl;
    } else if (freeFormImageData?.desktop?.imageUrl) {
      return freeFormImageData.desktop.imageUrl;
    } else {
      return null;
      // return `https://via.placeholder.com/${width ? width : 1920}x${
      //   height ? height : 450
      // }.png?text=Image+coming+soon`;
    }
  };

  /**
   * @returns a alt text for the image
   * When the alt text is provided to the component, it will override the alt text provided by the media manager.
   **/
  const getAltText = () => {
    if (alt?.length) {
      return alt;
    } else if (dataSource === CONTENT_LIBRARY && imageObj?.altText) {
      return imageObj.altText;
    } else if (freeFormImageData?.altText?.length) {
      return freeFormImageData?.altText;
    } else if (freeFormImageData?.desktop?.altText) {
      return freeFormImageData.desktop.altText;
    } else {
      return '';
    }
  };

  /**
   * @returns a title text for the image
   **/
  const getTitle = () => {
    if (title?.length) {
      return title;
    } else if (dataSource === CONTENT_LIBRARY && imageObj?.caption) {
      return imageObj.caption;
    } else if (freeFormImageData?.caption?.length) {
      return freeFormImageData?.caption;
    } else if (freeFormImageData?.desktop?.caption) {
      return freeFormImageData.desktop.caption;
    } else {
      return '';
    }
  };

  /**
   * This function will be useful for the Free-form option images handling
   **/
  const getImageSource = (sourceData: any) => {
    if (sourceData?.mediaManagerUrl) {
      return getImageSrcSet(sourceData.mediaManagerUrl);
    } else if (sourceData?.imageUrl) {
      return `${sourceData.imageUrl}`;
    } else {
      return '';
    }
  };

  /**
   * Get Query string from the option provided
   **/
  const getQueryString = (option: any, imageUrl: string) => {
    let queryString: string = '';
    const newOption = JSON.parse(JSON.stringify(option));
    delete newOption?.breakPoint;

    const optionsKeys = Object.keys(newOption);
    if (optionsKeys?.length) {
      for (let i = 0; i < Object.keys(newOption)?.length; i++) {
        if (
          'breakPoint' !== optionsKeys[i] ||
          'break_point' !== optionsKeys[i]
        ) {
          if (imageUrl.indexOf('?') !== -1) {
            queryString += `&${optionsKeys[i]}=${option[optionsKeys[i]]}`;
          } else {
            if (i === 0) {
              queryString += `?${optionsKeys[i]}=${option[optionsKeys[i]]}`;
            } else {
              queryString += `&${optionsKeys[i]}=${option[optionsKeys[i]]}`;
            }
          }
        }
      }
    }
    return queryString;
  };

  /**
   *  @returns | srcSet from the provided image URL and provided options for the image
   *  This function will be help to process the image Src set for the Content Library Data and handles the Retina option as well.
   **/
  const processSrcSet = (imageUrl: string, imageOptions: any) => {
    let srcSet: string = '';
    if (retina) {
      srcSet = `${imageUrl}${getQueryString(imageOptions, imageUrl)}`;
      if (imageOptions?.width)
        imageOptions = {
          ...imageOptions,
          width: parseInt(imageOptions?.width) * 2,
        };
      if (imageOptions?.height)
        imageOptions = {
          ...imageOptions,
          height: parseInt(imageOptions?.height) * 2,
        };

      srcSet += `, ${imageUrl}${getQueryString(imageOptions, imageUrl)} 2x`;
    } else srcSet = `${imageUrl}${getQueryString(imageOptions, imageUrl)}`;

    return srcSet;
  };

  useEffect(() => {
    handelImageBreakPoints();

    if (preLoad && IsCMSApp) {
      setPreLoadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LinkWapper = (Children: any) => {
    return navigationUrl ? (
      <ExpLinkParser to={navigationUrl} target={navigationTargert}>
        {Children}
      </ExpLinkParser>
    ) : (
      Children
    );
  };

  const imageUrlSrc = getImageUrl();
  if (!imageUrlSrc && !IsCMSApp) {
    return (
      <picture className="bg-gray-50 py-7 px-2 m-[4px] flex justify-center items-center">
        <img
          src={ImagePlaceholder}
          alt=""
          title={getTitle()}
          height="82px"
          width="160px"
        />
      </picture>
    );
  } else {
    return LinkWapper(
      <>
        <picture
          className={`${pictureClassName?.length ? pictureClassName : ''}`}>
          {dataSource === CONTENT_LIBRARY && imageObj?.imageUrl ? (
            options?.length ? (
              options?.map((option: any, index: number) => {
                return index === options?.length - 1 ? (
                  <source
                    key={index.toString()}
                    media={`(max-width: ${breakPoints[index - 1] - 1}px)`}
                    srcSet={processSrcSet(imageObj?.imageUrl, option)}
                  />
                ) : index > 0 ? (
                  <source
                    key={index.toString()}
                    media={`(min-width: ${
                      breakPoints[index]
                    }px) and (max-width: ${breakPoints[index - 1] - 1}px)`}
                    srcSet={processSrcSet(imageObj?.imageUrl, option)}
                  />
                ) : (
                  <source
                    key={index.toString()}
                    media={`(min-width: ${breakPoints[index]}px)`}
                    srcSet={processSrcSet(imageObj?.imageUrl, option)}
                  />
                );
              })
            ) : (
              <></>
            )
          ) : dataSource === FREE_FORM ? (
            <>
              <source
                media="(min-width:1280px)"
                srcSet={getImageSource(freeFormImageData?.desktop)}
              />
              <source
                media="(min-width:768px) and (max-width:1279px)"
                srcSet={getImageSource(
                  freeFormImageData?.tablet?.imageUrl ||
                    freeFormImageData?.tablet?.mediaManagerUrl
                    ? freeFormImageData?.tablet
                    : freeFormImageData?.desktop
                )}
              />
              <source
                media="(max-width:767px)"
                srcSet={getImageSource(
                  freeFormImageData?.mobile?.image_url ||
                    freeFormImageData?.mobile?.mediaManagerUrl
                    ? freeFormImageData?.mobile
                    : freeFormImageData?.tablet?.imageUrl ||
                      freeFormImageData?.tablet?.mediaManagerUrl
                    ? freeFormImageData?.tablet
                    : freeFormImageData?.desktop
                )}
              />
            </>
          ) : (
            <></>
          )}
          <img
            loading={lazyLoad ? 'lazy' : 'eager'}
            src={
              getImageUrl() ||
              `https://via.placeholder.com/${width ? width : 1920}x${
                height ? height : 450
              }.png?text=Image+coming+soon`
            }
            alt={getAltText()}
            title={getTitle()}
            height={height > 0 ? height : undefined}
            width={width > 0 ? width : undefined}
            style={style}
            className={className}
            fetchPriority={preLoad ? 'high' : 'auto'}
          />
        </picture>
      </>
    );
  }
};

export default ExpImage;
