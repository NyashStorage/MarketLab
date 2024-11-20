// eslint-disable-next-line @typescript-eslint/no-require-imports
const base = require('./jest-base.config.cjs');

base.testRegex = '\\.e2e-spec\\.ts$';
base.setupFilesAfterEnv = ['<rootDir>/jest-e2e.setup.ts'];

module.exports = base;
