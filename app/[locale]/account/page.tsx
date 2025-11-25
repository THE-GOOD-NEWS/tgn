"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/lib/articles-data";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@uploadthing/react";
import type { FileRouterType } from "@/app/api/uploadthing/core";
import {
  User,
  CreditCard,
  PlayCircle,
  Bookmark,
  Settings,
  LogOut,
  Crown,
  Calendar,
  Clock,
  ChevronRight,
  Menu,
  X,
  Video,
  FileText,
  Star,
} from "lucide-react";

// Mock data for demonstration
const mockUserData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  memberSince: "2024-01-15",
  isSubscriber: true,
  subscription: {
    status: "active",
    plan: "Premium Monthly",
    nextBilling: "2024-02-15",
  },
};

const mockPlaylist = [
  {
    id: 1,
    title: "The Power of Positive Thinking",
    duration: "12:34",
    thumbnail: "/api/placeholder/300/200",
    addedDate: "2024-01-20",
  },
  {
    id: 2,
    title: "Inspiring Stories from the Middle East",
    duration: "18:45",
    thumbnail: "/api/placeholder/300/200",
    addedDate: "2024-01-18",
  },
  {
    id: 3,
    title: "Youth Making a Difference",
    duration: "15:22",
    thumbnail: "/api/placeholder/300/200",
    addedDate: "2024-01-15",
  },
];

