/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chokidar = require('chokidar');

const cwd = path.resolve(__dirname, '..');

console.log('Watching for changes...');
chokidar.watch(path.join(cwd, 'src')).on('change', async () => {
  try {
    console.log('🔄  Rebuilding...');
    execSync('npm run build', {stdio: 'inherit'});
    console.log('Rebuilt done');
  } catch (error) {
    console.error(error);
  }
});
