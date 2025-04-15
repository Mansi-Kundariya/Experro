/* eslint-disable */
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import grapejsGrid from '../../lib/grapejs/grapejs-grid-blocks';
import tinymceEditor from '../../lib/grapejs/grapejs-tinymce-plugin';
import grapejsBasic from '../../lib/grapejs/grapejs-basic-blocks';
import '../../assets/scss/app.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import { UIBuilderConstants } from '../../utilities/constants';
import { GrapesJsReactComponentRenderer } from '../../lib/grapejs/grapesjs-react-component-renderer';
import React, { useEffect, useState } from 'react';
import { Page, PencilBanner } from '../../components';
import { AppInit } from '../../interfaces/app-init';
import { Trait } from '../../lib/trait';
import { AuthService } from '../../services';
import DesktopIcon from '../../assets/images/icons/desktop-icon';
import TabletIcon from '../../assets/images/icons/tablet-icon';
import MobileIcon from '../../assets/images/icons/mobile-icon';
import UndoIcon from '../../assets/images/icons/undo-icon';
import RedoIcon from '../../assets/images/icons/redo-icon';
import { Header } from '../../components';
import { Footer } from '../../components';

declare let window: any;

function UiBuilder({
                     templates,
                     components,
                     widgets,
                     headerComponent,
                     footerComponent,
                     pencilBannerComponent,
                   }: {
  templates: any;
  components: any;
  widgets: any;
  headerComponent: any;
  footerComponent: any;
  pencilBannerComponent?: any;
}) {
  setTimeout(() => {
    initGrapeJS({ widgets });
  }, 5000);

  return (
    <div style={{ height: '100%' }}>
      <div id="__experro_gjs_loader__">
        <div className="loader-st"></div>
      </div>
      <div style={{ display: 'none' }} id="__experro_gjs__">
        <div data-gjs-droppable="false" data-gjs-draggable="false">
          {pencilBannerComponent && (
            <PencilBanner pencilBanner={pencilBannerComponent}></PencilBanner>
          )}
          <Header headerComponent={headerComponent}></Header>
          <main className="page-body">
            <div className="page-content">
              <Page templates={templates} components={components} />
            </div>
          </main>
          <Footer footerComponent={footerComponent}></Footer>
        </div>
      </div>
    </div>
  );
}

function changeBackgroundImagePosition(selectedComponentStyle) {
  const bgPsX = selectedComponentStyle['background-position-x'];
  const bgPsY = selectedComponentStyle['background-position-y'];
  if(bgPsX === '50%') {
    selectedComponentStyle['background-position-x'] = 'center';
  } else if(bgPsX === '0%') {
    selectedComponentStyle['background-position-x'] = 'left';
  } else if(bgPsX === '100%') {
    selectedComponentStyle['background-position-x'] = 'right';
  }

  if(bgPsY === '50%') {
    selectedComponentStyle['background-position-y'] = 'center';
  } else if(bgPsY === '0%') {
    selectedComponentStyle['background-position-y'] = 'top';
  } else if(bgPsY === '100%') {
    selectedComponentStyle['background-position-y'] = 'bottom';
  }
  return selectedComponentStyle;
}

// @ts-ignore
const AppUiBuilder = ({
                        templates,
                        widgets,
                        components,
                        routes,
                        singleDataModelsToPrefetch,
                        headerComponent,
                        footerComponent,
                        pencilBannerComponent,
                        handleI18,
                      }: AppInit) => {
  const [renderComponent, setRenderComponent] = useState(false);
  const cmsRoutes = routes.map(({ path, element }, key) => (
    <Route path={path} element={element} key={key} />
  ));
  const cmsRoutesSsr = routes.map(({ path, element }, key) => (
    <Route path={'/_ssr_' + path} element={element} key={key} />
  ));

  const componentsKeys = Object.keys(components);
  window.componentsKeys = componentsKeys;

  useEffect(() => {
    (async () => {
      const userDetails = await AuthService.checkSessionInfo();
      if (userDetails) {
        userDetails.userInfo = userDetails.userInfo ? userDetails.userInfo : {};
        window['__PING_DETAILS__'] = userDetails;
      }
      setRenderComponent(true);
      if (handleI18) handleI18();
    })();

    const assetData = (event) => {
      if (event.data.message === "imagesData") {
        if (window.editor) {
          const assetManager = window.editor.AssetManager;
          const selectedComponent = window.editor.getSelected();
          if (selectedComponent) {
            if(event.data.assets && event.data.assets[0]) {
              const selectedComponentStyle = selectedComponent.getStyle();
              if(event.data.assets[0].absolutePath && !event.data.assets[0].absolutePath.startsWith("/")) {
                event.data.assets[0].absolutePath = `/${event.data.assets[0].absolutePath}`;
              }
              if(selectedComponentStyle) {
                selectedComponentStyle['background-image'] = `url(${event.data.assets[0].absolutePath})`;
                const updatedComponentStyle = changeBackgroundImagePosition(selectedComponentStyle);
                selectedComponent.setStyle(updatedComponentStyle);
              } else {
                selectedComponent.setStyle({ 'background-image': `url(${event.data.assets[0].absolutePath})` });
              }
            }
          }
          assetManager.close();
        }
      } else if (event.data.message === "closeMediaManager") {
        if (window.editor) {
          const assetManager = window.editor.AssetManager;
          assetManager.close();
        }
      }
    };

    window.addEventListener("message", assetData);

    return () => window.removeEventListener("message", assetData);
  }, [templates]);

  // const componentToRender = (<div style={{display: 'none', height:'1000px'}} id='__experro_gjs__'></div>);
  return (
    <div style={{ height: '100%' }}>
      {renderComponent && (
        <Router>
          <Switch>
            {cmsRoutes}
            {cmsRoutesSsr}
            <Route
              index={false}
              key={Date.now()}
              path="*"
              element={
                <UiBuilder
                  components={components}
                  templates={templates}
                  widgets={widgets}
                  footerComponent={footerComponent}
                  headerComponent={headerComponent}
                  pencilBannerComponent={pencilBannerComponent}
                />
              }
            />
          </Switch>
        </Router>
      )}
    </div>
  );
};

