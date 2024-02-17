import { AppKoaContext, Next, AppRouter } from 'types';

import { userService } from 'resources/user';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isProductInCart = await userService.exists({ 
    _id: ctx.state.user._id, 'cart.product._id': ctx.request.params.id, 
  });

  ctx.assertError(isProductInCart, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const productId = ctx.request.params.id;

  const userId = ctx.state.user._id;

  await userService.removeProductFromCart(userId, productId);

  const user = await userService.findOne({ _id: userId });
    
  ctx.body =  userService.getPublic(user);
}

export default (router: AppRouter) => {
  router.delete('/cart/:id', validator, handler);
};
