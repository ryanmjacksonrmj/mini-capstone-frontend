import axios from "axios";
import { useState, useEffect } from "react";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";
import { ProductsShow } from "./ProductsShow";
import { Modal } from "./Modal";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { CartedProductsIndex } from "./CartedProductsIndex";

export function Content() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [cartedProducts, setCartedProducts] = useState([]);

  const handleIndexProducts = () => {
    console.log("handleIndexProducts");
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  const handleIndexCartedProducts = () => {
    console.log("handleIndexCartedProducts");
    axios.get("http://localhost:3000/carted_products.json").then((response) => {
      console.log(response.data);
      setCartedProducts(response.data);
    });
  };

  const handleCreateProduct = (params, successCallback) => {
    console.log("handleCreateProduct", params);
    axios
      .post("http://localhost:3000/products.json", params)
      .then((response) => {
        console.log(response.data);
        setProducts([...products, response.data]);
        successCallback();
      })
      .catch((error) => {
        console.error("Create Product Error:", error.response.data);
      });
  };

  const handleShowProduct = (product) => {
    console.log("handleShowProduct", product);
    setIsProductsShowVisible(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsProductsShowVisible(false);
  };

  const handleUpdateProduct = (id, params, successCallback) => {
    console.log("handleUpdateProduct", params);
    axios.patch(`http://localhost:3000/products/${id}.json`, params).then((response) => {
      setProducts(
        products.map((product) => {
          if (product.id === response.data.id) {
            return response.data;
          } else {
            return product;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroyProduct = (product) => {
    console.log("handleDestroyProduct", product);
    axios.delete(`http://localhost:3000/products/${product.id}.json`).then((response) => {
      console.log(response.data);
      setProducts(products.filter((p) => p.id !== product.id));
      handleClose();
    });
  };

  const handleIndexSuppliers = () => {
    console.log("handleIndexSuppliers");
    axios.get("http://localhost:3000/suppliers.json").then((response) => {
      console.log(response.data);
      setSuppliers(response.data);
    });
  };

  useEffect(handleIndexSuppliers, []);
  useEffect(handleIndexProducts, []);
  useEffect(handleIndexCartedProducts, []);

  return (
    <div>
      <div id="content-wrap">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products/new"
            element={<ProductsNew onCreateProduct={handleCreateProduct} suppliers={suppliers} />}
          />
          <Route path="/products/:id" element={<ProductsShow />} />
          <Route path="/products" element={<ProductsIndex products={products} onShowProduct={handleShowProduct} />} />
          <Route path="/" element={<ProductsIndex products={products} onShowProduct={handleShowProduct} />} />
          <Route path="/shoppingcart" element={<CartedProductsIndex products={cartedProducts} />} />
        </Routes>
        <Modal show={isProductsShowVisible} onClose={handleClose}>
          <ProductsShow
            product={currentProduct}
            onUpdateProduct={handleUpdateProduct}
            onDestroyProduct={handleDestroyProduct}
          />
        </Modal>
      </div>
    </div>
  );
}
