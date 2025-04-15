import { CSSProperties } from 'react';
import { CommonUtilities, ContentService } from 'experro-storefront';

export interface ExpTextProps {
  text: string;
  textColor: string;
  textPosition: string;
}

/**
 * Renders a ExpText component.
 * @param props - The ExpText component props.
 * @returns The rendered ExpText component.
 */
const ExpText = (props: ExpTextProps) => {
  const { text, textColor, textPosition } = CommonUtilities.propsParser(props);

  const textToPrint = ContentService.parseVariableValue(text);
  const titleTextStyle: CSSProperties = {
    color: textColor,
  };

  return (
    <div className={`text-widget-section ${textPosition}`}>
      <div className="container">
        <p
          style={titleTextStyle}
          dangerouslySetInnerHTML={{ __html: textToPrint }}
        />
      </div>
    </div>
  );
};

export default ExpText;
