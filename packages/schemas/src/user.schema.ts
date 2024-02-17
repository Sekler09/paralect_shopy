import { z } from 'zod';

import { productSchema } from './product.schema';
import dbSchema from './db.schema';

export const userSchema = dbSchema.extend({
  email: z.string(),
  passwordHash: z.string().nullable().optional(),

  avatarUrl: z.string().nullable().optional(),

  lastRequest: z.date().optional(),

  cart: z.array(z.object({
    product: productSchema,
    quantity: z.number().positive().default(1),
  })).default([]),
}).strict();
