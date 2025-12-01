import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import verifyToken from "../redux/api/verifyToken";
import { useAppDispatch } from "../redux/feature/hooks";
import { setUser } from "../redux/feature/authSlice";
// -----------------------------------------------
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  BookOpen,
  ArrowRight,
  Loader,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import CopyCredential from "../components/CopyCredential/CopyCredential";
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
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TechFest
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Welcome Back
          </h2>
          <p className="text-muted-foreground">
            Sign in to continue your learning journey
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm flex items-center gap-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm flex items-center gap-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                {/* Show Password Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showPasswordCheck"
                    checked={showPassword}
                    onCheckedChange={(checked: boolean) =>
                      setShowPassword(checked)
                    }
                    className="border-border/50"
                  />

                  <Label
                    htmlFor="showPasswordCheck"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Show password
                  </Label>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group h-12"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      Sign In
                    </div>
                  )}
                </Button>

                {/* Forgot Password */}
                <div className="text-center">
                  <a
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
                  >
                    Forgot your password?
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors duration-200 inline-flex items-center gap-1 group"
            >
              Create one now
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </p>
          <div className="mb-6">
  <h3 className="text-sm font-semibold mb-2">Admin Credentials</h3>
  <CopyCredential label="Email: admin@gmail.com" value="admin@gmail.com" />
  <CopyCredential label="Password: 12345678" value="123456" />
</div>

<div className="mb-6">
  <h3 className="text-sm font-semibold mb-2">Student Credentials</h3>
  <CopyCredential label="Email: rahim@gmail.com" value="rahim@gmail.com" />
  <CopyCredential label="Password: 123456aS!@" value="123456aS!@" />
</div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
