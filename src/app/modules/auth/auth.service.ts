import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { ILogin, ILoginResponse } from './auth.interface';
import {
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
} from '../../../config';
import { generateJWT_Token } from '../../../shared/utils/jwt/generateJWT_Token';

const loginUser = async (loginInfo: ILogin): Promise<ILoginResponse> => {
  const { id, password } = loginInfo;

  const user = new User(); // create instance of User

  const dbUser = await user.isUserExists(id);

  if (!dbUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !');
  }

  const savedPassword: string = dbUser?.password as string;

  const isPasswordMatch: boolean = await user.isPasswordMatched(
    password,
    savedPassword
  );

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'ID or password does not match !'
    );
  }

  //generate access token and refresh token
  const accessToken = generateJWT_Token(
    dbUser,
    JWT_SECRET_KEY as string,
    JWT_EXPIRES_IN as string
  );

  const refreshToken = generateJWT_Token(
    dbUser,
    JWT_SECRET_REFRESH_KEY as string,
    JWT_REFRESH_EXPIRES_IN as string
  );

  const result = {
    accessToken,
    refreshToken,
    needsToChangePassword: dbUser.needsToChangePassword as boolean,
  };

  return result;
};

export const AuthService = {
  loginUser,
};
