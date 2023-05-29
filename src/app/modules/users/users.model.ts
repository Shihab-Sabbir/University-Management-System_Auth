import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

type UserModel = Model<IUser, object>
// here object is the replacement of {}.
// here UserModel is used if any future methods are added to this model. withour methods this type UserModel is not required. only Iuser in enough.

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      //this id is not mongoDb id. it is provided by university.
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
  },
  {
    timestamps: true,
  }
)

const User = model<IUser, UserModel>('User', userSchema)

export default User
