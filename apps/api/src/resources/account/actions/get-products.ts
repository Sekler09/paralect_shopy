import { AppKoaContext, AppRouter } from 'types';

import { productService } from 'resources/product';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const products = await productService.find( { $and : [{ createdBy : user._id }] });

  ctx.body = {
    items: products.results,
    count: products.count,
  };
}

export default (router: AppRouter) => {
  router.get('/products', handler);
};
