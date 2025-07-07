import React from "react";
import { useForm } from "react-hook-form";


const Login = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();



  



  return (
    <div>
      <form onSubmit={handleSubmit()}>
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
            <a className="link link-hover">Forgot password?</a>
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
      {/* <Social></Social> */}
    </div>
  );
};

export default Login;
