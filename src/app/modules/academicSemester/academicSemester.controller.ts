import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  // to remove the repeatative try catch , a higher order function catchAsync is used here.
  // catchAsync(async function{}) , here function{} is a parameter of the catchAsync function
  const semesterInfo = req.body;
  const result = await AcademicSemesterService.createSemester(semesterInfo);
  res.status(200).send({
    success: true,
    message: 'Semester created successfully !',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
};
