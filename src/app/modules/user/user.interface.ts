import { Model } from 'mongoose';

export type IUser = {
  //here type is one kind of interface
  id: string;
  role: string;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
// here Record<string, unknown> is the replacement of {}.
// here UserModel is used if any future methods are added to this model. withour methods this type UserModel is not required. only Iuser in enough.
