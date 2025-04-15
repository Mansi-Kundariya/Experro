import { CSSProperties } from 'react';
import { expColorObjectParser } from '../../../utils';

const ExpHeadingSection = (props: any) => {
  const { component_content } = props;

  const {
    headingText,
    headingPosition,
    headingSize,
    headingColor,
    backgroundColor,
    headingTag,
  }: any = JSON.parse(
    component_content === undefined ? '{}' : component_content
  );

  const HeadingTag: any = `${headingTag}`;

  // Component Styling Properties
  const titleTextStyle: CSSProperties = {
    color: expColorObjectParser(headingColor),
  };
  const backgroundStyle: CSSProperties = {
    backgroundColor: expColorObjectParser(backgroundColor),
  };
  return (
    <>
      <section
        style={backgroundStyle}
        className={`mb-4 py-6 ${headingPosition}`}>
        <HeadingTag
          className={`font-secondary break-all ${headingSize}`}
          style={titleTextStyle}
          dangerouslySetInnerHTML={{
            __html: headingText?.length ? headingText : 'Please enter heading',
          }}
        />
      </section>
    </>
  );
};

export default ExpHeadingSection;
