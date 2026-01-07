interface Props {
  attributes: Record<string, string>;
}

const ProductAttributes = ({ attributes }: Props) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>

      <table className="w-full border">
        <tbody>
          {Object.entries(attributes).map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="p-3 font-medium bg-gray-50 w-1/3">
                {key}
              </td>
              <td className="p-3">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAttributes;
