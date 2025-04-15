import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';
import React, { Suspense } from 'react';
import {AppInit} from '../../interfaces/app-init';
import {Page, PencilBanner} from '../../components';
import { Toaster } from 'react-hot-toast';
import { RedirectPageRouter } from '../../components/page';
import { Header } from '../../components';
import { Footer } from '../../components';

const Routes = ({templates, components, routes, headerComponent, footerComponent,pencilBannerComponent}: AppInit) => {
  const cmsRoutes = routes.map(({ path, element }, key) => <Route path={path} element={element} key={key} />);
  const cmsRoutesSsr = routes.map(({ path, element }, key) => <Route path={'/_ssr_' + path} element={element} key={key}/>);
  return (
    <>
      <div suppressHydrationWarning>
      <Toaster/>
      </div>
      <Router>
        <div className={'header-main'}>
          {
            pencilBannerComponent && <PencilBanner pencilBanner={pencilBannerComponent}/>
          }
          <Header headerComponent={headerComponent}></Header>
        </div>
        {
          pencilBannerComponent && <div id="header-placeholder" className="header-sticky-placeholder" />
        }
        <main className='_exp_page_main_container_ main_page_body' id={"_exp_page_main_container_"} suppressHydrationWarning>
          <Switch>
            {cmsRoutes}
            {cmsRoutesSsr}
            <Route path="/">
              <Route index={false} key={Date.now()} path=":pageslug"
                element={<RedirectPageRouter templates={templates} components={components}/>}/>
              <Route index={false} key={Date.now()} path=":pageslug/:pageslug1"
                element={<RedirectPageRouter templates={templates} components={components}/>}/>
              <Route index={false} key={Date.now()} path=":pageslug/:pageslug1/:pageslug2"
                element={<RedirectPageRouter templates={templates} components={components}/>}/>
              <Route index={false} key={Date.now()} path=":pageslug/:pageslug1/:pageslug2/:pageslug3"
                element={<RedirectPageRouter templates={templates} components={components}/>}/>
              <Route index={false} key={Date.now()} path=":pageslug/:pageslug1/:pageslug2/:pageslug3/:pageslug4"
                element={<RedirectPageRouter templates={templates} components={components}/>}/>
              <Route index={false} key={Date.now()}
                     path=":pageslug/:pageslug1/:pageslug2/:pageslug3/:pageslug4/:pageslug5"
                element={<RedirectPageRouter templates={templates} components={components}/>}/>
              <Route index={true} key={'homepage'} element={<Page templates={templates} components={components} />}/>
            </Route>
          </Switch>
        </main>
        <Footer footerComponent={footerComponent}></Footer>
      </Router>
    </>

  );
}

export { Routes };
