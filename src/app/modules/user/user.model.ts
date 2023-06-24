import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import { BCRYPT_SALT_ROUNDS } from '../../../config';
import bcrypt from 'bcrypt';
import { boolean } from 'zod';

const userSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsToChangePassword: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExists = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const isUserExist = User.findOne(
    { id },
    {
      id: 1,
      password: 1,
      role: 1,
      needsToChangePassword: 1,
    }
  ).lean();

  return isUserExist;
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  DbPassword: string
): Promise<boolean> {
  const isPasswordMatch: boolean = await bcrypt.compare(
    givenPassword,
    DbPassword
  );
  return isPasswordMatch;
};

userSchema.pre('save', async function (next) {
  //hash password just before save in DB
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(BCRYPT_SALT_ROUNDS));
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
