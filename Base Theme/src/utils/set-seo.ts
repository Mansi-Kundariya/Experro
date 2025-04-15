/**
 * This function will be used to set the SEO.
 * */
declare let window: any;
export function prepareCanonicalURL(url: any, originalHost: any) {
  return url
    .replace(window.location.hostname, originalHost)
    .replace(':3000', '')
    .replace(
      /\/_ssr_|\?&amp;___i_s_S_S_R___=1|\?&___i_s_S_S_R___=1|&amp;___i_s_S_S_R___=1|&___i_s_S_S_R___=1/g,
      ''
    )
    ?.split('?')?.[0];
}
