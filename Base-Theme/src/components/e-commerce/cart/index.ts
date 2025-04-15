import { lazy } from 'react';

import ExpCartPreview from './cart-preview';
const ExpCartPage = lazy(() => import('./cart-page'));
const ExpCartLineItem = lazy(() => import('./cart-line-item'));

const ExpCartComponents = [ExpCartPreview, ExpCartPage, ExpCartLineItem];

export { ExpCartComponents, ExpCartPage };