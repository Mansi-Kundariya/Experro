import { ContentService } from "../services";
import { CommonUtilities } from "./common";

declare const window: any;

function prepareCanonicalURL(url, originalHost) {
    return url.replace(window.location.hostname, originalHost)
      .replace(/\/_ssr_|\?&amp;___i_s_S_S_R___=1|\?&___i_s_S_S_R___=1|&amp;___i_s_S_S_R___=1|&___i_s_S_S_R___=1/g, '')?.split('?')?.[0]?.replace(/#!$|#$/, '');
}

function setMetaTag(attribute, content, attributeValue) {
    const selector = `meta[${attribute}="${attributeValue}"]`;
    let metaTag = document.querySelector(selector);
    if (!content) {
      if (metaTag) {
        metaTag.remove();
      }
      return;
    }
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute(attribute, attributeValue);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content.replace(/"/g, '\\"'));
}

/**
 * Sets the `og:image` meta tag for social sharing.
 * - On product and category pages: Uses the product thumbnail image or category image as the `og:image`.
 * - On other pages: Retrieves the `og:image` value from the SEO component configured in the admin panel.
 */

export function setSEOOgImage(ogImage: string, page: any) {
  try {
    const originalHost = CommonUtilities.getHostname();

    // Use the product's thumbnail image or the first image (0th position) as the `og:image`.
    if (
      page?.content_model_internal_name &&
      page?.content_model_internal_name?.startsWith('ecommerce_product')
    ) {
      if (process.env.REACT_APP_STORE?.toLowerCase() === 'shopify') {
        const ogPDPImage =
          page?.images_ej?.[0]?.url || page?.images_ej?.[0]?.src || '';
        if (ogPDPImage) {
          setMetaTag('property', ogPDPImage, 'og:image');
        }
      } else {

        const ogPDPImage = page?.images_ej?.find(
          (image: any) => image?.is_thumbnail === true
        );
        if (ogPDPImage) {
          setMetaTag(
            'property',
            ogPDPImage?.url_zoom?.replace(
              'https://cdn11.bigcommerce.com',
              'https://product-images.experro.app'
            ),
            'og:image'
          );
        }
      }

    // Use the category's image as the `og:image`.
    } else if (
      page?.content_model_internal_name &&
      page?.content_model_internal_name?.startsWith('ecommerce_category')
    ) {
      if (process.env.REACT_APP_STORE?.toLowerCase() === 'shopify') {
        if (page?.image_es) {
          setMetaTag(
            'property',
            page?.image_es,
            'og:image'
          );
        }
      } else {
        if (page?.image_es) {
          setMetaTag(
            'property',
            page?.image_es?.replace(
              'https://cdn11.bigcommerce.com',
              'https://product-images.experro.app'
            ),
            'og:image'
          );
        }
      }
    } else {
      if (ogImage) {
        setMetaTag(
          'property',
          `https://${originalHost}${ContentService.prepareImageUrl({
            imagePath: ogImage,
            fileType: 'png',
          })}`,
          'og:image'
        );
      } else {
        setMetaTag('property', '', 'og:image');
      }
    }
  } catch (err) {
    console.log('err in set ogimage', err);
  }
}

export function setSEODetails(page) {
    try {
      const seoData = page.seo?.[0] || page.post_seo?.[0];
      const originalHost = CommonUtilities.getHostname();
      const robots = [];

      const pageTitle = seoData?.title_tag_et || page?.title;
      // $('head title').text(page?.meta_title_esi || pageTitle);
      document.querySelector('head title').textContent = page && page.meta_title_esi ? page.meta_title_esi : pageTitle;

      const pageDescription = seoData?.meta_description_et || page?.meta_description_es || page?.meta_description_et || '';
      const pageKeywords = seoData?.meta_keywords_et || page?.meta_keywords_eta?.join(',') || '';
      const ogType = seoData?.meta_type_et || page.content_model_internal_name?.startsWith('ecommerce_product') ? 'product' :
        page.content_model_internal_name?.startsWith('ecommerce_category') ? 'category' : 'page';
      const ogTitle = seoData?.og_title_et || pageTitle;
      const ogDescription = seoData?.og_description_et || pageDescription;
      const ogImage = seoData?.og_image_emd || '';
      const siteName = page.globalSettings?.site?.[0]?.site_name_et || '';
      const globalSettingsData = page.globalSettings?.site?.[0];
      const canonicalURL = seoData?.canonical_url_et || prepareCanonicalURL(window.location.href, originalHost);
      // Additional settings for appending style from global settings
      if (globalSettingsData?.custom_style_style_etl && !window['custom_style_added_globalsettings']) {
        // $('head').append(globalSettingsData.custom_style_style_etl);
        document.querySelector('head').insertAdjacentHTML('beforeend', globalSettingsData.custom_style_style_etl);

        // $('head').append(`<script>window['custom_style_added_globalsettings'] = true;</script>`);
        const scriptTag = document.createElement('script');
          scriptTag.textContent = "window['custom_style_added_globalsettings'] = true;";
          document.querySelector('head').appendChild(scriptTag);
      }
      if (seoData?.meta_robots_follow_es) robots.push(seoData.meta_robots_follow_es);
      if (seoData?.meta_robots_index_es) robots.push(seoData.meta_robots_index_es);
      const canonicalElement = document.getElementById('_canonical');
      if (!canonicalElement) {
        const newCanonical = document.createElement('link');
        newCanonical.id = '_canonical';
        newCanonical.rel = 'canonical';
        newCanonical.href = canonicalURL;
        document.head.appendChild(newCanonical);
      } else {
        // @ts-ignore
        canonicalElement.href = canonicalURL;
      }

      setMetaTag('name', pageDescription, 'description');
      setMetaTag('name', pageKeywords, 'keywords');
      setMetaTag('property', ogType, 'og:type');
      setMetaTag('property', ogTitle, 'og:title');
      setMetaTag('property', ogDescription, 'og:description');      
      setSEOOgImage(ogImage,page);
      setMetaTag('property', CommonUtilities.getLanguage(), 'og:locale');
      setMetaTag('property', siteName, 'og:site_name');

      if (!CommonUtilities.isExperroHost()) {
        setMetaTag('name', robots.join(','), 'robots');
      }
    } catch (e) {
      console.error('error from setSEODetails', e);
    }
  }
