import { Avatar, Box, Center, Group, Stack, Text } from '@mantine/core';
import Logo from 'components/Logo';

import { LeftCard, RightCard, ShopImage } from 'public/images';
import classes from './index.module.css';

const Banner = () => (
  <Center p="xl">
    <Stack className={classes.banner}>
      <Logo />
      <Box className={classes.imagesContainer}>
        <LeftCard className={classes.leftCard} />
        <ShopImage className={classes.shop} />
        <RightCard className={classes.rightCard} />
      </Box>
      <Stack gap={12}>
        <Text className={classes.slogan}>
          Sell and buy products super quickly!
        </Text>
        <Text className={classes.subslogan}>
          Save your time, we take care of all the processing.
        </Text>
      </Stack>
      <Group mt={32} gap={20}>
        <Avatar.Group>
          <Avatar
            size={40}
            src="./images/avatar1.jpeg"
          />
          <Avatar
            size={40}
            src="./images/avatar2.jpeg"
          />
          <Avatar
            size={40}
            src="./images/avatar3.jpeg"
          />
          <Avatar
            size={40}
            src="./images/avatar4.jpeg"
          />
          <Avatar
            size={40}
            src="./images/avatar5.jpeg"
          />
        </Avatar.Group>
        <Group gap={4}>
          <Text fw={600}>+100</Text>
          <Text>users from all over the world</Text>
        </Group>
      </Group>
    </Stack>
  </Center>
);

export default Banner;
