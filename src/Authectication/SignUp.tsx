import { useForm, type SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserPlus,
  BookOpen,
  ArrowRight,
  Loader,
  CheckCircle,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
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

export type TUser = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password1: string;
};
interface RegisterError {
  data: {
    username?: string;
    email?: string;
    password1?: string;
  };
  message?: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<TUser>(); // Specify TUser as the type here

  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully");
      navigate("/login");
    } catch (err) {
      // Type the error with a custom type
      const error = err as RegisterError;

      if (error?.data) {
        // Handle field-specific errors from the server
        if (error.data.username) {
          setError("username", {
            type: "manual",
            message: error.data.username,
          });
        }
        if (error.data.email) {
          setError("email", { type: "manual", message: error.data.email });
        }
        if (error.data.password1) {
          setError("password1", {
            type: "manual",
            message: error.data.password1,
          });
        }
      } else {
        console.error("Registration error", err);
      }
    }
  };

  const password = watch("password");
  const passwordRequirements = [
    { label: "At least 8 characters", met: password?.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password || "") },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password || "") },
    { label: "Contains number", met: /\d/.test(password || "") },
  ];
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
            Join TechFest
          </h2>
          <p className="text-muted-foreground">
            Create your account and start learning today
          </p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center">
                Create Account
              </CardTitle>
              <CardDescription className="text-center">
                Fill in your details to get started
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Username
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
                      {...register("username", {
                        required: "Username is required",
                        minLength: {
                          value: 3,
                          message: "Username must be at least 3 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9_]+$/,
                          message:
                            "Username can only contain letters, numbers, and underscores",
                        },
                      })}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.username && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm"
                    >
                      {errors.username.message}
                    </motion.p>
                  )}
                </div>

                {/* Name Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      type="text"
                      placeholder="First name"
                      className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
                      {...register("first_name", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.first_name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-destructive text-xs"
                      >
                        {errors.first_name.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="Last name"
                      className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
                      {...register("last_name", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.last_name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-destructive text-xs"
                      >
                        {errors.last_name.message}
                      </motion.p>
                    )}
                  </div>
                </div>

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
                      className="text-destructive text-sm"
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
                      placeholder="Create a secure password"
                      className="pl-10 pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
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
                      className="text-destructive text-sm"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}

                  {/* Password Requirements */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-1 mt-2"
                    >
                      {passwordRequirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-xs"
                        >
                          <CheckCircle
                            className={`h-3 w-3 ${req.met
                                ? "text-green-500"
                                : "text-muted-foreground"
                              }`}
                          />
                          <span
                            className={
                              req.met
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }
                          >
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password1">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="password1"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
                      {...register("password1", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.password1 && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm"
                    >
                      {errors.password1.message}
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
                    Show passwords
                  </Label>
                </div>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group h-12"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      Create Account
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors duration-200 inline-flex items-center gap-1 group"
            >
              Sign in here
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </p>
        </motion.div>
        <div className="mb-6 mt-10">
          <h3 className="text-sm font-semibold mb-2">Admin Credentials</h3>
          <CopyCredential label="Email: admin@gmail.com" value="admin@gmail.com" />
          <CopyCredential label="Password: 12345678" value="123456" />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Student Credentials</h3>
          <CopyCredential
            label="Email: rahim@gmail.com"
            value="rahim@gmail.com"
          />
          <CopyCredential label="Password: 123456aS!@" value="123456aS!@" />
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-card/30 backdrop-blur-sm border-border/30">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-center mb-3 flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Join 50,000+ Learners
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground text-center">
                <div>🎓 Expert-led courses</div>
                <div>📜 Industry certificates</div>
                <div>💬 Community support</div>
                <div>📱 Mobile learning</div>
              </div>
            </CardContent>
          </Card>

        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
