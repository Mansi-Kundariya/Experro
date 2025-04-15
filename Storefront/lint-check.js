/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('os');

const platform = os.platform();

let osName;

switch (platform) {
  case 'darwin':
    osName = 'macOS';
    break;
  case 'win32':
    osName = 'Windows';
    break;
  case 'linux':
    osName = 'Linux';
    break;
  default:
    osName = 'Unknown';
}

console.log(`Operating System: ${osName}`);

try {
  console.log('Running lint check...');
  execSync('eslint . --fix', { stdio: 'inherit' });
  if(osName === 'linux') {
  execSync(
    'eslint --fix --rule \'no-console: ["error", { allow: ["warn", "error"] }]\'',
    { stdio: 'inherit' }
  )}
  else if(osName === 'Windows'){
    execSync(
        'eslint --fix --rule "no-console: ["error", { allow: ["warn", "error"] }]"',
        { stdio: 'inherit' }
      );
  }
  console.log('Lint check passed.');
} catch (error) {
  console.error(
    `Lint check failed. Please fix the linting issues before committing.${error.message}`
  );
  process.exit(1);
}
