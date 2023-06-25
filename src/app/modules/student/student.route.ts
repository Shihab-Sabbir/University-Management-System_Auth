import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentZodSchema } from './student.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../shared/enums/user';
const studentRoutes = express.Router();

studentRoutes.get('/', auth(), StudentController.getStudents);
studentRoutes.get('/:id', StudentController.getSingleStudent);
studentRoutes.patch(
  '/:id',
  validateRequest(updateStudentZodSchema),
  StudentController.updateStudent
);
// studentRoutes.delete('/:id', StudentController.deleteStudent);

export default studentRoutes;
