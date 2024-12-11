import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import verifyToken from "../redux/api/verifyToken";
import { useAppDispatch } from "../redux/feature/hooks";
import { setUser } from "../redux/feature/authSlice";
import { useState } from "react";

type ErrorResponse = {
  email?: string;
  password?: string;
};
type TLogin = {
  email: string;
  password: string;
};
const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TLogin>();

  const onSubmit = async (data: TLogin) => {
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.access);

      dispatch(setUser({ user: user, token: res.access }));

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      if ((err as FetchBaseQueryError)?.data) {
        const errorData = (err as FetchBaseQueryError).data as ErrorResponse;
        if (errorData.email) {
          setError("email", { type: "manual", message: errorData.email });
        }
        if (errorData.password) {
          setError("password", { type: "manual", message: errorData.password });
        }
      } else {
        console.error("Login failed", err);
        toast.error("An error occurred during login");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
            />
            <label
              htmlFor="showPassword"
              className="ml-2 text-sm text-gray-700"
            >
              Show Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <a href="/register">Don't have account register</a>
      </div>
    </div>
  );
};

export default Login;
