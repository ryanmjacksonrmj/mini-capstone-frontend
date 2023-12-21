export function CartedProductsIndex(props) {
console.log("Here are props!");
console.log(props);
console.log("There were props!");  
	return (
    <div>
      <h1 className="text-headers">Your Shopping Cart</h1>
        <div className="index-container-target">
        {props.products.map((product) => (
        <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
				</div>
      ))}
      </div>
    </div>
  );
}















// ## carted_products

// | data_type | column_name |
// | --------- | ----------- |
// | integer   | user_id     |
// | integer   | product_id  |
// | integer   | quantity    |
// | string    | status      |
// | integer   | order_id    |
// | datetime  | created_at  |
// | datetime  | updated_at  