function updateStyleManager() {
  // if ($('.gjs-sm-header')) {
  //   // @ts-ignore
  //   $('.gjs-sm-header').css('display', 'none');
  // }
  // if ($('.gjs-clm-tags')) {
  //   // @ts-ignore
  //   $('.gjs-clm-tags').css('display', 'none');
  // }
  // if ($('.gjs-sm-sectors')) {
  //   // @ts-ignore
  //   $('.gjs-sm-sectors').css('display', 'none');
  // }
}

function initPanels(editor) {
  editor.getConfig().showDevices = 0;
  // editor.Panels.removePanel("views-container");
  editor.Panels.removePanel('devices-c');
  // editor.Panels.removePanel("views");
  // editor.Panels.removePanel("options");
  editor.Panels.removePanel('commands');
  // editor.Panels.removeButton("views", "open-sm");
  editor.Panels.removeButton('views', 'open-layers');
  editor.Panels.removeButton('options', 'preview');
  editor.Panels.removeButton('options', 'fullscreen');
  editor.Panels.removeButton('options', 'export-template');

  editor.Panels.addPanel({
    id: 'devices',
    buttons: [
      {
        id: 'set-device-desktop',
        label: DesktopIcon + '<div class="iconTip">Desktop</div>',
        attributes: {
          id: 'set-device-desktop',
        },
        command: {
          run(e) {
            e.setDevice('Desktop');
          },
          stop(e) {},
        },
        className: 'icon-desktop hasTooltip',
        active: 1,
      },
      {
        id: 'set-device-tablet',
        label: TabletIcon + '<div class="iconTip">Tablet</div>',
        attributes: {
          id: 'set-device-tablet',
        },
        command: {
          run(e) {
            e.setDevice('Tablet');
          },
          stop(e) {},
        },
        className: 'icon-tablet hasTooltip',
      },
      {
        id: 'set-device-mobile-portrait',
        label: MobileIcon + '<div class="iconTip">Mobile</div>',
        attributes: {
          id: 'set-device-mobile-portrait',
        },
        command: {
          run(e) {
            e.setDevice('Mobile portrait');
          },
          stop(e) {},
        },
        className: 'icon-mobile-portrait hasTooltip',
      }
    ],
  });

  editor.Panels.addPanel({
    id: 'operations',
    buttons: [
      {
        id: 'undo',
        label: UndoIcon + '<div class="iconTip">Undo</div>',
        attributes: {
          id: 'tb-undo',
        },
        command: {
          run(e) {
            e.runCommand('core:undo');
          },
        },
        className: 'icon-undo hasTooltip',
      },
      {
        id: 'redo',
        label: RedoIcon + '<div class="iconTip">Redo</div>',
        attributes: {
          id: 'tb-redo',
        },
        command: {
          run(e) {
            e.runCommand('core:redo');
          },
        },
        className: 'icon-redo hasTooltip',
      },
    ],
  });

  editor.stopCommand('sw-visibility', {});
  editor.runCommand('open-blocks', {});
}

