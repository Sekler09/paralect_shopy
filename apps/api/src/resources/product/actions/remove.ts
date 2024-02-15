import { AppKoaContext, AppRouter, Next } from 'types';

import { productService } from 'resources/product';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const userId = ctx.state.user._id;
  const productId = ctx.request.params.id;

  const isProductExists = await productService.exists({ _id: productId, createdBy: userId });

  ctx.assertError(isProductExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  await productService.deleteOne({ _id: ctx.request.params.id });

  ctx.body = {};
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
