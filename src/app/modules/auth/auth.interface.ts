import { Model } from 'mongoose';

export type ILogin = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needsToChangePassword: boolean;
};

export type IRefreshToken = {
  accessToken: string;
};

export type LoginModel = Model<ILogin, Record<string, unknown>>;
