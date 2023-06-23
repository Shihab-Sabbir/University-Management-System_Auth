import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentZodSchema } from './student.validation';
const studentRoutes = express.Router();

studentRoutes.get('/get-students', StudentController.getStudents);
studentRoutes.get('/get-student/:id', StudentController.getSingleStudent);
studentRoutes.patch(
  '/:id',
  validateRequest(updateStudentZodSchema),
  StudentController.updateStudent
);
// studentRoutes.delete('/:id', StudentController.deleteStudent);

export default studentRoutes;
