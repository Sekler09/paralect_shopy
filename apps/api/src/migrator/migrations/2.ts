import { userService } from 'resources/user';

import { promiseUtil } from 'utils';

import { Migration } from 'migrator/types';

const migration = new Migration(2, 'Add cart');

migration.migrate = async () => {
  const userIds = await userService.distinct('_id', {
    cart: undefined,
  });

  const updateFn = (userId: string) => userService.atomic.updateOne(
    { _id: userId },
    { $set: { cart: [] } },
  );

  await promiseUtil.promiseLimit(userIds, 50, updateFn);
};

export default migration;
