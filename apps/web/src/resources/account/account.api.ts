import { useMutation, useQuery } from 'react-query';

import { Product, Purchase, User } from 'types';

import { apiService } from 'services';

import queryClient from 'query-client';

export function useSignIn<T>() {
  const signIn = (data: T) => apiService.post('/account/sign-in', data);

  return useMutation<User, unknown, T>(signIn, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useSignOut() {
  const signOut = () => apiService.post('/account/sign-out');

  return useMutation(signOut, {
    onSuccess: () => {
      queryClient.setQueryData(['account'], null);
    },
  });
}

export function useSignUp<T>() {
  const signUp = (data: T) => apiService.post('/account/sign-up', data);

  return useMutation<User, unknown, T>(signUp, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useForgotPassword<T>() {
  const forgotPassword = (data: T) => apiService.post('/account/forgot-password', data);

  return useMutation<{}, unknown, T>(forgotPassword);
}

export function useResetPassword<T>() {
  const resetPassword = (data: T) => apiService.put('/account/reset-password', data);

  return useMutation<{}, unknown, T>(resetPassword);
}

export function useResendEmail<T>() {
  const resendEmail = (data: T) => apiService.post('/account/resend-email', data);

  return useMutation<{}, unknown, T>(resendEmail);
}

export function useGet(options? : {}) {
  const get = () => apiService.get('/account');

  return useQuery<User>(['account'], get, options);
}

export function useUpdate<T>() {
  const update = (data: T) => apiService.put('/account', data);

  return useMutation<User, unknown, T>(update);
}

export function useUploadAvatar<T>() {
  const uploadAvatar = (data: T) => apiService.post('/account/avatar', data);

  return useMutation<User, unknown, T>(uploadAvatar, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useRemoveAvatar() {
  const removeAvatar = () => apiService.delete('/account/avatar');

  return useMutation<User>(removeAvatar, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useGetUserProducts() {
  const getProducts = () => apiService.get('/account/products');
  interface ProductsListResponse {
    count: number;
    items: Product[];
  }

  return useQuery<ProductsListResponse>(['user-products'], getProducts);
}

export function useUpdateProductInCart() {
  interface ReqBody {
    productId: string;
    quantity: number;
  }

  const updateProduct = (data: ReqBody) => apiService.post('/account/cart', data);

  return useMutation<User, unknown, ReqBody>(updateProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
      queryClient.invalidateQueries(['products']);
    },
  });
}

export function useRemoveProductFromCart() {
  const removeProduct = (productId: string) => apiService.delete(`/account/cart/${productId}`);

  return useMutation<User, unknown, string>(removeProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useProceedCheckout() {
  const proceed = () => apiService.post('/account/cart/checkout');
  interface ProceedResponse {
    url: string;
  }
  return useMutation<ProceedResponse, unknown>(proceed, {
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });
}

export function useGetPurchases() {
  const getPurchases = () => apiService.get('/account/purchases');

  interface GetPurchasesRes {
    items: Purchase[],
  }

  return useQuery<GetPurchasesRes>(['purchases'], getPurchases);
}
