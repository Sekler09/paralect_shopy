import { Group, Text } from '@mantine/core';
import { LogoImage } from 'public/images';
import { FC } from 'react';

import classes from './index.module.css';

const Logo: FC<{}> = () => (
  <Group gap={10}>
    <LogoImage />
    <Text className={classes.title}>Shopy</Text>
  </Group>
);

export default Logo;
