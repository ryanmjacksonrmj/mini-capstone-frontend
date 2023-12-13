## carted_products

| data_type | column_name |
| --------- | ----------- |
| integer   | user_id     |
| integer   | product_id  |
| integer   | quantity    |
| string    | status      |
| integer   | order_id    |
| datetime  | created_at  |
| datetime  | updated_at  |

## categories

| data_type | column_name |
| --------- | ----------- |
| string    | name        |
| datetime  | created_at  |
| datetime  | updated_at  |

## category_products

| data_type | column_name |
| --------- | ----------- |
| integer   | category_id |
| integer   | product_id  |
| datetime  | created_at  |
| datetime  | updated_at  |

## images

| data_type | column_name |
| --------- | ----------- |
| string    | url         |
| integer   | product_id  |
| datetime  | created_at  |
| datetime  | updated_at  |

## orders

| data_type | column_name |
| --------- | ----------- |
| integer   | user_id     |
| decimal   | subtotal    |
| decimal   | tax         |
| decimal   | total       |
| datetime  | created_at  |
| datetime  | updated_at  |

## products

| data_type | column_name |
| --------- | ----------- |
| string    | name        |
| decimal   | price       |
| text      | description |
| datetime  | created_at  |
| datetime  | updated_at  |
| integer   | inventory   |
| integer   | supplier_id |

## suppliers

| data_type | column_name  |
| --------- | ------------ |
| string    | name         |
| string    | email        |
| string    | phone_number |
| datetime  | created_at   |
| datetime  | updated_at   |

## users

| data_type | column_name     |
| --------- | --------------- |
| string    | name            |
| string    | email           |
| string    | password_digest |
| datetime  | created_at      |
| datetime  | updated_at      |
| boolean   | admin           |
