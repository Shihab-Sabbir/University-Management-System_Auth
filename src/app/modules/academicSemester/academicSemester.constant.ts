import { Code, Month, Title } from './academicSemester.interface';

export const monthEnum: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const titleEnum: Title[] = ['Autum', 'Summar', 'Fall'];

export const codeEnum: Code[] = ['01', '02', '03'];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
