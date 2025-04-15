import { useRef, useState, CSSProperties, MouseEventHandler } from 'react';
import ExpImage from '../components/common-components/exp-image/exp-image';

interface ExpImageLensProps {
  height?: string | number;
  width?: string | number;
  imageUrl: string;
  className?: string;
  transitionTime?: number;
  zoomScale?: number;
  style?: CSSProperties;
  altText: string;
  index: number;
  customeFields: any;
}

/**
 * A React component that displays an image with a magnifying effect on hover.
 *
 * @param height - The height of the magnifier container.
 * @param width - The width of the magnifier container.
 * @param imageUrl - The URL of the image to be displayed in the magnifier.
 * @param className - Additional CSS class names for the magnifier container.
 * @param transitionTime - The transition time in seconds for the zoom effect.
 * @param zoomScale - The scale factor to apply when zooming the image.
 * @param style - Additional inline styles for the magnifier container.
 * @param altText - The alternative text for the image.
 *
 * @returns {JSX.Element} The ExpImageLens component.
 */

const ExpImageLens = (props: ExpImageLensProps) => {
  const {
    className = 'product-image-magnifier-block',
    zoomScale = 2,
    height = '100%',
    width = '100%',
    style = {},
    imageUrl,
    transitionTime = 0.4,
    altText = '',
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<boolean>(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);

  const handleMouseMovement: MouseEventHandler<HTMLDivElement> = (e) => {
    if (ref.current) {
      const { left: offsetLeft, top: offsetTop } =
        ref.current.getBoundingClientRect();
      const x =
        ((e.pageX - offsetLeft - window.scrollX) / ref.current.offsetWidth) *
        100;
      const y =
        ((e.pageY - offsetTop - window.scrollY) / ref.current.offsetHeight) *
        100;
      setMouseX(x);
      setMouseY(y);
    }
  };

  const transform: CSSProperties = {
    transformOrigin: `${mouseX}% ${mouseY}%`,
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className={className}
      style={{
        ...style,
        height,
        width,
        overflow: 'hidden',
        cursor: zoom ? 'zoom-out' : 'zoom-in',
      }}
      onMouseMove={handleMouseMovement}
      onMouseLeave={() => {
        setZoom(false);
      }}
      onClick={() => {
        setZoom(!zoom);
      }}
      ref={ref}
      aria-label={altText}>
      <ExpImage
        src={imageUrl}
        style={{
          ...transform,
          transition: `transform ${transitionTime}s ease-out`,
          transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
          width: '100%',
          height: '100%',
          objectFit: 'contain', // To fit the image within the container
        }}
        height={598}
        options={[
          {
            width: 598,
            aspect_ratio: '1:1',
          },
          {
            width: 496,
            aspect_ratio: '1:1',
          },
          {
            width: 450,
            aspect_ratio: '1:1',
            crop_gravity: 'center',
          },
          {
            width: 450,
            aspect_ratio: '1:1',
            crop_gravity: 'center',
          },
          {
            width: 388,
            aspect_ratio: '1:1',
            crop_gravity: 'center',
          },
        ]}
        width={598}
        alt={altText}
        name={''}
        title={''}
      />
    </div>
  );
};

export default ExpImageLens;
