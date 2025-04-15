/* eslint-disable no-script-url */
import {
  Link,
  IsCMSApp,
  ContentService,
  CommonUtilities,
} from 'experro-storefront';
import { scrollToElement } from './scroll-to-element';

const parseLink = (to: string) => {
  let link: any = '#!';
  let isExternalLink = false;
  //used for scrolling to element
  let hash = '';

  try {
    if (to) {
      if (to.indexOf('//') !== -1) {
        try {
          if (new URL(to).host !== CommonUtilities.getHostname()) {
            link = to;
            isExternalLink = true;
          } else {
            link = new URL(to);
            if (link?.search) {
              link = `${link?.pathname}${link?.search}`;
            } else {
              link = link?.pathname;
            }
          }
        } catch (e) {
          console.error('Something went wrong at Link Parser');
        }
      } else if (to === '#') {
        link = 'javascript:void(0);';
      } else {
        link = to;
        const hashIndex = to?.indexOf('#');
        if (hashIndex !== -1) {
          hash = to.substring(hashIndex);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }

  return { link, isExternalLink, hash };
};

/**
 * A custom link parser component that handles internal and external links based on the provided 'to' prop.
 * @param children - The child elements to be rendered within the link.
 * @param to - The destination URL.
 * @param target - The target attribute.
 * @param dangerouslySetInnerHTML - An object with a '__html' property containing HTML content to be rendered within the link.
 * @param className - The CSS class.
 * @param title - The title attribute.
 * @param ariaLabel - The aria-label attribute.
 * @param rel - The rel attribute.
 * @param onClick - The click event handler.
 * @param style - The inline style object.
 * @param id - The id attribute.
 * @returns Rendered ExpLinkParser component.
 */
const ExpLinkParser = ({
  children,
  to,
  target = '_self',
  dangerouslySetInnerHTML,
  className,
  title,
  ariaLabel,
  rel,
  onClick,
  style,
  id,
}: {
  children?: any;
  to?: any;
  target?: string;
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
  title?: string;
  ariaLabel?: string;
  rel?: any;
  onClick?: any;
  style?: any;
  id?: string;
}) => {
  const { link, isExternalLink, hash } = parseLink(to);

  const handleClick = (event: any) => {
    if (IsCMSApp) {
      if (hash) {
        event.preventDefault();
        //doing this because we have removed default behavior of link but still want to add hash to url
        history.pushState(null, '', `${hash}`);
        scrollToElement(hash);
      }
      if (onClick) {
        onClick(event);
      }
    }
  };

  return (
    <>
      {to &&
      to !== '#' &&
      (to.startsWith('javascript:') ||
        to.includes('tel:') ||
        to.includes('mailto:') ||
        to.endsWith('.pdf')) ? (
        !dangerouslySetInnerHTML ? (
            <a
              style={style}
              id={id}
              suppressHydrationWarning
              title={title}
              aria-label={ariaLabel}
              rel={rel}
              className={className}
              target={target}
              href={ContentService.parseVariableValue(link)}
              onClick={handleClick}>
              {children}
            </a>
        ) : (
          <a
            id={id}
            style={style}
            suppressHydrationWarning
            title={title}
            aria-label={ariaLabel}
            className={className}
            target={target}
            rel={rel}
            href={ContentService.parseVariableValue(link)}
            dangerouslySetInnerHTML={{
              __html: ContentService.parseVariableValue(
                dangerouslySetInnerHTML?.__html
              ),
            }}
            onClick={handleClick}
          />
        )
      ) : (
        <>
          {!dangerouslySetInnerHTML ? (
            <>
              {!isExternalLink && IsCMSApp && link !== '#!' && to !== '#' ? (
                <Link
                  style={style}
                  id={id}
                  title={title}
                  aria-label={ariaLabel}
                  rel={rel}
                  className={className}
                  target={target}
                  to={ContentService.parseVariableValue(link)}
                  onClick={handleClick}>
                  {children}
                </Link>
              ) : (
                <a
                  style={style}
                  id={id}
                  suppressHydrationWarning
                  title={title}
                  aria-label={ariaLabel}
                  rel={rel}
                  className={className}
                  target={target}
                  href={ContentService.parseVariableValue(link)}
                  onClick={handleClick}>
                  {children}
                </a>
              )}
            </>
          ) : (
            <>
              {!isExternalLink &&
              IsCMSApp &&
              link !== '#!' &&
              !link.startsWith('#') &&
              to !== '#' ? (
                <Link
                  id={id}
                  style={style}
                  title={title}
                  className={className}
                  aria-label={ariaLabel}
                  target={target}
                  rel={rel}
                  to={ContentService.parseVariableValue(link)}
                  dangerouslySetInnerHTML={{
                    __html: ContentService.parseVariableValue(
                      dangerouslySetInnerHTML?.__html
                    ),
                  }}
                  onClick={handleClick}
                />
              ) : (
                <a
                  id={id}
                  style={style}
                  suppressHydrationWarning
                  title={title}
                  aria-label={ariaLabel}
                  className={className}
                  target={target}
                  rel={rel}
                  href={ContentService.parseVariableValue(link)}
                  dangerouslySetInnerHTML={{
                    __html: ContentService.parseVariableValue(
                      dangerouslySetInnerHTML?.__html
                    ),
                  }}
                  onClick={handleClick}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ExpLinkParser;
