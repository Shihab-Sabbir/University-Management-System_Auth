import { DEFAULT_PASS } from '../../../config'
//import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import User from './user.model'
import { generateUserId } from './user.utils'

const createUserDB = async (useInfo: IUser): Promise<IUser | null> => {
  // auto generated increamental id. needed for create user.
  // default password needed for first login.
  // these two data is needed for initial credential for user.

  const id = await generateUserId()
  const { password } = useInfo
  useInfo.id = id
  console.log({ password }, !password)

  if (!password) {
    useInfo.password = DEFAULT_PASS as string
  }
console.log({ useInfo })
  const createdUser = await User.create(useInfo)

  if (!createUserDB) {
    throw new Error('Faild to create user !')
  }
  return createdUser
}

export const UserService = {
  createUserDB,
}
