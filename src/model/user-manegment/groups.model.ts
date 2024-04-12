import Roles from './roles.models'

const GroupsName = {
  USER: 'user',
  CUSTOMER: 'customer',
  SELLER: 'seller'
}

const GroupsCredentials = {
  user: [
    Roles.SIGNUP,
    Roles.LOGIN
  ],
  seller: [
    Roles.ADD_PRODUCT,
    Roles.DELETE_PRODUCT,
    Roles.GET_PRODUCT,
    Roles.UPDATE_PRODUCT_PRICE
  ],
  customer: [
    Roles.GET_PRODUCT,
    Roles.SEARCH_PRODUCT,
    Roles.PLACE_ORDER,
    Roles.GET_ORDER
  ]
}

export {
  GroupsCredentials,
  GroupsName
}
