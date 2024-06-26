import { enableUser, disableUser } from '../database/queries/user-manegment/user.database'

async function enableUserController (username: string): Promise<void> {
  await enableUser(username)
}

async function disableUserController (username: string): Promise<void> {
  await disableUser(username)
}

export {
  enableUserController,
  disableUserController
}
