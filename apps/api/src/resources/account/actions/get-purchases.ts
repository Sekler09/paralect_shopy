import { AppKoaContext, AppRouter } from 'types';

import { purchaseService } from 'resources/purchase';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const purchases = await purchaseService.find( { userId: user._id });

  ctx.body = {
    items: purchases.results,
  };
}

export default (router: AppRouter) => {
  router.get('/purchases', handler);
};
