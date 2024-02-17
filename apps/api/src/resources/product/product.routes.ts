import { routeUtil } from 'utils';

import create from './actions/create';
import uploadPhoto from './actions/upload-photo';
import remove from './actions/remove';
import list from './actions/list';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  create,
  uploadPhoto,
  remove,
  list,
]);

const adminRoutes = routeUtil.getRoutes([
  create,
  uploadPhoto,
  remove,
  list,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
