import { createRoot } from 'react-dom/client';
import React, { createElement } from 'react';

export function GrapesJsReactComponentRenderer(editor) {
  const domc = editor.DomComponents;
  const defType = domc.getType('default');
  const defModel = defType.model;
  const wrpChld = 'data-chld';

  // Main React component
  domc.addType('react-component', {
    model: {
      toHTML(opts = {}) {
        this.setAttributes(this.getAttributesList(this, false));
        return defModel.prototype.toHTML.call(this, {
          ...opts,
          tag: this.get('type'),
        });
      },
      getAttributesList(model, attributeChanged) {
        const traitList = {};
        const traits = model.getTraits();
        for (const trait of traits) {
          traitList[trait.attributes.name.toLowerCase()] =
            trait.attributes.name;
        }
        let attributes = [];
        const elAttributes = model.get('attributes');
        for (const aName in elAttributes) {
          attributes.push({
            name: aName,
            value: elAttributes[aName],
          });
        }
        attributes = attributes.sort((a, b) => {
          if (attributeChanged === true) {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          } else {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          }
        });
        const attributesToUse = {};
        const attributesCovered = {};
        for (const attribute of attributes) {
          const traitName = traitList[attribute.name.toLowerCase()];
          if (traitName) {
            attributesToUse[traitName] = attribute.value;
          } else {
            if (!attributesCovered[attribute.name.toLowerCase()]) {
              attributesToUse[attribute.name] = attribute.value;
            }
          }
          attributesCovered[attribute.name.toLowerCase()] = true;
        }
        return attributesToUse;
      },
    },
    view: {
      tagName: 'div',
      init() {
        const { model } = this;
        this.listenTo(model, 'change:attributes', this.attributeChanged);
        this.listenTo(model.components(), 'add remove reset', this.__upRender);
      },
      attributeChanged() {
        this.onRender(true);
      },
      getChildrenContainer() {
        const { childrenContainer } = this;
        if (childrenContainer) return childrenContainer;

        this.childrenContainer = document.createElement('childc');

        return this.childrenContainer;
      },

      /**
       * We need this container to understand if the React component is able
       * to render children
       */
      createReactChildWrap() {
        return React.createElement('span', { [wrpChld]: true });
      },

      createReactEl(cmp, props) {
        return React.createElement(cmp, props, this.createReactChildWrap());
      },

      mountReact(cmp, el) {
        if (!this.__rootEl) {
          this.__rootEl = createRoot(el);
        }
        this.__rootEl.render(createElement(React.Suspense, {}, cmp));
      },
      onRender(attributeChanged) {
        const { model, el } = this;
        // this.updateAttributes()
        // this.renderChildren()
        const id = el.getAttribute('id');
        let componentProps = {};
        const attributes = model.getAttributesList(model, attributeChanged);
        try {
          if (attributes?.component_content) {
            const parsedComponentContent = JSON.parse(
              attributes?.component_content
            );
            componentProps = { ...parsedComponentContent, ...attributes, id };
          } else {
            componentProps = { ...attributes, id };
          }
        } catch {
          componentProps = { ...attributes, id };
        }
        const reactEl = this.createReactEl(
          model.get('component'),
          componentProps
        );
        this.mountReact(reactEl, el);
        const chld = el.querySelector(`span[${wrpChld}]`);

        // If the container is found, the react component is able to render children
        if (chld) {
          const chldCont = this.getChildrenContainer();
          while (chldCont.firstChild) {
            chld.appendChild(chldCont.firstChild);
          }
        }
      },

      __upRender() {
        clearTimeout(this._upr);
        this._upr = setTimeout(() => this.onRender());
      },
    },
  });
}
