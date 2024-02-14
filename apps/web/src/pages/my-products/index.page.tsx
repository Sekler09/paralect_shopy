import { ActionIcon, Center, Stack, Text, Title } from '@mantine/core';
import { Link } from 'components';
import { NextPage } from 'next';
import Head from 'next/head';
import { RoutePath } from 'routes';

import { IconPlus } from '@tabler/icons-react';
import classes from './index.module.css';

const MyProducts: NextPage = () => (
  <>
    <Head>
      <title>Your Products</title>
    </Head>
    <Stack gap={20}>
      <Title order={2} fz={20}>Your Products</Title>
      <Center className={classes.addProduct}>
        <Link type="router" href={RoutePath.CreateProduct} underline={false}>
          <Stack gap={12} align="center">
            <ActionIcon variant="filled" className={classes.addProductIcon}>
              <IconPlus color="white" />
            </ActionIcon>
            <Text fw={400} fz={20} c="#2B77EB">
              New Product
            </Text>
          </Stack>
        </Link>
      </Center>
    </Stack>
  </>
);

export default MyProducts;
