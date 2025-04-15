import { UIBuilderConstants } from '../../utilities/constants';
interface WidgetInterface {
  component: any
  label: string
  category: string
  content: string
  widgetName: string
  widgetProperties?: any,
  blockProperties?: any
}

const defaultWidgetProperties = {
  stylable: true,
  resizable: false,
  editable: false,
  droppable: false,
  draggable: UIBuilderConstants.DRAGGABLE_CLASSES
}

export class Widget {
  static createWidget(widget: WidgetInterface) {
    if (!widget.widgetProperties) {
      widget.widgetProperties = {}
    }
    if (!widget.widgetProperties.defaults) {
      widget.widgetProperties.defaults = {}
    }
    Object.assign(widget.widgetProperties.defaults, defaultWidgetProperties)
    widget.widgetProperties.defaults.component = widget.component

    widget.widgetProperties.defaults.attributes['cmsWidget'] = 'true';
    // @ts-ignore
    const Widget = (editor) => {
      editor.Components.addType(widget.widgetName, {
        extend: 'react-component',
        model: widget.widgetProperties,
        isComponent: (el: HTMLElement) => el.tagName === widget.widgetName.toUpperCase(),
      });

      const sm = editor.StyleManager;
      for (const sectorName in widget.widgetProperties.sectors) {
        const sectorProperty = widget.widgetProperties.sectors[sectorName]
        sm.addSector(sectorName, sectorProperty);
      }
      // const content = widget.content;
      // if (!new RegExp('data-cms-widget', 'igm').test(content)) {
      //   content = content.replace(/^<([A-Z0-9a-z]*)/gm, `<$1 data-cms-widget="true"`);
      // }
      let blockProperties = {
        label: widget.label,
        category: widget.category,
        content: widget.content,
        select: true,
        activate: true
      };
      blockProperties = Object.assign(blockProperties, widget.blockProperties);
      editor.BlockManager.add(widget.widgetName.toLowerCase(), blockProperties)
    }
    return Widget
  }
}
