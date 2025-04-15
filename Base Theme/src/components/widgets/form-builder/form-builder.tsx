import { Widget } from 'experro-storefront';
import { ExpFormBuilder } from '../../common-components/form-builder';
import { expCustomTrait } from '../../../utils/constants';
import ExpWidgetImage from '../../../assets/images/form.png';

const initialValue: any = {
  layout: 'layout1',
  traitConfig: [
    {
      type: expCustomTrait?.DROPDOWN,
      internalName: 'layout',
      displayName: 'Layout',
      options: [
        { name: 'Layout-1', value: 'layout1' },
        { name: 'Layout-2', value: 'layout2' },
        { name: 'Layout-3', value: 'layout3' },
      ],
    },
    {
      type: expCustomTrait?.CHECKBOX,
      internalName: 'showFormTitle',
      displayName: 'Show Form Title',
    },
    {
      type: expCustomTrait?.CHECKBOX,
      internalName: 'showFormDescription',
      displayName: 'Show Form Description',
    },
  ],
};

const ExpFormBuilderWidget = Widget.createWidget({
  component: ExpFormBuilder,
  label:
  `<div  class='gjs-fonts gjs-f-b1 custom-widget' style="background-image: url(${ExpWidgetImage}); max-height:40px;"></div><p>Form</p>`,
  category: 'Basic Components',
  content: '<ExpFormBuilder/>',
  widgetName: 'ExpFormBuilder',
  widgetProperties: {
    defaults: {
      name: 'Form',
      attributes: {
        component_content: JSON.stringify(initialValue),
        formBuilderData: '',
      },
      activeOnRender: true,
      traits: [
        {
          type: 'form-builder',
          name: 'formBuilderData',
        },
        {
          type: 'experro-storefront',
          name: 'component_content',
        },
      ],
    },
  },
});

export default ExpFormBuilderWidget;
