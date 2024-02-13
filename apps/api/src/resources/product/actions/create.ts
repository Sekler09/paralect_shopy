import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, Product } from 'types';

import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';

const schema = z.object({
  title: z.string().min(3, 'Title is too short').max(20, 'Title is too long'),
  imgUrl: z.string().optional().nullable(),
  price: z.number().min(1, 'Price can not be negative or zero').max(10000000, 'This is so much'),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product,
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { title } = ctx.validatedData;

  const isProductExists = await productService.exists({ title });

  ctx.assertClientError(!isProductExists, {
    title: 'Product with this title is already exist',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    title,
    price,
    imgUrl,
  } = ctx.validatedData;

  const { user } = ctx.state;

  const product = await productService.insertOne({
    title,
    imgUrl,
    price,
    createdBy: user._id,
  });

  ctx.body =  product;
}

export default (router: AppRouter) => {
  router.post('/create', validateMiddleware(schema), validator, handler);
};
