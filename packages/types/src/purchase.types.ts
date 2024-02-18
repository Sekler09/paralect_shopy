import { z } from 'zod';

import { purchaseSchema } from 'schemas';

export type Purchase = z.infer<typeof purchaseSchema>;
