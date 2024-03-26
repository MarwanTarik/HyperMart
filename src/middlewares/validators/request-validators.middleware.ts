import checkers from './checkers.middlewares'

const RequestValidators = {
  USER_MANGMENT: {
    signup: [
      checkers.username,
      checkers.firstname,
      checkers.lastname,
      checkers.email,
      checkers.address,
      checkers.address,
      checkers.country,
      checkers.phonenumber,
      checkers.password
    ],
    login: [
      checkers.email,
      checkers.password
    ],
    userActivation: [
      checkers.username
    ]
  },
  PRODUCT_MANGEMENT: {
    addProduct: [
      checkers.productname,
      checkers.productPrice,
      checkers.productQuantity,
      checkers.productCategory,
      checkers.productCategory,
      checkers.productUnit
    ],
    deleteProduct: [
      checkers.productid
    ],
    updateProducrPrice: [
      checkers.productPrice,
      checkers.productid
    ],
    getSellerProduct: [
      checkers.productid
    ],
    getProduct: [
      checkers.productid
    ],
    search: [
      checkers.productname
    ]
  }
}

export default RequestValidators
