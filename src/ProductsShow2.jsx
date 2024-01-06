export function ProductsShow2(props) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="joint-form-container flex">
      <div className="mb-5">
        <p htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Name:
        </p>
        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {props.product.name}
        </p>
      </div>
      <div className="mb-5">
        <p htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
          Price:
        </p>
        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          {USDollar.format(props.product.price)}
        </p>
      </div>
      <div className="mb-5">
        <p htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
          Description:
        </p>
        <p className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          {props.product.description}
        </p>
      </div>
    </div>
  );
}
