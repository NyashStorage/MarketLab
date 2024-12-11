import base from './jest-base.config.mjs';

base['testRegex'] = '\\.e2e-spec\\.ts$';
base['setupFilesAfterEnv'] = ['<rootDir>/jest-e2e.setup.ts'];

export default base;
