import { CommonUtilities } from './common';

interface DomainUrls {
  language: string;
  url: string;
}
export function expLocalizedChannelTags(channelUrls: DomainUrls[]) {
  if (!channelUrls) {
    return;
  }
  const defaultLanguage = CommonUtilities.getDefaultLanguage();

  // Remove all existing language localized link tags.
  document
    .querySelectorAll('link[data-lang="experro-lang"]')
    ?.forEach((element) => {
      element.remove();
    });

  try {
    const currentChannelUrl = channelUrls?.find((item) => {
      return item.language === defaultLanguage;
    });

    channelUrls.forEach((channelUrl) => {
      if (channelUrl?.language && channelUrl?.url) {
        handleLocalizedLinkTags(channelUrl);
      }
    });

    // Add default Workpace language localized link tag.
    if (currentChannelUrl) handleLocalizedLinkTags(currentChannelUrl, true);
  } catch (e) {
    console.error(
      'Something went wrong while handling language tags, at expLocalizedChannelTags'
    );
  }
}

/**
 * @param channelUrl
 * @param isDefault
 * This function is responsible for handling Link tags for language(Domin) wise tags.
 */

function handleLocalizedLinkTags(channelUrl, isDefault = false) {
  const channel_link = document.createElement('link');
  channel_link.setAttribute('rel', 'alternate');
  channel_link.setAttribute(
    'hreflang',
    isDefault ? 'x-default' : channelUrl.language
  );
  channel_link.setAttribute('href', `https://${channelUrl.url}`);
  channel_link.setAttribute('data-lang', 'experro-lang');
  document.head.appendChild(channel_link);
}
