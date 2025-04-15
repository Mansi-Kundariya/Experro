import { useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { expWidgetConstants, getContentLibraryData } from '../../../utils';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils';
import { CommonUtilities } from 'experro-storefront';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  DotButton,
  useDotButton,
} from '../../../utils/embla-carousel-pagination-button';
import { useCallback } from 'react';

interface ExpHeroCarouselControllerProps {
  isAutoPlay?: string | boolean;
  isShowSubHeading?: string;
  isShowHeading?: string;
  headingTextPosition?: string;
  headingSize?: string;
  subHeadingSize?: string;
  id?: string;
  autoPlayTime?: string;
  paginationPosition?: string;
}

/**
 * Controller function for the HeroCarousel component.
 * @param props - The controller props.
 * @returns The controller result.
 */
const ExpHeroCarouselController = (props: ExpHeroCarouselControllerProps) => {
  const { isAutoPlay, autoPlayTime, id, contentModel, modelInternalName } =
    CommonUtilities.propsParser(props);

  const { WIDGET_CHECK_TRUE } = expWidgetConstants;

  const settingsForSlids: EmblaOptionsType = {
    active: true,
    loop: true,
    slidesToScroll: 1,
  };

  const SettingForAutoPlay: any = {
    playOnInit: CommonUtilities.isRenderingOnServer()
      ? false
      : isAutoPlay === WIDGET_CHECK_TRUE,
    delay: parseInt(autoPlayTime) || 1000,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(settingsForSlids, [
    Autoplay(SettingForAutoPlay),
  ]);

  const modelKeyForSSR = 'hero-ssr';
  let parsedContentModel: any;

  const {
    setComponentDataDispatcher,
    componentDataDispatcher,
    isComponentLoaded,
  } = ExpComponentDataDispatcher({
    id,
    modelInternalName: modelInternalName,
    modelKeyForSSR: modelKeyForSSR,
  });
  if (contentModel?.trim().length) {
    parsedContentModel = JSON.parse(contentModel);
  }

  useEffect(() => {
    if (isComponentLoaded) {
      setComponentDataDispatcher({
        type: expCommonDispatcherKeys.fetchingData,
      });
      if (contentModel?.trim()?.length) {
        (async () => {
          setComponentDataDispatcher({
            type: expCommonDispatcherKeys.dataFetched,
            data: await getContentLibraryData(
              parsedContentModel,
              modelInternalName,
              modelKeyForSSR,
              id
            ),
          });
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentModel]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return {
    componentDataDispatcher,
    contentModel,
    selectedIndex,
    scrollSnaps,
    DotButton,
    emblaRef,
    onDotButtonClick,
    scrollNext,
    scrollPrev,
  };
};

export default ExpHeroCarouselController;
