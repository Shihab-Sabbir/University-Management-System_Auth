import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

export const findLastTargetUserId = async (
  role: string
): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: role }, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id;
};

export const generateUserId = async (
  role: string,
  academicSemester?: IAcademicSemester
): Promise<string | undefined> => {
  try {
    let id = await findLastTargetUserId(role);

    if (id) {
      switch (role) {
        case 'student':
          id = id.substring(4);
          break;
        case 'faculty':
        case 'admin':
          id = id.substring(2);
          break;
        default:
          throw new Error('Invalid role');
      }
    } else {
      id = '0';
    }

    const lastIdNumber = parseInt(id);
    const newIdNumber = lastIdNumber + 1;
    const paddedId = newIdNumber.toString().padStart(5, '0');

    switch (role) {
      case 'student':
        if (!academicSemester) {
          throw new Error('Missing academic semester for student role');
        }
        const yearSubstring = academicSemester.year?.slice(2);
        const codeSubstring = academicSemester.code;
        return `${yearSubstring}${codeSubstring}${paddedId}`;

      case 'faculty':
      case 'admin':
        return `${role.charAt(0).toUpperCase()}-${paddedId}`;

      default:
        throw new Error('Invalid role');
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
 