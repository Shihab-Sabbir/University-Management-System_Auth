import { Schema, model } from 'mongoose';
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface';
import { codeEnum, monthEnum, titleEnum } from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<
  IAcademicSemester,
  AcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: true,
      enum: titleEnum,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: codeEnum,
    },
    startMonth: {
      type: String,
      required: true,
      enum: monthEnum,
    },
    endMonth: {
      type: String,
      required: true,
      enum: monthEnum,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//handle same year same semester entry by pre hook (before saving to database)
// pre and post hook should be placed before creating model
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist !'
    );
  }
  next(); // this next is not express next , its mongoose pre hook next !
});

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);

export default AcademicSemester;
