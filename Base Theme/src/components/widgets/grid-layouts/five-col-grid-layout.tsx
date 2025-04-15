import { Widget } from 'experro-storefront';
import { ExpFiveColGridBanner } from '../../../components/cms-library/grid-banner';
import { modelInternalName } from '../../../utils';
import {
  expWidgetConstants,
  expTextAlignmentOptions,
  expHeaderOptions,
  expCustomTrait,
} from '../../../utils/constants';
import ExpWidgetImage from '../../../assets/images/five-col-grid.png';
const { WIDGET_CHECK_TRUE } = expWidgetConstants;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialValue: any = {
  contentModel: '',
  modelInternalName: modelInternalName.collage_banner,
  showHeadingText: WIDGET_CHECK_TRUE,
  headingSize: 'h5',
  contentPosition: 'text-left',
  showDescriptionText: WIDGET_CHECK_TRUE,
  headingColor: '#191919',
  descriptionColor: '#6C6C6C',
  linkTextColor: '#191919',
  linkTextHoverColor: '#6C6C6C',
  linkLinkColor: '#ba8751',
  traitConfig: [
    {
      type: expCustomTrait.CONTENT_MODEL_POP_UP,
      modelInternalName: modelInternalName.collage_banner,
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
      category: 'Color Settings',
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
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Link Text Color',
      internalName: 'linkTextColor',
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Link Hover Text Color',
      internalName: 'linkTextHoverColor',
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Link Color',
      internalName: 'linkLinkColor',
      category: 'Color Settings',
    },
  ],
};

const ExpFiveColGridLayoutWidget = Widget.createWidget({
  component: ExpFiveColGridBanner,
  label: `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">Five Col Grid Layout</p>`,
  category: 'Grid Banners',
  content: '<ExpFiveColGridBanner data-cms-widget="true"/>',
  widgetName: 'ExpFiveColGridBanner',
  widgetProperties: {
    defaults: {
      name: 'Five Col Grid Layout',
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

export default ExpFiveColGridLayoutWidget;
