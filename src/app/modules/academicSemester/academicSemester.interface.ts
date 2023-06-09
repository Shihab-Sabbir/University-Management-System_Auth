import { Model } from 'mongoose';

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type Title = 'Autumn' | 'Summar' | 'Fall';

export type Code = '01' | '02' | '03';

export type IAcademicSemester = {
  //here type is one kind of interface suggested by lintin
  title: Title;
  year: number;
  code: Code;
  startMonth: Month;
  endMonth: Month;
};

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;
// here Record<string, unknown> is the replacement of {}.
// here UserModel is used if any future methods are added to this model. withour methods this type UserModel is not required. only Iuser in enough.
