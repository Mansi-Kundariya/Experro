import '../globals';
import React from 'react';
import { createRoot } from 'react-dom/client'
import { AppUiBuilder } from './ui-builder';

import { AppInit } from '../interfaces/app-init';

function App({ templates, widgets, components, singleDataModelsToPrefetch, routes, headerComponent, footerComponent, pencilBannerComponent, handleI18 }: AppInit) {
  const rootElement = document.getElementById('root') as HTMLElement;
  if (!rootElement) return;

  const elementToRender = (
      <AppUiBuilder
        templates={templates}
        widgets={widgets}
        components={components}
        routes={routes}
        singleDataModelsToPrefetch={singleDataModelsToPrefetch}
        headerComponent={headerComponent}
        footerComponent={footerComponent}
        pencilBannerComponent={pencilBannerComponent}
        handleI18={handleI18}
      />
  );

  const root = createRoot(rootElement);
  root.render(elementToRender);
}

export { App };
