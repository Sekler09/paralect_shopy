import { stripeService } from 'services';
import { AppKoaContext, AppRouter } from 'types';
import config from 'config';

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
    console.log(session.data[0].metadata);
  }
  ctx.status = 200;
});

export default webhookRouter;
