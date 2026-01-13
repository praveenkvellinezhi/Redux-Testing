import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { selectCartcount} from "../../../Redux/Slices/cartSlice";

function FloatingCart() {
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartcount);
  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed top-6 right-6 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      title="View Cart"
    >
      <ShoppingCart size={22} />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      )}
    </button>
  );
}

export default FloatingCart;
