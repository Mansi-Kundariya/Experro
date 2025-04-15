import { CommonUtilities } from 'experro-storefront';
import ExpLinkParser from '../../../utils/link-parser';
import { ExpImage } from '../../common-components/exp-image';
import { expWidgetConstants } from '../../../utils';

export interface ExpImageProps {
  id: string;
  component_content: any;
  image_alignment: string;
  image_object_fit: string;
  image_redirect_link: string;
  loadImageLazy?: string;
  preLoadImage?: string;
  img_obj_position?: string;
}

/**
 * Renders an Image component.
 * @param props - The Image component props.
 * @returns The rendered Image component.
 */
const ExpImageComponent = (props: ExpImageProps) => {
  const {
    id,
    component_content,
    image_object_fit,
    image_redirect_link,
    img_obj_position,
    loadImageLazy = expWidgetConstants.WIDGET_CHECK_TRUE,
    preLoadImage,
  } = CommonUtilities.propsParser(props);
  
  const image_data = JSON.parse(component_content);
  const getImageHeight = () => {
    try {
      return parseInt(image_data?.imageData?.image_height);
    } catch {
      return image_data?.imageData?.image_height;
    }
  };

  const ExpLinkWrapper = (children: any) => {
    if (image_redirect_link?.length) {
      return <ExpLinkParser to={image_redirect_link}>{children}</ExpLinkParser>;
    }
    return children;
  };
  return (
    <>
      {ExpLinkWrapper(
        <ExpImage
          src={image_data?.imageData}
          height={image_data?.imageData?.image_height}
          width={image_data?.imageData?.image_width}
          alt={`${
            image_data?.imageData?.altText?.length
              ? image_data?.imageData?.altText
              : ``
          }`}
          name={`Exp Image ${id}`}
          title={`${
            image_data?.imageData?.caption?.length
              ? image_data?.imageData?.caption
              : ``
          }`}
          style={
            image_data?.imageData?.image_height?.length
              ? { height: getImageHeight(), 'object-fit': image_object_fit, 'object-position': img_obj_position}
              : { 'object-fit': image_object_fit, 'object-position': img_obj_position }
          }
          lazyLoad={loadImageLazy === expWidgetConstants.WIDGET_CHECK_TRUE}
          preLoad={preLoadImage === expWidgetConstants.WIDGET_CHECK_TRUE}
        />
      )}
    </>
  );
};

export default ExpImageComponent;
