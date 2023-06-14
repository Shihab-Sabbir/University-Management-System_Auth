import { AnyZodObject, z } from 'zod';
import { codeEnum, monthEnum, titleEnum } from './academicSemester.constant';

export const createSemesterZodSchema = z.object({
  body: z
    .object({
      title: z.enum([...titleEnum] as [string, ...string[]], {
        //direct array (['a','b',..]) can be used in zod enum but if external value is provided in enum then it will be given as uper process.
        required_error: 'Title is required',
      }),
      year: z.string({
        required_error: 'Year is required',
      }),
      code: z.enum([...codeEnum] as [string, ...string[]], {
        required_error: 'Code is required',
      }),
      startMonth: z.enum([...monthEnum] as [string, ...string[]], {
        required_error: 'Start month is required',
      }),
      endMonth: z.enum([...monthEnum] as [string, ...string[]], {
        required_error: 'End month is required',
      }),
    })
    .strict(),
});

export const updateSemesterZodSchema = z
  .object({
    body: z
      .object({
        title: z.optional(z.enum([...titleEnum] as [string, ...string[]])),
        year: z.optional(z.string()),
        code: z.optional(z.enum([...codeEnum] as [string, ...string[]])),
        startMonth: z.optional(z.enum([...monthEnum] as [string, ...string[]])),
        endMonth: z.optional(z.enum([...monthEnum] as [string, ...string[]])),
      })
      .strict(),
  })
  .refine(
    data => {
      if (data.body.title && data.body.code) {
        return true;
      } else if (!data.body.title && !data.body.code) {
        return true;
      } else {
        return false;
      }
    },
    {
      message:
        'Either both title and code should be present or none of them should be present',
    }
  );
