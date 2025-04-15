const expDataSourceConstants = {
  CONTENT_LIBRARY: 'contentLibrary',
  FREE_FORM: 'freeForm',
};

const expConfigOperators = {
  OR: 'OR',
  AND: 'AND',
};

const expWidgetConstants = {
  WIDGET_CHECK_TRUE: 'on',
  WIDGET_CHECK_FALSE: 'off',
};

const expBasicTraitConstants = {
  CHECKBOX: 'checkbox',
  COLOR_PICKER: 'color-picker',
  HTML_INPUT: 'rich-text-editor',
  IMAGE: 'image-selector',
  NUMBER: 'number',
  SELECT: 'select',
  TEXT: 'text',
  TEXT_AREA: 'text-area',
};

const expCustomTraitConstants = {
  BANNER_WITH_IMAGE: 'banner-with-image',
  TITLE_SECTION_LAYOUT_2: 'title-section-layout-2',
  BLOG_CARD: 'blog-card',
  CONTENT_LIBRARY: 'contentLibrary',
  CTA_BANNER: 'cta-banner-demo-theme',
  EXP_CTA_BANNER: 'exp-cta-banner',
  HERO_BANNER: 'hero-banner',
  LANDING_BANNER: 'landing-banner',
  PRODUCT_CARD_WIT_TITLE_IMAGE: 'product-card-with-title-image',
  SMALL_TWO_COL_BANNER: 'small-two-col-banner',
  TITLE_SECTION: 'title-section',
  TWO_COL_INFO_LAYOUT_1: 'two-col-info-layout-1',
  PRODUCT_CARD: 'product-card',
  ZIG_ZAG_LAYOUT: 'zig-zag-banner',
  RECOMMENDATION_WIDGET: 'exp-recommendation-widget',
  PRODUCT_CARD_WITH_TABS: 'product-card-with-tabs',
};

const expRocmmendationConstansts = {
  BEST_SELLER: 'best_seller',
};

const expContentAlignmentOptions = [
  { name: 'Left', value: 'justify-start' },
  { name: 'Center', value: 'justify-center' },
  { name: 'Right', value: 'justify-end' },
];

const expTextAlignmentOptions = [
  { name: 'Left', value: 'text-left' },
  { name: 'Center', value: 'text-center' },
  { name: 'Right', value: 'text-right' },
];

const expHeaderFontOptions = [
  { name: '18px', value: 'text-lg' },
  { name: '20px', value: 'text-xl' },
  { name: '24px', value: 'text-2xl' },
  { name: '32px', value: 'text-3xl' },
  { name: '40px', value: 'text-4xl' },
  { name: '48px', value: 'text-5xl' },
  { name: '56px', value: 'text-6xl' },
  { name: '64px', value: 'text-7xl' },
]
const expHeaderOptions = [
  { name: 'Heading 1', value: 'text-7xl' },
  { name: 'Heading 2', value: 'text-6xl' },
  { name: 'Heading 3', value: 'text-5xl' },
  { name: 'Heading 4', value: 'text-4xl' },
  { name: 'Heading 5', value: 'text-3xl' },
  { name: 'Heading 6', value: 'text-lg' },
];

const expHeadingTagOptions = [
  { name: 'H1', value: 'h1' },
  { name: 'H2', value: 'h2' },
  { name: 'H3', value: 'h3' },
  { name: 'H4', value: 'h4' },
  { name: 'H5', value: 'h5' },
  { name: 'H6', value: 'h6' },
];

const expDescriptionOptions = [
  { name: 'Font Size 14', value: 'font-s-14' },
  { name: 'Font Size 16', value: 'font-s-16' },
  { name: 'Font Size 18', value: 'font-s-18' },
  { name: 'Font Size 20', value: 'font-s-20' },
  { name: 'Font Size 24', value: 'font-s-24' },
];

const expCustomTrait = {
  DATA_SOURCE: 'exp_dataSourceDropDown',
  CONTENT_MODEL_POP_UP: 'exp_contentModalPopUp',
  TEXT: 'exp_text',
  DROPDOWN: 'exp_dropDown',
  COLOR_PICKER: 'exp_colorPicker',
  CHECKBOX: 'exp_checkbox',
  IMAGE: 'exp_image',
  TEXT_AREA: 'exp_textArea',
};

export {
  expDataSourceConstants,
  expWidgetConstants,
  expBasicTraitConstants,
  expCustomTraitConstants,
  expContentAlignmentOptions,
  expTextAlignmentOptions,
  expHeaderOptions,
  expCustomTrait,
  expDescriptionOptions,
  expRocmmendationConstansts,
  expConfigOperators,
  expHeadingTagOptions,
  expHeaderFontOptions
};
