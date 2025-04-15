/* eslint-disable */
const pkg = require('../package.json');
const result = process.versions;
(function () {
  if (pkg.engines.node !== result.node) {
    console.log(
      '\x1b[41m\x1b[37m%s\x1b[0m',
      `This module is incompatible with the current Node version. Expected ${pkg.engines.node}. Got ${result.node}.`
    );
    process.exit(1);
  }
})();
