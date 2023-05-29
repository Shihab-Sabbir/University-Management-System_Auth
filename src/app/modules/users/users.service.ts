import { DEFAULT_PASS } from '../../../config'
import { IUser } from './users.interface'
import User from './users.model'
import { generateUserId } from './users.utils'

export const createUserDB = async (useInfo: IUser): Promise<IUser | null> => {
  // auto generated increamental id. needed for create user.
  // default password needed for first login.
  // these two data is needed for initial credential for user.

  const id = await generateUserId()
  useInfo.id = id
  if (!useInfo.password) {
    useInfo.password = DEFAULT_PASS as string
  }

  const createdUser = await User.create(useInfo)
  if (!createUserDB) {
    throw new Error('Faild to create user !')
  }
  return createdUser
}
