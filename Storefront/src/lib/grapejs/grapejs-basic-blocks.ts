import { UIBuilderConstants } from '../../utilities/constants';
export default (editor: any, opts: any) => {
  editor.DomComponents.addType('text-custom', {
    extend: 'text',
    model: {
      defaults: {
        name: 'Text',
        draggable: UIBuilderConstants.DRAGGABLE_CLASSES,
        droppable: false,
        active:true,
        attributes: { class: 'gjs-custom-text' },
        content: 'Insert your text here',
      },
    },
    isComponent: (el: HTMLElement) => {
      if (el && el.classList && el.classList.contains("gjs-custom-text") == true){
        return  { type: 'text', content: el.innerHTML, components: [] }
      }
    }
  });
  editor.BlockManager.add('spacer', {
    label: "<div  class='gjs-fonts gjs-f-b1 custom-widget spacer-section'>Spacer</div>",
    category: 'Basic Components',
    content: `<div data-gjs-name="Spacer" data-gjs-draggable="${UIBuilderConstants.DRAGGABLE_CLASSES}" data-gjs-droppable="false" class="exp-spacer" style="height:100px;"></div>`
  });

  editor.BlockManager.add('button', {
    label: '<div class="gjs-fonts gjs-f-b1 custom-widget button-section">Button</div>',
    category: 'Basic Components',
    content: `<a data-gjs-name="Button" data-gjs-draggable="${UIBuilderConstants.DRAGGABLE_CLASSES}" data-gjs-droppable="false" class="button-primary exp-button">Add Button Text</a>`,
  });

  editor.BlockManager.add('link', {
    label: '<div class="gjs-fonts gjs-f-b1 custom-widget link-section">Link</div>',
    category: 'Basic Components',
    content: `<a data-gjs-name="Link" data-gjs-draggable="${UIBuilderConstants.DRAGGABLE_CLASSES}" data-gjs-droppable="false" class="exp-link">Add Link Text</a>`,
  });

  editor.BlockManager.add('container', {
    label: '<div class="custom-row-section column_container">Container</div>',
    category: 'Grid Components',
    content: `<div data-gjs-name="Container" data-gjs-draggable="${UIBuilderConstants.DRAGGABLE_CLASSES}" class="container exp-container"></div>`
  });

  editor.BlockManager.add('text', {
    label: '<div class="gjs-fonts gjs-f-b1 custom-widget text-native">Text</div>',
    category: 'Basic Components',
    activate: true,
    content: {type: 'text-custom' }
  });

  editor.BlockManager.add('map', {
    label: '<div class="gjs-fonts gjs-f-b1 custom-widget map-native">Map</div>',
    category: 'Basic Components',
    content: {
      type: 'map',
      style: { height: '350px' }
    },
    droppable: false,
    draggable: UIBuilderConstants.DRAGGABLE_CLASSES
  })

  editor.DomComponents.addType('o:p', {
    isComponent: el => el.tagName === 'O:P',
    model: {
      // Remove them from the final HTML
      toHTML: () => '',
    }
  });
}
