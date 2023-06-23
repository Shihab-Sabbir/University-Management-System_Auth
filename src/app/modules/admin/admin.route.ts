import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateAdminZodSchema } from './admin.validation';
const adminRoutes = express.Router();

adminRoutes.get('/:id', AdminController.getSingleAdmin);
adminRoutes.get('/', AdminController.getAdmins);
adminRoutes.delete('/:id', AdminController.deleteAdmin);
adminRoutes.patch(
  '/:id',
  validateRequest(updateAdminZodSchema),
  AdminController.updateAdmin
);

export default adminRoutes;
