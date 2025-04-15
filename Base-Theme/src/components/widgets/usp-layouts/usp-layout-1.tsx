import { Widget } from 'experro-storefront';
import { ExpUSPBanner } from '../../cms-library/usp-banner';
import {
  expCustomTrait,
  expHeaderOptions,
  expTextAlignmentOptions,
} from '../../../utils/constants';
import { expWidgetConstants, modelInternalName } from '../../../utils';
import ExpWidgetImage from '../../../assets/images/USP-thumbnail.png';
const { WIDGET_CHECK_TRUE } = expWidgetConstants;

const initialValue: any = {
  contentModel: '',
  modelInternalName: modelInternalName.use_banner,
  showHeadingText: WIDGET_CHECK_TRUE,
  headingSize: 'h4',
  headingPosition: 'text-center',
  headingColor: '#191919',
  traitConfig: [
    {
      type: expCustomTrait.CONTENT_MODEL_POP_UP,
      modelInternalName: modelInternalName.use_banner,
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
    },
  ],
};

const ExpUSPLayout1Widget = Widget.createWidget({
  component: ExpUSPBanner,
  label: `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"><p class="m-b-0">USP Layout-1</p></div>`,
  category: 'USP Banners',
  content: '<ExpUSPBanner data-cms-widget="true"/>',
  widgetName: 'ExpUSPBanner',
  widgetProperties: {
    defaults: {
      name: 'USP Layout-1',
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

export default ExpUSPLayout1Widget;
