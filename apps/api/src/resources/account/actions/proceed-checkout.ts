import config from 'config';
import { stripeService } from 'services';
import { AppKoaContext, Next, AppRouter } from 'types';

async function validator(ctx: AppKoaContext, next: Next) {

  const isCartNotEmpty = ctx.state.user.cart.length > 0;

  ctx.assertError(isCartNotEmpty, 'Cart is empty');

  await next();
}

async function handler(ctx: AppKoaContext) {
 

  const cart = ctx.state.user.cart;

  const session = await stripeService.checkout.sessions.create({
    success_url: `${config.WEB_URL}/payment-succeed`,
    cancel_url: `${config.WEB_URL}/payment-failed`,
    mode: 'payment',
    line_items: cart.map(({ product, quantity }) => ({
      price_data: {
        currency: 'USD',
        product_data: {
          name: product.title,
          images: [product.imgUrl],
        },
        unit_amount: product.price * 100,
      },
      quantity,
    })),
    metadata: {
      userId: ctx.state.user._id,
    },
  });
    
  ctx.body = { url: session.url };
}

export default (router: AppRouter) => {
  router.post('/cart/checkout', validator, handler);
};
