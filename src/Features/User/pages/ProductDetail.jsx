import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  
  fetchProductById,
  selectSingleProduct,
  getProductserror,
  getProductsstatus,
} from "../../../Redux/Slices/Productslice";
import { addTocart,fetchCart } from "../../../Redux/Slices/cartSlice";
import FloatingCart from "../components/FloatingCart";

const FALLBACK_IMAGE = "https://via.placeholder.com/400x400?text=No+Image";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectSingleProduct);
  const status = useSelector(getProductsstatus);
  const error = useSelector(getProductserror);
  const userId = useSelector((state) => state.userAuth.userId);


  // 🔹 LOCAL UI STATE
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  // reset selections when product changes
  useEffect(() => {
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
  }, [product]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!product) return null;

  const currentSizes = selectedColor?.sizes || [];

  const selectedStock = selectedSize?.stock || 0;
const handleAddToCart = async () => {
  if (!selectedColor || !selectedSize) return;

    if (!userId) {
    alert("Please login first");
    return;
  }

  const cartPayload = {
    userId,
    productId: product._id,
    quantity,
    size: selectedSize.size,
    color: selectedColor.color,
  };

  const result = await dispatch(addTocart(cartPayload));

  if (addTocart.fulfilled.match(result)) {
     dispatch(fetchCart(userId));
    alert("Added to cart ✅");
    
  } else {
    alert(result.payload || "Failed to add to cart");
  }
  console.log("ADD TO CART USER ID:", localStorage.getItem("userId"));

};



  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
       <FloatingCart />
      {/* IMAGE */}
      <img
        src={product.images?.[0] || FALLBACK_IMAGE}
        alt={product.title}
        className="w-full rounded-xl shadow"
      />

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <p className="text-gray-500 mt-2">{product.category?.[0]?.name}</p>

        {/* PRICE */}
        <div className="mt-4">
          <span className="text-3xl font-bold text-green-600">
            ₹{product.offerPrice}
          </span>
          <span className="line-through text-gray-400 ml-3">
            ₹{product.actualPrice}
          </span>
          <span className="ml-3 text-red-500">{product.discount}% OFF</span>
        </div>

        <p className="mt-4 text-gray-700">{product.description}</p>

        {/* COLOR SELECT */}
        <div className="mt-6">
          <p className="font-semibold mb-2">Color</p>
          <div className="flex gap-3">
            {product.colors?.map((c) => (
              <button
                key={c._id}
                onClick={() => {
                  setSelectedColor(c);
                  setSelectedSize(null);
                  setQuantity(1);
                }}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor?._id === c._id
                    ? "border-black scale-110"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: c.color }}
              />
            ))}
          </div>
        </div>

        {/* SIZE SELECT */}
        {selectedColor && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Size</p>
            <div className="flex gap-3 flex-wrap">
              {currentSizes.map((s) => (
                <button
                  key={s._id}
                  disabled={s.stock === 0}
                  onClick={() => {
                    setSelectedSize(s);
                    setQuantity(1);
                  }}
                  className={`px-4 py-2 rounded border ${
                    selectedSize?._id === s._id
                      ? "border-black bg-black text-white"
                      : "border-gray-300"
                  } ${s.stock === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUANTITY */}
        {selectedSize && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border rounded"
              >
                −
              </button>

              <span className="font-medium">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((q) => Math.min(selectedStock, q + 1))
                }
                className="px-3 py-1 border rounded"
              >
                +
              </button>

              <span className="text-sm text-gray-500">
                (Available: {selectedStock})
              </span>
            </div>
          </div>
        )}

        {/* ADD TO CART */}
       <button
  onClick={handleAddToCart}
  disabled={!selectedColor || !selectedSize}
  className={`mt-8 w-full py-3 rounded-full font-semibold ${
    !selectedColor || !selectedSize
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-yellow-400 hover:bg-yellow-500"
  }`}
>
  Add to Cart
</button>

      </div>
    </div>
  );
}

export default ProductDetail;
