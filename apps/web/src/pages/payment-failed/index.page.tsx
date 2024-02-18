import { Button, Center, Stack, Text, Title, Image } from '@mantine/core';
import { Link } from 'components';
import { NextPage } from 'next';
import { RoutePath } from 'routes';

const PaymentSucceed: NextPage = () => (
  <Center mt={40} w={480} p={20} bg="white" mx="auto" style={{ borderRadius: '20px' }}>
    <Stack gap={32}>
      <Image src="images/fail.png" w={56} mx="auto" />
      <Stack gap={16} align="center">
        <Title order={1} fw={700} fz={20}>Payment Failed</Title>
        <Text fz={14} c="#767676">
          Sorry, your payment failed.
          {' '}
          <br />
          Would you like to try again?
        </Text>
      </Stack>
      <Link type="router" href={RoutePath.Cart} underline={false}>
        <Button mx="auto">
          Back to Cart
        </Button>
      </Link>
    </Stack>
  </Center>
);

export default PaymentSucceed;
