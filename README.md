HyperMart Express API
=====================

HyperMart is an Restful API designed to manage E-commerce Applications. It provides endpoints for various functionalities required in an E-commerce application, such as user management, product management, order placement, and authentication.

Technologies Used
-----------------

* **PostgreSQL**: Database system for storing data.
* **Node.js**: JavaScript runtime for executing server-side code.
* **TypeScript**: Superset of JavaScript that adds static typing and other features to enhance code quality and developer productivity.
* **Express**: Web application framework for Node.js used to build APIs.
* **JWT**: JSON Web Tokens for secure authentication between the client and the server.
* **Jest**: JavaScript testing framework for unit and integration testing.

Installation
------------

1. Clone the repository:

   ``https://github.com/MarwanTarik/HyperMart.git``
2. Install dependencies:

   `npm install`
3. Set up the PostgreSQL database and update the ``.env`` file with your database connection details.
4. Run database migrations:

   `npm run migrate:up`

Usage
-----

* **Development**: Start the server in development mode with automatic TypeScript compilation

  `npm run dev`
* **Production**: Build the TypeScript code and start the server:

  `npm run build npm start`
* **Testing**: Run tests using Jest:

  `npm test`

API Endpoints
-------------

### Orders

* `POST /order/place`: Place a new order.
* `GET /order/:orderID`: Get details of a specific order.

### Users

* `POST /user/enable`: Enable a user account.
* `POST /user/disable`: Disable a user account.

### Products

* `POST /product`: Add a new product.
* `DELETE /product/:productID`: Delete a product.
* `PUT /product/price/:productID`: Update the price of a product.
* `GET /product/seller/:productID`: Get details of a product sold by a specific seller.
* `GET /products/seller`: Get all products sold by a seller.
* `GET /product/:productID`: Get details of a specific product.
* `GET /products`: List all products.
* `GET /product/search/:productName`: Search for products by name.

### Authentication

* `POST /auth/signup`: User signup.
* `POST /auth/login`: User login.

## License

This project is licensed under the MIT License - see the [LICENSE]() file for details.
