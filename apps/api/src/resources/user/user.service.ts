import _ from 'lodash';

import { Product, User } from 'types';
import { userSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';
import { productService } from 'resources/product';

const service = db.createService<User>(DATABASE_DOCUMENTS.USERS, {
  schemaValidator: (obj) => userSchema.parseAsync(obj),
});

const updateLastRequest = (_id: string) => {
  return service.atomic.updateOne(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    },
  );
};

const privateFields = [
  'passwordHash',
  'signupToken',
  'resetPasswordToken',
];

const getPublic = (user: User | null) => _.omit(user, privateFields);

const updateProductInCart = async (userId: string, product: Product, quantity: number) => {
  const isProductInCart = await service.findOne({ 
    _id: userId, 'cart.product._id': product._id, 
  });

  if (isProductInCart) {
    await service.atomic.updateOne(
      { _id: userId, 'cart.product._id': product._id }, 
      { $set: { 'cart.$.quantity' : quantity } },
    );
  } else {
    await service.atomic.updateOne(
      { _id: userId }, 
      { $addToSet: { cart : { product, quantity } } },
    );
  } 
};

const removeProductFromCart = async (userId: string, productId: string) => {
  const product = await productService.findOne({ _id: productId });
  console.log(product);
  await service.atomic.updateOne(
    { _id: userId }, 
    { $pull: { cart: { 'product._id': productId } } },
  );
};

export default Object.assign(service, {
  updateLastRequest,
  getPublic,
  updateProductInCart,
  removeProductFromCart,
});
