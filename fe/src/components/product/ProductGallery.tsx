interface Props {
  images: string[];
}

const ProductGallery = ({ images }: Props) => {
  const mainImage = images?.[0];

  return (
    <div>
      <img
        src={mainImage}
        alt=""
        className="w-full h-96 object-contain border rounded"
      />

      <div className="flex gap-2 mt-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-16 h-16 object-contain border rounded"
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
