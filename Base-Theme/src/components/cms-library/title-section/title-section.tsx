import { CommonUtilities } from 'experro-storefront';
import { expWidgetConstants } from '../../../utils/constants';
import { CSSProperties } from 'react';
import { expColorObjectParser } from '../../../utils';

export interface ExpTitleSectionProps {
  titleSize: string;
  titleTextColor: string;
  titleTextPosition: string;
  subTitleTextColor: string;
  showSubTitle: string;
  subTitleTextPosition: string;
  subTitleSize: string;
  backgroundColor: string;
  titleText: string;
  descriptionText: string;
}

/**
 * Renders a Title Section component.
 * @param props - The Title Section component props.
 * @returns The rendered Title Section component.
 */

const ExpTitleSection = (props: ExpTitleSectionProps) => {
  const {
    titleSize,
    titleTextColor,
    titleTextPosition,
    subTitleTextColor,
    showSubTitle,
    subTitleTextPosition,
    subTitleSize,
    backgroundColor,
    titleText,
    descriptionText,
  } = CommonUtilities.propsParser(props);

  const titleTextStyle: CSSProperties = {
    color: expColorObjectParser({ value: titleTextColor }),
  };
  const backgroundStyle: CSSProperties = {
    backgroundColor: expColorObjectParser({ value: backgroundColor }),
  };
  const subTitleTextStyle: CSSProperties = {
    color: expColorObjectParser({ value: subTitleTextColor }),
  };

  return (
    <section
      style={backgroundStyle}
      className={`section-gap text-with-background-section ${titleTextPosition}`}>
      <h1
        className={`${titleSize} ${
          showSubTitle === expWidgetConstants.WIDGET_CHECK_FALSE ? 'm-b-0' : ''
        }`}
        style={titleTextStyle}
        dangerouslySetInnerHTML={{
          __html: titleText?.length ? titleText : 'Please enter heading',
        }}
      />
      {showSubTitle === expWidgetConstants.WIDGET_CHECK_TRUE && (
        <div className={subTitleTextPosition}>
          <p
            className={`m-0 dark-color ${subTitleSize}`}
            style={subTitleTextStyle}
            dangerouslySetInnerHTML={{
              __html: descriptionText?.length
                ? descriptionText
                : 'Please enter sub heading',
            }}
          />
        </div>
      )}
    </section>
  );
};

export default ExpTitleSection;
