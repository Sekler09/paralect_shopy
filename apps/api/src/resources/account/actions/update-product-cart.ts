import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { productService } from 'resources/product';

const schema = z.object({
  productId: z.string(),
  quantity: z.number().positive(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;

  const isProductExists = await productService.exists({ _id: productId });

  ctx.assertError(isProductExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    productId,
    quantity,
  } = ctx.validatedData;

  const userId = ctx.state.user._id;

  const product = await productService.findOne({ _id: productId });

  if (product) { 
    await userService.updateProductInCart(userId, product, quantity);
  }

  const user = await userService.findOne({ _id: userId });
    
  ctx.body =  userService.getPublic(user);
}

export default (router: AppRouter) => {
  router.post('/cart', validateMiddleware(schema), validator, handler);
};
