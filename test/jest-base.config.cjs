// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

const swcConfig = JSON.parse(
  fs.readFileSync(`${__dirname}/../configs/prod/.swcrc`, 'utf-8'),
);

/** @type {import('jest').Config} */
module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json'],

  testEnvironment: 'node',
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '^.+\\.(t|j)s$': ['@swc/jest', { ...swcConfig }],
  },

  moduleNameMapper: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '^(.+)/src/(.+)$': '$1/dist/$2',
  },

  globalSetup: '<rootDir>/jest-base.global-setup.ts',
};
