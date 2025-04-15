import { Widget } from 'experro-storefront';
import { ExpBrandLogoGrid } from '../cms-library/logo-grid-component';
import { modelInternalName } from '../../utils';
import { expCustomTrait } from '../../utils/constants';
import ExpWidgetImage from '../../assets/images/Brand-logo-thumbnail.png';

const initialValue: any = {
  contentModel: '',
  modelInternalName: modelInternalName.brand_logo,
  traitConfig: [
    {
      type: expCustomTrait?.CONTENT_MODEL_POP_UP,
      modelInternalName: modelInternalName.brand_logo,
    },
  ],
};

const ExpBrandLogoGridWidget = Widget.createWidget({
  component: ExpBrandLogoGrid,
  label: `<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">Brand Logo</p>`,
  category: 'Theme Components',
  content: '<ExpBrandLogoGrid data-cms-widget="true"/>',
  widgetName: 'ExpBrandLogoGrid',
  widgetProperties: {
    defaults: {
      name: 'Brand Logo',
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

export default ExpBrandLogoGridWidget;
