import { useCallback, useEffect, useState } from 'react';
import { CommonUtilities, ContentService } from 'experro-storefront';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { expWidgetConstants } from '../../../utils';

interface ExpBlogControllerProps {
  contentModel: string;
  modelInternalName: string;
  blog_data: string;
  is_autoplay: string;
  autoplay_speed: string;
}

const ExpBlogCardController = (props: ExpBlogControllerProps) => {
  const {
    contentModel,
    modelInternalName,
    blog_data,
    is_autoplay,
    autoplay_speed,
  } = CommonUtilities.propsParser(props);
  const [postData, setPostData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const settingsForSlids: EmblaOptionsType = {
    active: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
    loop: true,
  };
  const { WIDGET_CHECK_TRUE } = expWidgetConstants;

  const SettingForAutoPlay: any = {
    playOnInit: CommonUtilities.isRenderingOnServer()
      ? false
      : is_autoplay === WIDGET_CHECK_TRUE,
    delay: parseInt(autoplay_speed) || 5000,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(settingsForSlids, [
    Autoplay(SettingForAutoPlay),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const getFilterString = () => {
    let filterString: string = '';
    if (blog_data?.category_ids.length) {
      filterString = `categories_exp_rel:("${blog_data?.category_ids
        .split(',')
        .join('" OR "')}")`;
    } else if (blog_data?.author_ids.length) {
      filterString = `author_exp_rel:("${blog_data?.author_ids
        .split(',')
        .join('" OR "')}")`;
    } else if (blog_data?.posts.length) {
      filterString = `content_model_data_id:("${blog_data?.posts
        .split(',')
        .join('","')}")`;
    }
    return filterString;
  };
  const getAPIObject = () => {
    let apiObj: any = {
      modelInternalName: 'posts',
      fieldsToQuery: '*',
      relationField: 'categories_exp_rel,author_exp_rel', // need to give the relation field name to get the data, e.g. here we want to get relation data for categories so need to pass it
      relationFieldDataToQuery: 'page_slug,title',
      sortBy: 'modified_at',
      orderBy: 'asc',
      contentDataSortBy: 'modified_at',
      skip: '0',
      limit: blog_data?.limit ? blog_data?.limit : 4,
    };

    //if set as a featured is ticked then only need to add this
    if (blog_data?.show_featured_blogs) {
      apiObj = {
        ...apiObj,
        fieldKey: 'set_as_a_featured_ebi',
        fieldValue: 'true',
      };
    } else {
      apiObj = { ...apiObj, fieldKey: 'id', fieldValue: '*' };
    }

    // Add filter if any of the value is selected [author, category or posts]
    if (
      blog_data?.author_ids?.length ||
      blog_data?.category_ids?.length ||
      blog_data?.posts?.length
    ) {
      apiObj = { ...apiObj, filter: `${getFilterString()}` };
    }

    return apiObj;
  };
  const getPostData = async () => {
    try {
      const postData =
        await ContentService.searchContentModelRecordsByFieldKeyValueGET(
          getAPIObject()
        );

      if (postData?.Status === 'success') {
        setPostData(postData?.Data?.items);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (blog_data?.limit) {
      setPostData([]);
      setIsLoading(true);
      getPostData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    blog_data?.limit,
    blog_data?.author_ids,
    blog_data?.category_ids,
    blog_data?.posts,
    blog_data?.show_featured_blogs,
  ]);

  return {
    postData,
    isLoading,
    contentModel,
    modelInternalName,
    title: blog_data?.title,
    emblaRef,
    scrollNext,
    scrollPrev,
  };
};
export default ExpBlogCardController;
