import { Purchase } from 'types';
import { purchaseSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';

const service = db.createService<Purchase>(DATABASE_DOCUMENTS.PURCHASES, {
  schemaValidator: (obj) => purchaseSchema.parseAsync(obj),
});

export default Object.assign(service, { });
