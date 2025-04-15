import { Widget } from 'experro-storefront';
import { ExpProductCardWIthTabs } from '../e-commerce/product-card-with-tabs';
import { modelInternalName } from '../../utils';
import {
  expBasicTraitConstants,
  expCustomTraitConstants,
  expDataSourceConstants,
  expWidgetConstants,
} from '../../utils/constants';
import { product_card } from '../../interfaces/custom-trait.interfaces';
import ExpWidgetImage from '../../assets/images/product-card-with-tab.png';

const initialValue: product_card = {
  contentModel: '',
  dataSource: expDataSourceConstants?.FREE_FORM,
  description: '',
  image_heading: '',
  sourceKey: '',
  sourceValue: '',
  modelInternalName: modelInternalName.product_set,
  displayAs: 'carousel',
  limit: '6',
};
const { WIDGET_CHECK_TRUE, WIDGET_CHECK_FALSE } = expWidgetConstants;
const { CHECKBOX, NUMBER } = expBasicTraitConstants;

const ExpProductCardWIthTabsWidget = Widget.createWidget({
  component: ExpProductCardWIthTabs,
  label: `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">Product Card With Tabs</p>`,
  category: 'Theme Components',
  content: '<ExpProductCardWIthTabs/>',
  widgetName: 'ExpProductCardWIthTabs',
  widgetProperties: {
    defaults: {
      name: 'Product Card With Tabs',
      attributes: {
        component_content: JSON.stringify(initialValue),
        loadImagesLazily: WIDGET_CHECK_TRUE,
      },
      activeOnRender: true,
      traits: [
        {
          type: expCustomTraitConstants?.PRODUCT_CARD_WITH_TABS,
          name: 'component_content',
        },
        {
          type: CHECKBOX,
          label: 'Auto Play',
          name: 'isAutoPlay',
          valueTrue: WIDGET_CHECK_TRUE,
          valueFalse: WIDGET_CHECK_FALSE,
        },
        {
          type: NUMBER,
          label: 'Auto Play Speed(ms)',
          name: 'autoPlaySpeed',
        },
        {
          type: CHECKBOX,
          label: 'Show Slider Arrows',
          name: 'showSliderArrows',
          valueTrue: WIDGET_CHECK_TRUE,
          valueFalse: WIDGET_CHECK_FALSE,
        },
        {
          type: CHECKBOX,
          label: 'Load Images Lazily',
          name: 'loadImagesLazily',
          valueTrue: WIDGET_CHECK_TRUE,
          valueFalse: WIDGET_CHECK_FALSE,
        },
      ],
    },
  },
});

export default ExpProductCardWIthTabsWidget;
