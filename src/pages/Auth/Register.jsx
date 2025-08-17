import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Social from "../../pages/Auth/Social";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosUserSecure = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);

      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: profilePic,
        role: "user",
        created_at: new Date().toISOString(),
        last_signin_at: new Date().toISOString(),
      };

      await axiosUserSecure.post("/api/users", userInfo);
      await updateUserProfile(data.name, profilePic);

      toast.success("Account created successfully!");
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Registration error:", err.message);
       toast.error(`${err.message}. Try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("image", img);

    try {
      const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(imgUploadUrl, formData);
      setProfilePic(res.data.data.display_url);
    } catch (err) {
      console.error("Image upload failed:", err);
       toast.error("Failed to upload image.");
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="space-y-2">
              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}

              {/* Profile Photo */}
              <label className="label">Profile Photo</label>
              <input
                type="file"
                onChange={handlePhotoUpload}
                className="file-input file-input-bordered w-full"
              />

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters required" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}

              <button
                type="submit"
                className="btn bg-green-400 w-full mt-4 text-white"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="text-center mt-4 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-bg-green-400 hover:underline">
                  Login here
                </a>
              </p>
            </fieldset>
          </form>
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Register;
