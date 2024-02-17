import { memo, FC } from 'react';
import { Box, Group } from '@mantine/core';
import { useRouter } from 'next/router';

import { CartIcon, LogoutIcon } from 'public/icons';
import { accountApi } from 'resources/account';

import { RoutePath } from 'routes';

import classes from './index.module.css';

const UserMenu: FC = () => {
  const { mutate: signOut } = accountApi.useSignOut();
  const { data: account } = accountApi.useGet();

  const router = useRouter();

  const cartSize = account?.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Group gap={32} align="baseline">
      <Box className={classes.cart} onClick={() => router.push(RoutePath.Cart)}>
        <Box className={classes.cartSize}>{cartSize}</Box>
        <CartIcon className={router.pathname.split('/')[1] === RoutePath.Cart.slice(1) ? classes.activeCart : undefined} />
      </Box>
      <LogoutIcon onClick={() => signOut()} style={{ cursor: 'pointer' }} />
    </Group>
  );
};

export default memo(UserMenu);
