import { Widget } from 'experro-storefront';
import { ExpZigZagBanner } from '../../cms-library/zig-zag-banner';
import {
  expDataSourceConstants,
  expWidgetConstants,
  expCustomTrait,
  expHeaderOptions,
  expHeadingTagOptions,
} from '../../../utils/constants';
import { modelInternalName } from '../../../utils';
import ExpWidgetImage from '@images/ZigZag-thumbnail.png';
const { WIDGET_CHECK_TRUE, WIDGET_CHECK_FALSE } = expWidgetConstants;
const { CONTENT_LIBRARY, FREE_FORM } = expDataSourceConstants;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialValue: any = {
  contentModel: '',
  headingText: '',
  primaryButtonText: '',
  headingSize: 'text-4xl',
  headingTag: 'h2',
  bannerReverse: WIDGET_CHECK_FALSE,
  showBackground: WIDGET_CHECK_FALSE,
  preLoadImage: WIDGET_CHECK_FALSE,
  dataSource: expDataSourceConstants?.FREE_FORM,
  modelInternalName: modelInternalName.zig_zag_banner,
  headingColor: '#494136',
  description: '#6C6C6C',
  buttonColor: '#BA8751',
  buttonTextColor: '#ffffff',
  buttonTextHoverColor: '#ffffff',
  buttonHoverColor: '#9A6935',
  backgroundColor: '#FFF8F0',
  loadImageLazy: WIDGET_CHECK_TRUE,
  imageData: {
    image_width: '740',
    image_height: '490',
  },
  traitConfig: [
    {
      type: expCustomTrait.DATA_SOURCE,
    },
    {
      type: expCustomTrait.CONTENT_MODEL_POP_UP,
      modelInternalName: 'zigzag_layout',
      dependent: 'dataSource',
      subDependency: CONTENT_LIBRARY,
    },
    {
      type: expCustomTrait.TEXT,
      internalName: 'headingText',
      displayName: 'Heading Text',
      dependent: 'dataSource',
      subDependency: FREE_FORM,
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Heading Tag',
      internalName: 'headingTag',
      options: expHeadingTagOptions,
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Heading size',
      internalName: 'headingSize',
      options: expHeaderOptions,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      internalName: 'headingColor',
      displayName: 'Heading Color',
      category: 'Appearance',
    },
    {
      type: expCustomTrait.TEXT,
      internalName: 'descriptionText',
      displayName: 'Description Text',
      dependent: 'dataSource',
      subDependency: FREE_FORM,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      internalName: 'description',
      displayName: 'Description Color',
      category: 'Appearance',
    },
    {
      type: expCustomTrait.TEXT,
      internalName: 'primaryButtonText',
      displayName: 'Button Text',
      dependent: 'dataSource',
      subDependency: FREE_FORM,
    },
    {
      type: expCustomTrait.TEXT,
      internalName: 'primaryButtonLink',
      displayName: 'Button Link',
      dependent: 'dataSource',
      subDependency: FREE_FORM,
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      internalName: 'buttonTextColor',
      displayName: 'Button Text Color',
      category: 'Appearance',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      internalName: 'buttonColor',
      displayName: 'Button Color',
      category: 'Appearance',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      internalName: 'buttonHoverColor',
      displayName: 'Button Hover Color',
      category: 'Appearance',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      internalName: 'buttonTextHoverColor',
      displayName: 'Button Text Hover Color',
      category: 'Appearance',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Image Reverse',
      internalName: 'bannerReverse',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Show Background',
      internalName: 'showBackground',
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      internalName: 'backgroundColor',
      displayName: 'Background Color',
      dependent: 'showBackground',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Appearance',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Pre Load Image',
      internalName: 'preLoadImage',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Lazy Load Image',
      internalName: 'loadImageLazy',
    },
    {
      type: expCustomTrait.IMAGE,
      internalName: 'imageData',
      dependent: 'dataSource',
      subDependency: FREE_FORM,
    },
  ],
};

const ExpZigZagBannerWidget = Widget.createWidget({
  component: ExpZigZagBanner,
  label: `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">Zig Zag Layout</p>`,
  category: 'Zig Zag Banners',
  content: '<ExpZigZagBanner data-cms-widget="true"/>',
  widgetName: 'ExpZigZagBanner',
  widgetProperties: {
    defaults: {
      name: 'Zig Zag Layout',
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

export default ExpZigZagBannerWidget;
