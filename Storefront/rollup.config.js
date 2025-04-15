import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";

const isProductionEnv = (process.env.NODE_ENV === 'production');

const buildDirPath = 'build';

const plugins =  [
  peerDepsExternal(),
  resolve({
    browser: true
  }),
  commonjs(),
  typescript({ useTsconfigDeclarationDir: true }),
  postcss({
    extract: 'css/index.css'
  }),
]

if (isProductionEnv) {
  plugins.push(terser());
}

const copyAssets = copy({
  targets: [
    { src: 'src/assets/images/**/*', dest: `${buildDirPath}/images` },
    { src: 'src/assets/fonts/**/*', dest: `${buildDirPath}/fonts` },
    { src: 'build-index.js', dest: 'build', rename: 'index.js' }
  ]
});
plugins.push(copyAssets);

export default {
  input: ["src/app-main-index.ts", "src/ui-builder-main-index.ts"],
  output: [
    {
      dir: buildDirPath,
      format: "es",
      sourcemap: !isProductionEnv
    }
  ],
  preserveModules: false, // Important if we want to code split
  plugins,
}
