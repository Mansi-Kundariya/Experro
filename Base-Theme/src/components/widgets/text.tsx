import { Widget } from 'experro-storefront';
import { ExpText } from '../cms-library/text';
import { expCustomTrait, expTextAlignmentOptions } from '../../utils/constants';

const initialValue: any = {
  textPosition: 'text-left',
  text: 'Enter Your Text Here',
  textColor: '#000',
  traitConfig: [
    {
      type: expCustomTrait?.TEXT_AREA,
      internalName: 'text',
      displayName: 'Text',
    },
    {
      type: expCustomTrait?.DROPDOWN,
      internalName: 'textPosition',
      displayName: 'Select Position',
      options: expTextAlignmentOptions,
    },
    {
      type: expCustomTrait?.COLOR_PICKER,
      internalName: 'textColor',
      displayName: 'Text Color',
    },
  ],
};

const ExpTextSectionWidget = Widget.createWidget({
  component: ExpText,
  label:
    "<div  class='gjs-fonts gjs-f-b1 custom-widget text-section'>Text</div>",
  category: 'Basic Components',
  content: '<ExpText />',
  widgetName: 'ExpText',
  widgetProperties: {
    defaults: {
      name: 'Text',
      attributes: {
        component_content: JSON.stringify(initialValue),
      },
      activeOnRender: true,
      traits: [
        {
          type: 'experro-storefront',
          name: 'component_content',
        },
      ],
    },
  },
});

export default ExpTextSectionWidget;
