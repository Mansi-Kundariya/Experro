import {createRoot} from "react-dom/client";
import React from "react";
import {TraitInterface} from "../../interfaces/trait.interface";
import traits from './traits';

const wrpChld = 'data-child'

export class Trait {
  private editor: any;

  constructor({editor}: { editor: any }) {
    this.editor = editor;
  }

  addTrait(traitProp: TraitInterface) {
    const traitManager = this.editor.TraitManager;
    const editorInstance = this.editor;
    traitManager.addType(traitProp.traitName, {
      elName: undefined,
      attributeName: undefined,
      eventCapture: [],
      attributeValue: undefined,

      createInput({trait}: { trait: any }) {
        this.attributeName = trait.attributes.name;
        this.attributeValue = trait.target.attributes.attributes[this.attributeName];
        try {
          const initialAttributes: any =
            editorInstance.getSelected().defaults.attributes;
          if (initialAttributes?.component_content && this.attributeValue) {
            const component_content = JSON?.parse(this.attributeValue);
            const updated_component_content = JSON.parse(
              initialAttributes?.component_content
            );
            const updated_traitConfig = updated_component_content?.traitConfig;
            if (updated_traitConfig) {
              for (const key in updated_component_content) {
                /**
                 * If there are new default value keys in the updated component content,
                 * we need to add those keys and their corresponding values to the component_content
                 * while updating the 'traitConfig'.
                 */
                if (
                  key !== 'traitConfig' &&
                  // eslint-disable-next-line no-prototype-builtins
                  !component_content.hasOwnProperty(key)
                ) {
                  component_content[key] = updated_component_content[key];
                }
              }
              /**
               * Updating the traitConfig of "component_content" with 'updated_traitConfig'.
               */
              component_content['traitConfig'] = updated_traitConfig;
              this.attributeValue = JSON.stringify(component_content);
            }
          }
        } catch {
          console.error(
            'Something went wrong, at merging attributes of "component_content" at trait parsing.'
          );
        }
        return this._render();
      },
      onEvent({component, event}: { component: any, event: any }) {
        const attr: any = {};
        this.attributeValue = event.detail;
        attr[this.attributeName] = this.attributeValue;
        component.addAttributes(attr, {});
      },
      // onUpdate({component}: { component: any }) {
      //   // const value = component.getAttributes()[this.attributeName] || '';
      //   // this.attributeValue = value;
      //   // this._render();
      // },
      changeHandler(value: any) {
        const event = new CustomEvent('change', {detail: value})
        this.onChange(event);
      },
      _render() {
        const el = document.createElement('div');
        const reactEl = this._createReactEl(traitProp.component, {
          value: this.attributeValue,
          changeHandler: this.changeHandler.bind(this)
        });
        this._mountReact(reactEl, el);
        return el;
      },
      _mountReact(cmp: any, el: any) {
        if (!this.__rootEl) {
          this.__rootEl = createRoot(el)
        }
        this.__rootEl.render(cmp)
      },
      _createReactChildWrap() {
        return React.createElement('span', {[wrpChld]: true})
      },
      _createReactEl(cmp: any, props: any) {
        return React.createElement(cmp, props, this._createReactChildWrap())
      },
    })
  }

  initTraits() {
    for (const trait of traits) {
      this.addTrait(trait);
    }
  }
}
