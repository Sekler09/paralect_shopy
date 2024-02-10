import { z } from 'zod';

import { AppKoaContext, Next, AppRouter, User } from 'types';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'app-constants';

import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { analyticsService, authService } from 'services';
import { securityUtil } from 'utils';

const schema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z.string().regex(PASSWORD_REGEX, 'The password must contain 8 or more characters with at least one lowercase letter (a-z) and at least one capital letter (A-Z) and one number (0-9).'),
});

interface ValidatedData extends z.infer<typeof schema> {
  user: User;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { email } = ctx.validatedData;

  const isUserExists = await userService.exists({ email });

  ctx.assertClientError(!isUserExists, {
    email: 'User with this email is already registered',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    email,
    password,
  } = ctx.validatedData;

  const hash = await securityUtil.getHash(password);

  const user = await userService.insertOne({
    email,
    passwordHash: hash.toString(),
  });

  await Promise.all([
    userService.updateLastRequest(user._id),
    authService.setTokens(ctx, user._id),
  ]);

  analyticsService.track('New user created', {
    email,
  });

  ctx.body =  userService.getPublic(user);
}

export default (router: AppRouter) => {
  router.post('/sign-up', validateMiddleware(schema), validator, handler);
};
