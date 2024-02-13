import { memo, FC } from 'react';
import { Box, Group } from '@mantine/core';
import { useRouter } from 'next/router';

import { CartIcon, LogoutIcon } from 'public/icons';
import { accountApi } from 'resources/account';

import { RoutePath } from 'routes';

import classes from './index.module.css';

const UserMenu: FC = () => {
  const { mutate: signOut } = accountApi.useSignOut();
  const router = useRouter();
  return (
    <Group gap={32} align="baseline">
      <Box className={classes.cart} onClick={() => router.push(RoutePath.Profile)}>
        <Box className={classes.cartSize}>3</Box>
        <CartIcon />
      </Box>
      <LogoutIcon onClick={() => signOut()} style={{ cursor: 'pointer' }} />
    </Group>
  );
};

export default memo(UserMenu);
