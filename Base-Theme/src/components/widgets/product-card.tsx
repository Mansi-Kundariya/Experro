import { Widget } from 'experro-storefront';
import { ExpProductCard } from '../e-commerce/product-card';
import { getColorDefaultValueObject, modelInternalName } from '../../utils';
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
const { SELECT, CHECKBOX, COLOR_PICKER, NUMBER } = expBasicTraitConstants;

const ExpProductCardWidget = Widget.createWidget({
  component: ExpProductCard,
  label: `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">Product Card</p>`,
  category: 'Theme Components',
  content: '<ExpProductCard/>',
  widgetName: 'ExpProductCard',
  widgetProperties: {
    defaults: {
      name: 'Product Card',
      attributes: {
        component_content: JSON.stringify(initialValue),
        showSliderView: WIDGET_CHECK_TRUE,
        titleTextPosition: 'text-center',
        isShowPagination: WIDGET_CHECK_TRUE,
        showSliderArrows: WIDGET_CHECK_TRUE,
        paginationPosition: 'text-center',
        isAutoPlay: WIDGET_CHECK_TRUE,
        autoPlaySpeed: 5000,
        loadImagesLazily: WIDGET_CHECK_TRUE,
        //Default value need to be passed in color-picker-trait
        titleColor: getColorDefaultValueObject('#494136', '#494136'),
      },
      activeOnRender: true,
      traits: [
        {
          type: expCustomTraitConstants?.PRODUCT_CARD_WIT_TITLE_IMAGE,
          name: 'component_content',
        },
        {
          type: CHECKBOX,
          label: 'Show Slider View',
          name: 'showSliderView',
          valueTrue: expWidgetConstants.WIDGET_CHECK_TRUE,
          valueFalse: expWidgetConstants.WIDGET_CHECK_FALSE,
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
          label: 'Show Pagination',
          name: 'isShowPagination',
          valueTrue: WIDGET_CHECK_TRUE,
          valueFalse: WIDGET_CHECK_FALSE,
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
          type: SELECT,
          label: 'Pagination Position',
          name: 'paginationPosition',
          options: [
            { value: 'text-left', name: 'Left' },
            { value: 'text-center', name: 'Center' },
            { value: 'text-right', name: 'Right' },
          ],
        },
        {
          type: COLOR_PICKER,
          label: 'Title Color',
          name: 'titleColor',
        },
        {
          type: SELECT,
          label: 'Title Position',
          name: 'titleTextPosition',
          options: [
            { name: 'Left', value: 'text-left' },
            { name: 'Center', value: 'text-center' },
          ],
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

export default ExpProductCardWidget;
