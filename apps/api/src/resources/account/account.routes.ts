import { routeUtil } from 'utils';

import get from './actions/get';
import update from './actions/update';
import uploadAvatar from './actions/upload-avatar';
import removeAvatar from './actions/remove-avatar';
import signUp from './actions/sign-up';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import verifyEmail from './actions/verify-email';
import forgotPassword from './actions/forgot-password';
import resetPassword from './actions/reset-password';
import verifyResetToken from './actions/verify-reset-token';
import resendEmail from './actions/resend-email';
import shadowLogin from './actions/shadow-login';
import google from './actions/google';
import getProducts from './actions/get-products';
import updateProductCart from './actions/update-product-cart';
import removeProductCart from './actions/remove-product-cart';
import proceedCheckout from './actions/proceed-checkout';
import getPurchases from './actions/get-purchases';

const publicRoutes = routeUtil.getRoutes([
  signUp,
  signIn,
  signOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  resendEmail,
  google,
]);

const privateRoutes = routeUtil.getRoutes([
  get,
  update,
  uploadAvatar,
  removeAvatar,
  getProducts,
  updateProductCart,
  removeProductCart,
  proceedCheckout,
  getPurchases,
]);

const adminRoutes = routeUtil.getRoutes([
  shadowLogin,
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
