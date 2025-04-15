import { Widget } from 'experro-storefront';
import { ExpTwoColGridBanner } from '../../../components/cms-library/grid-banner';
// import { content_library } from '../../../interfaces/custom-trait.interfaces';
import { modelInternalName } from '../../../utils';
import {
  expWidgetConstants,
  expTextAlignmentOptions,
  expHeaderOptions,
  expCustomTrait,
} from '../../../utils/constants';
import ExpWidgetImage from '../../../assets/images/two-col-grid.png';

const { WIDGET_CHECK_TRUE } = expWidgetConstants;
const initialValue: any = {
  contentModel: '',
  modelInternalName: modelInternalName.promotional_banner,
  showHeadingText: WIDGET_CHECK_TRUE,
  headingSize: 'h5',
  contentPosition: 'text-left',
  showDescriptionText: WIDGET_CHECK_TRUE,
  headingColor: '#191919',
  descriptionColor: '#6C6C6C',
  buttonColor: '#BA8751',
  buttonTextColor: '#FFFFFF',
  buttonTextHoverColor: '#ffffff',
  buttonHoverColor: '#9A6935',
  loadImageLazy: WIDGET_CHECK_TRUE,
  traitConfig: [
    {
      type: expCustomTrait.CONTENT_MODEL_POP_UP,
      modelInternalName: modelInternalName.promotional_banner,
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
      internalName: 'contentPosition',
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
      category:'Color Settings'
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Show Description',
      internalName: 'showDescriptionText',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Description Color',
      internalName: 'descriptionColor',
      dependent: 'showDescriptionText',
      subDependency: WIDGET_CHECK_TRUE,
      category:'Color Settings'
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Color',
      internalName: 'buttonColor',
      category:'Color Settings'
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Text Color',
      internalName: 'buttonTextColor',
      category:'Color Settings'
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Hover Color',
      internalName: 'buttonHoverColor',
      category:'Color Settings'
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Button Hover Text Color',
      internalName: 'buttonTextHoverColor',
      category:'Color Settings'
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Load Image Lazy',
      internalName: 'loadImageLazy',
    },
  ],
};

const ExpTwoColGridLayout = Widget.createWidget({
  component: ExpTwoColGridBanner,
  label:
    `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">Two Col Grid Layout</p>`,
  category: 'Grid Banners',
  content: '<ExpTwoColGridBanner data-cms-widget="true"/>',
  widgetName: 'ExpTwoColGridBanner',
  widgetProperties: {
    defaults: {
      name: 'Two Col Grid Layout',
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

export default ExpTwoColGridLayout;
