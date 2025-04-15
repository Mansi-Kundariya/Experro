import { IsCMSApp } from 'experro-storefront';
import { expWidgetConstants } from '../../../utils';
import ExpLinkParser from '../../../utils/link-parser';
import { linkParserStyle } from '../../../utils/link-parser-style';

const ExpButton = (props: any) => {
  const { id, component_content } = props;

  const {
    buttonColor,
    buttonTextColor,
    buttonHoverColor,
    buttonTextHoverColor,
    buttonLink,
    buttonText,
    buttonPosition,
    isOpenLinkInNewtab,
    buttonScript,
  }: any = JSON.parse(
    component_content === undefined ? '{}' : component_content
  );
  const { WIDGET_CHECK_TRUE } = expWidgetConstants;

  // Use the Function constructor to dynamically execute the script
  const handleButtonClick = () => {
    if (buttonScript) {
      try {
        const dynamicFunction = new Function(buttonScript);
        dynamicFunction();
      } catch (error) {
        console.error('Error executing script:', error);
      }
    }
  };

  return (
    <>
      <style>
        {`#${id}  .button-primary.button-large.button-style:hover {
                background-color: var(--button-hover-bg-color);

                color: var(--button-hover-color);
              }
               #${id}  .button-primary.button-large.button-style {
                background-color: var(--button-bg-color);

                color: var(--button-color);
              }`}
      </style>
      <div className={buttonPosition}>
        <ExpLinkParser
          onClick={handleButtonClick}
          target={WIDGET_CHECK_TRUE === isOpenLinkInNewtab ? '_blank' : '_self'}
          style={linkParserStyle({
            buttonHoverColor: {
              value: buttonHoverColor,
            },
            buttonTextHoverColor: {
              value: buttonTextHoverColor,
            },
            buttonColor: { value: buttonColor },
            buttonTextColor: { value: buttonTextColor },
          })}
          className="button-primary button-large button-style"
          to={buttonLink}
          dangerouslySetInnerHTML={{
            __html: buttonText?.length
              ? buttonText
              : IsCMSApp
              ? ''
              : 'Add Button Text',
          }}
        />
      </div>
    </>
  );
};

export default ExpButton;
