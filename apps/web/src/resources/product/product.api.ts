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
