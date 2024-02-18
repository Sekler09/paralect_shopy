import { z } from 'zod';

import { productSchema } from './product.schema';
import dbSchema from './db.schema';

export const purchaseSchema = dbSchema.extend({
  products: z.array(productSchema).default([]),
  userId: z.string(),
  date: z.date(),
}).strict();
