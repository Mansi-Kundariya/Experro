import { lazy } from 'react';

const ExpTwoColGridBanner = lazy(() => import('./two-col-grid-banner'));
const ExpFiveColGridBanner = lazy(() => import('./five-col-grid-banner'));

export { ExpTwoColGridBanner, ExpFiveColGridBanner };
