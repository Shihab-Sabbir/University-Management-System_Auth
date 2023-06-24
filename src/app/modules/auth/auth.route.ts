import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginZodSchema } from './auth.validation';
const authRoutes = express.Router();

authRoutes.post(
  '/login',
  
  AuthController.loginUser
);
// authRoutes.get('/get-auth/:id', AuthController.getSingleAuth);
// authRoutes.patch(
//   '/:id',
//   validateRequest(updateAuthZodSchema),
//   AuthController.updateAuth
// );
// authRoutes.delete('/:id', AuthController.deleteAuth);

export default authRoutes;
