import { Widget } from 'experro-storefront';
import { ExpSimilarProducts } from '../../e-commerce/recommendation-card';
import { getColorDefaultValueObject } from '../../../utils';
import {
  expBasicTraitConstants,
  expCustomTraitConstants,
  expWidgetConstants,
} from '../../../utils';
import ExpWidgetImage from '../../../assets/images/recommendation-widget-images/similar_products.png';

const initialValue: any = {
  tagLine: '',
  headingText: '',
  limit: '6',
  modalInternalName: 'similar_products',
};
const { WIDGET_CHECK_TRUE, WIDGET_CHECK_FALSE } = expWidgetConstants;
const { SELECT, CHECKBOX, COLOR_PICKER, NUMBER } = expBasicTraitConstants;

const ExpSimilarProductsWidget = Widget.createWidget({
  component: ExpSimilarProducts,
  label: `<div  class='gjs-fonts gjs-f-b1 custom-widget custom-widget-bg-icon' style="background-image: url(${ExpWidgetImage});"></div><p>Similar Products</p>`,
  category: 'Recommendations Widgets',
  content: '<ExpSimilarProducts/>',
  widgetName: 'ExpSimilarProducts',
  widgetProperties: {
    defaults: {
      name: 'Similar Products',
      attributes: {
        component_content: JSON.stringify(initialValue),
        showSliderView: WIDGET_CHECK_TRUE,
        titleTextPosition: 'text-center',
        isShowPagination: WIDGET_CHECK_FALSE,
        showSliderArrows: WIDGET_CHECK_TRUE,
        paginationPosition: 'pagination-center',
        isAutoPlay: WIDGET_CHECK_TRUE,
        autoPlaySpeed: 5000,
        //Default value need to be passed in color-picker-trait
        titleColor: getColorDefaultValueObject('#191919', '#191919'),
      },
      activeOnRender: true,
      traits: [
        {
          type: expCustomTraitConstants?.RECOMMENDATION_WIDGET,
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
          label: 'Show Pagination',
          name: 'isShowPagination',
          valueTrue: WIDGET_CHECK_TRUE,
          valueFalse: WIDGET_CHECK_FALSE,
        },
        {
          type: SELECT,
          label: 'Pagination Position',
          name: 'paginationPosition',
          options: [
            { value: 'pagination-left', name: 'Left' },
            { value: 'pagination-center', name: 'Center' },
            { value: 'pagination-right', name: 'Right' },
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
      ],
    },
  },
});

export default ExpSimilarProductsWidget;
