import { CONFIGURATION } from '../../config/configuration.js';

export function isDevelopmentMode(): boolean {
  return CONFIGURATION.NODE_ENV === 'development';
}
