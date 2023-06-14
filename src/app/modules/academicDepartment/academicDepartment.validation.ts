import { z } from 'zod';

export const createDepartmentZodSchema = z.object({
  body: z
    .object({
      title: z.string({
        required_error: 'Title is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
    })
    .strict(),
});

export const updateDepartmentZodSchema = z.object({
  body: z
    .object({
      title: z.string().optional(),
      academicFaculty: z.string().optional(),
    })
    .strict(),
});
