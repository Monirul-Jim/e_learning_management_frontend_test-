import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export type TUser = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password1: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // Added to set specific field errors
    watch,
  } = useForm();

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: TUser) => {
    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully");
      navigate("/login");
    } catch (err: any) {
      if (err.data) {
        // Handle field-specific errors from the server
        if (err.data.username) {
          setError("username", { type: "manual", message: err.data.username });
        }
        if (err.data.email) {
          setError("email", { type: "manual", message: err.data.email });
        }
        if (err.data.password1) {
          setError("password1", {
            type: "manual",
            message: err.data.password1,
          });
        }
      } else {
        console.error("Registration error", err);
      }
    }
  };

  const password = watch("password");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {isError && (
          <div className="mb-4 text-red-600">
            <p>
              Registration failed: {error?.data?.message || "An error occurred"}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              {...register("first_name", {
                required: "First name is required",
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter first name"
            />
            {errors.first_name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              {...register("last_name", { required: "Last name is required" })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter last name"
            />
            {errors.last_name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>

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
              type="password"
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

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("password1", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Confirm password"
            />
            {errors.password1 && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password1.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <a href="/login">Already have account login</a>
      </div>
    </div>
  );
};

export default SignUp;
