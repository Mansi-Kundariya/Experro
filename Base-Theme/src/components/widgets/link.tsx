import { Widget } from 'experro-storefront';
import { ExpLink } from '../cms-library/link';
import { expCustomTrait } from '../../utils/constants';

const initialValue: any = {
  title: '',
  href: '',
  target: '_self',
  linkText: '',
  traitConfig: [
    {
      type: expCustomTrait?.TEXT,
      internalName: 'linkText',
      displayName: 'Link Text',
    },
    {
      type: expCustomTrait?.TEXT,
      internalName: 'title',
      displayName: 'Title',
    },
    {
      type: expCustomTrait?.TEXT,
      internalName: 'href',
      displayName: 'Href',
    },
    {
      type: expCustomTrait?.DROPDOWN,
      internalName: 'target',
      displayName: 'Target',
      options: [
        { name: 'Current', value: '_self' },
        { name: 'New', value: '_blank' },
      ],
    },
  ],
};

const ExpLinkWidget = Widget.createWidget({
  component: ExpLink,
  label:
    "<div  class='gjs-fonts gjs-f-b1 custom-widget link-section'>Link</div>",
  category: 'Basic Components',
  content: '<ExpLink/>',
  widgetName: 'ExpLink',
  widgetProperties: {
    defaults: {
      name: 'Link',
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

export default ExpLinkWidget;
