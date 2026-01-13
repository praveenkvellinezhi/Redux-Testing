import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchsubcategory, addsubcategory } from "../../../../Redux/Slices/subcategorySlice";
import { fetchPosts, selectAllPosts } from "../../../../Redux/Slices/CategorySlice";

function CreateSubcategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectAllPosts);

  const initialState = {
    title: "",
    description: "",
    image: null,
    category: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category); // ✅
    data.append("image", formData.image);

    console.log("Sending categoryId:", formData.category);



    const resultAction = await dispatch(addsubcategory(data));

    if (addsubcategory.fulfilled.match(resultAction)) {
       dispatch(fetchsubcategory());
      setFormData(initialState);
      navigate("/Subcategory");
    }
  };

  return (
    <form className="max-w-md mx-auto bg-white p-6 rounded-xl shadow" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Create Subcategory</h2>

      <input
        type="text"
        name="title"
        placeholder="Subcategory Title"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full mb-4"
        required
      />

      <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        Create
      </button>
    </form>
  );
}

export default CreateSubcategory;
