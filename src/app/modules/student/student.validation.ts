import { z } from 'zod';

export const updateStudentZodSchema = z.object({
  body: z
    .object({
      id: z.string().optional(),
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(['male', 'female']).optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: z
        .object({
          fatherName: z.string().optional(),
          fatherOccupation: z.string().optional(),
          fatherContactNo: z.string().optional(),
          motherName: z.string().optional(),
          motherOccupation: z.string().optional(),
          motherContactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .strict()
        .optional(),
      localGuardian: z
        .object({
          name: z.string().optional(),
          occupation: z.string().optional(),
          contactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .strict()
        .optional(),
      profileImage: z.string().optional(),
      academicFaculty: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicSemester: z.string().optional(),
    })
    .strict(),
});
