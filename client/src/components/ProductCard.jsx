import { useState } from "react";
import useCartStore from "../store/cartStore";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    setQuantity(1);
  };

  return (
    <div className="bg-white/10 border border-white/10 rounded-[2rem] overflow-hidden shadow-xl hover:-translate-y-2 transition">
      <div className="relative h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-xl font-bold">
          {product.category}
        </span>

        <span className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-xl font-bold">
          Stock: {product.stock}
        </span>
      </div>

      <div className="p-6 text-white">
        <h2 className="text-3xl font-extrabold">{product.name}</h2>

        <p className="text-slate-300 mt-2">{product.unit}</p>

        <h3 className="text-4xl font-extrabold text-orange-500 mt-5">
          ₹{Number(product.price).toLocaleString()}
        </h3>

        <div className="mt-6 flex gap-3">
          <div className="flex items-center bg-white rounded-2xl p-2 text-slate-900">
            <button
              onClick={decrease}
              className="w-10 h-10 bg-slate-200 rounded-xl font-extrabold hover:bg-slate-300"
            >
              -
            </button>

            <span className="w-12 text-center font-extrabold text-xl">
              {quantity}
            </span>

            <button
              onClick={increase}
              className="w-10 h-10 bg-orange-500 text-white rounded-xl font-extrabold hover:bg-orange-600"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-extrabold transition"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;