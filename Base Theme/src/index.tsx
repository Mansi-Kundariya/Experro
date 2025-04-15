if (process.env.REACT_APP_BUILD_TARGET === 'app-ui-builder') {
    import ('experro-storefront-builder-css/index.css');
}
import './index.scss';
import { App } from 'experro-storefront';
import templates from './templates';
import WidgetConfig from './components/widgets';
import components from './components';
import Routes from './routes';
import { handleI18 } from './utils';

App({
    templates,
    widgets: WidgetConfig.widgets,
    components,
    singleDataModelsToPrefetch: ['header'],
    routes: Routes,
    headerComponent: components.Header,
    footerComponent: components.Footer,
    handleI18: handleI18,
});
