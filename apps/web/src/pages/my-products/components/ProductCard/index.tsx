import { FC } from 'react';
import { Card, Group, Image, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import { productApi } from 'resources/product';
import { Product } from 'types';
import classes from './index.module.css';

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { mutate: remove } = productApi.useRemove();

  return (
    <Card withBorder className={classes.card}>
      <Card.Section>
        <Image
          src={product.imgUrl}
          height={174}
          alt="product photo"
        />
      </Card.Section>

      <Stack gap={12} mt={12}>
        <Text fw={700} fz={20}>{product.title}</Text>
        <Group justify="space-between">
          <Text fw={500} fz={14} c="#A3A3A3">Price:</Text>
          <Text fw={700} fz={20}>
            $
            {product.price}
          </Text>
        </Group>
      </Stack>

      <Group className={classes.deleteBtn} onClick={() => remove(product._id)}>
        <IconTrash color="#A3A3A3" />
      </Group>
    </Card>
  );
};

export default ProductCard;
