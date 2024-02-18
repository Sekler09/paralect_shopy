import { Button, Center, Group, Stack, Text, Title, Table, Image } from '@mantine/core';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { Link } from 'components';
import { NextPage } from 'next';
import Head from 'next/head';
import { accountApi } from 'resources/account';
import { RoutePath } from 'routes';

const Cart: NextPage = () => {
  const { data: account } = accountApi.useGet();
  const { mutate: remove, isLoading: isRemoving } = accountApi.useRemoveProductFromCart();
  const { mutate: changeQuantity, isLoading: isChanging } = accountApi.useUpdateProductInCart();
  const { mutate: proceed, isLoading: isProceeding } = accountApi.useProceedCheckout();

  const handleDecrement = (productId:string, value: number) => {
    if (value === 0) return;
    changeQuantity({ productId, quantity: value });
  };

  const handleIncrement = (productId:string, value: number) => {
    if (value === 100) return;
    changeQuantity({ productId, quantity: value });
  };

  const rows = account?.cart.map(({ product, quantity }) => (
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
        <Group gap={12} justify="flex-end">
          <IconMinus size={24} color="#767676" onClick={() => handleDecrement(product._id, quantity - 1)} style={{ pointerEvents: isChanging ? 'none' : 'all', cursor: 'pointer' }} />
          <Text>{quantity}</Text>
          <IconPlus size={24} color="#767676" onClick={() => handleIncrement(product._id, quantity + 1)} style={{ pointerEvents: isChanging ? 'none' : 'all', cursor: 'pointer' }} />
        </Group>
      </Table.Td>
      <Table.Td ta="right">
        <Group
          gap={4}
          justify="flex-end"
          onClick={() => remove(product._id)}
          style={{ pointerEvents: isRemoving ? 'none' : 'all', cursor: 'pointer', display: 'inline-flex' }}
        >
          <IconX size={20} color="#767676" />
          <Text c="#767676">Remove</Text>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const totalPrice = account?.cart
    .reduce((sum, { product, quantity }) => sum + quantity * product.price, 0);
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Group justify="space-between">
        <Stack gap={20}>
          <Group gap={32}>
            <Link href={RoutePath.Cart} underline={false} type="router">
              <Text fw={600} fz={20} c="#201F22">My Cart</Text>
            </Link>
            <Link href={RoutePath.CartHistory} underline={false} type="router">
              <Text fw={600} fz={20} c="#A3A3A3">History</Text>
            </Link>
          </Group>
          {!!account?.cart.length && (
          <Table horizontalSpacing={0} verticalSpacing={16} fz={16}>
            <Table.Thead>
              <Table.Tr style={{ borderBottom: 'none' }} c="#767676">
                <Table.Th pb={0} w={500}>Item</Table.Th>
                <Table.Th pb={0} w={144} ta="right">Unit Price</Table.Th>
                <Table.Th pb={0} w={144} ta="right">Quantity</Table.Th>
                <Table.Th pb={0} w={144} />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          )}
        </Stack>
        {!!account?.cart.length && (
        <Stack gap={32} w={315} p={20} style={{ border: '1px solid #ECECEE', borderRadius: '12px', alignSelf: 'start' }}>
          <Text fw={700} fz={20} pb={32} style={{ borderBottom: '1px solid #CFCFCF' }}>Summary</Text>
          <Group justify="space-between">
            <Text c="#767676">Total price</Text>
            <Text fw={700}>
              $
              {totalPrice}
            </Text>
          </Group>
          <Button onClick={() => proceed()} loading={isProceeding}>Proceed to Checkout</Button>
        </Stack>
        )}
      </Group>
      {!account?.cart.length && (
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

export default Cart;
