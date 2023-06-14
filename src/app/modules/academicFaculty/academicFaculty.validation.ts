import { z } from 'zod';

export const facultyZodSchema = z.object({
  body: z
    .object({
      title: z.string({
        required_error: 'Title is required',
      }),
    })
    .strict(),
});
