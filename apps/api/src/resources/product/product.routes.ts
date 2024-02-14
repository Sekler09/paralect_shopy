import { routeUtil } from 'utils';

import create from './actions/create';
import uploadPhoto from './actions/upload-photo';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  create,
  uploadPhoto,
]);

const adminRoutes = routeUtil.getRoutes([
  create,
  uploadPhoto,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
