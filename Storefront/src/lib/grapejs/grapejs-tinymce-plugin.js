
export default (editor, options) => {
  new TinyForGrapesJs(editor, options);
}

class TinyForGrapesJs {

  constructor(editor, options) {
    this.injectEditorModule(options['tinymce-module']);

    this._TinyForGrapesJsData = {
      editor: editor,
      el: null,
      frame: null,
      toolBarMObserver: new MutationObserver(this.onResize.bind(this)),
      elementObserver: new MutationObserver(
        () => {
          this.onResize();
          this.editor.refresh();
        }
      ),
      editorOptions: options
    }
    // Clear default RTE toolbar
    // Create array copy before clear, forEach will not properly work otherwise
    editor.RichTextEditor.getAll().map(item => item.name).forEach(
      item => editor.RichTextEditor.remove(item)
    );
    editor.on('frame:load:before', ({el}) => {
      const doc = el.contentDocument;
      if (!doc.doctype || doc.doctype.nodeName.toLowerCase() !== "html") {
        doc.open();
        doc.write("<!DOCTYPE html>");
        doc.close();
      }
    });
    editor.on('frame:load',
      ({el, model, view}) => {
        this.frame = el;
        this.frameBody.addEventListener(
          'mousedown',
          e => this.latestClickEvent = e
        );
      }
    );
    // Append tinymce editor
    editor.setCustomRte(
      {
        enable: this.enable.bind(this),
        disable: this.disable.bind(this)
      }
    );
  }

  get frame() {
    return this._TinyForGrapesJsData.frame;
  }

  set frame(value) {
    this._TinyForGrapesJsData.frame = value;
  }

  set latestClickEvent(value) {
    if (this.grapesjsTinyDocsData) this.grapesjsTinyDocsData.latestClickEvent = value;
  }

  get editorOptions() {
    return this._TinyForGrapesJsData.editorOptions;
  }

  get toolBarMObserver() {
    return this._TinyForGrapesJsData.toolBarMObserver;
  }

  get elementObserver() {
    return this._TinyForGrapesJsData.elementObserver;
  }

  get editor() {
    return this._TinyForGrapesJsData.editor
  }

  get el() {
    return this._TinyForGrapesJsData.el;
  }

  set el(value) {
    this._TinyForGrapesJsData.el = value;
  }

  get uniqId() {
    return TinyForGrapesJs.constructor.uniqId++;
  }

  get frameDocument() {
    let frame = this.frame;
    return frame && frame.contentDocument;
  }

  get frameBody() {
    let frameDoc = this.frameDocument;
    return frameDoc && frameDoc.querySelector('body');
  }

  get frameContext() {
    let frame = this.frame;
    return frame && frame.contentWindow;
  }

  get grapesjsTinyDocsData() {
    return this.frameContext && this.frameContext.grapesjsTinyDocsData;
  }

  set grapesjsTinyDocsData(value) {
    this.frameContext && (this.frameContext.grapesjsTinyDocsData = value);
  }

  get tinymceInstant() {
    return this.grapesjsTinyDocsData && this.grapesjsTinyDocsData.tinymceInstant;
  }

  get toolbarContainer() {
    return this.grapesjsTinyDocsData && this.grapesjsTinyDocsData.toolbarContainer;
  }

  get frameScrollY() {
    return this.frameContext ? this.frameContext.scrollY : 0;
  }

  get frameScrollX() {
    return this.frameContext ? this.frameContext.scrollX : 0;
  }

  get isActive() {
    return this.el !== null;
  }

  injectEditorModule(src) {
    setTimeout(
      () => {
        let body = this.frameBody;
        if (!body || body.innerHTML === '') {
          this.injectEditorModule(src);
        } else {
          createHtmlElem(
            'script',
            body, {
              src: src
            }
          );
          createHtmlElem(
            'script',
            body,
            {
              innerHTML: `${injectEditorInstant.toString()}; function _typeof(obj) { return typeof obj; }`
            }
          );
          this.executeInFrame(
            `(${injectDataStorage.toString()})()`
          );
          this.frameContext.addEventListener(
            'scroll',
            this.onResize.bind(this)
          );
          this.frameContext.addEventListener(
            'resize',
            this.onResize.bind(this)
          );
        }
      },
      100
    );
  }

  getElementId(el) {
    return el.id = el.id === '' || el.id === null || el.id === undefined ? `tinymce_target_el_${this.uniqId}` : el.id;
  }