function initEditorLoadEvent(editor) {
  editor.DomComponents.removeType("iframe");
  editor.DomComponents.removeType("video");
  editor.DomComponents.removeType("image");
  editor.DomComponents.removeType("script");
  let frame;
  editor.on('load', () => {
    const __iframe = editor.Canvas.getDocument();
    const iframeBody = __iframe.body;
    const cssRulesDiv = __iframe.querySelector('.gjs-css-rules');
    if (cssRulesDiv) {
      iframeBody.insertBefore(cssRulesDiv, iframeBody.firstChild);
    }

    // updateStyleManager();
    initPanels(editor);

    for (let i = 0; i < frames.length; i++) {
      try {
        const isgjsFrame =
          frames[i].frameElement.classList.contains('gjs-frame');
        if (isgjsFrame) {
          frame = frames[i];
          break;
        }
      } catch (e) {}
    }
    // document.getElementsByTagName('iframe')[0].id = "__experro_gjs_iframe__";
    frame.frameElement.id = '__experro_gjs_iframe__';
    // clearInterval(interval);
    // $('link').each((_link, el) => {
    //   frame.document.getElementsByTagName("head")[0].appendChild(el.cloneNode(true));
    // });
    document.querySelectorAll('link').forEach(function (el) {
      frame.document
        .getElementsByTagName('head')[0]
        .appendChild(el.cloneNode(true));
    });

    // $('style').each((_style, el) => {
    //   frame.document.getElementsByTagName("head")[0].appendChild(el.cloneNode(true));
    // });
    document.querySelectorAll('style').forEach(function (el) {
      frame.document
        .getElementsByTagName('head')[0]
        .appendChild(el.cloneNode(true));
    });

    const wrapperDiv = document.createElement('div');
    wrapperDiv.id = '__experro_gjs_overlay__';
    frame.document.body.append(wrapperDiv);
    const iframe = document.querySelector(
      'iframe#__experro_gjs_iframe__'
    ) as HTMLIFrameElement;
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow?.document;
    const div = iframeDocument.querySelector(
      '#__experro_gjs_overlay__'
    ) as HTMLElement;
    div.setAttribute(
      'style',
      'background:transparent;position:absolute;left:0;top:0;z-index:999'
    );
    div.style.width = iframeDocument.documentElement.scrollWidth + 'px';
    div.style.height = iframeDocument.documentElement.scrollHeight + 'px';

    const script = document.createElement('script');
    const scriptText = document.createTextNode(`const iframeComponents = JSON.parse('${JSON.stringify(window.componentsKeys)}');
    const wrapperGJS = document.querySelector('[data-gjs-type="wrapper"]');
    const resizeObserver = new ResizeObserver((entries) => {
      document.getElementById("__experro_gjs_overlay__").style.height=entries[0].target.clientHeight+'px';
      document.getElementById("__experro_gjs_overlay__").style.width=entries[0].target.clientWidth+'px';
    });
    resizeObserver.observe(wrapperGJS);
    function formatJSON(json) {
      const obj = {};
      if (json.attributes) {
          obj.props = json.attributes;
      } else {
        obj.props={ };
      }
      if (json.components) {
        if (iframeComponents.indexOf(json.type) == -1 || json.type == 'text-custom' || json.type == 'map' || json.type == 'link') {
          const children = [];
          for (const key in json.components) {
              const component = json.components[key];
              children.push(formatJSON(component));
          }
          obj.props['children'] = children;
          }
      }
      if (json.type) {
          obj['props']['data-gjs-type'] = json.type;
          if (iframeComponents.indexOf(json.type) !== -1) {
              obj['type'] = json.type;
          } else {
            if(json.tagName) {
              obj['type'] = json.tagName;
            } else {
              obj['type'] = 'div';
            }
          }
      } else {
         if(json.tagName) {
              obj['type'] = json.tagName;
            } else {
              obj['type'] = 'div';
            }
      }

      const keys=Object.keys(json);
      const excludeKeys=['type','props','children','attributes','components','tagName'];
      for(let i=0;i<keys.length;i++){
        if (!excludeKeys.includes(keys[i])){
            obj['props'][keys[i]]=json[keys[i]]
        }
      }
      return obj;
    }

    function serialize(el) {
        const list = Object.keys(el);
        const keyIdx = list.findIndex((k) => k.indexOf("__reactFiber"));
        const element = el[list[keyIdx]];
        var replacer = function replacer(key, value) {
            switch (key) {
                case "_owner":
                case "_store":
                case "ref":
                case "key":
                case "copyable":
                case "draggable":
                case "removable":
                case "resizeable":
                case "styleable":
                    return;
                case "type":
                    if (typeof value === "function") {
                        return value.name;
                    } else {
                        return value;
                    }
                default:
                    return value;
            }
        }
        let returnObj;
        if (element && element.model) {
            returnObj = JSON.stringify(element.model, replacer);
        } else {
            returnObj = JSON.stringify(element, replacer);
        }
        return formatJSON(JSON.parse(returnObj));
    }

    function getHTML() {
        const epe={};
        const dragableArea = document.getElementsByClassName("exp-ui-builder-droppable");
        for (let k = 0; k < dragableArea.length; k++) {
            epe[dragableArea[k].getAttribute('data-dnd-content-id')]=serialize(document.getElementById(dragableArea[k].getAttribute('id')));
        }
        return epe;
    }
    window.getHTML=getHTML;`);
    script.append(scriptText);
    frame.document.body.append(script);
    const classes = document.body.className;
    let classList = [];
    if (classes) {
      classList = classes.split(' ');
    }
    for (let i = 0; i < classList.length; i++) {
      frame.document.body.classList.add(classList[i]);
    }
    //Adding one more class for CSS manipulation when ui-builder is open only
    frame.document.body.classList.add('cms-ui-builder');

    document.getElementById('__experro_gjs__').style.display = 'block';
    removeTitleAttribute();
    if (frame.document.readyState === 'complete') {
      setTimeout(() => {
        document.getElementById('__experro_gjs_loader__').style.display = 'none';
      }, 2000);
    } else {
      setTimeout(() => {
        document.getElementById('__experro_gjs_loader__').style.display = 'none';
      }, 2000);
    }
    const bm = editor.BlockManager;
    const gjsBlocks = bm.getAll();
    const reorderedBlocks = [];
    const basicComponents = UIBuilderConstants.BASIC_COMPONENTS_RENDERING_SEQUENCE;
    basicComponents.map(block => {
      reorderedBlocks.push(bm.get(block));
    });
    gjsBlocks.filter(i => {
      if(basicComponents.indexOf(i.id) === -1) {
        reorderedBlocks.push(bm.get(i));
      }
    });
    bm.render(reorderedBlocks);
    editor.StyleManager.addProperty('flex', {
      label: 'Gap',
      property: 'gap',
      type: 'number',
      default: '0px',
      units:['px', '%', 'em', 'rem', 'vh', 'vw']
    }, { at: 0 });

    function removeGJSFromText(node) {
      if (node.children && node.children.length) {
        for (let child of node.children) {
          removeGJSFromText(child);
        }
      }
      node.removeAttribute('id');
      node.removeAttribute('draggable');
      node.removeAttribute('data-gjs-type');
    }
    frame.document.querySelectorAll('[data-gjs-type="text-custom"]').forEach((node)=>{
      const id = node.getAttribute('id');
      frame.document.querySelectorAll(`#${id} > [data-gjs-type]`).forEach(removeGJSFromText);
      let html= node.getAttribute('content');
      if(!html && node?.innerHTML) {
        html = node.innerHTML;
      }
      editor.getWrapper().find('[data-gjs-type="text-custom"]').forEach((component) => {
        const componentId = component.getId();
        if(componentId === id) {
          component.addAttributes({ content : html});
          // Commented out because of text component drag and drop was not working as expected
          // component.empty();
        }
      });
      node.innerHTML = html;
    });
  });
}

