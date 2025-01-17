import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({
  title: z.string(),
  price: z.number(),
  imgUrl: z.string(),
  createdBy: z.string(),
}).strict();