  enable(el, rte) {
    // Enable rte in next run otherwise editable element can be pushed out the DOM in the fireFox
    setTimeout(
      () => doEnable(el, rte)
    );

    const doEnable = (el, rte) => {
      this.el = el;
      let container = el;
      let editorOptions = this.editorOptions;
      let forceBr = 'false';
      if (!Array.isArray(editorOptions.inline) || !editorOptions.inline.includes(el.tagName.toLowerCase())) {
        const elContent = el.innerHTML;
        el.innerHTML = '';
        container = createHtmlElem(
          'div',
          el,
          {
            innerHTML: elContent,
            style: {
              outline: 'none'
            }
          }
        );
        editorOptions = {
          toolbar: editorOptions.toolbar,
          plugins: editorOptions.plugins
        }
      } else {
        editorOptions = {
          toolbar: editorOptions.inline_toolbar || editorOptions.toolbar,
          plugins: editorOptions.plugins
        }
        forceBr = 'true';
      }
      this.executeInFrame(`${injectEditorInstant.name}('#${this.getElementId(container)}',"${encodeURI(JSON.stringify(editorOptions))}",${forceBr});`);
      setTimeout(
        () => {
          this.toolBarMObserver.observe(
            this.toolbarContainer.firstChild,
            {
              subtree: true,
              childList: true,
              attributes: true
            }
          );
          this.elementObserver.observe(
            this.el,
            {
              subtree: true,
              childList: true,
              attributes: true
            }
          );
          this.onResize();
        }
      );
      return this;
    }
  }


  getContent() {
    return this.tinymceInstant ? this.tinymceInstant.bodyElement.innerHTML : '';
  }

  disable(el, rte) {
    if (this.el) {
      this.el.innerHTML = this.getContent();
    }
    this.el = null;
    this.toolBarMObserver.disconnect();
    this.elementObserver.disconnect();
    setTimeout(
      () => {
        this.executeInFrame(
          'if (window.grapesjsTinyDocsData.tinymceInstant) {' +
          'window.grapesjsTinyDocsData.tinymceInstant.destroy();window.grapesjsTinyDocsData.toolbarContainer.remove();window.grapesjsTinyDocsData.tinymceInstant=null;' +
          'window.grapesjsTinyDocsData.forceBr && ' +
          'window.grapesjsTinyDocsData.editedEl.removeEventListener(\'keydown\',window.grapesjsTinyDocsData.editorClickHandler);}'
        );
      }
    );
  }

  executeInFrame(code) {
    createHtmlElem(
      'script',
      this.frameBody,
      {
        innerHTML: code
      }
    ).remove();
  }

  positionToolbar() {
    if (this.toolbarContainer.firstChild.firstChild) {
      this.toolbarContainer.style.display = '';
      this.toolbarContainer.style.top = '0px';
      this.toolbarContainer.style.left = '0px';
      const toolBarEl = this.editor.RichTextEditor.getToolbarEl();
      const gjsToolbar = toolBarEl.parentElement.querySelector('.gjs-toolbar');
      const gjsToolbarBoundingRect = (gjsToolbar && gjsToolbar.getBoundingClientRect()) ||
        {width: 0, height: 0, bottom: 0};
      let toolBarBoundingRect = this.toolbarContainer.getBoundingClientRect();
      const elBoundingRect = this.el.getBoundingClientRect();
      const gjsToolbarHSpace = 1;
      const gjsToolbarToScreenBorderSpace = 5;
      const gjsToolbarVSpace = 1;
      let left, top;

      // Should we center toolbar
      const center = toolBarBoundingRect.width > elBoundingRect.width - gjsToolbarBoundingRect.width - gjsToolbarHSpace;
      if (center) {
        left = elBoundingRect.left - (toolBarBoundingRect.width - elBoundingRect.width) / 2 + this.frameScrollX;
        if (left + toolBarBoundingRect.width > this.frameBody.offsetWidth) {
          left -= left + toolBarBoundingRect.width - this.frameBody.offsetWidth + gjsToolbarToScreenBorderSpace;
        }
        if (left < this.frameScrollX) left = this.frameScrollX;
      } else {
        left = elBoundingRect.left + this.frameScrollX;
      }
      this.toolbarContainer.style.left = left + 'px';

      toolBarBoundingRect = this.toolbarContainer.getBoundingClientRect();
      top = (
        elBoundingRect.top + this.frameScrollY - toolBarBoundingRect.height - gjsToolbarVSpace -
        (center ? gjsToolbarBoundingRect.height : 0)
      );
      if (top <= this.frameScrollY) {
        top = (
          elBoundingRect.bottom + this.frameScrollY + gjsToolbarVSpace +
          (
            center && gjsToolbarBoundingRect.bottom > elBoundingRect.bottom ? gjsToolbarBoundingRect.height : 0
          )
        );
      }

      this.toolbarContainer.style.top = top + 'px';
    } else {
      this.toolbarContainer.style.display = 'none';
    }
  }

  onResize() {
    if (this.isActive) {
      setTimeout(
        () => {
          this.positionToolbar();
        }
      )
    }
  }

}

TinyForGrapesJs.constructor.uniqId = 0;

/**
 *
 * @param {string} type
 * @param {HTMLElement} container
 * @param {Object} properties
 * @return {HTMLElement}
 */
function createHtmlElem(type, container, properties) {
  let elem = document.createElement(type);
  setElementProperty(elem, properties);
  container && container.appendChild(elem);
  return (elem);
}

