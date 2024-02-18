import { routeUtil } from 'utils';

import get from './actions/get';
import signUp from './actions/sign-up';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import getProducts from './actions/get-products';
import updateProductCart from './actions/update-product-cart';
import removeProductCart from './actions/remove-product-cart';
import proceedCheckout from './actions/proceed-checkout';
import getPurchases from './actions/get-purchases';

const publicRoutes = routeUtil.getRoutes([
  signUp,
  signIn,
  signOut,
]);

const privateRoutes = routeUtil.getRoutes([
  get,
  getProducts,
  updateProductCart,
  removeProductCart,
  proceedCheckout,
  getPurchases,
]);

const adminRoutes = routeUtil.getRoutes([
  getProducts,
  updateProductCart,
  removeProductCart,
  proceedCheckout,
  getPurchases,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
