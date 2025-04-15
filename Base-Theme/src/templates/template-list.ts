// prettier-ignore
const getTemplates = (templates: any) => {
  const experroTemplateMap = {
    'default' : {
      'Default': {
        component: templates['CmsPage'],
        displayName: 'Default',
        contentModel: 'web_pages',
        isDefault: true,
      },
      'Home': {
        component: templates['HomePage'],
        displayName: 'Home',
      },
      'Category': {
        component: templates['CategoryPage'],
        displayName: 'Category',
        contentModel: 'ecommerce_category',
      },
      'Brand': {
        component: templates['BrandPage'],
        displayName: 'Brand',
        contentModel: 'ecommerce_brand',
      },
      'Product': {
        component: templates['ProductDetailPage'],
        displayName: 'Product Detail',
        contentModel: 'ecommerce_product',
      },
      'Contact': {
        component: templates['ContactPage'],
        displayName: 'Contact Us',
      },
      'Blog-Page': {
        component: templates['BlogPage'],
        displayName: 'Blog Page',
        contentModel: 'categories',
      },
      'Blog-Detail': {
        component: templates['BlogDetail'],
        displayName: 'Blog Detail',
        contentModel: 'posts',
      },
    }
  };

  return experroTemplateMap;
};

export default getTemplates;
