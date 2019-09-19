'use strict';

import {
  platform,
  arch
} from 'os';

export default () => {
  let platform_name = 'unknown'
  let extension = ''
  switch (platform()) {
    case 'aix':
    case 'freebsd':
    case 'linux':
    case 'openbsd':
    case 'android':
      platform_name = 'linux';
      break;
    case 'darwin':
    case 'sunos':
      platform_name = 'mac';
      break;
    case 'win32':
      platform_name = 'win';
      extension = '.exe'
      break;
  }
  return {
    name: platform_name,
    arch: arch(),
    extension
  }
};