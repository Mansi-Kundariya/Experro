/* eslint-disable */
import getTemplates from '../src/templates/template-list';
import fs from 'fs';

const templateList: any = getTemplates({});
const templates: any = [];

for (const channelId in templateList) {
  if (channelId === 'default') {
    for (const defaultTemplate in templateList['default']) {
      const item = templateList['default'][defaultTemplate];
      const transformedItem: any = {
        displayName: item.displayName,
        channelId: 'default',
        templateValue: defaultTemplate,
      };
      if (item.contentModel) {
        transformedItem.contentModel = item.contentModel;
      }
      templates.push(transformedItem);
    }
  } else {
    for (const language in templateList[channelId]) {
      for (const templateValue in templateList[channelId][language]) {
        const item = templateList[channelId][language][templateValue];
        const transformedItem: any = {
          displayName: item.displayName,
          channelId: channelId,
          templateValue: templateValue,
          language: language === 'default' ? 'default' : language,
        };
        if (item.contentModel) {
          transformedItem.contentModel = item.contentModel;
        }
        templates.push(transformedItem);
      }
    }
  }
}
// .tmp/templates.json
const templatesData = JSON.stringify(templates, null, 2); // The third argument (2) is for pretty printing with 2 spaces indentation
if (!fs.existsSync('.tmp')) {
  fs.mkdirSync('.tmp');
}
const filePath = '.tmp/templates.txt';
fs.writeFile(filePath, templatesData, (err: any) => {
  if (err) {
    console.error('Error writing Template JSON file:', err);
  } else {
    console.log('JSON Template file created successfully!');
  }
});
// console.log(templates);
