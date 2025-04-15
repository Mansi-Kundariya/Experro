import { Widget } from 'experro-storefront';
import { ExpHeadingSection } from '../cms-library/heading-section';
import {
  expCustomTrait,
  expTextAlignmentOptions,
  expHeadingTagOptions,
  expHeaderFontOptions,
} from '../../utils/constants';

const initialValue: any = {
  headingText: '',
  headingPosition: 'text-center',
  headingSize: 'text-5xl',
  headingTag: 'h1',
  headingColor: '#494136',
  backgroundColor: '#ffffff',
  traitConfig: [
    {
      type: expCustomTrait.TEXT,
      displayName: 'Heading text',
      internalName: 'headingText',
      defaultOpen: 'on',
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Heading Tag',
      internalName: 'headingTag',
      options: expHeadingTagOptions,
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Heading Font Size',
      internalName: 'headingSize',
      options: expHeaderFontOptions,
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Select Heading Position',
      options: expTextAlignmentOptions,
      internalName: 'headingPosition',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Heading Color',
      internalName: 'headingColor',
      category: 'Color Options',
      defaultValue: '#191919',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Background Color',
      internalName: 'backgroundColor',
      category: 'Color Options',
      defaultValue: '#ffffff',
    },
  ],
};

const ExpButtonWidget = Widget.createWidget({
  component: ExpHeadingSection,
  label: `<div class='gjs-fonts gjs-f-b1 custom-widget heading-section'>Heading</div>`,
  category: 'Basic Components',
  content: '<ExpHeadingSection />',
  widgetName: 'ExpHeadingSection',
  widgetProperties: {
    defaults: {
      name: 'Heading',
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
