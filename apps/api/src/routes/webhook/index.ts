import { stripeService } from 'services';
import { AppKoaContext, AppRouter } from 'types';
import config from 'config';
import { userService } from 'resources/user';
import purchaseService from 'resources/purchase/purchase.service';

const webhookRouter = new AppRouter();

webhookRouter.post('/webhook', async (ctx: AppKoaContext) => {
  const { request, response } = ctx;
  const sig = ctx.req.headers['stripe-signature'];

  if (!sig) {
    ctx.status = 400;
    response.message = 'Webhook Error';
    return;
  }
  const event = stripeService.webhooks.constructEvent(request.rawBody, sig, config.STRIPE_WH_ENDPOINT_KEY);

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntentSucceeded = event.data.object;
    const session = await stripeService.checkout.sessions.list({ payment_intent: paymentIntentSucceeded.id });
    const userId = session.data[0].metadata?.userId as string;

    const user = await userService.findOne({ _id: userId });

    await purchaseService.insertOne({
      date: new Date(),
      userId,
      products: user?.cart.map(item => item.product),
    });

    await userService.clearCart(userId);
  }
  ctx.status = 200;
});

export default webhookRouter;
