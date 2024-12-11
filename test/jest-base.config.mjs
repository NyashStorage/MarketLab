import fs from 'fs';

const swcConfig = JSON.parse(
  fs.readFileSync(`${import.meta.dirname}/../configs/prod/.swcrc`, 'utf-8'),
);

/** @type {import('jest').Config} */
export default {
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
