/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

interface DraggableAreaInterface {
  style?: any
  cssClass?: string
  id: string
  pageData: any
  components: any
  modelField?: any
}

// @ts-ignore
const DraggableArea = ({style, cssClass, id, pageData, components, modelField}: DraggableAreaInterface) => {
  if (!style) {
    style = {};
  }
  if (process.env.REACT_APP_BUILD_TARGET === 'app-ui-builder') {
    style = Object.assign(style, {zIndex: 1000, position: 'relative', border:'1px dashed black', minHeight:'100px'});
  }
  style.height = 'auto';
  let contentField = modelField;
  if (!contentField) {
    const keys = Object.keys(pageData);
    contentField = keys.find((key) => {
      return key.endsWith('_content') || key === 'content' || key.endsWith('_epe');
    });
  }

  useEffect(() => {
    document.querySelectorAll('[data-gjs-type="text-custom"]').forEach((node) => {
      if (node) {
        node.querySelectorAll("script").forEach(function(script) {
          if (script && script.innerHTML) {
            window.eval(script.innerHTML);
          }
        });
      }
    });
  }, []);


  function getEpeData(id) {
    if(contentField && pageData[contentField]) {
      const contentFieldData = JSON.parse(pageData[contentField])
      if (typeof contentFieldData === "string") {
        return JSON.parse(contentFieldData)[id];
      } else {
        return contentFieldData[id];
      }
    } else {
      return null;
    }
  }
  const contentData = getEpeData(id);

  function deserialize(data, options) {
    if (typeof data === "string") {
      data = JSON.parse(data)
    }
    if (data instanceof Object) {
      //@ts-ignore
      return deserializeElement(data.props.children, options);
    }
    throw new Error("Deserialization error: incorrect data type")
  }

  function deserializeElement(element, options = {}, key) {
    // @ts-ignore
    // eslint-disable-next-line react/prop-types,prefer-const
    let {components = {}, reviver} = options


    if (typeof element !== "object") {
      return element
    }

    if (element === null) {
      return element
    }

    if (element instanceof Array) {
      return element.map((el, i) => deserializeElement(el, options, i))
    }

    let {type, props} = element
    if (typeof type !== "string") {
      throw new Error("Deserialization error: element type must be string")
    }

    type = components[type] || type.toLowerCase()
    if (props.children) {
      // @ts-ignore
      props = {...props, children: deserializeElement(props.children, options)}
    }

    if (reviver) {
      ({type, props, key, components} = reviver(type, props, key, components))
    }
    if (props.classes && props.classes.length>0) {
      const classes =[];
      for (let i = 0; i < props.classes.length; i++) {
        if (typeof props.classes[i] == "string") {
          classes.push(props.classes[i]);
        } else {
          classes.push(props.classes[i].name);
        }
      }
      props.className = classes.join(" ");
      delete props.classes;
    }

    const gjsComponentAttributes = [
      'resizable',
      'name',
      'attributes',
      'badgable',
      'stylable',
      'removable',
      'stylable-require',
      'style-signature',
      'unstylable',
      'highlightable',
      'copyable',
      'editable',
      'layerable',
      'selectable',
      'hoverable',
      'locked',
      'void',
      'style',
      'styles',
      'script',
      'script-export',
      'traits',
      'propagate',
      'toolbar',
      'components',
      'delegate'
    ];

    for(const key in props) {
      if (gjsComponentAttributes.indexOf(key) >-1) {
        if (typeof props[key] == "string") {
          props['data-gjs-'+key] = props[key];
        } else {
          props['data-gjs-'+key] = JSON.stringify(props[key]);
        }
        delete props[key];
      }
    }

    if (props.style == ""){
      delete props.style;
    }
    if (components[element.type]) {
      return React.createElement('div', { ...props }, React.createElement(type, { ...props, key }));
    } else{
      if (props["data-gjs-type"]==="textnode") {
        props["data-gjs-type"]="text";
        return props['content'];
      } else if (props["data-gjs-type"]=='text-custom') {
        if(props['content']) {
          try {
            props['dangerouslySetInnerHTML'] = { __html: props['content'] };
            // delete props.content;
            delete props.children;
            return React.createElement('div', props);
          } catch(e) {
            console.error('error inside rendering text content', e);
          }
        }  else {
          return React.createElement(type,{ ...props, key});
        }
      } else if (props["data-gjs-type"]=='link') {
        if(props['content']) {
          try {
            props['dangerouslySetInnerHTML'] = { __html: props['content'] };
            delete props.content;
            delete props.children;
            return React.createElement('a', props);
          } catch(e) {
            console.error('error inside rendering link content', e);
          }
        } else {
          return React.createElement('a', props);
        }
      } else if (props["data-gjs-type"]=='map') {
        return React.createElement('iframe', {...props});
      } else if (props["data-gjs-type"]=='image') {
        return React.createElement('img', {...props});
      } else {
        return React.createElement(type,{ ...props, key});
      }
    }
  }

  const ElementToRender =  (contentData ? deserialize(contentData, {components: components}) : null);
  return (
    <div data-gjs-draggable="false" data-gjs-toolbar="true" data-gjs-removable="false" data-gjs-editable="false"
         data-gjs-copyable="false" data-gjs-stylable="false" data-gjs-resizeable="false"
         className={`exp-ui-builder-droppable ${cssClass}`} style={style}
         data-dnd-content-id={id} data-gjs-name="Droppable Area" suppressHydrationWarning>
      {contentField && ElementToRender ?
        <>
          {ElementToRender}
        </>
        : ''
      }
    </div>
  )
}
export { DraggableArea }
