import { z } from 'zod';

export const loginZodSchema = z.object({
  body: z
    .object({
      id: z.string({
        required_error: 'ID is required',
      }),
      password: z.string({
        required_error: 'Password is required',
      }),
    })
    .strict(),
});

export const refreshTokenZodSchema = z.object({
  body: z
    .object({
      refreshToken: z.string({
        required_error: 'Refresh token is required',
      }),
    })
    .strict(),
});
