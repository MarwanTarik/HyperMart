import Roles from './roles.models'

const GroupsName = {
  USER: 'user'
}

const GroupsCredentials = {
  user: [
    Roles.SIGNUP,
    Roles.LOGIN
  ]
}

export {
  GroupsCredentials,
  GroupsName
}
