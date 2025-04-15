import { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

const ExpProductImageController = () => {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState<boolean>(false);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const settingsForSlids: EmblaOptionsType = {
    slidesToScroll: 1,
    active: true,
  };

  const settingsForThumbnail: EmblaOptionsType = {
    slidesToScroll: 1,
    active: true,
    containScroll: 'keepSnaps',
    dragFree: true,
  };

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(settingsForSlids);
  const [emblaThumbsRef, emblaThumbsApi] =
    useEmblaCarousel(settingsForThumbnail);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const handleWindowSizeChange = () => {
    setDeviceWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return {
    setIsImagePreviewOpen,
    isImagePreviewOpen,
    deviceWidth,
    scrollNext,
    scrollPrev,
    onThumbClick,
    emblaMainRef,
    emblaThumbsRef,
    selectedIndex,
    emblaMainApi,
  };
};

export default ExpProductImageController;
