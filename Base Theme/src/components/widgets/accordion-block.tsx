import { Widget } from 'experro-storefront';
import { ExpAccordionBlock } from '../cms-library/accordion-block';
import { modelInternalName } from '../../utils';
import {
  expCustomTrait,
  expHeaderOptions,
  expTextAlignmentOptions,
  expWidgetConstants,
} from '../../utils/constants';
import ExpWidgetImage from '../../assets/images/accordion-block.png';

const { WIDGET_CHECK_TRUE, WIDGET_CHECK_FALSE } = expWidgetConstants;

const initialValue: any = {
  contentModel: '',
  modelInternalName: modelInternalName.frequentlyAskedQuestion,
  showHeadingText: WIDGET_CHECK_TRUE,
  headingSize: 'h1',
  headingPosition: 'text-center',
  showSubHeading: WIDGET_CHECK_TRUE,
  subHeadingPosition: 'text-center',
  showButton: WIDGET_CHECK_FALSE,
  headingColor: '#000000',
  subHeadingTextColor: '#6C6C6C',
  titleColor: '#000000',
  descriptionColor: '#6C6C6C',
  buttonColor: '#BA8751',
  buttonTextColor: '#FFFFFF',
  buttonTextHoverColor: '#ffffff',
  buttonHoverColor: '#9A6935',
  backgroundColor: '#ffffff',
  traitConfig: [
    {
      type: expCustomTrait.CONTENT_MODEL_POP_UP,
      modelInternalName: modelInternalName.frequentlyAskedQuestion,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Title Color',
      internalName: 'titleColor',
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Description Color',
      internalName: 'descriptionColor',
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Background Color',
      internalName: 'backgroundColor',
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Show Heading',
      internalName: 'showHeadingText',
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Heading Size',
      internalName: 'headingSize',
      options: expHeaderOptions,
      dependent: 'showHeadingText',
      subDependency: WIDGET_CHECK_TRUE,
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Heading Position',
      internalName: 'headingPosition',
      options: expTextAlignmentOptions,
      dependent: 'showHeadingText',
      subDependency: WIDGET_CHECK_TRUE,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Heading Color',
      internalName: 'headingColor',
      dependent: 'showHeadingText',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Show Sub Heading',
      internalName: 'showSubHeading',
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Sub Title Position',
      internalName: 'subHeadingPosition',
      options: expTextAlignmentOptions,
      dependent: 'showSubHeading',
      subDependency: WIDGET_CHECK_TRUE,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Sub Heading Color',
      internalName: 'subHeadingTextColor',
      dependent: 'showSubHeading',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Show Button',
      internalName: 'showButton',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Color',
      internalName: 'buttonColor',
      dependent: 'showButton',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Text Color',
      internalName: 'buttonTextColor',
      dependent: 'showButton',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Hover Color',
      internalName: 'buttonHoverColor',
      dependent: 'showButton',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Text Hover Color',
      internalName: 'buttonTextHoverColor',
      dependent: 'showButton',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Color Settings',
    },
  ],
};

const ExpAccordionBlockWidget = Widget.createWidget({
  component: ExpAccordionBlock,
  label: `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">Accordion Block</p>`,
  category: 'Theme Components',
  content: '<ExpAccordionBlock data-cms-widget="true"/>',
  widgetName: 'ExpAccordionBlock',
  widgetProperties: {
    defaults: {
      name: 'Frequently Asked Question',
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

export default ExpAccordionBlockWidget;
