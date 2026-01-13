import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePosts, fetchPosts } from "../../../../Redux/Slices/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
function EditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const category = useSelector((state) =>
    state.posts.posts.find((item) => item.id === id)
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        image: null,
      });
    } else if (!category) {
      dispatch(fetchPosts());
    }
  }, [category, dispatch]);

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
    if (formData.image) data.append("image", formData.image);

    const result = await dispatch(updatePosts({ id, formData: data }));

    if (updatePosts.fulfilled.match(result)) {
      navigate("/home");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <input type="file" name="image" onChange={handleChange} />

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}

export default EditForm;
