import { ActionIcon, Center, Group, Stack, Text, Title } from '@mantine/core';
import { Link } from 'components';
import { NextPage } from 'next';
import Head from 'next/head';
import { RoutePath } from 'routes';

import { IconPlus } from '@tabler/icons-react';
import { accountApi } from 'resources/account';
import classes from './index.module.css';
import ProductCard from './components/ProductCard';

const MyProducts: NextPage = () => {
  const { data, isLoading } = accountApi.useGetUserProducts();

  return (
    <>
      <Head>
        <title>Your Products</title>
      </Head>
      <Stack gap={20}>
        <Title order={2} fz={20}>Your Products</Title>
        <Group gap={20}>
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
          {!isLoading && !!data?.count && (
            data.items.map((item) => <ProductCard product={item} key={item._id} />)
          )}
        </Group>
      </Stack>
    </>
  );
};

export default MyProducts;
