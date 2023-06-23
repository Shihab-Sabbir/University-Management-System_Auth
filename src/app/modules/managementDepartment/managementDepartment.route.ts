import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
} from './managementDepartment.validation';

const managementDepartmentRoutes = express.Router();

managementDepartmentRoutes.post(
  '/create-department',
  validateRequest(createManagementDepartmentZodSchema),
  ManagementDepartmentController.createDepartment
);
managementDepartmentRoutes.get(
  '/:id',
  ManagementDepartmentController.getSingleDepartment
);
managementDepartmentRoutes.patch(
  '/:id',
  validateRequest(updateManagementDepartmentZodSchema),
  ManagementDepartmentController.updateDepartment
);
managementDepartmentRoutes.delete(
  '/:id',
  ManagementDepartmentController.deleteDepartment
);
managementDepartmentRoutes.get(
  '/',
  ManagementDepartmentController.getDepartments
);

export default managementDepartmentRoutes;
