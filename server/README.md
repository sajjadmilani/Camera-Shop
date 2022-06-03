
## Product endpoints

| endpoint                      | method   | Description                     |
| ----------------------------- | -------- | ------------------------------- |
| `/api/product`                | `POST`   | Add a product.                  |
| `/api/products`               | `GET`    | Get list of products.           |
| `/api/product/categories`     | `GET`    | Get array of category names.    |
| `/api/products/company/:name` | `GET`    | Get list of products by company |
| `/api/products/:key/:value`   | `GET`    | Get list of products by key.    |
| `/api/product/:_id`           | `GET`    | Get a product.                  |
| `/api/product/:_id`           | `PATCH`  | Update a product.               |
| `/api/product/:_id`           | `DELETE` | Delete a product by id.         |

## Company endpoints

| endpoint            | method   | Description             |
| ------------------- | -------- | ----------------------- |
| `/api/company`      | `POST`   | Add a company.          |
| `/api/company/:_id` | `GET`    | Get a company.          |
| `/api/companies`    | `GET`    | Get list of companies.  |
| `/api/company/:_id` | `PATCH`  | Update a company.       |
| `/api/company/:_id` | `DELETE` | Delete a company by id. |

## Cart endpoints

| endpoint               | method   | Description                           |
| ---------------------- | -------- | ------------------------------------- |
| `/api/cart`            | `POST`   | Add an item to the user's cart.       |
| `/api/cart/:_id`       | `GET`    | Get all items of user's cart.         |
| `/api/cart/:_id`       | `DELETE` | Remove an item from cart of the user. |
| `/api/cart/clear/:_id` | `DELETE` | Remove all items in cart of the user  |

## Orders endpoints

| endpoint                   | method | Description           |
| -------------------------- | ------ | --------------------- |
| `/api/order`               | `POST` | Add an order.         |
| `/api/orders/user/:userId` | `GET`  | Get orders by userId. |
| `/api/order/:_id/:userId`  | `GET`  | Get an order by Id.   |

## Orders endpoints

| endpoint         | method   | Description    |
| ---------------- | -------- | -------------- |
| `/api/user/:_id` | `GET`    | Get a user.    |
| `/api/user/:_id` | `PATCH`  | Update a user. |
| `/api/user/:_id` | `DELETE` | Delete a user. |
