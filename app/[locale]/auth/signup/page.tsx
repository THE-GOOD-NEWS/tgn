"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
export default function SignupPage() {
  const t = useTranslations("auth.signup");
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === "ar";

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        firstName: `${formData.firstName}`,
        lastName: `${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 201) {
        //
        //  Use router.push for client-side navigation
        router.push("/auth/verification");
      }
      // const data = await response;

      // if (!response.ok) {
      //   throw new Error(data.error || "Registration failed");
      // }

      setSuccess(true);
      // setTimeout(() => {
      //   router.push(`/${locale}/auth/login`);
      // }, 2000);
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     const response = await axios.post("/api/auth/register", {
  //       username,
  //       email,
  //       password,
  //     });

  //     if (response.status === 201) {
  //       //
  //       //  Use router.push for client-side navigation
  //       router.push("/verification");
  //     }
  //   } catch (error: any) {
  //     setError(
  //       error.response?.data?.error || "Registration failed. Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  return (
    <div
      className={`min-h-screen bg-cream px-6 md:px-10 lg:px-16 pb-12 md:pb-16 pt-20 md:pt-28 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div
            className={`text-4xl md:text-5xl font-extrabold ${
              isRTL ? "font-arabic-header" : "font-english-heading"
            } text-carbon`}
          >
            {t("title")}
          </div>
          <div
            className={`text-xl md:text-2xl font-bold mt-3 ${
              isRTL ? "font-arabic-subheading" : "font-english-subheading"
            } text-carbon`}
          >
            {t("subtitle")}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
                  <AlertDescription>
                    Account created successfully! Redirecting to login...
                  </AlertDescription>
                </Alert>
              )}

              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading || success}
                className="w-full h-12 mb-4 border-border/50 hover:bg-muted/50"
              >
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <FcGoogle className="mr-2 rtl:mr-0 rtl:ml-2 h-5 w-5" />
                )}
                {isGoogleLoading ? "Signing up..." : "Sign up with Google"}
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  OR
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields - Side by side on md and up */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      {t("firstName")}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="pl-10 rtl:pl-4 rtl:pr-12 h-12 bg-muted/50 border-border/50 focus:border-hot-pink/50 focus:ring-hot-pink/25"
                        required
                        disabled={success}
                      />
                    </div>
                  </div>

                  {/* Last Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      {t("lastName")}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="pl-10 rtl:pl-4 rtl:pr-12 h-12 bg-muted/50 border-border/50 focus:border-hot-pink/50 focus:ring-hot-pink/25"
                        required
                        disabled={success}
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("email")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="pl-10 rtl:pl-4 rtl:pr-12 h-12 bg-muted/50 border-border/50 focus:border-hot-pink/50 focus:ring-hot-pink/25"
                      required
                      disabled={success}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t("password")}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="pl-10 rtl:pl-4 rtl:pr-12 h-12 bg-muted/50 border-border/50 focus:border-hot-pink/50 focus:ring-hot-pink/25"
                      required
                      disabled={success}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={success}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    {t("confirmPassword")}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="pl-10 rtl:pl-4 rtl:pr-12 h-12 bg-muted/50 border-border/50 focus:border-hot-pink/50 focus:ring-hot-pink/25"
                      required
                      disabled={success}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={success}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full h-12 button-glow bg-gradient-to-r from-hot-pink to-bright-yellow hover:shadow-xl text-black font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    t("button")
                  )}
                </Button>
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {t("hasAccount")}{" "}
                  <Link
                    href={`/${locale}/auth/login`}
                    className="font-medium text-hot-pink hover:text-hot-pink/80 transition-colors"
                  >
                    {t("signIn")}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
