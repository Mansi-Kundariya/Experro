import { Widget } from 'experro-storefront';
import { ExpSeparator } from '../cms-library/separator';
import { expCustomTrait } from '../../utils/constants';


const initialValue: any = {
  separatorHeight: '2',
  separatorColor: '#E5E5E5',
  traitConfig: [
    {
      type: expCustomTrait.TEXT,
      displayName: 'Thickness',
      internalName: 'separatorHeight',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Separator Color',
      internalName: 'separatorColor',
      category: 'Color Settings',
      defaultValue: '#E5E5E5',
    },
  ],
};
const ExpSeparatorWidget = Widget.createWidget({
  component: ExpSeparator,
  label:
  `<div class='gjs-fonts gjs-f-b1 custom-widget separator-section'>Separator</div>`,
  category: 'Basic Components',
  content: '<ExpSeparator />',
  widgetName: 'ExpSeparator',
  widgetProperties: {
    defaults: {
      name: 'Separator',
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

export default ExpSeparatorWidget;
