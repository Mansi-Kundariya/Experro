import { Widget } from 'experro-storefront';
import { ExpHeroCarousel } from '../cms-library/hero-carousel';
import { modelInternalName } from '../../utils';
import {
  expCustomTrait,
  expHeaderOptions,
  expHeadingTagOptions,
  expTextAlignmentOptions,
  expWidgetConstants,
} from '../../utils/constants';
import ExpWidgetImage from '../../assets/images/Hero-thumbnail.png';
const { WIDGET_CHECK_TRUE, WIDGET_CHECK_FALSE } = expWidgetConstants;

const initialValue: any = {
  contentModel: '',
  modelInternalName: modelInternalName.hero_carousel_internal_name,
  isAutoPlay: WIDGET_CHECK_TRUE,
  autoPlayTime: 10000,
  isShowPagination: WIDGET_CHECK_FALSE,
  isShowSubHeading: WIDGET_CHECK_TRUE,
  isShowHeading: WIDGET_CHECK_TRUE,
  headingTextPosition: 'text-center',
  headingSize: "text-7xl",
  headingTag: "h2",
  subHeadingSize: 'h6',
  showSliderArrows: WIDGET_CHECK_FALSE,
  paginationPosition: 'pagination-center',
  headingTextColor: '#494136',
  subHeadingTextColor: '#464646',
  buttonColor: '#BA8751',
  buttonTextColor: '#FFFFFF',
  buttonTextHoverColor: '#ffffff',
  buttonHoverColor: '#9A6935',
  preLoadImage: WIDGET_CHECK_FALSE,
  loadImageLazy: WIDGET_CHECK_TRUE,
  traitConfig: [
    {
      type: expCustomTrait?.CONTENT_MODEL_POP_UP,
      modelInternalName: modelInternalName.hero_carousel_internal_name,
    },
    {
      type: expCustomTrait?.CHECKBOX,
      displayName: 'Auto Play',
      internalName: 'isAutoPlay',
      category: 'Configuration'
    },
    {
      type: expCustomTrait?.TEXT,
      displayName: 'Auto Play Time(ms)',
      internalName: 'autoPlayTime',
      dependent: 'isAutoPlay',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Configuration'
    },
    {
      type: expCustomTrait?.CHECKBOX,
      displayName: 'Show Slider Arrows',
      internalName: 'showSliderArrows',
      category: 'Configuration'
    },
    {
      type: expCustomTrait?.CHECKBOX,
      displayName: 'Show Pagination',
      internalName: 'isShowPagination',
      category: 'Configuration'
    },
    {
      type: expCustomTrait?.CHECKBOX,
      displayName: 'Show Heading',
      internalName: 'isShowHeading',
      category: 'Configuration'
    },
    {
      type: expCustomTrait?.CHECKBOX,
      displayName: 'Show Sub Heading',
      internalName: 'isShowSubHeading',
      category: 'Configuration'
    },
    {
      type: expCustomTrait?.DROPDOWN,
      displayName: 'Pagination Position',
      internalName: 'paginationPosition',
      options: [
        { value: 'pagination-left', name: 'Left' },
        { value: 'pagination-center', name: 'Center' },
        { value: 'pagination-right', name: 'Right' },
      ],
      dependent: 'isShowPagination',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Configuration'
    },
    {
      type: expCustomTrait?.DROPDOWN,
      displayName: 'Select Content Position',
      internalName: 'headingTextPosition',
      options: expTextAlignmentOptions,
      dependent: 'isShowHeading',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Configuration'
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: "Heading Tag",
      internalName: "headingTag",
      options: expHeadingTagOptions,
      dependent: 'isShowHeading',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Configuration'
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: "Heading size",
      internalName: "headingSize",
      options: expHeaderOptions,
      dependent: 'isShowHeading',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Configuration'
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Pre Load Image',
      internalName: 'preLoadImage',
      category: 'Configuration'
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Lazy Load Image',
      internalName: 'loadImageLazy',
      category: 'Configuration'
    },
    {
      type: expCustomTrait?.COLOR_PICKER,
      displayName: 'Heading Color',
      internalName: 'headingTextColor',
      dependent: 'isShowHeading',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Appearance'
    },
    {
      type: expCustomTrait?.COLOR_PICKER,
      displayName: 'Sub Heading Color',
      internalName: 'subHeadingTextColor',
      dependent: 'isShowSubHeading',
      subDependency: WIDGET_CHECK_TRUE,
      category: 'Appearance'
    },
    {
      type: expCustomTrait?.COLOR_PICKER,
      displayName: 'Button Color',
      internalName: 'buttonColor',
      category: 'Appearance'
    },
    {
      type: expCustomTrait?.COLOR_PICKER,
      displayName: 'Button Text Color',
      internalName: 'buttonTextColor',
      category: 'Appearance'
    },
    {
      type: expCustomTrait?.COLOR_PICKER,
      displayName: 'Button Hover Color',
      internalName: 'buttonHoverColor',
      category: 'Appearance'
    },
    {
      type: expCustomTrait?.COLOR_PICKER,
      displayName: 'Button Hover Text Color',
      internalName: 'buttonTextHoverColor',
      category: 'Appearance'
    },
  ],
};

const HeroCarouselWidget = Widget.createWidget({
  component: ExpHeroCarousel,
  label: `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">Hero carousel</p>`,
  category: 'Theme Components',
  content: '<ExpHeroCarousel data-cms-widget="true"/>',
  widgetName: 'ExpHeroCarousel',
  widgetProperties: {
    defaults: {
      name: 'Hero Carousel',
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

export default HeroCarouselWidget;
