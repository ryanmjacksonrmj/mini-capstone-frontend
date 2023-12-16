export function ProductsIndex(props) {
  return (
    <div>
      <h1 className="text-headers">All products</h1>
      <div className="index-container-target">
      {props.products.map((product) => (
          <button key={product.id} className="text-left index-card-target flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100" onClick={() => props.onShowProduct(product)}>
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={product.images[0].url}
            onError="this.onerror=null; 
          this.src='./assets/PlaceholderPicture.svg';"
          />{" "}
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="font-bold tracking-tight text-gray-900">{product.name}</p>
            <p className="font-normal text-gray-700">{product.price}</p>
          </div>
          </button>
      ))}
      </div>
    </div>
  );
}
