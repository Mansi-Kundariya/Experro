export interface CustomImageRenderer {
  imageData?: any;
  dataSource?: string;
  contentLibraryImageData?: any;
  sizes: any[];
  imageHeight?: any;
  height?: string | number | undefined;
  width?: string | number | undefined;
  fallbackImage?: any;
  loading?: string;
  imageTypeArr?: string[];
  imageType?: 'avif' | 'webp' | 'png' | 'jpg';
}

export interface CustomImage {
  imageData?: any;
  properties?: any[];
  dataSource?: string;
  sizes: string[];
  isNotLazy?: any;
  height?: string | number | undefined;
  width?: string | number | undefined;
  imageHeight?: any;
  fallbackImage?: any;
  loading?: string;
  imageTypeArr?: string[];
  imageType?: 'avif' | 'webp' | 'png' | 'jpg';
}

export interface ReactModal {
  modalData: any;
  isOpenState: any;
  isOpen: any;
}

export interface ExpLoadingPlaceholderProps {
  contentModel: string;
  isLoading: boolean;
  componentData: any;
  loaderClassName?: string;
}

export interface ChildElementWrapper {
  condition: boolean;
  wrapper: any;
  children?: any;
}

export interface LinkParser {
  children?: any;
  to?: string | undefined;
  target?: '_self' | '_blank' | '_top' | '_parent' | string | undefined;
  dangerouslySetInnerHTML?: { __html: any };
  className?: string | undefined;
  title?: string | undefined;
  ariaLabel?: string | undefined;
  rel?: any;
  onClick?: any;
  style?: any;
  id?: string | undefined;
}

export interface ImageLens {
  imageUrl: string;
  altText?: string;
}
