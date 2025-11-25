"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Settings,
  CreditCard,
  Shield,
  Bell,
  LogOut,
  Check,
  X,
  Calendar,
  Crown,
  Mail,
  Globe,
  Palette,
  BookOpen,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });

  // Mock subscription data (in a real app, this would come from your database)
  const subscriptionData = {
    status: "active",
    plan: "Monthly Plan",
    amount: "$9.99",
    nextBilling: "2024-02-15",
    features: [
      "Access to exclusive articles",
      "Premium video content",
      "Community access",
      "Priority support",
    ],
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-hot-pink to-bright-yellow rounded-full animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push(`/${locale}/auth/login`);
    return null;
  }

  const handleSave = async () => {
    setIsLoading(true);
    // Here you would update user data
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-hot-pink to-bright-yellow rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("welcome", { name: session.user?.name || "User" })}
              </h1>
              <p className="text-muted-foreground">
                Manage your account and subscription
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 lg:w-fit lg:grid-cols-3 gap-2">
            <TabsTrigger
              value="account"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Crown className="w-4 h-4" />
              <span>Subscription</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="w-5 h-5" />
                  <span>{t("account.title")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("account.name")}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("account.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow text-black"
                >
                  {isLoading ? "Saving..." : t("account.save")}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-hot-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-hot-pink" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    25
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Articles Read
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-bright-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-bright-yellow-dark" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    3
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Months Active
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-cream/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    Pro
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Member Level
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Crown className="w-5 h-5" />
                  <span>{t("subscription.title")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-hot-pink/10 to-bright-yellow/10 rounded-xl border border-hot-pink/20">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Badge className="bg-green-500/20 text-green-700">
                        <Check className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                        {t("subscription.active")}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {subscriptionData.plan}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("subscription.renewsOn")}{" "}
                      {new Date(
                        subscriptionData.nextBilling
                      ).toLocaleDateString(locale)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {subscriptionData.amount}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per month
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">
                    Your Benefits:
                  </h4>
                  <ul className="space-y-2">
                    {subscriptionData.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                      >
                        <Check className="w-4 h-4 text-bright-yellow flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-hot-pink/10 hover:border-hot-pink/30"
                  >
                    {t("subscription.manage")}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 hover:bg-bright-yellow/10 hover:border-bright-yellow/30"
                  >
                    Change Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Settings className="w-5 h-5" />
                    <span>Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>{t("account.language")}</Label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse p-3 bg-muted/50 rounded-lg">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {locale === "en" ? "English" : "العربية"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("account.theme")}</Label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse p-3 bg-muted/50 rounded-lg">
                      <Palette className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">System</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-muted/50"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-muted/50"
                  >
                    Two-Factor Authentication
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full justify-start hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
