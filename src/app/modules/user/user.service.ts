import { DEFAULT_PASS } from '../../../config';
import { IUser } from './user.interface';
import User from './user.model';
import { generateUserId } from './user.utils';

const createUserDB = async (useInfo: IUser): Promise<IUser | null> => {
  // auto generated increamental id. needed for create user.
  // default password needed for first login.
  // these two data is needed for initial credential for user.
  const sem: any = {
    code: '01',
    year: '2023',
  };

  const role: string = useInfo.role;
  const id = await generateUserId(role, sem);
  const { password } = useInfo;

  useInfo.id = id as string;

  if (!password) {
    useInfo.password = DEFAULT_PASS as string;
  }
  const createdUser = await User.create(useInfo);

  if (!createUserDB) {
    throw new Error('Faild to create user !');
  }
  return createdUser;
};

export const UserService = {
  createUserDB,
};
