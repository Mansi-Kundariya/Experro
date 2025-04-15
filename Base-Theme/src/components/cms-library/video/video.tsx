import { CommonUtilities, IsCMSApp } from 'experro-storefront';
import video from '@images/video-placeholder.svg';

export interface ExpVideoProps {
  id: string;
  component_content: string;
  provider?: string;
  videoid?: string;
  source?: string;
  poster?: string;
  autoplay?: string;
  loop?: string;
  related?: string;
  modest?: string;
  height?: string;
  width?: string;
  videoPostition?: string;
  wrapIn?: string;
  controls?: string;
  playsinline?: string;
}

const ExpVideo: React.FC<any> = (props: ExpVideoProps) => {
  const {
    provider,
    videoid,
    source,
    poster,
    autoplay,
    controls,
    loop,
    related,
    modest,
    width,
    height,
    videoPostition,
    wrapIn,
    playsinline,
  } = CommonUtilities.propsParser(props);

  /*this function is responsible to give urls for video */
  const getUrls = () => {
    if (
      (provider === 'youtube' || provider === 'youtube-no-cookie') &&
      videoid
    ) {
      const autoplayParam = autoplay === 'on' ? '&autoplay=1&mute=1' : '';
      const loopParam = loop === 'on' ? `&loop=1&playlist=${videoid}` : '';
      const controlsParam = controls === 'on' ? '&controls=1' : '&controls=0';

      const relatedParam = related === 'on' ? '&rel=1' : '&rel=0';
      const modestParam =
        modest === 'on' ? '&modestbranding=1' : '&modestbranding=0';
      const baseUrl =
        provider === 'youtube'
          ? 'https://www.youtube.com/embed/'
          : 'https://www.youtube-nocookie.com/embed/';
      return {
        videoUrl: `${baseUrl}${videoid}?${autoplayParam}${loopParam}${controlsParam}${relatedParam}${modestParam}`,
        posterUrl: '',
      };
    } else if (provider === 'vimeo' && videoid) {
      const videoId = videoid;
      const autoplayParam = autoplay === 'on' ? 'autoplay=1' : '';
      const loopParam = loop === 'on' ? 'loop=1' : '';
      const controlsParam = controls === 'on' ? 'controls=1' : '';
      return {
        videoUrl: `https://player.vimeo.com/video/${videoId}?${autoplayParam}&${loopParam}&${controlsParam}`,
        posterUrl: '',
      };
    } else if (provider === 'html5-source' && source && poster) {
      return {
        videoUrl: `${source}`,
        posterUrl: poster,
      };
    } else {
      return {
        videoUrl: '',
        posterUrl: '',
      };
    }
  };

  const { videoUrl, posterUrl } = getUrls();

  return (
    <>
      {provider ? (
        <>
          {provider === 'youtube' ||
          provider === 'youtube-no-cookie' ||
          (provider === 'vimeo' && videoUrl) ? (
            <div
              className={`${
                wrapIn ? wrapIn : 'container'
              } w-full flex items-center  flex-wrap ${
                videoPostition ? videoPostition : 'justify-center'
              }`}>
              <iframe
                src={videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                width={width ? width : '600px'}
                height={height ? height : '400px'}
                title="Video Player"></iframe>
            </div>
          ) : provider === 'html5-source' && videoUrl && posterUrl ? (
            <div
              className={`${
                wrapIn ? wrapIn : 'container'
              } w-full flex items-center  flex-wrap ${
                videoPostition ? videoPostition : 'justify-center'
              }`}
              dangerouslySetInnerHTML={{
                __html: `<video
                      ${loop === 'on' ? 'loop' : ''}
                      ${autoplay === 'on' ? 'autoPlay' : ''}
                      ${controls === 'on' ? 'controls' : ''}
                      ${posterUrl ? `poster=${posterUrl}` : ''}
                      muted
                      style="${width ? `width:${width}` : 'width:600px'}; ${
                  height ? `height:${height}` : 'height:400px'
                }"
                      value=${videoUrl}
                      ${playsinline === 'on' ? 'playsinline' : ''}
                      className="object-cover">
                      <source src=${videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>`,
              }}
            />
          ) : !IsCMSApp ? (
            <>
              <picture className="bg-gray-50 py-7 px-2 m-[4px] flex justify-center items-center">
                <img src={video} alt="" title="" height="82px" width="160px" />
              </picture>
            </>
          ) : (
            <></>
          )}
        </>
      ) : !IsCMSApp ? (
        <>
          
            <picture className="bg-gray-50 py-7 px-2 m-[4px] flex justify-center items-center">
              <img src={video} alt="" title="" height="82px" width="160px" />
            </picture>
          
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExpVideo;
