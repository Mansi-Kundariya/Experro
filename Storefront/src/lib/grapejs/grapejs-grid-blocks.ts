export default function(editor) {
 const opts = {
   blocks: [
     'column1',
     'column2',
     'column3',
     'column4',
     'column8-4',
     'column4-8',
     'column10-2',
     'column2-10'
   ],
   flexGrid: true,
   stylePrefix: 'gjs-',
   addBasicStyle: true,
   category: 'Grid Components',
   rowHeight: 75
 };
  const bm = editor.BlockManager;
  const { category, blocks, stylePrefix, flexGrid, rowHeight, addBasicStyle } = opts;
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
  const styleRow = flexGrid
    ? `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
    }
    @media (max-width: 768px) {
      .${clsRow} {
        flex-wrap: wrap;
      }
    }`
    : `
    .${clsRow} {
      display: table;
      width: 100%;
    }
    @media (max-width: 768px) {
      .${stylePrefix}cell, .${stylePrefix}cell34, .${stylePrefix}cell66 .${stylePrefix}cell83 .${stylePrefix}cell16 {
        width: 100%;
        display: block;
      }
    }`;
  const styleClm = flexGrid
    ? `
    .${clsCell} {
      min-height: ${rowHeight}px;
      flex-grow: 1;
      flex-basis: 100%;
    }`
    : `
    .${clsCell} {
      width: 8%;
      display: table-cell;
      height: ${rowHeight}px;
    }`;

  const styleClm34 = `
  .${stylePrefix}cell34 {
    width: 33.34%;
  }`;
  const styleClm66 = `
  .${stylePrefix}cell66 {
    width: 66.66%;
  }`;

  const styleClm83 = `
  .${stylePrefix}cell83 {
    width: 83.33%;
  }`;
  const styleClm16 = `
  .${stylePrefix}cell16 {
    width: 16.67%;
  }`;

  const step = 2;
  const minDim = 1;
  const currentUnit = 1;
  const resizerBtm: Record<string, any> = {
    tl: 0,
    tc: 0,
    tr: 0,
    cl: 0,
    cr: 0,
    bl: 0,
    br: 0,
    minDim
  };
  const resizerRight: Record<string, any> = {
    ...resizerBtm,
    cr: 1,
    bc: 0,
    currentUnit,
    minDim,
    step
  };

  // Flex elements do not react on width style change therefore I use
  // 'flex-basis' as keyWidth for the resizer on columns
  if (flexGrid) {
    resizerRight.keyWidth = 'flex-basis';
  }

  const rowAttr = {
    class: `${clsRow} exp-grid`,
    'data-gjs-droppable': `.${clsCell}`,
    'data-gjs-draggable': `.exp-ui-builder-droppable, .exp-container, .tab-content, .accordion-content, .exp-ui-builder-droppable-inner, .gjs-cell`,
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': 'Grid Row'
  };

  const colAttr: Record<string, any> = {
    class: `${clsCell} exp-grid`,
    'data-gjs-draggable': `.${clsRow} .exp-ui-builder-droppable, .exp-container, .tab-content, .accordion-content, .exp-ui-builder-droppable-inner, .gjs-cell`,
    'data-gjs-resizable': resizerRight,
    'data-gjs-name': 'Grid Cell'
  };

  if (flexGrid) {
    colAttr['data-gjs-unstylable'] = ['width'];
    colAttr['data-gjs-stylable-require'] = ['flex-basis'];
  }

  // Make row and column classes private
  const privateCls = [`.${clsRow}`, `.${clsCell}`, '.exp-grid'];
  editor.on(
    'selector:add',
    selector =>
      privateCls.indexOf(selector.getFullName()) >= 0 &&
      selector.set('private', 1)
  );

  editor.on('component:remove', (component) => {
    if(component.getName() === 'Grid Cell') {
      const parent = component.parent();
      if(parent && !parent.components().models.length) {
        parent.remove();
      }
    }
  });

  const attrsToString = (attrs: Record<string, any>) => {
    const result = [];

    for (const key in attrs) {
      let value = attrs[key];
      const toParse = value instanceof Array || value instanceof Object;
      value = toParse ? JSON.stringify(value) : value;
      result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`);
    }

    return result.length ? ` ${result.join(' ')}` : '';
  };

  const toAdd = (name: string) => blocks.indexOf(name) >= 0;
  const attrsRow = attrsToString(rowAttr);
  const attrsCell = attrsToString(colAttr);
  const commonBlockProps = {
    category,
    select: true,
  };

  toAdd('column1') &&
  bm.add('column1', {
    ...commonBlockProps,
    label: '<div class="custom-row-section column_1">1 Column</div>',
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
      </div>
      ${
      addBasicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''
    }`
  });

  toAdd('column2') &&
  bm.add('column2', {
    ...commonBlockProps,
    label: '<div class="custom-row-section columns_6_6">6/6 Columns</div>',
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${
      addBasicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''
    }`
  });

  toAdd('column3') &&
  bm.add('column3', {
    ...commonBlockProps,
    label: '<div class="custom-row-section columns_4_4_4">4/4/4 Columns</div>',
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${
      addBasicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''
    }`
  });

  toAdd('column4') &&
  bm.add('column4', {
    ...commonBlockProps,
    label: '<div class="custom-row-section columns_3_3_3_3">3/3/3/3 Columns</div>',
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${
      addBasicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''
    }`
  });

  toAdd('column8-4') &&
  bm.add('column8-4', {
    ...commonBlockProps,
    label: '<div class="custom-row-section columns_8_4">8/4 Columns</div>',
    content: `<div ${attrsRow}>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 66.66%;'></div>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 33.34%;'></div>
      </div>
      ${
      addBasicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm66}
          ${styleClm34}
        </style>`
        : ''
    }`
  });

  toAdd('column4-8') &&
  bm.add('column4-8', {
    ...commonBlockProps,
    label: '<div class="custom-row-section columns_4_8">4/8 Columns</div>',
    content: `<div ${attrsRow}>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 33.34%;'></div>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 66.66%;'></div>
      </div>
      ${
      addBasicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm34}
          ${styleClm66}
        </style>`
        : ''
    }`
  });

  toAdd('column10-2') &&
  bm.add('column10-2', {
    ...commonBlockProps,
    label: '<div class="custom-row-section columns_10_2">10/2 Columns</div>',
    content: `<div ${attrsRow}>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 83.33%;'></div>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 16.67%;'></div>
      </div>
      ${
      addBasicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm83}
          ${styleClm16}
        </style>`
        : ''
    }`
  });

  toAdd('column2-10') &&
  bm.add('column2-10', {
    ...commonBlockProps,
    label: '<div class="custom-row-section columns_2_10">2/10 Columns</div>',
    content: `<div ${attrsRow}>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 16.67%;'></div>
        <div ${attrsCell} style='${
      flexGrid ? 'flex-basis' : 'width'
    }: 83.33%;'></div>
      </div>
      ${
      addBasicStyle
        ? `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm16}
          ${styleClm83}
        </style>`
        : ''
    }`
  });
}
