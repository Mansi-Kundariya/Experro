import Header from './header';
import Footer from './footer';
import ECommerceComponents from './e-commerce';
import CommonComponents from './common-components';
import { ExpAccordionBlock } from './cms-library/accordion-block';
import { ExpHeroCarousel } from './cms-library/hero-carousel';
import { ExpImageComponent } from './cms-library/image';
import { ExpLink } from './cms-library/link';
import { ExpBrandLogoGrid } from './cms-library/logo-grid-component';
import { ExpText } from './cms-library/text';
import { ExpTitleSection } from './cms-library/title-section';
import { ExpSeparator } from './cms-library/separator';
import { ExpButton } from './cms-library/button';
import { ExpHeadingSection } from './cms-library/heading-section';
import { ExpUSPBanner } from './cms-library/usp-banner';
import { ExpZigZagBanner } from './cms-library/zig-zag-banner';
import { ExpCTABanner1 } from './cms-library/cta-banner';
import { ExpCTABanner2 } from './cms-library/cta-banner';
import { ExpProductCardWIthTabs } from './e-commerce/product-card-with-tabs';
import {
  ExpFiveColGridBanner,
  ExpTwoColGridBanner,
} from './cms-library/grid-banner';

import { ExpProductCard } from './e-commerce/product-card';
import { ExpBlogCard } from './cms-library/blog-card';
import {
  ExpRecommendationCard,
  ExpFrequentlyViewedTogether,
  ExpPickUpWhereYouLeftOff,
  ExpRecommendedForYou,
  ExpRecentlyViewed,
  ExpRecentlyPurchased,
  ExpFrequentlyBoughtTogether,
  ExpBestSeller,
  ExpPopularItems,
  ExpQueryBased,
  ExpHotNewReleases,
  ExpInspiredByYourBrowsingHistory,
  ExpSimilarProducts,
} from './e-commerce/recommendation-card';
import { ExpFormBuilder } from './common-components/form-builder';
import { ExpVideo } from './cms-library/video';

const components = {
  Footer,
  Header,
  ExpHeroCarousel,
  ExpText,
  ExpCTABanner1,
  ExpCTABanner2,
  ExpTitleSection,
  ExpHeadingSection,
  ExpSeparator,
  ExpButton,
  ExpImageComponent,
  ExpLink,
  ExpFiveColGridBanner,
  ExpTwoColGridBanner,
  ExpAccordionBlock,
  ExpUSPBanner,
  ExpProductCard,
  ExpBrandLogoGrid,
  ExpZigZagBanner,
  ExpBlogCard,
  ExpRecommendationCard,
  ExpFrequentlyViewedTogether,
  ExpPickUpWhereYouLeftOff,
  ExpRecommendedForYou,
  ExpRecentlyViewed,
  ExpRecentlyPurchased,
  ExpFrequentlyBoughtTogether,
  ExpBestSeller,
  ExpPopularItems,
  ExpQueryBased,
  ExpHotNewReleases,
  ExpInspiredByYourBrowsingHistory,
  ExpSimilarProducts,
  ExpProductCardWIthTabs,
  ExpFormBuilder,
  ExpVideo,

  ...CommonComponents,
  ...ECommerceComponents,
};
export default components;
