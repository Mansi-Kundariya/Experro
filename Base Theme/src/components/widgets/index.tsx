import HeroCarouselWidget from './hero-carousel';
// import ExpAccordionBlockWidget from './accordion-block';
import ExpBrandLogoGridWidget from './brand-logo';

// CTA Banners
import ExpCtaBannerLayout1Widget from './cta-banner/cta-layout-1';
import ExpCTALayout2Widget from './cta-banner/cta-layout-2';

// Zig-Zag-Banner
import ExpZigZagBannerWidget from './zig-zag-layouts/zig-zag-banner';


// USP Banners
import ExpUSPLayout1Widget from './usp-layouts/usp-layout-1';

// Product Set
import ExpProductCardWidget from './product-card';
import ExpImageWidget from './image';
import ExpSeparatorWidget from './separator';
import ExpHeadingWidget from './heading-section';

//Recommendation Widget
import {
  ExpBestSellerWidget,
  ExpFrequentlyBoughtTogetherWidget,
  ExpFrequentlyViewedTogetherWidget,
  ExpHotNewReleasesWidget,
  ExpInspiredByYourBrowsingHistoryWidget,
  ExpPickUpWhereYouLeftOffWidget,
  ExpPopularItemsWidget,
  ExpQueryBasedWidget,
  ExpRecentlyPurchasedWidget,
  ExpRecentlyViewedWidget,
  ExpRecommendedForYouWidget,
  ExpSimilarProductsWidget,
} from './recommendation-card';

import ExpFormBuilderWidget from './form-builder/form-builder';
import ExpVideoWidget from './video';
import ExpBlogWidget from './blog-card';

const widgets = [];

widgets.push(ExpImageWidget);
widgets.push(HeroCarouselWidget);
// widgets.push(ExpAccordionBlockWidget);
widgets.push(ExpBrandLogoGridWidget);
widgets.push(ExpBlogWidget);

widgets.push(ExpSeparatorWidget);
widgets.push(ExpHeadingWidget);

// Product-Set
widgets.push(ExpProductCardWidget);

// CTA Banners
widgets.push(ExpCtaBannerLayout1Widget);
widgets.push(ExpCTALayout2Widget);

// Zig-Zag-Banner
widgets.push(ExpZigZagBannerWidget);

// USP Banners
widgets.push(ExpUSPLayout1Widget);

// Recommendation Widgets
widgets.push(ExpBestSellerWidget);
widgets.push(ExpFrequentlyBoughtTogetherWidget);
widgets.push(ExpFrequentlyViewedTogetherWidget);
widgets.push(ExpHotNewReleasesWidget);
widgets.push(ExpInspiredByYourBrowsingHistoryWidget);
widgets.push(ExpPickUpWhereYouLeftOffWidget);
widgets.push(ExpPopularItemsWidget);
widgets.push(ExpQueryBasedWidget);
widgets.push(ExpRecentlyPurchasedWidget);
widgets.push(ExpRecentlyViewedWidget);
widgets.push(ExpRecommendedForYouWidget);
widgets.push(ExpSimilarProductsWidget);
widgets.push(ExpFormBuilderWidget);
widgets.push(ExpVideoWidget);

export default { widgets };
