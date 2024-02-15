import queryClient from 'query-client';
import { useMutation } from 'react-query';

import { apiService } from 'services';
import { Product } from 'types';

export function useCreate() {
  interface CreateParams {
    title: string;
    price: number;
    img: File;
  }
  const create = async (data: CreateParams) => {
    const body = new FormData();
    body.append('file', data.img, data.img.name);

    const { url: imgUrl } = await apiService.post('/products/upload-photo', body);
    return apiService.post('/products', { ...data, imgUrl });
  };

  return useMutation<Product, unknown, CreateParams>(create);
}

export function useRemove() {
  const remove = (id: string) => apiService.delete(`/products/${id}`);

  return useMutation(remove, {
    onSuccess: () => queryClient.invalidateQueries('user-products'),
  });
}
