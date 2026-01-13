import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSubcategorybyId,
  selectSubcategoryById,
  getuserStatus,
  getUserError,
} from "../../../Redux/Slices/userSlice";

export default function UserSubcategory() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const subcategory = useSelector(selectSubcategoryById);
  const status = useSelector(getuserStatus);
  const error = useSelector(getUserError);


  useEffect(() => {
    if (id) {
      dispatch(fetchSubcategorybyId(id));

    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  if (!subcategory) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No product found
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={
          subcategory.imageUrl ||
          subcategory.SubImageUrl ||
          "https://via.placeholder.com/600x400"
        }
        alt={subcategory.title}
        className="w-full h-80 object-cover rounded-xl"
      />

      <h1 className="text-3xl font-bold mt-6">
        {subcategory.title}
      </h1>

      <p className="text-gray-500 mt-2">
        Main Category
      </p>
    </div>
  );
}
