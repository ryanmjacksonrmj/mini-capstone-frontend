import { CategorySelect } from "./Categories";
import placeholder from "./assets/PlaceholderPicture.svg";
import { useState, useEffect } from "react";

export function ProductsIndex(props) {
  const categoriesWithAllProducts = [{ id: 1000, name: "All Products" }, ...props.categories];
  const [selected, setSelected] = useState(categoriesWithAllProducts[0]);

  
  useEffect(
    () => {
      let params = selected.id;
      props.productsupdate(params);
    },
    [selected.id, props.productsupdate]
  );

  // let params = selected.id
  // props.productsupdate(params)

  let imageSrc = (imageFile) => {
    if (imageFile === "./assets/PlaceholderPicture.svg") {
      return placeholder;
    } else {
      return imageFile;
    }
  };

  return (
    <div>
      <h1 className="text-headers">All products</h1>
      <CategorySelect
        selected={selected}
        setSelected={setSelected}
        categories={props.categories}
        categoriesWithAllProducts={categoriesWithAllProducts}
      />
      <div>
        <div className="index-container-target">
          {props.products.map((product) => (
            <div key={product.id}>
              <button
                className="text-left index-card-target flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
                onClick={() => props.onShowProduct(product)}
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src={imageSrc(product.images[0].url)}
                  onError="this.onerror=null; 
          this.src='./assets/PlaceholderPicture.svg';"
                />{" "}
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <p className="font-bold tracking-tight text-gray-900">{product.name}</p>
                  <p className="font-normal text-gray-700">{product.price}</p>
                </div>
              </button>
              <div>
                <form className="max-w-xs mx-auto">
                  <div className="relative flex items-center max-w-[8rem]">
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="quantity-input"
                      className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="quantity-input"
                      data-input-counter
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                      placeholder="1"
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="quantity-input"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
