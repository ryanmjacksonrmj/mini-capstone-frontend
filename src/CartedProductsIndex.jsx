export function CartedProductsIndex(props) {
  console.log("Here are props!");
  console.log(props);
  console.log("There were props!");
  if (localStorage.jwt === undefined) {
    return (
      <div>
        <h1 className="text-headers">Please login to view your cart.</h1>
      </div>
    );
  } else if (props.cartedProducts[0] === undefined) {
    return (
      <div>
        <h1 className="text-headers">Your cart is currently empty. </h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-headers">Your Shopping Cart</h1>
        <div className="index-container-target">
          {props.cartedProducts.map((cartedProduct) => (
            <div key={cartedProduct.id}>
              <p>{cartedProduct.product.name}</p>
              <p>{cartedProduct.product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
