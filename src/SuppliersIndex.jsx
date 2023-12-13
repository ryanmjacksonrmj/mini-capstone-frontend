export function SuppliersIndex(props) {
  return (
    <div className="mb-5">
      <label htmlFor="suppliers" className="block mb-2 text-sm font-medium text-gray-900">
        Supplier
      </label>
      <select
        name="supplier_id"
        id="suppliers"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        defaultValue="Choose a supplier"
      >
        <option>Choose a supplier</option>
        {props.suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
        ))}
      </select>
    </div>
  );
}
