import { defineConfig, loadEnv } from 'vite';
import { dependencies } from './package.json';
import react from '@vitejs/plugin-react';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite'

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (['experro-storefront'].includes(key)) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    chunks[key] = [key];
  });
  return chunks;
}

const getPreloadFiles = (isApp: boolean) => {
  const filesToPreload = [
    {
      entryMatch: /Poppins-Bold*[a-zA-Z0-9]*\.woff2$/,
      attributes: {
        'type': 'font/woff2',
        'as': 'font',
        'crossorigin': 'anonymous'
      }
    },
    {
      entryMatch: /Poppins-Medium*[a-zA-Z0-9]*\.woff2$/,
      attributes: {
        'type': 'font/woff2',
        'as': 'font',
        'crossorigin': 'anonymous'
      }
    },
    {
      entryMatch: /Poppins-Regular*[a-zA-Z0-9]*\.woff2$/,
      attributes: {
        'type': 'font/woff2',
        'as': 'font',
        'crossorigin': 'anonymous'
      }
    }
  ]
  if(isApp) {
    filesToPreload.push({
      entryMatch: /index.*\.css$/,
      attributes: {
        'as': 'style',
        'type': 'text/css',
        'crossorigin': 'anonymous'
      }
    })
  }
  return filesToPreload;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isApp = (env.REACT_APP_BUILD_TARGET === 'app');
  return {
    define: {
      'process.env': env,
    },
    base: env.PUBLIC_URL,
    preview: {
      port: 3000,
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
      },
    },
    resolve: {
      alias: {
        'experro-storefront-builder-css': '/node_modules/experro-storefront/build/css',
        'experro-storefront': (isApp) ? '/node_modules/experro-storefront/build/app-main-index.js' : '/node_modules/experro-storefront/build/ui-builder-main-index.js',
        '@fonts': '/src/assets/fonts/',
        '@images': '/src/assets/images/',
        '@icons': '/src/assets/icons/',
        '@scss': '/src/assets/scss/',
      }
    },
    server: {
      fs: {
        strict: false
      },
      port: 3000,
      proxy: {
        '^.*/api|apis|analytics-service|content/v1/|/mm-images/.*': {
          target: 'http://localhost:5050',
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      minify: "terser",
      sourcemap: false,
      assetsDir: 'static',
      outDir: 'build',
      commonjsOptions: { transformMixedEsModules: false },
      rollupOptions: {
        output:{
          assetFileNames: (assetInfo) => {
            if(assetInfo.name?.endsWith('.css')) {
              if(assetInfo.name === 'index.css') {
                return `index.[hash][extname]`
              } else {
                return `[name][hash].chunk[extname]`
              }
            }
            return `[name][hash][extname]`
          },
          manualChunks: {
            vendor: ['experro-storefront'],
            main: Object.keys(renderChunks(dependencies)),
          },
        }
      }
    },
    plugins: [
      react({
        include: "**/*.tsx",
      }),
      UnpluginInjectPreload({
        injectTo: 'custom',
        files: getPreloadFiles(isApp),
      }),
      {
        name: 'modulepreload',
        transformIndexHtml(html, { bundle }) {
          const files = Object.keys(bundle || {});
          const viewportMetaTag = '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />';
          const preloadLinks = getPreloadFiles(isApp)
            ?.map(({ attributes, entryMatch }: any) => {
              const matchedFile = files.find((file) => entryMatch.test(file));
              if (matchedFile) {
                const fontPath = `/${matchedFile}`;
                return `<link rel="preload" href="${fontPath}" as="${attributes?.as}" type="${attributes?.type}" crossorigin="${attributes?.crossorigin}" />`;
              }
              return null;
            })
            .filter(Boolean)
            .join('\n');
          return html.replace(viewportMetaTag, `${viewportMetaTag}\n${preloadLinks}`);
        },
      },
    ]
  }
});
