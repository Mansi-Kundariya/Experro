import { Widget } from 'experro-storefront';
import { expCustomTrait } from '../../utils/constants';
import { ExpVideo } from '../cms-library/video';
import ExpWidgetImage from '@images/video_widget.png'

const initialValue: any = {
  contentModel: '',
  width: '600px',
  height: '400px',
  traitConfig: [
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Provider',
      internalName: 'provider',
      options: [
        { name: 'HTML5 Source', value: 'html5-source' },
        { name: 'Youtube', value: 'youtube' },
        { name: 'Youtube (no cookie)', value: 'youtube-no-cookie' },
        { name: 'Vimeo', value: 'vimeo' },
      ],
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Video ID',
      internalName: 'videoid',
      dependencyConfig: {
        config: [
          {
            name: 'provider',
            value: 'vimeo',
          },
          {
            name: 'provider',
            value: 'youtube',
          },
          {
            name: 'provider',
            value: 'youtube-no-cookie',
          },
        ],
        operator: 'OR',
      },
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Source',
      internalName: 'source',
      dependent: 'provider',
      subDependency: 'html5-source',
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Poster',
      internalName: 'poster',
      dependent: 'provider',
      subDependency: 'html5-source',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Autoplay',
      internalName: 'autoplay',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Loop',
      internalName: 'loop',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Controls',
      internalName: 'controls',
      dependencyConfig: {
        config: [
          {
            name: 'provider',
            value: 'html5-source',
          },
          {
            name: 'provider',
            value: 'youtube',
          },
          {
            name: 'provider',
            value: 'youtube-no-cookie',
          },
        ],
        operator: 'OR',
      },
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Play Inline',
      internalName: 'playsinline',
      dependent: 'provider',
      subDependency: 'html5-source',
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Related',
      internalName: 'related',
      dependencyConfig: {
        config: [
          {
            name: 'provider',
            value: 'youtube',
          },
          {
            name: 'provider',
            value: 'youtube-no-cookie',
          },
        ],
        operator: 'OR',
      },
    },
    {
      type: expCustomTrait.CHECKBOX,
      displayName: 'Modest',
      internalName: 'modest',
      dependencyConfig: {
        config: [
          {
            name: 'provider',
            value: 'youtube',
          },
          {
            name: 'provider',
            value: 'youtube-no-cookie',
          },
        ],
        operator: 'OR',
      },
    },
    {
      type: expCustomTrait?.DROPDOWN,
      displayName: 'Wrap In',
      internalName: 'wrapIn',
      options: [
        { value: 'container-fluid', name: 'Full Layout' },
        { value: 'container', name: 'Default Layout' },
        { value: 'container-small', name: 'Small Layout' },
      ],
    },
    {
      type: expCustomTrait.DROPDOWN,
      displayName: 'Video Postion',
      internalName: 'videoPostition',
      options: [
        { name: 'Left', value: 'justify-start' },
        { name: 'Center', value: 'justify-center' },
        { name: 'Right', value: 'justify-end' },
      ],
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Width',
      internalName: 'width',
    },
    {
      type: expCustomTrait.TEXT,
      displayName: 'Height',
      internalName: 'height',
    },
  ],
};

const ExpVideoWidget = Widget.createWidget({
  component: ExpVideo,
  label: `<div  class='gjs-fonts gjs-f-b1 custom-widget video-widgets' style="background-image: url(${ExpWidgetImage}); max-height:40px;"></div><p>Video</p>`,
  category: 'Basic Components',
  content: '<ExpVideo data-cms-widget="true" />',
  widgetName: 'ExpVideo',
  widgetProperties: {
    defaults: {
      name: 'Video',
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

export default ExpVideoWidget;
