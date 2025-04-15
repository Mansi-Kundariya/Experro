import { lazy } from 'react';

const ExpCTABanner1 = lazy(() => import('./cta-banner-v1'));
const ExpCTABanner2 = lazy(() => import('./cta-banner-v2'));

export { ExpCTABanner1, ExpCTABanner2 };
