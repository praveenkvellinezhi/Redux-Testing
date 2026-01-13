import "./App.css";
import { Routes, Route } from "react-router-dom";

/* ADMIN */
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import LoginPage from "./Features/Admin/Category/Pages/LoginPage";
import PostList from "./Features/Admin/Category/Pages/PostList";
import Createcategory from "./Features/Admin/Category/Pages/Createcategory";
import EditForm from "./Features/Admin/Category/Pages/EditForm";
import Subcategory from "./Features/Admin/Subcategory/pages/Subcategory";
import CreateSubcategory from "./Features/Admin/Subcategory/pages/CreateSubcategory";

/* USER */
import UserProtectedRoute from "./Components/UserProtectedRoute";
import UserLogin from "./Features/User/pages/UserLogin";
import UserCategory from "./Features/User/pages/category";
import UserSubcategory from "./Features/User/pages/Subcategory";
import Products from "./Features/User/pages/Products";
import ProductDetail from "./Features/User/pages/ProductDetail";
import Cart from "./Features/User/pages/cart";

function App() {
  return (
    <Routes>
      {/* ================= ADMIN ================= */}
      <Route path="/" element={<LoginPage />} />

      <Route element={<AdminProtectedRoute />}>
        <Route path="/Home" element={<PostList />} />
        <Route path="/createcategory" element={<Createcategory />} />
        <Route path="/editcategory/:id" element={<EditForm />} />
        <Route path="/Subcategory" element={<Subcategory />} />
        <Route path="/CreateSubcategory" element={<CreateSubcategory />} />
      </Route>

      {/* ================= USER ================= */}
      <Route path="/UserLogin" element={<UserLogin />} />

      <Route element={<UserProtectedRoute />}>
        <Route path="/UserCategory" element={<UserCategory />} />
        <Route path="/UserSubcategory/:id" element={<UserSubcategory />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:id" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
