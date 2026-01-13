import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPosts, fetchPosts } from "../../../../Redux/Slices/CategorySlice";
import { useNavigate } from "react-router-dom";

function Createcategory() {
  const dispatch = useDispatch();
  const navigate=useNavigate();

const initialState ={
    name: "",
    description: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialState);

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
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("image", formData.image);



    const resultAction = await dispatch(addPosts(data));

    // ✅ only if API success
    if (addPosts.fulfilled.match(resultAction)) {
      await dispatch(fetchPosts());
      setFormData(initialState); // reset form
      navigate("/home"); // go to home
    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-bold mb-4">Create Category</h2>

      <input
        type="text"
        name="name"
        placeholder="Category Name"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

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

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Create
      </button>
    </form>
  );
}

export default Createcategory;
