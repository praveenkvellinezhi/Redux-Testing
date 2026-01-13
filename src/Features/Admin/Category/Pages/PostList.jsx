import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchPosts,
  selectAllPosts,
  getPostStatus,
  getPostError,
  deletePost,
} from "../../../../Redux/Slices/CategorySlice";

export default function CategoryGrid() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectAllPosts);
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  // 🔄 Fetch categories
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  // ⏳ Loading
  if (status === "loading") {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  // ❌ Error
  if (status === "failed") {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  // 🗑️ Delete category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    await dispatch(deletePost(id));
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10">
      {/* 🔝 Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Categories
        </h2>

        <button
          onClick={() => navigate("/createcategory")}
          className="px-5 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition"
        >
          + Create Category
        </button>
        <button className="px-5 py-2 text-sm font-medium text-white bg-green-400 rounded-lg hover:bg-green-800 transition"
         onClick={()=>navigate("/Subcategory")}>
          Subcategory
        </button>
      </div>

      {/* 📦 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No categories found
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 flex flex-col"
            >
              {/* 🖼 Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover hover:scale-110 transition duration-300"
                />
              </div>

             
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {category.description}
                </p>

          
                <div className="mt-auto pt-5 flex gap-2">
                
                  <button
                    className="
      flex-1 flex items-center justify-center gap-2
      px-4 py-2 text-sm font-semibold
      text-white
      rounded-xl
      bg-gradient-to-r from-gray-900 to-gray-700
      hover:from-gray-800 hover:to-gray-600
      shadow-md hover:shadow-lg
      transition-all duration-200 active:scale-95
    "
                  >
                    🔍 Explore
                  </button>

                 
                  <button
                    onClick={() => navigate(`/editcategory/${category.id}`)}
                    className="
      flex-1 flex items-center justify-center gap-2
      px-4 py-2 text-sm font-semibold
      text-white
      rounded-xl
      bg-gradient-to-r from-blue-600 to-blue-500
      hover:from-blue-700 hover:to-blue-600
      shadow-md hover:shadow-lg
      transition-all duration-200 active:scale-95
    "
                  >
                    ✏️ Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="
      flex-1 flex items-center justify-center gap-2
      px-4 py-2 text-sm font-semibold
      text-white
      rounded-xl
      bg-gradient-to-r from-red-600 to-red-500
      hover:from-red-700 hover:to-red-600
      shadow-md hover:shadow-lg
      transition-all duration-200 active:scale-95
    "
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
