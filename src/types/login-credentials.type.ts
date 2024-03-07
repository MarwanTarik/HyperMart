interface LoginCredentials {
  userID: number
  passwordHash: string
  groups: string[]
}

export type {
  LoginCredentials
}
