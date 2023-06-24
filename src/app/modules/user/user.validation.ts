import { z } from 'zod';

// req-validation
// body --> object
// data --> object

export const createStudentZodSchema = z.object({
  body: z
    .object({
      role: z.string().optional(),
      password: z.string().optional(),
      student: z.object({
        id: z.string().optional(),
        name: z
          .object({
            firstName: z.string({ required_error: 'First name is required' }),
            middleName: z.string().optional(),
            lastName: z.string({ required_error: 'Last name is required' }),
          })
          .refine(value => value.firstName && value.lastName, {
            message: 'First name and Last name are required',
          }),
        dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
        gender: z.enum(['male', 'female'], {
          required_error: 'Gender is required',
        }),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
          .optional(),
        email: z
          .string({
            required_error: 'Email address is required',
          })
          .email({
            message: 'Invalid email address',
          }),
        contactNo: z.string({ required_error: 'Contact no is required' }),
        emergencyContactNo: z.string({
          required_error: 'Emergency contact no is required',
        }),
        presentAddress: z.string({
          required_error: 'Present address is required',
        }),
        permanentAddress: z.string({
          required_error: 'Permanent address is required',
        }),
        guardian: z
          .object({
            fatherName: z.string({
              required_error: 'Father name is required',
            }),
            fatherOccupation: z.string({
              required_error: 'Father occupation is required',
            }),
            fatherContactNo: z.string({
              required_error: 'Father contact no is required',
            }),
            motherName: z.string({
              required_error: 'Mother name is required',
            }),
            motherOccupation: z.string({
              required_error: 'Mother occupation is required',
            }),
            motherContactNo: z.string({
              required_error: 'Mother contact no is required',
            }),
            address: z.string({
              required_error: 'Guardian address is required',
            }),
          })
          .strict(),
        localGuardian: z
          .object({
            name: z.string({
              required_error: 'Local guardian name is required',
            }),
            occupation: z.string({
              required_error: 'Local guardian occupation is required',
            }),
            contactNo: z.string({
              required_error: 'Local guadian contact no is required',
            }),
            address: z.string({
              required_error: 'Local guardian address is required',
            }),
          })
          .strict(),
        profileImage: z.string().optional(),
        academicFaculty: z.string({ required_error: 'Faculty is required' }),
        academicDepartment: z.string({
          required_error: 'Department is required',
        }),
        academicSemester: z.string({
          required_error: 'Semester image is required',
        }),
      }),
    })
    .strict(),
});

export const createFacultyZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),

      faculty: z
        .object({
          name: z
            .object({
              firstName: z.string({
                required_error: 'First name is required',
              }),
              middleName: z.string().optional(),
              lastName: z.string({
                required_error: 'Last name is required',
              }),
            })
            .strict(),
          gender: z.string({
            required_error: 'Gender is required',
          }),
          dateOfBirth: z.string({
            required_error: 'Date of birth is required',
          }),
          email: z
            .string({
              required_error: 'Email is required',
            })
            .email(),
          contactNo: z.string({
            required_error: 'Contact number is required',
          }),
          emergencyContactNo: z.string({
            required_error: 'Emergency contact number is required',
          }),
          bloodGroup: z
            .string({
              required_error: 'Blood group is required',
            })
            .optional(),
          presentAddress: z.string({
            required_error: 'Present address is required',
          }),
          permanentAddress: z.string({
            required_error: 'Permanent address is required',
          }),
          academicDepartment: z.string({
            required_error: 'Academic department is required',
          }),

          academicFaculty: z.string({
            required_error: 'Academic faculty is required',
          }),
          designation: z.string({
            required_error: 'Designation is required',
          }),
          profileImage: z.string().optional(),
        })
        .strict(),
    })
    .strict(),
});

export const createAdminZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),

      admin: z
        .object({
          name: z
            .object({
              firstName: z.string({
                required_error: 'First name is required',
              }),
              lastName: z.string({
                required_error: 'Last name is required',
              }),
              middleName: z.string().optional(),
            })
            .strict(),
          dateOfBirth: z.string({
            required_error: 'Date of birth is required',
          }),

          gender: z.string({
            required_error: 'Gender is required',
          }),

          bloodGroup: z.string({
            required_error: 'Blood group is required',
          }),

          email: z
            .string({
              required_error: 'Email is required',
            })
            .email(),

          contactNo: z.string({
            required_error: 'Contact number is required',
          }),

          emergencyContactNo: z.string({
            required_error: 'Emergency contact number is required',
          }),

          presentAddress: z.string({
            required_error: 'Present address is required',
          }),

          permanentAddress: z.string({
            required_error: 'Permanent address is required',
          }),

          managementDepartment: z.string({
            required_error: 'Management department is required',
          }),

          designation: z.string({
            required_error: 'Designation is required',
          }),

          profileImage: z.string().optional(),
        })
        .strict(),
    })
    .strict(),
});
