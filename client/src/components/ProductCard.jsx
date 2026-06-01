import useCartStore from "../store/cartStore";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl hover:-translate-y-3 transition border border-white/20 text-white">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <span className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
          {product.category}
        </span>

        <span className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm">
          Stock: {product.stock}
        </span>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-extrabold">
          {product.name}
        </h2>

        <p className="text-gray-300 mt-2">
          {product.unit}
        </p>

        <p className="text-4xl font-extrabold text-orange-400 mt-4">
          ₹{Number(product.price).toLocaleString()}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full mt-6 bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-xl"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;