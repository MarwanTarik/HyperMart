interface LoginCredentials {
  userID: number
  passwordHash: string
  userStatus: string
  groups: string[]
}

export type {
  LoginCredentials
}
