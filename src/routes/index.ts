import express from 'express';
import userRoutes from '../app/modules/user/user.route';
import academicSemesterRoutes from '../app/modules/academicSemester/academicSemester.route';

const router = express.Router();

// shared routes
const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/semesters',
    route: academicSemesterRoutes,
  },
];

defaultRoutes.forEach(route => {
  // if (route.path === '/auth') {
  //   //router.use(route.path, route.route)
  // } else {
  //   //router.use(route.path, auth(), route.route)
  // }
  router.use(route.path, route.route);
});

export default router;
