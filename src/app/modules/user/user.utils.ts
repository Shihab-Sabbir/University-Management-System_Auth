import User from './user.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { _id: 0, id: 1 })
    .sort({
      createdAt: -1,
    })
    .lean()
  // lean() used for get a pure js object not mongodb document.
  return lastUser?.id
}

export const generateUserId = async () => {
  const id = await findLastUserId()
  let currentId: string
  if (!id) {
    currentId = (1).toString().padStart(5, '0')
  } else {
    currentId = (parseInt(id) + 1).toString().padStart(5, '0')
    //padStart 5,0 means : the digit will be 5 and empty digits will be replaced with 0 at starting point.
  }
  return currentId
}
