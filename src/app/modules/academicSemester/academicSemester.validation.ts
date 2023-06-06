import { z } from 'zod';
import { codeEnum, monthEnum, titleEnum } from './academicSemester.constant';

export const academicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...titleEnum] as [string, ...string[]], {
      //direct array (['a','b',..]) can be used in zod enum but if external value is provided in enum then it will be given as uper process.
      required_error: 'Title is required',
    }),
    year: z.number({
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
  }),
});
