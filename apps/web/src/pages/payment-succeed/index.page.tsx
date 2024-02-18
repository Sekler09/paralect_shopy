import { Button, Center, Stack, Text, Title, Image } from '@mantine/core';
import { Link } from 'components';
import { NextPage } from 'next';
import { RoutePath } from 'routes';

const PaymentSucceed: NextPage = () => (
  <Center mt={40} w={480} p={20} bg="white" mx="auto" style={{ borderRadius: '20px' }}>
    <Stack gap={32}>
      <Image src="images/success.png" w={56} mx="auto" />
      <Stack gap={16} align="center">
        <Title order={1} fw={700} fz={20}>Payment Successful</Title>
        <Text fz={14} c="#767676">
          Hooray, you have completed your payment!
        </Text>
      </Stack>
      <Link type="router" href={RoutePath.Marketplace} underline={false}>
        <Button mx="auto">
          Go to Marketplace
        </Button>
      </Link>
    </Stack>
  </Center>
);

export default PaymentSucceed;
