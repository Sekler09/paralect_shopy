import { FC } from 'react';
import { Button, Card, Group, Image, Stack, Text } from '@mantine/core';

import { productApi } from 'resources/product';
import { Product } from 'types';
import { accountApi } from 'resources/account';
import classes from './index.module.css';

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ product, isInCart }) => {
  const { isLoading } = productApi.useRemove();
  const { mutate: addProductToCart } = accountApi.useUpdateProductInCart();

  return (
    <Card withBorder className={classes.card}>
      <Card.Section>
        <Image
          src={product.imgUrl}
          height={210}
          alt="product photo"
        />
      </Card.Section>

      <Stack gap={12} mt={16}>
        <Text fw={700} fz={20}>{product.title}</Text>
        <Group justify="space-between">
          <Text fw={500} fz={14} c="#A3A3A3">Price:</Text>
          <Text fw={700} fz={20}>
            $
            {product.price}
          </Text>
        </Group>
      </Stack>

      {!isInCart
        ? (
          <Button
            mt={20}
            loading={isLoading}
            onClick={() => addProductToCart({ productId: product._id, quantity: 1 })}
          >
            Add to Cart
          </Button>
        )
        : <Button mt={20} disabled>In Cart</Button>}
    </Card>
  );
};

export default ProductCard;
