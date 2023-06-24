import jwt from 'jsonwebtoken';
import { IUser } from '../../../app/modules/user/user.interface';

export const generateJWT_Token = (
  dbUser: Partial<IUser>,
  secret_key: string,
  expire_time: string
) => {
  const token = jwt.sign(
    {
      id: dbUser?.id,
      role: dbUser?.role,
    },
    secret_key,
    {
      expiresIn: expire_time,
    }
  );
  return token;
};
