export function ProductsIndex(props) {
  return (
    <div>
      <h1 className="text-headers">All products</h1>
      {props.products.map((product) => (
        <div key={product.id}>
          <h2 id="produdct-name-index">{product.name}</h2>
          <p>{product.price}</p>
          <p id="more-info">{product.description}</p>
          <div id="more-info-top">  
          </div>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => props.onShowProduct(product)}>More info</button>
          <div id="more-info-bottom">
          </div>
        </div>
      ))}
    </div>
  );
}
