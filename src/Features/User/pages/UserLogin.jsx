import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../Redux/Slices/userAuthslice";
import { useNavigate } from "react-router-dom";

function UserLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ FIX HERE
  const { status, error } = useSelector(
    (state) => state.userAuth
  );

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(userLogin(formData));

    console.log(resultAction,"lkkkkkkkkkkk");
    

    if (userLogin.fulfilled.match(resultAction)) {
      navigate("/UserCategory");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        User Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Logging in..."
            : "Login"}
        </button>

        {/* ✅ THIS WILL NOW SHOW */}
        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default UserLoginPage;
