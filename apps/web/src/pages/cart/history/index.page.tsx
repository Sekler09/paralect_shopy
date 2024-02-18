import { Button, Center, Group, Stack, Text, Title, Table, Image } from '@mantine/core';
import { Link } from 'components';
import { NextPage } from 'next';
import Head from 'next/head';
import { accountApi } from 'resources/account';
import { RoutePath } from 'routes';

const CartHistory: NextPage = () => {
  const { data: purchases } = accountApi.useGetPurchases();

  const rows = purchases?.items.map(({ products, date }) => products.map((product) => (
    <Table.Tr key={product._id}>
      <Table.Td>
        <Group gap={25}>
          <Image
            height={80}
            w={80}
            src={product.imgUrl.toString()}
            alt={product.title}
            radius={8}
            style={{ flex: 'none' }}
          />
          <Text fw={700}>{product.title}</Text>
        </Group>
      </Table.Td>
      <Table.Td ta="right">
        $
        {product.price}
      </Table.Td>
      <Table.Td ta="right">
        <Text>{ new Date(date).toISOString().split('T')[0].replaceAll('-', '.')}</Text>
      </Table.Td>
    </Table.Tr>
  )));

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Group justify="space-between">
        <Stack gap={20}>
          <Group gap={32}>
            <Link href={RoutePath.Cart} underline={false} type="router">
              <Text fw={600} fz={20} c="#A3A3A3">My Cart</Text>
            </Link>
            <Link href={RoutePath.CartHistory} underline={false} type="router">
              <Text fw={600} fz={20} c="#201F22">History</Text>
            </Link>
          </Group>
          {!!purchases?.items.length && (
          <Table horizontalSpacing={0} verticalSpacing={16} fz={16}>
            <Table.Thead>
              <Table.Tr style={{ borderBottom: 'none' }} c="#767676">
                <Table.Th pb={0} w={500}>Item</Table.Th>
                <Table.Th pb={0} w={144} ta="right">Unit Price</Table.Th>
                <Table.Th pb={0} w={144} ta="right">Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          )}
        </Stack>
      </Group>
      {!purchases?.items.length && (
        <Center mt={40}>
          <Stack gap={20}>
            <Image src="images/balloon.png" w={206} mx="auto" />
            <Title order={1} fw={700} fz={20}>Oops, there&apos;s nothing here yet!</Title>
            <Text fz={14} ta="center" c="#767676">
              You haven&apos;t made any purchases yet.
              {' '}
              <br />
              Go to the marketplace and make purchases.
            </Text>
            <Link type="router" href={RoutePath.Marketplace} underline={false}>
              <Button mx="auto">
                Go to Marketplace
              </Button>
            </Link>
          </Stack>
        </Center>
      )}
    </>
  );
};

export default CartHistory;