/**
 *
 * @param {Object} elem
 * @param {Object} properties
 */
function setElementProperty(elem, properties) {
  if (properties) {
    for (let key in properties) {
      if (typeof properties[key] === 'object') {
        setElementProperty(elem[key], properties[key]);
      } else {
        elem[key] = properties[key];
      }
    }
  }
}

function injectDataStorage() {
  window.grapesjsTinyDocsData = {
    editorClickHandler: (event) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
        window.grapesjsTinyDocsData.editorInstance.fire('keydown', {keyCode: 13, shiftKey: true})
      }
    }
  };
}

function injectEditorInstant(selector, jsonOptions, forceBr = false) {
  const options = JSON.parse(decodeURI(jsonOptions));
  window.grapesjsTinyDocsData.toolbarContainer = createHtmlElem(
    'div',
    document.body,
    {
      style: {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        height: 'min-content',
        'z-index': '9999'
      }
    }
  );

  window.grapesjsTinyDocsData.toolbarContainer.addEventListener(
    'mousedown',
    e => {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  );
  window.grapesjsTinyDocsData.editedEl = document.body.querySelector(selector);
  window.grapesjsTinyDocsData.forceBr = forceBr;
  forceBr && window.grapesjsTinyDocsData.editedEl.addEventListener(
    'keydown',
    window.grapesjsTinyDocsData.editorClickHandler
  );
  tinymce.init(
    {
      selector: selector,
      inline: true,
      menubar: false,
      newline_behavior: 'default',
      entity_encoding: 'raw',
      plugins: options.plugins,
      toolbar: options.toolbar,
      custom_elements: 'style,script',
      font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px 64px',
      valid_children: "+*[*]",
      valid_elements: "*[*]",
      relative_urls: false,
      protect: [
        /\<script\b[^>]*>([\s\S]*?)<\/script>/gi, // Match and preserve <script> tags with content
      ],
      verify_html : false,
      contextmenu: false,
      fixed_toolbar_container_target: createHtmlElem(
        'div',
        window.grapesjsTinyDocsData.toolbarContainer,
        {}
      ),
      init_instance_callback: function (editor) {
        window.parent.addEventListener('message', (event) => {
          if (event.data && event.data.message === "MediaManagerImageFile") {
            if(event.data.assets) {
              const file = event.data.assets;
              if (file?.length) {
                if (typeof file[0] !== 'string') {
                  const imageList = file.map((item) => {
                    if(item.absolutePath) {
                      if(!item.absolutePath.startsWith('/')) {
                        item.absolutePath = `/${item.absolutePath}`;
                      }
                    }
                    return `<img src="${item?.absolutePath}" alt="${item?.altText ? item?.altText : ''}" title="${item?.caption ? item?.caption : ''}" height="" width="">`;
                  });
                  const images =  imageList.join('');
                  if(images) {
                    editor.insertContent(images);
                  }
                }
              }
            }
          }
        });
        window.grapesjsTinyDocsData.editorInstance = editor;
      },
      setup: (editor) => {
        editor.ui.registry.addButton('customImageButton', {
          icon: 'image',
          tooltip: 'Image',
          onAction: () => {
            if (parent && parent.parent && parent.parent.window && parent.parent.window.openMediaManager) {
              // @ts-ignore
              parent.parent.window.openMediaManager();
            }
          },
        });
      }

    }).then(
    editors => {
      window.grapesjsTinyDocsData.tinymceInstant = editors[0];
      setTimeout(
        () => {
          editors[0].focus();
          setCaret();
        }
      );
    }
  );

  function setCaret() {
    let e = window.grapesjsTinyDocsData.latestClickEvent;
    if (e) {
      let range = null;
      let textNode;
      let offset;
      if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(e.clientX, e.clientY);
        textNode = range.startContainer;
        offset = range.startOffset;
      } else if (document.caretPositionFromPoint) {
        range = document.caretPositionFromPoint(e.clientX, e.clientY);
        textNode = range.offsetNode;
        offset = range.offset;
      }
      if (range) {
        range = document.createRange();
        let sel = document.getSelection();
        range.setStart(textNode, offset)
        range.collapse(true)
        sel.removeAllRanges();
        sel.addRange(range);
      }
      window.grapesjsTinyDocsData.latestClickEvent = null;
    }
  }

  /**
   *
   * @param {string} type
   * @param {HTMLElement} container
   * @param {Object} properties
   * @return {HTMLElement}
   */
  function createHtmlElem(type, container, properties) {
    let elem = document.createElement(type);
    setElementProperty(elem, properties);
    container && container.appendChild(elem);
    return (elem);
  }

  /**
   *
   * @param {Object} elem
   * @param {Object} properties
   */
  function setElementProperty(elem, properties) {
    if (properties) {
      for (let key in properties) {
        if (_typeof(properties[key]) === 'object') {
          setElementProperty(elem[key], properties[key]);
        } else {
          elem[key] = properties[key];
        }
      }
    }
  }
}
