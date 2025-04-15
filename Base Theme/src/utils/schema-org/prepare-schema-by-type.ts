import { CommonUtilities } from 'experro-storefront';
import { removeHtmlTags } from '..';
import { prepareCanonicalURL } from '../set-seo';
import { ExpImageParser } from '../image-parser';

const originalHost: any = CommonUtilities.getHostname();
/**
 * The class is responsible for generating schema data based on the 'type,' with each function receiving the necessary data to create the corresponding schema object.
 * NOTE: To support theme customization, theme developers need to update the 'priceCurrency' logic where applicable.
 *      If the theme requires specific handling for the "Product" variant schema, they will also need to modify the logic for 'prepareProductSchema'.
 *
 * This forms the basic integration of schema addition within a theme.
 */
export class ExpPrepareSchema {
  static prepareProductSchema(data: any) {
    const product_schema: any = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: data?.name_eti || data?.name_esi,
      image: (
        data?.images_ej?.[0]?.url_zoom || data?.images_ej?.[0]?.url_thumbnail
      )?.replace(
        'https://cdn11.bigcommerce.com',
        'https://product-images.experro.app'
      ),
      sku: data?.sku_esi,
      id: data?.provider_id_esi,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: data.price_efi,
        availability: 'https://schema.org/InStock',
        url: prepareCanonicalURL(window.location.pathname, originalHost),
      },
    };
    if (data?.description_eti) {
      product_schema['description'] = removeHtmlTags(data?.description_eti);
    }
    return JSON.stringify(product_schema);
  }

  static prepareCategorySchema(data: any) {
    const category_schema: any = {
      '@context': 'https://schema.org/',
      '@type': 'CollectionPage',
      name: data?.category_data?.name_esi || data?.category_data?.name_eti,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: data?.products.map((product: any) => ({
          '@type': 'Product',
          name: product?.name_eti || product?.name_esi,
          image: product?.images_ej?.[0]?.url_zoom,
          sku: product?.sku_esi,
          url: prepareCanonicalURL(`${product?.page_slug_esi}`, originalHost),
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: product?.price_efi,
            availability: 'https://schema.org/InStock',
          },
        })),
      },
    };
    return JSON.stringify(category_schema);
  }

  static prepareSearchSchema(data: any) {
    const search_schema = {
      '@context': 'https://schema.org/',
      '@type': 'SearchResultsPage',
      name: `Search Results for '${data?.query}'`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: data?.products.map((product: any) => ({
          '@type': 'Product',
          name: product?.name_eti || product?.name_esi,
          image: (
            product?.images_ej?.[0]?.url_zoom ||
            product?.images_ej?.[0]?.url_thumbnail
          )?.replace(
            'https://cdn11.bigcommerce.com',
            'https://product-images.experro.app'
          ),
          sku: product?.sku_esi,
          url: prepareCanonicalURL(`${product?.page_slug_esi}`, originalHost),
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: product?.price_efi,
            availability: 'https://schema.org/InStock',
          }
        })),
      },
    };
    return JSON.stringify(search_schema);
  }

  static prepareBlogSchema(data: any) {
    const blog_schema = {
      '@context': 'https://schema.org/',
      '@type': 'BlogPosting',
      headline:
        data?.blog_data?.page_title_esi || data?.blog_data?.page_title_eti,
      author: {
        '@type': 'Person',
        name:
          data?.author_details?.page_title_esi ||
          data?.author_details?.page_title_eti,
      },
      datePublished: data?.blog_data?.publish_date_edsi,
      image: ExpImageParser(data?.blog_data?.thumbnail_image_media_emd)?.imageUrl,
      articleBody: data?.blog_data?.summary_et,
    };
    return JSON.stringify(blog_schema);
  }

  static prepareFAQSchema(data: any) {
    const filterDescription = (description: string) => {
      const div = document.createElement('div');
      div.innerHTML = description;
      return div.textContent || div.innerText || '';
    };

    const faq_schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data?.map((item: any) => ({
        '@type': 'Question',
        name: item?.faq_heading_et,
        acceptedAnswer: {
          '@type': 'Answer',
          text: filterDescription(item?.faq_description_et),
        },
      })),
    };

    return JSON.stringify(faq_schema);
  }
}