const placeHolderHtml = `<div class="emptyContentPanel">
    <div class="emptyContent">
      <div class="emptyContentIcon">
      </div>
      <h4>Start building your page</h4>
      <p>Drag and drop components here.</p>
    </div>
  </div>`;

function initBlockManager(editor) {
  const filter = (query) => {
    const bm = editor.Blocks;
    const all = bm.getAll();
    let filter = all;
    (query &&
      (filter = all.filter((block) => {
        return (
          block.get('label').toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      }))) ||
    (filter = all.filter((block) => true));
    bm.render(filter);
  };
  const pfx = editor.getConfig('style-prefix') || 'gjs-';
  let bmt = false;
  const blocksHeader = `<div>
            <div style="padding:10px;" class="${pfx}assets-search">
                  <input class="tm-input sm" style="color:black;width:100%;padding:10px;border:1px solid black;" type="search" placeholder="Search Components">
            </div>
        </div>`;
  //@ts-ignore
  editor.on('run:open-blocks', () => {
    setTimeout(updateStyleManager, 1);

    editor.stopCommand('open-tm', {});
    editor.Panels.getButton('views', 'open-tm').set('active', false);
    editor.Panels.getButton('views', 'open-blocks').set('active', true);
    if (!bmt) {
      editor.Blocks.getCategories()
        .models.find((model) => {
        return model.id == 'Theme Components';
      })
        .view.$el.addClass('custom-category-block');
      const blockElements = document.querySelectorAll(`.${pfx}blocks-cs`);
      blockElements.forEach((blockElement) => {
        const parentElement = blockElement.parentElement;
        const wrapperDiv = document.createElement('div');
        wrapperDiv.innerHTML = blocksHeader;
        parentElement.insertBefore(wrapperDiv.firstChild, blockElement);
        const inputElement = parentElement.querySelector('input');

        inputElement.addEventListener('keyup', function (e: any) {
          filter(e.target.value);
        });
      });
    }
    bmt = true;
    removeTitleAttribute();
  });
}

function removeTitleAttribute() {
  setTimeout(() => {
    const elList = document.querySelectorAll('.gjs-pn-btn.hasTooltip');
    elList.forEach((el) => el.removeAttribute('title'));
  }, 1000);
}

function initGrapeJS({ widgets }) {
  const editor = grapesjs.init({
    container: '#__experro_gjs__',
    fromElement: true,
    height: '100%',
    storageManager: false,
    allowScripts:true,
    noticeOnUnload: true,
    baseCss: `body{}
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
    }
`,
    blockManager: {
      // @ts-ignore
      appendTo: document.querySelector('.gjs-content'),
    },
    // @ts-ignore
    selectorManager: { componentFirst: true, escapeName: name => name },
    forceClass: false,
    avoidInlineStyle: true,
    styleManager: {
      sectors: [
        // {
        //   name: 'Settings',
        //   open: false,
        //   properties: []
        // },
        {
          name: 'General',
          open: false,
          properties: ['display', 'float', 'position', 'top', 'right', 'left', 'bottom'],
        },
        {
          name: 'Flex',
          open: false,
          properties: [
            'flex-direction',
            'flex-wrap',
            'justify-content',
            'align-items',
            'align-content',
            'order',
            'flex-basis',
            'flex-grow',
            'flex-shrink',
            'align-self',
          ],
        },
        {
          name: 'Dimension',
          open: false,
          properties: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
        },
        {
          name: 'Typography',
          open: false,
          properties: [
            'font-family',
            'font-size',
            'font-weight',
            'letter-spacing',
            'color',
            'line-height',
            'text-align',
            'text-shadow',
          ],
        },
        {
          name: 'Decorations',
          open: false,
          properties: ['background-color', 'border-radius', 'border', 'box-shadow', {
            "property": "background",
            "type": "stack",
            "properties": [
              {
                "property": "background-image",
                "type": "file",
                "functionName": "url",
                "default": "none",
                "full": true,
                "id": "background-image-sub"
              },
              {
                "property": "background-repeat",
                "type": "select",
                "default": "no-repeat",
                "options": [
                  {
                    "id": "repeat"
                  },
                  {
                    "id": "repeat-x"
                  },
                  {
                    "id": "repeat-y"
                  },
                  {
                    "id": "no-repeat"
                  }
                ],
                "id": "background-repeat-sub"
              },
              {
                "property": "background-position-x",
                "type": "select",
                "default": "center",
                "label":"Position X",
                "options": [
                  {
                    "id": "left"
                  },
                  {
                    "id": "right",
                  },
                  {
                    "id": "center",
                  }
                ],
                "id": "background-position-sub-x"
              },
              {
                "property": "background-position-y",
                "type": "select",
                "default": "center",
                "label":"Position Y",
                "options": [
                  {
                    "id": "top"
                  },
                  {
                    "id": "center",
                  },
                  {
                    "id": "bottom",
                  }
                ],
                "id": "background-position-sub-y"
              },
              {
                "property": "background-attachment",
                "type": "select",
                "default": "scroll",
                "options": [
                  {
                    "id": "scroll"
                  },
                  {
                    "id": "fixed"
                  },
                  {
                    "id": "local"
                  }
                ],
                "id": "background-attachment-sub"
              },
              {
                "property": "background-size",
                "type": "select",
                "default": "cover",
                "options": [
                  {
                    "id": "auto"
                  },
                  {
                    "id": "cover"
                  },
                  {
                    "id": "contain"
                  }
                ],
                "id": "background-size-sub"
              }
            ],
            "preview": true,
            "detached": true
          }],
        },
        {
          name: 'Extra',
          open: false,
          properties: ['opacity', 'transition', 'transform'],
        },
      ],
    },
    deviceManager: {
      devices: [
        {
          id: 'desktop',
          name: 'Desktop',
          width: '',
        },
        {
          id: 'tablet',
          name: 'Tablet',
          width: '768px',
          widthMedia: '768px',
        },
        {
          id: 'mobilePortrait',
          name: 'Mobile portrait',
          width: '480px',
          widthMedia: '480px',
        },
      ],
    },
    assetManager: {
      // @ts-ignore
      custom: {
        open(props) {
          window.parent.postMessage(
            {
              message: "openMediaManager",
            },
            "*"
          );
        },
      },
    },
    plugins: [grapejsBasic, tinymceEditor, grapejsGrid, GrapesJsReactComponentRenderer, ...widgets],
    pluginsOpts: {
      // @ts-ignore
      [tinymceEditor]: {
        'tinymce-module': 'https://cdn22.myexperro.com/tinymce/tinymce.min.js',
        inline: ['span','a','button'],
        inline_toolbar: [
          'bold italic underline strikethrough forecolor backcolor',
          'fontfamily fontsize'
        ],
        toolbar: [
          'bold italic underline strikethrough superscript subscript link blocks table customImageButton',
          'fontsize fontfamily lineheight forecolor backcolor hr',
          'alignleft aligncenter alignright alignjustify | numlist bullist outdent indent ltr rtl code removeformat preview'
        ],
        plugins:  [
          'lists',
          'preview',
          'table',
          'code',
          'link',
          'autolink',
          'directionality'
        ]
      }
    },
    width: 'auto',
  });

  editor.Panels.getButton('views', 'open-tm').set(
    'label',
    `<svg class="propertyIcon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.064 5.57842C7.28267 3.46763 9.98173 2.74442 12.0925 3.96309C13.5986 4.8326 14.3982 6.45573 14.2902 8.08112C14.5126 8.16504 14.7309 8.26798 14.9429 8.3904C17.0537 9.60907 17.7769 12.3081 16.5583 14.4189C15.3396 16.5297 12.6405 17.2529 10.5297 16.0343C10.343 15.9265 10.1669 15.8069 10.002 15.677C8.62514 16.7654 6.6694 16.9676 5.05694 16.0366C2.94614 14.818 2.22293 12.1189 3.4416 10.0081C3.93032 9.16164 4.65802 8.53792 5.4895 8.17354C5.41157 7.30034 5.59236 6.39533 6.064 5.57842ZM5.80247 9.46508C5.3034 9.72953 4.87076 10.1327 4.56743 10.6581C3.70775 12.1471 4.21793 14.0511 5.70694 14.9108C6.96923 15.6396 8.52974 15.3839 9.49944 14.382C9.50819 14.3715 9.51733 14.3612 9.52685 14.3511C9.68936 14.1787 9.83501 13.9845 9.95934 13.7691C10.2504 13.2651 10.3845 12.7142 10.3768 12.1719C9.47194 12.2742 8.52667 12.0984 7.67738 11.6081C6.79858 11.1007 6.16016 10.336 5.80247 9.46508ZM10.8949 14.7229C10.9853 14.789 11.0803 14.851 11.1797 14.9084C12.6688 15.7681 14.5727 15.2579 15.4324 13.7689C16.2921 12.2799 15.7819 10.3759 14.2929 9.51624C14.1986 9.46176 14.1027 9.41284 14.0056 9.36933C13.9239 9.58096 13.8248 9.78899 13.7079 9.99161C13.2189 10.8384 12.4918 11.4619 11.6599 11.8263C11.7376 12.6993 11.5569 13.6048 11.0855 14.4213C11.0255 14.5252 10.9619 14.6258 10.8949 14.7229ZM12.9434 8.37603C12.9403 8.38758 12.9376 8.39924 12.9352 8.411C12.8698 8.72874 12.753 9.04226 12.5809 9.34035C12.163 10.0642 11.4996 10.5561 10.7553 10.7728C10.7422 10.7766 10.7293 10.7808 10.7166 10.7853C10.6425 10.8058 10.5677 10.8236 10.4924 10.8386C10.4792 10.8402 10.466 10.8423 10.4528 10.8448C10.0401 10.9217 9.61155 10.9159 9.19351 10.8207L9.19343 10.8211C8.89731 10.7534 8.60615 10.6409 8.32934 10.4811C6.84032 9.62143 6.33015 7.71744 7.18983 6.22842C8.04951 4.73941 9.95351 4.22924 11.4425 5.08892C12.6232 5.77056 13.1884 7.10874 12.9434 8.37603Z" fill="#9D9CAF"/>
  </svg><div class="iconTip">Property</div>`
  );
  editor.Panels.getButton('views', 'open-tm').set(
    'className',
    'hasTooltip propertyTab'
  );
  editor.Panels.getButton('views', 'open-blocks').set(
    'label',
    `<svg class="elementIcon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9493 6.05186C11.7489 3.85146 8.25031 3.85146 6.04991 6.05186L6.04598 6.05579C3.85303 8.21157 3.84732 11.7487 6.04991 13.9513L6.05384 13.9552C8.20962 16.1481 11.7467 16.1539 13.9493 13.9513L13.9532 13.9473C16.1462 11.7916 16.1519 8.25446 13.9493 6.05186ZM5.13263 5.13066C7.84084 2.42454 12.1611 2.4252 14.8685 5.13262C17.5738 7.83786 17.5801 12.2028 14.8665 14.8725C12.1612 17.5757 7.7977 17.5814 5.12867 14.8685C2.42544 12.1631 2.41975 7.79969 5.13263 5.13066Z" fill="#9D9CAF"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.4375 10.0016C6.4375 9.64258 6.72852 9.35156 7.0875 9.35156H12.9111C13.2701 9.35156 13.5611 9.64258 13.5611 10.0016C13.5611 10.3605 13.2701 10.6516 12.9111 10.6516H7.0875C6.72852 10.6516 6.4375 10.3605 6.4375 10.0016Z" fill="#9D9CAF"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99961 6.44141C10.3586 6.44141 10.6496 6.73242 10.6496 7.09141V12.915C10.6496 13.274 10.3586 13.565 9.99961 13.565C9.64062 13.565 9.34961 13.274 9.34961 12.915V7.09141C9.34961 6.73242 9.64062 6.44141 9.99961 6.44141Z" fill="#9D9CAF"/>
  </svg><div class="iconTip">Component</div>`
  );
  editor.Panels.getButton('views', 'open-blocks').set(
    'className',
    'hasTooltip componentTab'
  );
  editor.Panels.getButton('views', 'open-sm').set(
    'label',
    `<svg class="styleIcon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1525 2.90492C17.3914 3.17286 17.3679 3.58374 17.0999 3.82265L11.7621 8.58226C11.3167 8.972 11.2755 9.60416 11.7048 10.0334L12.141 10.4697C12.5863 10.8809 13.2064 10.8423 13.5787 10.4019L16.1458 6.94965C16.36 6.66158 16.7671 6.6017 17.0552 6.81591C17.3433 7.03012 17.4032 7.43729 17.189 7.72537L14.6112 11.192C14.6048 11.2006 14.5981 11.2091 14.5913 11.2174C14.467 11.3684 14.3298 11.4988 14.1831 11.6088C14.1889 11.6302 14.1936 11.6521 14.1973 11.6744C14.6819 14.636 12.0009 17.3183 8.22249 17.3183C6.17534 17.3183 4.36939 16.0935 2.85446 14.4408C2.67669 14.2469 2.63335 13.965 2.74466 13.7266C2.85597 13.4882 3.09998 13.3405 3.36279 13.3523C4.29116 13.394 4.83477 13.2659 5.16433 13.094C5.4721 12.9335 5.65115 12.705 5.78783 12.3917C5.90437 12.1246 5.97457 11.8406 6.06024 11.494C6.08738 11.3842 6.11608 11.2681 6.14829 11.1442C6.27208 10.6684 6.444 10.1092 6.81182 9.61402L6.8136 9.61162C7.77735 8.32662 9.26299 7.91756 10.4987 8.02054C10.5083 8.02134 10.5179 8.02235 10.5274 8.02357C10.6339 7.8728 10.7595 7.73239 10.9035 7.60605L16.2348 2.85236C16.5027 2.61345 16.9136 2.63698 17.1525 2.90492ZM10.1043 9.30515C9.28641 9.31088 8.4238 9.63225 7.85451 10.3904C7.6451 10.6728 7.52275 11.0243 7.40642 11.4715C7.3847 11.555 7.3627 11.6446 7.33967 11.7384C7.24994 12.1038 7.14463 12.5327 6.97938 12.9115C6.75495 13.426 6.39789 13.9169 5.76538 14.2467C5.49619 14.3871 5.19007 14.4914 4.842 14.5602C5.94264 15.4927 7.0752 16.0183 8.22249 16.0183C11.3714 16.0183 13.1253 13.939 12.9367 12.0542C12.3369 12.079 11.7262 11.8628 11.245 11.4117C11.2399 11.4069 11.2349 11.4021 11.23 11.3971L10.7855 10.9527C10.3105 10.4777 10.094 9.88636 10.1043 9.30515Z" fill="#9D9CAF"/>
  </svg><div class="iconTip">Style</div>`
  );
  editor.Panels.getButton('views', 'open-sm').set(
    'className',
    'hasTooltip styleTab'
  );
  editor.Panels.getButton('options', 'sw-visibility').set('active', false);
  editor.Panels.getButton('options', 'sw-visibility').set(
    'label',
    `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.62544 1.61328L4.87578 1.61328C5.22786 1.61328 5.51328 1.8987 5.51328 2.25078C5.51328 2.60286 5.22786 2.88828 4.87578 2.88828H4.65078C4.22022 2.88828 3.93564 2.88878 3.7175 2.9066C3.50679 2.92382 3.4148 2.95397 3.35922 2.98229C3.19693 3.06498 3.06498 3.19693 2.98229 3.35922C2.95397 3.4148 2.92382 3.50679 2.9066 3.7175C2.88878 3.93564 2.88828 4.22022 2.88828 4.65078V4.87578C2.88828 5.22786 2.60286 5.51328 2.25078 5.51328C1.8987 5.51328 1.61328 5.22786 1.61328 4.87578L1.61328 4.62545C1.61327 4.22699 1.61326 3.88994 1.63584 3.61367C1.65949 3.32412 1.71109 3.04566 1.84626 2.78038C2.05119 2.37818 2.37818 2.05119 2.78038 1.84626C3.04566 1.71109 3.32412 1.65949 3.61367 1.63584C3.88994 1.61326 4.22699 1.61327 4.62544 1.61328ZM14.2841 2.9066C14.0659 2.88878 13.7813 2.88828 13.3508 2.88828H13.1258C12.7737 2.88828 12.4883 2.60286 12.4883 2.25078C12.4883 1.8987 12.7737 1.61328 13.1258 1.61328L13.3761 1.61328C13.7746 1.61327 14.1116 1.61326 14.3879 1.63584C14.6774 1.65949 14.9559 1.71109 15.2212 1.84626C15.6234 2.05119 15.9504 2.37818 16.1553 2.78038C16.2905 3.04566 16.3421 3.32412 16.3657 3.61367C16.3883 3.88995 16.3883 4.22702 16.3883 4.62549V4.87578C16.3883 5.22786 16.1029 5.51328 15.7508 5.51328C15.3987 5.51328 15.1133 5.22786 15.1133 4.87578V4.65078C15.1133 4.22022 15.1128 3.93564 15.095 3.7175C15.0777 3.50679 15.0476 3.4148 15.0193 3.35922C14.9366 3.19693 14.8046 3.06498 14.6423 2.98229C14.5868 2.95397 14.4948 2.92382 14.2841 2.9066ZM6.86328 2.25078C6.86328 1.8987 7.1487 1.61328 7.50078 1.61328H10.5008C10.8529 1.61328 11.1383 1.8987 11.1383 2.25078C11.1383 2.60286 10.8529 2.88828 10.5008 2.88828H7.50078C7.1487 2.88828 6.86328 2.60286 6.86328 2.25078ZM2.25078 6.86328C2.60286 6.86328 2.88828 7.1487 2.88828 7.50078V10.5008C2.88828 10.8529 2.60286 11.1383 2.25078 11.1383C1.8987 11.1383 1.61328 10.8529 1.61328 10.5008V7.50078C1.61328 7.1487 1.8987 6.86328 2.25078 6.86328ZM15.7508 6.86328C16.1029 6.86328 16.3883 7.1487 16.3883 7.50078V10.5008C16.3883 10.8529 16.1029 11.1383 15.7508 11.1383C15.3987 11.1383 15.1133 10.8529 15.1133 10.5008V7.50078C15.1133 7.1487 15.3987 6.86328 15.7508 6.86328ZM2.25078 12.4883C2.60286 12.4883 2.88828 12.7737 2.88828 13.1258V13.3508C2.88828 13.7813 2.88878 14.0659 2.9066 14.2841C2.92382 14.4948 2.95397 14.5868 2.98229 14.6423C3.06498 14.8046 3.19693 14.9366 3.35922 15.0193C3.4148 15.0476 3.50679 15.0777 3.7175 15.095C3.93564 15.1128 4.22022 15.1133 4.65078 15.1133H4.87578C5.22786 15.1133 5.51328 15.3987 5.51328 15.7508C5.51328 16.1029 5.22786 16.3883 4.87578 16.3883H4.62549C4.22702 16.3883 3.88995 16.3883 3.61367 16.3657C3.32412 16.3421 3.04566 16.2905 2.78038 16.1553C2.37818 15.9504 2.05119 15.6234 1.84626 15.2212C1.71109 14.9559 1.65949 14.6774 1.63584 14.3879C1.61326 14.1116 1.61327 13.7746 1.61328 13.3761L1.61328 13.1258C1.61328 12.7737 1.8987 12.4883 2.25078 12.4883ZM15.7508 12.4883C16.1029 12.4883 16.3883 12.7737 16.3883 13.1258V13.3761C16.3883 13.7745 16.3883 14.1116 16.3657 14.3879C16.3421 14.6774 16.2905 14.9559 16.1553 15.2212C15.9504 15.6234 15.6234 15.9504 15.2212 16.1553C14.9559 16.2905 14.6774 16.3421 14.3879 16.3657C14.1116 16.3883 13.7745 16.3883 13.3761 16.3883H13.1258C12.7737 16.3883 12.4883 16.1029 12.4883 15.7508C12.4883 15.3987 12.7737 15.1133 13.1258 15.1133H13.3508C13.7813 15.1133 14.0659 15.1128 14.2841 15.095C14.4948 15.0777 14.5868 15.0476 14.6423 15.0193C14.8046 14.9366 14.9366 14.8046 15.0193 14.6423C15.0476 14.5868 15.0777 14.4948 15.095 14.2841C15.1128 14.0659 15.1133 13.7813 15.1133 13.3508V13.1258C15.1133 12.7737 15.3987 12.4883 15.7508 12.4883ZM6.86328 15.7508C6.86328 15.3987 7.1487 15.1133 7.50078 15.1133H10.5008C10.8529 15.1133 11.1383 15.3987 11.1383 15.7508C11.1383 16.1029 10.8529 16.3883 10.5008 16.3883H7.50078C7.1487 16.3883 6.86328 16.1029 6.86328 15.7508Z" fill="#9D9CAF"/> </svg><div class="iconTip">View Components</div>`
  );
  editor.Panels.getButton('options', 'sw-visibility').set(
    'className',
    'hasTooltip'
  );

  // @ts-ignore
  editor.on('run:open-tm', () => {
    const grapesJsComponentSettingsLabel =
      document.getElementsByClassName('gjs-traits-label');
    if (grapesJsComponentSettingsLabel?.length) {
      grapesJsComponentSettingsLabel[0]?.remove();
    }
    const elem = document.getElementsByClassName('gjs-trt-header');
    if (elem?.length) {
      elem[0].innerHTML =
        'You don’t have any components on canvas, first select a component to view properties.';
    }
    setTimeout(updateStyleManager, 1);
    editor.stopCommand('open-blocks', {});
    editor.Panels.getButton('views', 'open-blocks').set('active', false);
    editor.Panels.getButton('views', 'open-tm').set('active', true);
    removeTitleAttribute();
    // // Moving Trait manager under style manager
    // const trainManagerEl = document.querySelector(".gjs-trt-traits");
    // document.querySelector(".gjs-sm-sector-title").remove();
    // document.querySelector(".gjs-trt-traits").remove();
    // document.querySelector(".gjs-sm-properties").append(trainManagerEl);
    // setTimeout(()=>{
    //   // @ts-ignore
    //   document.querySelector(".gjs-sm-sector__settings").style.display="block";
    // },1000);
    // // @ts-ignore
    // document.querySelector(".gjs-sm-properties").style.display="block";
  });
  editor.on('component:selected', (model) => {
    const selectedComponent = editor.getSelected();
    if (model.getAttributesList) {
      model.setAttributes(model.getAttributesList(model));
    }
    if(selectedComponent.getClasses() && selectedComponent.getClasses().includes('exp-ui-builder-droppable')) {
      // @ts-ignore
      document.querySelector(".styleTab").style.display="none";
      editor.Panels.getButton('views', 'open-blocks').set('active', true);
    } else {
      // @ts-ignore
      document.querySelector(".styleTab").style.display="flex";
    }
    const selectedComponentStyle = selectedComponent.getStyle();
    if(selectedComponentStyle) {
      const updatedComponentStyle = changeBackgroundImagePosition(selectedComponentStyle);
      selectedComponent.setStyle(updatedComponentStyle);
    }
    editor.runCommand('open-tm', {});
  });
  // @ts-ignore
  editor.on('run:open-sm', () => {
    const elem = document.getElementsByClassName('gjs-sm-header');
    if (elem?.length) {
      elem[0].innerHTML =
        'You don’t have any components on canvas, first select a component to view style.';
    }
    removeTitleAttribute();
  });

  const trait = new Trait({ editor });
  trait.initTraits();
  initEditorLoadEvent(editor);
  initBlockManager(editor);

  window.editor = editor;
}

export { AppUiBuilder };
