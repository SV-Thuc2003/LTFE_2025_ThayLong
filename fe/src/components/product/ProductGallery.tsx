import { useEffect,useState } from "react";
interface Props {
  images: string[];
}

const ProductGallery = ({ images }: Props) => {
  // const mainImage = images?.[0];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 1000); 

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center border rounded">
        No image
      </div>
    );
  }

  return (
    <div>
      <img
        src={images[activeIndex]}
        alt=""
        className="w-full h-96 object-contain border rounded"
      />

      <div className="flex gap-2 mt-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            onClick={() => setActiveIndex(index)}
            className={`w-16 h-16 object-contain border rounded cursor-pointer transition
              ${
                index === activeIndex
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : "hover:border-gray-400"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
