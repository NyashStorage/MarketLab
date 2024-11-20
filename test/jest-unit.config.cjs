// eslint-disable-next-line @typescript-eslint/no-require-imports
const base = require('./jest-base.config.cjs');

base.testRegex = '\\.spec\\.ts$';

module.exports = base;
