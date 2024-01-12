import axios from "axios";
import { useState, useEffect } from "react";
import placeholder from "./assets/PlaceholderPicture.svg";
export function CartedProductsIndex() {
  const [cartedProducts, setCartedProducts] = useState([]);

  const handleClick = () => {
    axios
      .post("http://localhost:3000/orders.json")
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Order creation error", error.response.data);
      });
  };

  let imageSrc = (imageFile) => {
    if (imageFile === "./assets/PlaceholderPicture.svg") {
      return placeholder;
    } else {
      return imageFile;
    }
  };

  const handleIndexCartedProducts = () => {
    axios.get("http://localhost:3000/carted_products.json").then((response) => {
      setCartedProducts(response.data);
    });
  };
  useEffect(handleIndexCartedProducts, []);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (localStorage.jwt === undefined) {
    return (
      <div>
        <h1 className="text-headers">Please login to view your cart.</h1>
      </div>
    );
  } else if (cartedProducts[0] === undefined) {
    return (
      <div>
        <h1 className="text-headers">Your cart is currently empty. </h1>
      </div>
    );
  } else {
    let subtotal = 0.0;
    let quantity = 0;
    let tax = 0.09;
    for (let i = 0; i < cartedProducts.length; i++) {
      subtotal = subtotal + Number(cartedProducts[i].subtotal);
      quantity = quantity + Number(cartedProducts[i].quantity);
    }
    return (
      <div className="carted-products-container">
        <h1 className="carted-products-header">Your Shopping Cart</h1>
        <div className="carted-products-outisde-map-container">
          {cartedProducts.map((cartedProduct) => (
            <div className="carted-products-inside-map-container" key={cartedProduct.id}>
              <div className="carted-products-interior-container-1">
                <p>
                  <img className="carted-products-image" src={imageSrc(cartedProduct.images[0].url)} />
                </p>
              </div>
              <div className="carted-products-interior-container-2">
                <p className="product-name-p-tag font-bold tracking-tight text-gray-900">
                  {cartedProduct.product.name}
                </p>
                <p className="font-normal text-gray-700">Quantity: {cartedProduct.quantity}</p>
                <p>{cartedProduct.product.description}</p>
              </div>
              <div className="carted-products-interior-container-3">
                <p className="font-normal text-gray-700">Price: </p>{" "}
              </div>
              <div className="carted-products-interior-container-4">
                <p>
                  <strong>{USDollar.format(cartedProduct.product.price)}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="carted-products-subtotal-and-line-container">
          <div className="carted-products-horizontal-line" />
          <div className="carted-products-subtotal-interior-container">
            <div className="cp-subtotal-int-int-1"></div>
            <div className="cp-subtotal-int-int-2"></div>
            <div className="cp-subtotal-int-int-3">
              <div className="cp-subtotal-int-int-3-1">
                <div className="cp-subtotal-int-int-3-1-1">Subtotal ({quantity} items): </div>
                <div className="cp-subtotal-int-int-3-1-2">{USDollar.format(subtotal)}</div>
              </div>
              <div className="cp-subtotal-int-int-3-2">
                <div className="cp-subtotal-int-int-3-2-1">Tax: </div>
                <div className="cp-subtotal-int-int-3-2-2">{USDollar.format(subtotal * tax)}</div>
              </div>
              <div className="cp-subtotal-int-int-3-3">
                <div className="cp-subtotal-int-int-3-3-1">Total: </div>
                <div className="cp-subtotal-int-int-3-3-2">{USDollar.format(subtotal + subtotal * tax)}</div>
              </div>
              <div className="cp-subtotal-int-int-3-4">
                <button onClick={handleClick}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
