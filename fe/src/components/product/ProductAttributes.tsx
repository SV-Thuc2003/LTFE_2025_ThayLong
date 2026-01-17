interface Props {
  attributes: Record<string, string>;
}

const cleanText = (text: string) => {
  return text
    // Xóa ngoặc rỗng xuống dòng
    .replace(/\(\s*\)/g, "")
    // Gộp nhiều xuống dòng thành 1
    .replace(/\n{2,}/g, "\n")
    .trim();
};

const ProductAttributes = ({ attributes }: Props) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Thông tin chi tiết
      </h2>

      <table className="w-full border border-gray-200">
        <tbody>
          {Object.entries(attributes).map(([key, value]) => {
            const cleanValue = cleanText(value);

            return (
              <tr key={key} className="border-b align-top">
                <td className="p-3 font-medium bg-gray-50 w-1/3">
                  {key}
                </td>

                <td className="p-3">
                  <div className="space-y-2 leading-relaxed">
                    {cleanValue
                      .split("*")
                      .map((line, index) =>
                        line.trim() ? (
                          <p key={index}>{line.trim()}</p>
                        ) : null
                      )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAttributes;
