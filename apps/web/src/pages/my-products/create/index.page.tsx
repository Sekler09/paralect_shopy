import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button, TextInput, Stack, Title, Text } from '@mantine/core';

import { productApi } from 'resources/product';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';
import PhotoUpload from './components/PhotoUpload';

const schema = z.object({
  title: z.string().min(3, 'Title is too short').max(20, 'Title is too long'),
  img: z.instanceof(File),
  price: z.coerce.number().min(1, 'Price can not be negative or zero').max(10000000, 'This is so much'),
});

type CreateParams = z.infer<typeof schema>;

const CreateProduct: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateParams>({
    resolver: zodResolver(schema),
  });

  const { mutate: createProduct, isLoading } = productApi.useCreate();

  const onSubmit = (data: CreateParams) => {
    createProduct(
      data,
      {
        onSuccess: (product) => {
          router.push(RoutePath.MyProducts);
          showNotification({
            message: `Product "${product.title}" created`,
            color: 'green',
          });
        },
        onError: () => {
          showNotification({
            title: 'Error',
            message: JSON.stringify('Something went wrong!'),
            color: 'red',
          });
        } },
    );
  };

  const handleChangeValue = (payload : File) => setValue('img', payload);
  return (
    <>
      <Head>
        <title>New product</title>
      </Head>
      <Stack gap={20} w={694}>
        <Title order={2} fz={20}>Create new product</Title>
        <Stack gap={5}>
          <PhotoUpload onFileChange={handleChangeValue} />
          {errors.img?.message && <Text c="red">Product photo is required</Text>}
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={20}>
            <TextInput
              {...register('title')}
              label="Title of the product"
              placeholder="Enter title of the product"
              labelProps={{
                'data-invalid': !!errors.title,
              }}
              error={errors.title?.message}
            />

            <TextInput
              {...register('price')}
              label="Price"
              placeholder="Enter price of the product"
              labelProps={{
                'data-invalid': !!errors.price,
              }}
              error={errors.price?.message}
            />
            <Button
              type="submit"
              loading={isLoading}
              style={{ alignSelf: 'flex-end' }}
            >
              Upload Product
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default CreateProduct;
