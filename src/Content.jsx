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
import { ProductsShow2 } from "./ProductsShow2";
import { CategorySelect } from "./Categories";

export function Content() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleIndexProducts = (params) => {
    if (params === undefined) {
      params = { id: "1000" };
    }
    axios.get(`/products.json?id=${params.id}`).then((response) => {
      setProducts(response.data);
    });
  };

  const handleIndexCategories = () => {
    axios.get("/categories.json").then((response) => {
      setCategories(response.data);
    });
  };

  const handleCreateProduct = (params, successCallback) => {
    axios
      .post("/products.json", params)
      .then((response) => {
        setProducts([...products, response.data]);
        successCallback();
      })
      .catch((error) => {
        console.error("Create Product Error:", error.response.data);
      });
  };

  const handleShowProduct = (product) => {
    setIsProductsShowVisible(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    setIsProductsShowVisible(false);
  };

  const handleUpdateProduct = (id, params, successCallback) => {
    axios.patch(`/products/${id}.json`, params).then((response) => {
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
    axios.patch(`/products2/${product.id}.json`).then((response) => {
      setProducts(products.filter((p) => p.id !== product.id));
      handleClose();
    });
  };

  const handleIndexSuppliers = () => {
    axios.get("/suppliers.json").then((response) => {
      setSuppliers(response.data);
    });
  };

  const handleIsAdmin = () => {
    setIsAdmin(localStorage.admin);
  };

  useEffect(handleIndexSuppliers, []);
  useEffect(handleIndexProducts, []);
  useEffect(handleIsAdmin, []);
  useEffect(handleIndexCategories, []);

  function pickShow(isAdmin) {
    if (isAdmin == "true") {
      return (
        <ProductsShow
          product={currentProduct}
          onUpdateProduct={handleUpdateProduct}
          onDestroyProduct={handleDestroyProduct}
        />
      );
    } else {
      return <ProductsShow2 product={currentProduct} />;
    }
  }

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
          <Route path="/products-edit/:id" element={<ProductsShow />} />
          <Route
            path="/products"
            element={
              <ProductsIndex
                products={products}
                productsupdate={handleIndexProducts}
                onShowProduct={handleShowProduct}
                categories={categories}
              >
                {" "}
                <CategorySelect categories={categories} />{" "}
              </ProductsIndex>
            }
          />
          <Route
            path="/"
            element={
              <ProductsIndex
                products={products}
                productsupdate={handleIndexProducts}
                onShowProduct={handleShowProduct}
                categories={categories}
              >
                {" "}
                <CategorySelect categories={categories} />{" "}
              </ProductsIndex>
            }
          />
          <Route path="/shoppingcart" onShowProduct={handleShowProduct} element={<CartedProductsIndex />} />
          <Route path="/products/:id" element={<ProductsShow2 />} />
          <Route path="/products/:category" element={<ProductsIndex />} />
        </Routes>
        <Modal show={isProductsShowVisible} onClose={handleClose}>
          {pickShow(isAdmin)}
        </Modal>
      </div>
    </div>
  );
}
