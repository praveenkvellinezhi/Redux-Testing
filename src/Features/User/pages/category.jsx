import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchuserPosts,
  selectAllUsers,
  getUserError,
  getuserStatus,
} from "../../../Redux/Slices/userSlice";

export default function UserCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectAllUsers);
  const status = useSelector(getuserStatus);
  const error = useSelector(getUserError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchuserPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-10 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        User Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => {
          const mainImage =
            category.MainCategory?.imageUrl &&
            !category.MainCategory.imageUrl.includes("undefined")
              ? category.MainCategory.imageUrl
              : null;

          return (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col"
            >
              {/* IMAGE */}
              <div className="h-48 bg-gray-200">
                <img
                  src={
                    category.SubImageUrl ||
                    mainImage ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={category.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.title}
                </h3>

                <div className="mt-auto pt-4 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/UserSubcategory/${category.id}`)
                    }
                    className="flex-1 px-4 py-2 text-sm text-white bg-gray-800 rounded-lg"
                  >
                    Explore
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/editsubcategory/${category.id}`)
                    }
                    className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg"
                  >
                    Edit
                  </button>

                  <button className="flex-1 px-4 py-2 text-sm text-white bg-red-600 rounded-lg">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
