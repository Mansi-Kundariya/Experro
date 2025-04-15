import { CommonUtilities } from './common';

/**
 * @param pageData
 * @param event
 * @returns
 */
export function handleLanguageChange(
  pageData: any,
  event: any,
  domain_urls: any
) {
  const languageDetails = event.detail.language;
  /**
   * We are adding the search parameters to the new redirection URL when updating the domain.
   */
  const searchParams: string = event?.detail?.retainSearchParams
    ? event?.detail?.retainSearchParams
    : '';
  const domainToMatch =
    languageDetails?.custom_domain || languageDetails?.channel_url;
  const domainUrlFromPageData = domain_urls?.find(
    (url: any) =>
      url.language === languageDetails?.language &&
      url.url?.startsWith(domainToMatch)
  );
  const currentChannelInfo = CommonUtilities.getChannelsInfo()?.find(
    (channel: any) =>
      channel.language === languageDetails?.language &&
      channel.channel_id === languageDetails?.channel_id
  );
  let redirection_mapping_urls = localStorage.getItem(
    `${pageData?.provider_id_esi}`
  );

  /**
   * Here we are handling 'redirection' from 'redirection mapping' content model.
   * Which localStorage data were set from the theme side.
   */
  if (redirection_mapping_urls?.length) {
    try {
      redirection_mapping_urls = JSON.parse(redirection_mapping_urls);
      if (redirection_mapping_urls[currentChannelInfo?.language]) {
        let redirection_url: any = 'https://';
        /**
         * we are replacing the '/' from the domain we are getting if there, e.g. 'ca-dev1.serv1testbtg.com/' and the 'slug' we are getting that will be also starts with '/'.
         */
        if (currentChannelInfo?.custom_domain) {
          if (currentChannelInfo?.custom_domain?.endsWith('/')) {
            redirection_url += currentChannelInfo?.custom_domain.slice(0, -1);
          } else {
            redirection_url += currentChannelInfo?.custom_domain;
          }
        } else if (currentChannelInfo?.channel_url) {
          if (currentChannelInfo?.channel_url?.endsWith('/')) {
            redirection_url += currentChannelInfo?.channel_url.slice(0, -1);
          } else {
            redirection_url += currentChannelInfo?.channel_url;
          }
        }

        if (redirection_url) {
          redirection_url +=
            redirection_mapping_urls[currentChannelInfo?.language];
          window.location.href = redirection_url;
          return;
        }
      }
    } catch {
      console.error('Something went wrong, at handleLanguageChange');
    }
  }

  /**
   * If there were not match found for 'redirection mapping' then default redirection will work
   */
  if (domainUrlFromPageData) {
    window.location.href = `https://${domainUrlFromPageData.url}${searchParams}`;
  } else if (currentChannelInfo?.custom_domain) {
    window.location.href = `https://${currentChannelInfo?.custom_domain}${searchParams}`;
  } else if (currentChannelInfo?.channel_url) {
    window.location.href = `https://${currentChannelInfo?.channel_url}${searchParams}`;
  }
}
