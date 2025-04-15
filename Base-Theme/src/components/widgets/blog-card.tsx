import { Widget } from 'experro-storefront';
import { ExpBlogCard } from '../cms-library/blog-card';
import { expBasicTraitConstants, expCustomTraitConstants, expWidgetConstants, modelInternalName } from '../../utils';
import { content_library } from '../../interfaces/custom-trait.interfaces';
import ExpWidgetImage from '../../assets/images/Blog-card-thumbnail.png';

const initialValue: content_library = {
  contentModel: '',
  modelInternalName: modelInternalName.brand_logo,
};

const { WIDGET_CHECK_TRUE, WIDGET_CHECK_FALSE } = expWidgetConstants;
const { CHECKBOX, NUMBER } = expBasicTraitConstants;

const ExpBlogWidget = Widget.createWidget({
  component: ExpBlogCard,
  label:
    `<div  class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p>Blog Card</p>`,
  category: 'Theme Components',
  content: '<ExpBlogCard data-cms-widget="true"/>',
  widgetName: 'ExpBlogCard',
  widgetProperties: {
    defaults: {
      name: 'Blog Card',
      attributes: {
        slider_arrows_visibility: WIDGET_CHECK_TRUE,
        autoplay_speed: 5000,
        is_autoplay: WIDGET_CHECK_TRUE,
        sliderArrowsVisibility: WIDGET_CHECK_TRUE,
        component_content: JSON.stringify(initialValue),
        is_slider_enable: WIDGET_CHECK_TRUE
      },
      activeOnRender: true,
      traits: [
        {
          type: expCustomTraitConstants.BLOG_CARD,
          name: 'component_content',
        },
        {
          type: CHECKBOX,
          label: 'Enable Slider',
          name: 'is_slider_enable',
          valueTrue: WIDGET_CHECK_TRUE,
          valueFalse: WIDGET_CHECK_FALSE,
        },
        {
          type: CHECKBOX,
          label: 'Show Slider Arrow',
          name: 'slider_arrows_visibility',
          valueTrue: WIDGET_CHECK_TRUE,
          valueFalse: WIDGET_CHECK_FALSE,
        },
        {
          type: CHECKBOX,
          label: 'Auto Play',
          name: 'is_autoplay',
          valueTrue: WIDGET_CHECK_TRUE,
          valueFalse: WIDGET_CHECK_FALSE,
        },
        {
          type: NUMBER,
          label: 'Auto Play Time(ms)',
          name: 'autoplay_speed',
        },
      ],
    },
  },
});

export default ExpBlogWidget;
