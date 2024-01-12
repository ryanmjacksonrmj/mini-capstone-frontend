import { CategorySelect } from "./Categories";
import placeholder from "./assets/PlaceholderPicture.svg";
import { useState, useEffect } from "react";
import RealPaperBooksLogo from "./assets/RealPaperBooksLogo.png";
import axios from "axios";

export function ProductsIndex(props) {
  const categoriesWithAllProducts = [{ id: 1000, name: "All Products" }, ...props.categories];
  const [selected, setSelected] = useState(categoriesWithAllProducts[0]);
  const [errors, setErrors] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    let params = { id: selected.id };
    props.productsupdate(params);
  }, [selected]);

  let imageSrc = (imageFile) => {
    if (imageFile === "./assets/PlaceholderPicture.svg") {
      return placeholder;
    } else {
      return imageFile;
    }
  };

  const handleSubmit = (event, selectedProduct) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/carted_products.json", params)
      .then((response) => {
        event.target.reset();
      })
      .catch((error) => {
        setErrors(["You must be logged in to add something to your cart"]);
      });
  };

  return (
    <div className="products-index-div">
      <div className="products-index-top-div">
        <div className="products-header">
          <img id="products-image-header" src={RealPaperBooksLogo} />
        </div>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
        <div className="category-select-element">
          <CategorySelect
            selected={selected}
            setSelected={setSelected}
            categories={props.categories}
            categoriesWithAllProducts={categoriesWithAllProducts}
          />
        </div>
      </div>
      <div>
        <div className="index-container-target">
          {props.products.map((product) => (
            <div className="card-parent-div" key={product.id}>
              <button
                className="text-left index-card-target flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
                onClick={() => props.onShowProduct(product)}
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src={imageSrc(product.images[0].url)}
                  onError={() => {
                    this.onerror = null;
                    this.src = "./assets/PlaceholderPicture.svg";
                  }}
                />{" "}
                <div className="box-with-name-and-price flex flex-col justify-between p-4 leading-normal">
                  <p className="product-name-p-tag font-bold tracking-tight text-gray-900">{product.name}</p>
                  <p className="font-normal text-gray-700">{USDollar.format(product.price)}</p>
                </div>
              </button>
              <form className="quantity-and-order-form" onSubmit={(event) => handleSubmit(event, selectedProduct)}>
                <input type="hidden" name="product_id" value={product.id} />
                <select id="quantityOrderedSelectElement" name="quantity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