const mockArticles = [
  {
    id: 1,
    title: "Young Entrepreneur Transforms Her Community",
    excerpt: "How one woman's vision is changing lives in rural Egypt...",
    image: "/api/placeholder/400/250",
    readTime: "5 min read",
    date: "2024-01-22",
  },
  {
    id: 2,
    title: "Sustainable Solutions for the Future",
    excerpt: "Innovative approaches to environmental challenges...",
    image: "/api/placeholder/400/250",
    readTime: "7 min read",
    date: "2024-01-20",
  },
  {
    id: 3,
    title: "Education Revolution in the Arab World",
    excerpt: "New technologies are transforming how we learn...",
    image: "/api/placeholder/400/250",
    readTime: "6 min read",
    date: "2024-01-18",
  },
];

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function AccountPage() {
  const { data: session, status, update } = useSession();
  const t = useTranslations("account");
  const tc = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-hot-pink to-bright-yellow rounded-full animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">{tc("loading")}</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push(`/${locale}/auth/login`);
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}` });
  };

  const ProfileSection = () => (
    <Card dir={locale === "ar" ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <User className="w-5 h-5" />
          <span>{t("profile.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar className="w-20 h-20">
            <AvatarImage src={session?.user?.image || undefined} alt="avatar" />
            <AvatarFallback className="bg-gradient-to-br from-hot-pink to-bright-yellow text-white text-xl">
              {session?.user?.firstName?.[0] || session?.user?.name?.[0] || "?"}
              {session?.user?.lastName?.[0] || ""}
            </AvatarFallback>
          </Avatar>
          <div dir={locale === "ar" ? "rtl" : "ltr"}>
            <h3 className="text-xl font-semibold text-foreground">
              {session?.user?.firstName || session?.user?.name || ""}{" "}
              {session?.user?.lastName || ""}
            </h3>
            <p className="text-muted-foreground">
              {session?.user?.email || ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("profile.firstName")}
            </label>
            <div className="p-3 bg-muted rounded-lg">
              {session?.user?.firstName || session?.user?.name || ""}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("profile.lastName")}
            </label>
            <div className="p-3 bg-muted rounded-lg">
              {session?.user?.lastName || ""}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              {t("profile.email")}
            </label>
            <div className="p-3 bg-muted rounded-lg">
              {session?.user?.email || ""}
            </div>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow text-black">
              {t("profile.edit")}
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-md"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <DialogTitle
              className={locale === "ar" ? "text-right" : "text-left"}
            >
              {t("profile.edit")}
            </DialogTitle>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("profile.firstName")}
                </label>
                <Input
                  defaultValue={
                    session?.user?.firstName || session?.user?.name || ""
                  }
                  id="firstName"
                  className={locale === "ar" ? "text-right" : "text-left"}
                />
              </div>
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("profile.lastName")}
                </label>
                <Input
                  defaultValue={session?.user?.lastName || ""}
                  id="lastName"
                  className={locale === "ar" ? "text-right" : "text-left"}
                />
              </div>
              <div className="space-y-2 ">
                <label
                  className={`text-sm font-medium ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("profile.photo")}
                </label>
                <div
                  className={`flex items-center gap-3 ${
                    locale === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={(session?.user?.image as string) || undefined}
                      alt={t("profile.photo")}
                    />
                    <AvatarFallback>
                      {(session?.user?.firstName || session?.user?.name || "?")
                        .toString()
                        .charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <UploadButton<FileRouterType, "avatar">
                  endpoint="avatar"
                  onClientUploadComplete={async () => {
                    await update?.();
                  }}
                  onUploadError={() => {}}
                  appearance={{
                    button: "bg-hot-pink text-white p-2 hover:bg-hot-pink/90",
                  }}
                />
              </div>
              <div
                className={`flex ${
                  locale === "ar" ? "justify-end" : "justify-start"
                }`}
              >
                <Button
                  onClick={async () => {
                    const firstNameInput = document.getElementById(
                      "firstName"
                    ) as HTMLInputElement;
                    const lastNameInput = document.getElementById(
                      "lastName"
                    ) as HTMLInputElement;
                    const firstName = firstNameInput?.value || "";
                    const lastName = lastNameInput?.value || "";
                    await fetch("/api/account/profile", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ firstName, lastName }),
                    });
                    await update?.();
                  }}
                >
                  {tc("save")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );

  const SubscriptionSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Crown className="w-5 h-5" />
          <span>{t("subscription.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {t("subscription.status")}
            </p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
              <Badge className="bg-green-100 text-green-800">
                {t("subscription.active")}
              </Badge>
              <Crown className="w-4 h-4 text-hot-pink" />
            </div>
          </div>
          <div className={locale === "ar" ? "text-right" : "text-left"}>
            <p className="text-sm text-muted-foreground">
              {t("subscription.plan")}
            </p>
            <p className="font-semibold">{mockUserData.subscription.plan}</p>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {t("subscription.nextBilling")}
            </span>
          </div>
          <p className="font-semibold">
            {new Date(
              mockUserData.subscription.nextBilling
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1">
            {t("subscription.manage")}
          </Button>
          <Button className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow text-black flex-1">
            {t("subscription.upgrade")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // const PlaylistSection = () => (
  //   <div className="space-y-6">
  //     <div className="flex items-center justify-between">
  //       <h2 className="text-2xl font-bold text-foreground">
  //         {t("playlist.title")}
  //       </h2>
  //       <Button
  //         size="sm"
  //         className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow text-black"
  //       >
  //         {t("playlist.addMore")}
  //       </Button>
  //     </div>

  //     {mockPlaylist.length === 0 ? (
  //       <Card>
  //         <CardContent className="text-center py-12">
  //           <PlayCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
  //           <p className="text-muted-foreground mb-4">{t("playlist.empty")}</p>
  //           <Button className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow text-black">
  //             {t("playlist.addMore")}
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {mockPlaylist.map((video) => (
  //           <Card
  //             key={video.id}
  //             className="overflow-hidden hover:shadow-lg transition-shadow"
  //           >
  //             <div className="relative aspect-video bg-muted">
  //               <div className="absolute inset-0 bg-gradient-to-br from-hot-pink/20 to-bright-yellow/20 flex items-center justify-center">
  //                 <PlayCircle className="w-12 h-12 text-white" />
  //               </div>
  //               <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
  //                 {video.duration}
  //               </div>
  //             </div>
  //             <CardContent className="p-4">
  //               <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
  //                 {video.title}
  //               </h3>
  //               <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
  //                 <Clock className="w-4 h-4" />
  //                 <span>{new Date(video.addedDate).toLocaleDateString()}</span>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );

  const ArticlesSection = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<
      Array<{ readAt: string; article: Article }>
    >([]);

    React.useEffect(() => {
      let mounted = true;
      (async () => {
        try {
          const res = await fetch("/api/account/recently-read", {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            if (mounted) setItems(Array.isArray(data.items) ? data.items : []);
          }
        } catch (_) {}
        if (mounted) setLoading(false);
      })();
      return () => {
        mounted = false;
      };
    }, []);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {t("articles.title")}
          </h2>
        </div>

        {loading ? (
          <div className="text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="text-muted-foreground">{t("articles.empty")}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
            {items.map((item, idx) => (
              <div key={item.article.slug} className="space-y-2">
                <ArticleCard article={item.article} index={idx} />
                {/* <div className="text-xs text-muted-foreground">
                  {new Date(item.readAt).toLocaleDateString(locale)}
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const SettingsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Settings className="w-5 h-5" />
          <span>{t("settings.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("settings.language")}
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-background"
              value={locale}
              onChange={(e) => {
                const newLocale = e.target.value;
                router.push(`/${newLocale}/account`);
              }}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          {/* <div>
            <label className="block text-sm font-medium mb-2">
              {t("settings.theme")}
            </label>
            <select className="w-full p-3 border rounded-lg bg-background">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div> */}
        </div>

        {/* <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{t("settings.notifications")}</span>
            <Button size="sm" variant={"outline"}>
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>{t("settings.privacy")}</span>
            <Button size="sm" variant={"outline"}>
              Manage
            </Button>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      label: t("navigation.profile"),
      icon: <User className="w-5 h-5" />,
      component: <ProfileSection />,
    },
    // {
    //   id: "subscription",
    //   label: t("navigation.subscription"),
    //   icon: <Crown className="w-5 h-5" />,
    //   component: <SubscriptionSection />,
    // },
    // ...(mockUserData.isSubscriber
    //   ? [
    //       {
    //         id: "playlist",
    //         label: t("navigation.playlist"),
    //         icon: <PlayCircle className="w-5 h-5" />,
    //         component: <PlaylistSection />,
    //       },
    //     ]
    //   : []),
    {
      id: "articles",
      label: t("navigation.articles"),
      icon: <FileText className="w-5 h-5" />,
      component: <ArticlesSection />,
    },
    {
      id: "settings",
      label: t("navigation.settings"),
      icon: <Settings className="w-5 h-5" />,
      component: <SettingsSection />,
    },
  ];

  const activeComponent = menuItems.find(
    (item) => item.id === activeSection
  )?.component;

  return (
    <div
      className="min-h-screen pt-28 bg-background"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* <Navigation
        isLoggedIn={true}
        userRole={mockUserData.isSubscriber ? "subscriber" : "user"}
      /> */}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        {/* <div className="mb-8">
          <h1
            className={`text-3xl md:text-4xl font-bold text-foreground mb-2 ${
              locale === "ar" ? "font-arabic-header" : "font-english-heading"
            }`}
          >
            {t("title")}
          </h1>
          <p
            className={`text-lg text-muted-foreground ${
              locale === "ar"
                ? "font-arabic-subheading"
                : "font-english-subheading"
            }`}
          >
            {t("subtitle")}
          </p>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Side Navigation - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-8">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className={`w-full justify-start space-x-2 rtl:space-x-reverse ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-hot-pink to-bright-yellow text-black"
                          : ""
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-2 rtl:space-x-reverse text-red-600 hover:text-red-700"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t("navigation.signOut")}</span>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mb-4"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              <span className="ml-2">Menu</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-x-0 top-20 z-50 mx-4">
              <Card className="shadow-lg">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={
                          activeSection === item.id ? "default" : "ghost"
                        }
                        className={`w-full justify-start space-x-2 rtl:space-x-reverse ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-hot-pink to-bright-yellow text-black"
                            : ""
                        }`}
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-2 rtl:space-x-reverse text-red-600 hover:text-red-700"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>{t("navigation.signOut")}</span>
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="space-y-6">{activeComponent}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
