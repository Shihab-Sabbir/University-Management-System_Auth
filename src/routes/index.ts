import express from 'express';
import userRoutes from '../app/modules/user/user.route';
import academicSemesterRoutes from '../app/modules/academicSemester/academicSemester.route';
import academicFacultyRoutes from '../app/modules/academicFaculty/academicFaculty.route';
import academicDepartmentRoutes from '../app/modules/academicDepartment/academicDepartment.route';
import studentRoutes from '../app/modules/student/student.route';

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
  {
    path: '/faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
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
