import { Widget } from 'experro-storefront';
import { ExpButton } from '../cms-library/button';
import {
  expCustomTrait,
  expTextAlignmentOptions,
  expWidgetConstants,
} from '../../utils/constants';
const { WIDGET_CHECK_FALSE } = expWidgetConstants;

const initialValue: any = {
  buttonText: '',
  buttonScript: '',
  buttonLink: '/',
  isOpenLinkInNewtab: WIDGET_CHECK_FALSE,
  buttonPosition: 'text-center',
  buttonColor: '#BA8751',
  buttonTextColor: '#FFFFFF',
  buttonTextHoverColor: '#FFFFFF',
  buttonHoverColor: '#9A6935',
  traitConfig: [
    {
      type: expCustomTrait.TEXT,
      displayName: 'Button text',
      internalName: 'buttonText',
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Button link',
      internalName: 'buttonLink',
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Select Button Position',
      options: expTextAlignmentOptions,
      internalName: 'buttonPosition',
    },
    {
      type: expCustomTrait?.CHECKBOX,
      displayName: 'Open link in new tab',
      internalName: 'isOpenLinkInNewtab',
    },
    {
      type: expCustomTrait?.TEXT_AREA,
      displayName: 'On click event',
      internalName: 'buttonScript',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Color',
      internalName: 'buttonColor',
      category: 'Color Settings',
      defaultValue: '#EA3A3C',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Text Color',
      internalName: 'buttonTextColor',
      category: 'Color Settings',
      defaultValue: '#FFFFFF',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Hover Color',
      internalName: 'buttonHoverColor',
      category: 'Color Settings',
      defaultValue: '#D63537',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Hover Text Color',
      internalName: 'buttonTextHoverColor',
      category: 'Color Settings',
      defaultValue: '#ffffff',
    },
  ],
};

const ExpButtonWidget = Widget.createWidget({
  component: ExpButton,
  label: `<div class='gjs-fonts gjs-f-b1 custom-widget button-section'>Button</div>`,
  category: 'Basic Components',
  content: '<ExpButton />',
  widgetName: 'ExpButton',
  widgetProperties: {
    defaults: {
      name: 'Button',
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

export default ExpButtonWidget;
