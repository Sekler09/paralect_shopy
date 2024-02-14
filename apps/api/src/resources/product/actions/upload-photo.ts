import multer from '@koa/multer';

import { Next, AppKoaContext, AppRouter } from 'types';

import { cloudStorageService } from 'services';

const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { file } = ctx.request;
  const { user } = ctx.state;

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  const { Location } = await cloudStorageService.uploadPublic(`covers/${fileName}`, file);

  ctx.body = { url : Location };
}

export default (router: AppRouter) => {
  router.post('/upload-photo', upload.single('file'), validator, handler);
};
