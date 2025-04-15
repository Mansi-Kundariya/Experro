import templates from './templates';
import getTemplates from './template-list';
import Page404 from './404';

const templateList: any = getTemplates(templates);
templateList['__404_page__'] = {component: Page404};
export default templateList;
