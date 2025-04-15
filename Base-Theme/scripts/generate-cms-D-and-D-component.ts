import fssync, { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), '..');

const folderNameInput: string = process.argv[2] || 'myComponent';

const formatFolderName = (name: string): string => {
  return name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

const folderName: string = formatFolderName(folderNameInput);

const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
const words: string[] = folderName.split('-');
const capitalizedWords: string[] = words.map(capitalizeWord);
const folderNameCapitalized: string = 'Exp' + capitalizedWords.join('');

const ExpWidgetImage: string =
  'https://images.unsplash.com/photo-1726843738010-375af583fd40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D';

// CMS file structure
interface CMSFile {
  name: string;
  content: string;
}

// CMS files to be generated
const cmsFiles: CMSFile[] = [
  {
    name: 'index.ts',
    content: `import { lazy } from 'react';
const ${folderNameCapitalized} = lazy(() => import('./${folderName}'));
export { ${folderNameCapitalized} };
`,
  },
  {
    name: `${folderName}.tsx`,
    content: `import ${folderNameCapitalized}Controller from './${folderName}-controller';
import { ExpLoadingPlaceholder } from '../../common-components/loading-placeholder';
const ${folderNameCapitalized} = (props: any) => {
  const { componentDataDispatcher, contentModel } = ${folderNameCapitalized}Controller(props);
  const { componentData, isLoading } = componentDataDispatcher;
  return (
    <>
      <ExpLoadingPlaceholder
        loaderClassName=""
        contentModel={contentModel}
        isLoading={isLoading}
        componentData={componentData}
      />
      {componentData?.id && !isLoading && <div></div>}
    </>
  );
};
export default ${folderNameCapitalized};
`,
  },
  {
    name: `${folderName}-controller.ts`,
    content: `import { useEffect } from 'react';
import { getContentLibraryData } from '../../../utils/get-content-library-data';
import {
  expCommonDispatcherKeys,
  ExpComponentDataDispatcher,
} from '../../../utils/component-data-dispatcher';
import { CommonUtilities } from 'experro-storefront';
import { ContentModelDataInterface } from '../../../interfaces/content-model-data.interface';

const ${folderNameCapitalized}Controller = (props: any) => {
  const { id, contentModel, modelInternalName } = CommonUtilities.propsParser(props);
  const modelKeyForSSR = '${folderName}-ssr';
  const {
    componentDataDispatcher,
    setComponentDataDispatcher,
    isComponentLoaded,
  } = ExpComponentDataDispatcher({
    id,
    modelInternalName: modelInternalName,
    modelKeyForSSR: modelKeyForSSR,
  });
  let parsedContentModel: ContentModelDataInterface | undefined;
  if (contentModel?.trim().length) parsedContentModel = JSON.parse(contentModel);

  useEffect(() => {
    if (isComponentLoaded) {
      setComponentDataDispatcher({
        type: expCommonDispatcherKeys.fetchingData,
      });
      if (contentModel?.trim()?.length) {
        (async () => {
          setComponentDataDispatcher({
            type: expCommonDispatcherKeys.dataFetched,
            data: await getContentLibraryData(
              parsedContentModel,
              modelInternalName,
              modelKeyForSSR,
              id
            ),
          });
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentModel]);

  return { componentDataDispatcher, contentModel };
};
export default ${folderNameCapitalized}Controller;
`,
  },
];

const widgetFiles: CMSFile[] = [
  {
    name: `${folderName}.tsx`,
    content: `import { Widget } from 'experro-storefront';
import { modelInternalName } from '../../utils';
import ExpWidgetImage from '../../assets/images/category-grid-layout-new-thumbnail.png';
import { ${folderNameCapitalized} } from '../cms-library/${folderName}';
const initialValue = {
  contentModel: '',
  modelInternalName: '',
  traitConfig: [],
};
const ${folderNameCapitalized}Widget = Widget.createWidget({
  component: ${folderNameCapitalized},
  label: '<div class="gjs-fonts gjs-f-b1 custom-widget" style="background-image: url(${ExpWidgetImage});"></div><p class="m-b-0">${folderName}</p>',
  category: 'Theme Components',
  content: '<${folderNameCapitalized} data-cms-widget="true"/>',
  widgetName: '${folderNameCapitalized}',
  widgetProperties: {
    defaults: {
      name: '${folderName}',
      attributes: {
        component_content: JSON.stringify(initialValue),
      },
      activeOnRender: true,
      traits: [
        {
          type: 'experro-storefront',
          name: 'component_content',
        },
      ],
    },
  },
});
export default ${folderNameCapitalized}Widget;
`,
  },
];

const componentIndexPath: string = path.join(__dirname, 'src/components/index.ts');
const widgetIndexPath: string = path.join(__dirname, 'src/components/widgets/index.tsx');

const createFolderAndFiles = async (folderName: string): Promise<void> => {
  const cmsLibraryPath: string = path.join(__dirname, 'src', 'components', 'cms-library', folderName);
  const widgetsPath: string = path.join(__dirname, 'src', 'components', 'widgets');

  if (fssync.existsSync(cmsLibraryPath) && fssync.existsSync(path.join(widgetsPath, `${folderName}.tsx`))) {
    console.log(`The folder '${cmsLibraryPath}' and widget '${folderName}.tsx' already exist. No changes made.`);
    return;
  }

  const folders = [cmsLibraryPath, widgetsPath];
  await Promise.all(
    folders.map(async (dir: string) => {
      try {
        await fs.mkdir(dir, { recursive: true });
        console.log(`Folder '${dir}' created!`);
      } catch (err: any) {
        if (err.code !== 'EEXIST') {
          console.error(`Error creating folder '${dir}':`, err);
        } else {
          console.log(`Folder '${dir}' already exists.`);
        }
      }
    })
  );

  await Promise.all(
    cmsFiles.map(async (file: CMSFile) => {
      const filePath: string = path.join(cmsLibraryPath, file.name);
      if (!fssync.existsSync(filePath)) {
        await fs.writeFile(filePath, file.content, 'utf8');
        console.log(`File '${file.name}' created in CMS library!`);
      } else {
        console.log(`File '${file.name}' already exists in CMS library.`);
      }
    })
  );

  await Promise.all(
    widgetFiles.map(async (file: CMSFile) => {
      const filePath: string = path.join(widgetsPath, file.name);
      if (!fssync.existsSync(filePath)) {
        await fs.writeFile(filePath, file.content, 'utf8');
        console.log(`File '${file.name}' created in widgets!`);
      } else {
        console.log(`File '${file.name}' already exists in widgets.`);
      }
    })
  );

  await updateIndexFile(componentIndexPath, folderNameCapitalized, folderName, 'component');

  await updateIndexFile(widgetIndexPath, folderNameCapitalized, folderName, 'widget');
};

const updateIndexFile = async (
  filePath: string,
  folderNameCapitalized: string,
  folderName: string,
  type: 'component' | 'widget'
): Promise<void> => {
  if (!fssync.existsSync(filePath)) {
    console.log(`${path.basename(filePath)} does not exist. Creating new file.`);
    await fs.writeFile(filePath, '', 'utf8');
  }

  const content: string = await fs.readFile(filePath, 'utf8');
  const lines: string[] = content.split('\n');

  const importStatement: string =
    type === 'component'
      ? `import { ${folderNameCapitalized} } from './cms-library/${folderName}';`
      : `import ${folderNameCapitalized}Widget from './${folderName}';`;

  if (!lines.includes(importStatement)) {
    lines.splice(1, 0, importStatement);

    if (type === 'component') {
      const componentsLineIndex: number = lines.findIndex((line) =>
        line.trim().startsWith('const components =')
      );
      if (componentsLineIndex !== -1) {
        const parts: string[] = lines[componentsLineIndex].split('{');
        parts[1] = ` ${folderNameCapitalized}, ${parts[1].trim()}`;
        lines[componentsLineIndex] = parts.join('{');
      } else {
        lines.push(`const components = { ${folderNameCapitalized}, };`);
      }
    } else {
            // Check if `const widgets = [];` already exists
      const widgetsDeclarationExists: boolean = lines.some((line) => line.trim() === 'const widgets = [];');

      if (!widgetsDeclarationExists) {
        // If `const widgets = [];` does not exist, insert it after the imports
        const importLineIndex: number = lines.findIndex((line) => line.trim().startsWith('import'));
        lines.splice(importLineIndex + 1, 0, `const widgets = [];`);
      }

      // Find the first export statement
      const exportLineIndex: number = lines.findIndex((line) => line.trim().startsWith('export'));

      // Insert `widgets.push(${folderNameCapitalized}Widget);` before the first export
      lines.splice(exportLineIndex, 0, `widgets.push(${folderNameCapitalized}Widget);`);
    }

    const updatedContent: string = lines.join('\n');
    await fs.writeFile(filePath, updatedContent, 'utf8');

    console.log(`File '${path.basename(filePath)}' updated with new import and ${type}!`);
  } else {
    console.log(`${folderNameCapitalized} already exists in ${path.basename(filePath)}`);
  }
};

createFolderAndFiles(folderName).catch(console.error);