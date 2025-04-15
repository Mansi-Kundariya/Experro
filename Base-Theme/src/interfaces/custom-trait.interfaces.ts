import { FC } from 'react';

export interface content_library {
  contentModel: string;
  modelInternalName: string;
}
export interface title_section {
  titleText?: string;
  descriptionText?: string;
  dataSource: string;
  contentModel: string;
  modelInternalName: string;
  iconLink?: 'https://storage.googleapis.com/experro/media-manager/82728aa5-e967-41b9-82aa-ab5611f5e6bd/9097fbe7-768f-4033-9852-651665a00a25';
}
export interface cta_banner {
  headingText?: any;
  subHeadingText?: any;
  buttonText?: any;
  buttonLink?: any;
  contentModel: any;
  dataSource: any;
  modelInternalName: any;
  tagLine?: any;
}
export interface hero_banner {
  headingText?: string;
  subHeadingText?: string;
  contentModel: string;
  dataSource: string;
  modelInternalName: string;
  imageLink?: string;
}
export interface landing_banner {
  contentModel: string;
  dataSource: string;
  modelInternalName: string;
  imageLink?: string;
}
export interface product_card {
  contentModel: any;
  dataSource: any;
  modelInternalName: any;
  displayAs?: any;
  limit: any;
  description?: any;
  imageData?: any;
  sourceKey?: any;
  sourceValue?: any;
  bannerType?: any;
  image_heading?: any;
}
export interface small_two_col_banner {
  contentModel: string;
  modelInternalName: string;
  backgroundImage: string;
}
export interface zig_zag_layout {
  titleText?: any;
  descriptionText?: any;
  primaryButtonText?: any;
  primaryButtonLink?: any;
  secondaryButtonText?: any;
  secondryButtonLink?: any;
  headingText?: any;
  subHeadingText?: any;
  tagLine?: any;
  videoLink?: any;
  dataSource: any;
  contentModel: any;
  modelInternalName: any;
}

// TRAIT MODAL INTERFACE

interface checkbox {
  type: 'checkbox';
  label: string;
  name: string;
  valueTrue: string;
  valueFalse: string;
}

interface colorPicker {
  type: 'color-picker';
  lable: string;
  name: string;
}

interface select {
  type: 'select';
  lable: string;
  name: string;
  options: Array<{ name: string; value: string }>;
}

interface customTrait {
  type: string;
  name: string;
}

interface widgetDefaultProperties {
  name: string;
  attributes: {};
  activeOnRender: boolean;
  traits: Array<checkbox | colorPicker | select | customTrait>;
}
export interface WIDGET {
  component: FC;
  lable: string;
  content: string;
  widgetProperties: { defaults: widgetDefaultProperties };
}
