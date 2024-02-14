import { memo, FC } from 'react';
import { AppShellHeader as LayoutHeader, Container, Box } from '@mantine/core';

import { accountApi } from 'resources/account';

import { RoutePath } from 'routes';

import Logo from 'components/Logo';
import { useRouter } from 'next/router';
import UserMenu from './components/UserMenu';

import classes from './index.module.css';
import Nav from './components/Nav';

const links = [
  { title: 'Marketplace', href: RoutePath.Home },
  { title: 'Your Products', href: RoutePath.MyProducts },
];

const Header: FC = () => {
  const router = useRouter();
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <LayoutHeader>
      <Container
        className={classes.header}
        mih={72}
        px={32}
        py={0}
        display="flex"
        fluid
      >
        <Box onClick={() => router.push(RoutePath.Home)} style={{ cursor: 'pointer' }}>
          <Logo />
        </Box>
        <Nav links={links} />
        <UserMenu />
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
