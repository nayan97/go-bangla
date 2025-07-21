import React from "react";
import { useForm } from "react-hook-form";
import Social from "../../pages/Auth/Social";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser, resetPassword } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    // console.log(data);
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleForgotPassword = async () => {
    const email = getValues("email");

    if (!email) {
      return Swal.fire("Oops!", "Please enter your email first.", "warning");
    }

    try {
      await resetPassword(email);
      Swal.fire(
        "Success!",
        "Password reset link sent to your email.",
        "success"
      );
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input w-full"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-red-600">
              password is required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p role="alert" className="text-red-600">
              password is must be 6 character.
            </p>
          )}
          <div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="link link-hover text-blue-600"
            >
              Forgot password?
            </button>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </fieldset>
      </form>
      <Social></Social>
    </div>
  );
};

export default Login;
