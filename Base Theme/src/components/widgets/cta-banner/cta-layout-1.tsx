import { Widget } from 'experro-storefront';
import { ExpCTABanner1 } from '../../cms-library/cta-banner';

import { modelInternalName } from '../../../utils';
import ExpWidgetImage from '../../../assets/images/CTA-thumbnail.png';
import {
  expContentAlignmentOptions,
  expCustomTrait,
  expDataSourceConstants,
  expTextAlignmentOptions,
  expWidgetConstants,
  expConfigOperators,
} from '../../../utils/constants';

const { OR, AND } = expConfigOperators;
const { WIDGET_CHECK_TRUE, WIDGET_CHECK_FALSE } = expWidgetConstants;
const { CONTENT_LIBRARY, FREE_FORM } = expDataSourceConstants;

const initialValue: any = {
  headingText: '',
  tagLine: '',
  buttonText: '',
  buttonLink: '',
  contentModel: '',
  dataSource: FREE_FORM,
  modelInternalName: modelInternalName.cta_banner,
  showHeadingText: WIDGET_CHECK_TRUE,
  showDescription: WIDGET_CHECK_TRUE,
  contentPosition: 'justify-left',
  contentAlignment: 'text-left',
  textAlignment: 'center',
  preLoadImage: WIDGET_CHECK_FALSE,
  headingColor: '#494136',
  descriptionColor: '#6C6C6C',
  buttonColor: '#BA8751',
  buttonTextColor: '#ffffff',
  buttonHoverColor: '#9A6935',
  buttonTextHoverColor: '#ffffff',
  loadImageLazy: WIDGET_CHECK_TRUE,
  backgroundImage: {
    image_width: '1920',
    image_height: '600',
  },
  traitConfig: [
    {
      type: expCustomTrait.DATA_SOURCE,
    },
    {
      type: expCustomTrait.CONTENT_MODEL_POP_UP,
      modelInternalName: modelInternalName.cta_banner,
      dependent: 'dataSource',
      subDependency: CONTENT_LIBRARY,
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Show Heading',
      internalName: 'showHeadingText',
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Heading Text',
      internalName: 'headingText',
      dependencyConfig: {
        config: [
          {
            name: 'showHeadingText',
            value: [WIDGET_CHECK_TRUE],
          },
          {
            name: 'dataSource',
            value: [FREE_FORM],
          },
        ],
        operator: AND,
      },
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
      internalName: 'showDescription',
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Description Text',
      internalName: 'descriptionText',
      dependencyConfig: {
        config: [
          {
            name: 'showDescription',
            value: [WIDGET_CHECK_TRUE],
          },
          {
            name: 'dataSource',
            value: [FREE_FORM],
          },
        ],
        operator: AND,
      },
    },
    {
      type: expCustomTrait.COLOR_PICKER,
      displayName: 'Description Color',
      internalName: 'descriptionColor',
      dependent: 'showDescription',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Content Position',
      internalName: 'contentPosition',
      options: expContentAlignmentOptions,
      dependencyConfig: {
        config: [
          {
            name: 'showDescription',
            value: [WIDGET_CHECK_TRUE],
          },
          {
            name: 'showHeadingText',
            value: [WIDGET_CHECK_TRUE],
          },
        ],
        operator: OR,
      },
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Content Alignment',
      internalName: 'contentAlignment',
      options: expTextAlignmentOptions,
      dependencyConfig: {
        config: [
          {
            name: 'showDescription',
            value: [WIDGET_CHECK_TRUE],
          },
          {
            name: 'showHeadingText',
            value: [WIDGET_CHECK_TRUE],
          },
        ],
        operator: OR,
      },
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'show Button',
      internalName: 'showButton',
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Button Text',
      internalName: 'buttonText',
      dependencyConfig: {
        config: [
          {
            name: 'showButton',
            value: [WIDGET_CHECK_TRUE],
          },
          {
            name: 'dataSource',
            value: [FREE_FORM],
          },
        ],
        operator: AND,
      },
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Button Link',
      internalName: 'buttonLink',
      dependencyConfig: {
        config: [
          {
            name: 'showButton',
            value: [WIDGET_CHECK_TRUE],
          },
          {
            name: 'dataSource',
            value: [FREE_FORM],
          },
        ],
        operator: AND,
      },
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Load Image Lazy',
      internalName: 'loadImageLazy',
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
      displayName: 'Button Hover Text Color',
      internalName: 'buttonTextHoverColor',
      dependent: 'showButton',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Color Settings',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Pre Load Image',
      internalName: 'preLoadImage',
      dependent: 'dataSource',
      subDependency: CONTENT_LIBRARY,
    },
    {
      type: expCustomTrait.IMAGE,
      displayName: 'Background Image',
      internalName: 'backgroundImage',
      dependent: 'dataSource',
      subDependency: FREE_FORM,
    },
  ],
};

const ExpCTALayout1Widget = Widget.createWidget({
  component: ExpCTABanner1,
  label: `<div  class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p>CTA Banner</p>`,
  category: 'CTA Banners',
  content: '<ExpCTABanner1/>',
  widgetName: 'ExpCTABanner1',
  widgetProperties: {
    defaults: {
      name: 'CTA Banner',
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

export default ExpCTALayout1Widget;
