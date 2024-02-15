import { routeUtil } from 'utils';

import create from './actions/create';
import uploadPhoto from './actions/upload-photo';
import remove from './actions/remove';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  create,
  uploadPhoto,
  remove,
]);

const adminRoutes = routeUtil.getRoutes([
  create,
  uploadPhoto,
  remove,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
