import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
  getProductserror,
  getProductsstatus,
} from "../../../Redux/Slices/Productslice";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import FloatingCart from "../components/FloatingCart";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/300x300?text=No+Image";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(selectAllProducts);
  const status = useSelector(getProductsstatus);
  const error = useSelector(getProductserror);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="relative px-6 py-8">
      {/* 🛒 View Cart Button */}
    <FloatingCart />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden bg-gray-100">
              <img
                src={product.category?.[0]?.image || FALLBACK_IMAGE}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
              />

              {/* Tags */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isLatestProduct && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                {product.isOfferProduct && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                    OFFER
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between h-[320px]">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h2>

                {product.category?.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {product.category[0].name}
                  </p>
                )}

                {product.subcategory?.length > 0 && (
                  <p className="text-xs text-gray-400">
                    {product.subcategory[0].title}
                  </p>
                )}

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600">
                    ₹{product.offerPrice}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    ₹{product.actualPrice}
                  </span>
                  <span className="text-xs text-red-500 font-medium">
                    {product.discount}% OFF
                  </span>
                </div>

                {/* Colors */}
                <div className="flex gap-2 mt-3">
                  {product.colors?.map((c) => (
                    <span
                      key={c._id}
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: c.color }}
                      title={c.color}
                    />
                  ))}
                </div>

                {/* Stock */}
                <p className="text-sm mt-2">
                  Stock:{" "}
                  <span
                    className={
                      product.totalStock > 0
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {product.totalStock}
                  </span>
                </p>
              </div>

              {/* View Details */}
              <button
                onClick={() => navigate(`/products/${product._id}`)}
                className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-full transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
