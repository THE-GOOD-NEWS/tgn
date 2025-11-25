"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Check,
  Star,
  Zap,
  Shield,
  Users,
  Video,
  BookOpen,
  MessageCircle,
  Crown,
} from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export default function SubscribePage() {
  const { data: session } = useSession();
  const t = useTranslations("subscription");
  const locale = useLocale();
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);

  const plans = Object.values(SUBSCRIPTION_PLANS);
  const selectedPlan = isYearly ? plans[1] : plans[0];

  const features = [
    {
      icon: BookOpen,
      title: t("features.articles"),
      description: "Access our premium article collection",
      included: true,
    },
    {
      icon: Video,
      title: t("features.videos"),
      description: "Exclusive video content and tutorials",
      included: true,
    },
    {
      icon: Users,
      title: t("features.community"),
      description: "Join our subscriber community",
      included: true,
    },
    {
      icon: MessageCircle,
      title: t("features.support"),
      description: "Get priority customer support",
      included: true,
    },
  ];

  const handleSubscribe = async () => {
    if (!session) {
      router.push(`/${locale}/auth/login`);
      return;
    }

    // Here you would integrate with Stripe or your payment provider
    console.log("Subscribing to:", selectedPlan);
    // Redirect to payment processing
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-hot-pink/10 to-bright-yellow/10 border border-hot-pink/20 mb-6">
            <Crown className="w-4 h-4 text-bright-yellow mr-2 rtl:mr-0 rtl:ml-2" />
            <span className="text-sm font-medium text-foreground">
              Premium Membership
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-12">
          <span
            className={`text-sm font-medium ${
              !isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {t("monthly")}
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-hot-pink data-[state=checked]:to-bright-yellow"
          />
          <span
            className={`text-sm font-medium ${
              isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {t("yearly")}
          </span>
          {isYearly && (
            <Badge className="bg-bright-yellow/20 text-bright-yellow-dark border-bright-yellow/30">
              {t("save")}
            </Badge>
          )}
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="border-2 border-gradient-to-r from-hot-pink to-bright-yellow shadow-2xl card-hover">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-hot-pink to-bright-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {selectedPlan.name}
              </h3>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">
                  ${selectedPlan.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    /{selectedPlan.interval}
                  </span>
                </div>
                {isYearly && (
                  <div className="text-sm text-muted-foreground line-through">
                    $119.88/year
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-4 mb-8">
                {selectedPlan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                  >
                    <Check className="w-5 h-5 text-bright-yellow flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleSubscribe}
                className="w-full h-12 button-glow bg-gradient-to-r from-hot-pink to-bright-yellow hover:shadow-xl text-black font-semibold"
              >
                {session ? t("subscribe") : "Sign Up & Subscribe"}
              </Button>

              {!session && (
                <p className="text-xs text-center text-muted-foreground mt-4">
                  You&apos;ll need to create an account first
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What&apos;s Included
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 rtl:space-x-reverse p-6 rounded-2xl bg-gradient-to-br from-background to-muted/20 card-hover"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-hot-pink/20 to-bright-yellow/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-hot-pink" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-bright-yellow flex-shrink-0 mt-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground mb-4">
            <Shield className="w-4 h-4" />
            <span>30-day money-back guarantee</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Try The Good Project risk-free. If you&apos;re not completely
            satisfied, we&apos;ll refund your subscription within 30 days.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
