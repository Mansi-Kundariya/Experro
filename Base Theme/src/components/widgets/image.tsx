import { Widget } from 'experro-storefront';
import { ExpImageComponent } from '../cms-library/image';
import { expWidgetConstants } from '../../utils';

const ExpImageComponentWidget = Widget.createWidget({
  component: ExpImageComponent,
  label:
    "<div  class='gjs-fonts gjs-f-b1 custom-widget image-section'>Image</div>",
  category: 'Basic Components',
  content: '<ExpImageComponent data-cms-widget="true"/>',
  widgetName: 'ExpImageComponent',
  widgetProperties: {
    defaults: {
      name: 'Image',
      attributes: {
        component_content: JSON.stringify({}),
        image_object_fit: 'none',
        loadImageLazy: expWidgetConstants.WIDGET_CHECK_TRUE,
        preLoadImage: expWidgetConstants.WIDGET_CHECK_FALSE,
      },
      activeOnRender: true,
      traits: [
        {
          type: 'image-selector',
          name: 'component_content',
        },
        {
          type: 'select',
          label: 'Image Object Fit',
          name: 'image_object_fit',
          options: [
            { name: 'Cover', value: 'cover' },
            { name: 'Contain', value: 'contain' },
            { name: 'Fill', value: 'fill' },
            { name: 'None', value: 'none' },
          ],
        },
        {
          type: 'select',
          label: 'Image Position',
          name: 'img_obj_position',
          options: [
            { name: 'Left Top', value: 'left top' },
            { name: 'Left Bottom', value: 'left bottom' },
            { name: 'Left Center', value: 'left center' },
            { name: 'Right Top', value: 'right top' },
            { name: 'Right Bottom', value: 'right bottom' },
            { name: 'Right Center', value: 'right center' },
            { name: 'Center Top', value: 'center top' },
            { name: 'Center Bottom', value: 'center bottom' },
            { name: 'Center Center', value: 'center center' },
            { name: 'Inherit', value: 'inherit' },
            { name: 'Initial', value: 'initial' },
            { name: 'Revert', value: 'revert' },
            { name: 'Revert Layer', value: 'revert-layer' },
            { name: 'Unset', value: 'unset' },
          ],
        },
        {
          type: 'text',
          label: 'Wrap Image In Link',
          name: 'image_redirect_link',
        },
        {
          type: 'checkbox',
          label: 'Load Image Lazy',
          name: 'loadImageLazy',
          valueTrue: expWidgetConstants.WIDGET_CHECK_TRUE,
          valueFalse: expWidgetConstants.WIDGET_CHECK_FALSE,
        },
        {
          type: 'checkbox',
          label: 'Pre Load Image',
          name: 'preLoadImage',
          valueTrue: expWidgetConstants.WIDGET_CHECK_TRUE,
          valueFalse: expWidgetConstants.WIDGET_CHECK_FALSE,
        },
      ],
    },
  },
});

export default ExpImageComponentWidget;
