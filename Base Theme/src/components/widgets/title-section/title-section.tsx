import { Widget } from 'experro-storefront';
import { ExpTitleSection } from '../../cms-library/title-section';
import {
  expHeaderOptions,
  expTextAlignmentOptions,
  expWidgetConstants,
  expDescriptionOptions,
  expCustomTrait,
} from '../../../utils/constants';

const { WIDGET_CHECK_TRUE, WIDGET_CHECK_FALSE } = expWidgetConstants;

const initialValue: any = {
  titleText: '',
  descriptionText: '',
  showSubTitle: WIDGET_CHECK_TRUE,
  titleSize: 'h3',
  subTitleSize: 'font-s-16',
  titleTextPosition: 'text-center',
  subTitleTextPosition: 'text-center',
  titleTextColor: '#191919',
  subTitleTextColor: '#6C6C6C',
  backgroundColor: '#ffffff',
  traitConfig: [
    {
      type: expCustomTrait.TEXT,
      displayName: 'Title Text',
      internalName: 'titleText',
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Title Size',
      internalName: 'titleSize',
      options: expHeaderOptions,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Title Color',
      internalName: 'titleTextColor',
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Select Position',
      internalName: 'titleTextPosition',
      options: expTextAlignmentOptions,
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Show Subtitle',
      internalName: 'showSubTitle',
      valueTrue: WIDGET_CHECK_TRUE,
      valueFalse: WIDGET_CHECK_FALSE,
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Description Text',
      internalName: 'descriptionText',
      dependent: 'showSubTitle',
      subDependency: WIDGET_CHECK_TRUE,
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Sub Title Size',
      internalName: 'subTitleSize',
      options: expDescriptionOptions,
      dependent: 'showSubTitle',
      subDependency: WIDGET_CHECK_TRUE,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'SubTitle Text Color',
      internalName: 'subTitleTextColor',
      dependent: 'showSubTitle',
      subDependency: WIDGET_CHECK_TRUE,
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Select Subtitle Position',
      internalName: 'subTitleTextPosition',
      options: expTextAlignmentOptions,
      dependent: 'showSubTitle',
      subDependency: WIDGET_CHECK_TRUE,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Background Color',
      internalName: 'backgroundColor',
    },
  ],
};

const ExpTitleSectionWidget = Widget.createWidget({
  component: ExpTitleSection,
  label:
    "<div  class='gjs-fonts gjs-f-b1 custom-widget title-section'>Title Section</div>",
  category: 'Basic Components',
  content: '<ExpTitleSection/>',
  widgetName: 'ExpTitleSection',
  widgetProperties: {
    defaults: {
      name: 'Title Section',
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

export default ExpTitleSectionWidget;
