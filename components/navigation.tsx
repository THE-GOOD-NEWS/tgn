"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Menu,
  X,
  Globe,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";

interface NavigationProps {}

interface NavSubItem {
  href: string;
  label: string;
}

interface NavLinkItem {
  href: string;
  label: string;
  type: "link";
}

interface NavDropdownItem {
  label: string;
  type: "dropdown";
  items: NavSubItem[];
}

type NavItem = NavLinkItem | NavDropdownItem;

export function Navigation({}: NavigationProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [articleCategories, setArticleCategories] = useState<
    { slug: string; titleEn: string; titleAr: string }[]
  >([]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const isRTL = locale === "ar";
  const otherLocale = locale === "en" ? "ar" : "en";
  const isLoggedIn = !!session;
  const userRole: "user" | "subscriber" | "admin" = session?.user?.isSubscribed
    ? "subscriber"
    : "user";

  // Function to get the current path with the other locale
  const getLocalizedPath = () => {
    // Remove the current locale from the pathname and add the other locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    return `/${otherLocale}${pathWithoutLocale}`;
  };

  // Comprehensive navigation structure with dropdowns
  const navItems: NavItem[] = [
    {
      href: `/${locale}`,
      label: t("home"),
      type: "link",
    },
    {
      label: t("news"),
      type: "dropdown",
      items: articleCategories.map((cat) => ({
        href: `/${locale}/articles?category=${cat.slug}`,
        label: locale === "ar" ? cat.titleAr : cat.titleEn,
      })),
    },
    // {
    //   label: t("projects"),
    //   type: "dropdown",
    //   items: [
    //     {
    //       href: `/${locale}/projects/big-sister-talks`,
    //       label: t("projectsSubItems.bigSisterTalks"),
    //     },
    //     ...(isLoggedIn && userRole === "subscriber"
    //       ? [
    //           {
    //             href: `/${locale}/the-good-project`,
    //             label: t("projectsSubItems.theGoodProject"),
    //           },
    //         ]
    //       : []),

    //   ],
    // },
    // {
    //   label: t("opportunities"),
    //   type: "dropdown",
    //   items: [
    //     {
    //       href: `/${locale}/articles?category=intern`,
    //       label: t("opportunitiesSubItems.theGoodIntern"),
    //     },
    //     // {
    //     //   href: `/${locale}/articles?category=workshops`,
    //     //   label: t("opportunitiesSubItems.workshops"),
    //     // },
    //     {
    //       href: `/${locale}/articles?category=programs`,
    //       label: t("opportunitiesSubItems.programs"),
    //     },
    //     {
    //       href: `/${locale}/articles?category=scholarships`,
    //       label: t("opportunitiesSubItems.scholarships"),
    //     },
    //   ],
    // },
    {
      label: t("about"),
      type: "dropdown",
      items: [
        { href: `/${locale}/about/story`, label: t("aboutSubItems.ourStory") },
        { href: `/${locale}/about/team`, label: t("aboutSubItems.team") },
        {
          href: `/${locale}/about/partners`,
          label: t("aboutSubItems.partners"),
        },
        // {
        //   href: `/${locale}/about/partners`,
        //   label: t("aboutSubItems.partners"),
        // },
        {
          href: `/${locale}/about/mediaPresence`,
          label: t("aboutSubItems.mediaPresence"),
        },
      ],
    },

    // {
    //   label: t("multimedia"),
    //   type: "dropdown",
    //   items: [
    //     {
    //       href: `/${locale}/multimedia/mariam-videos`,
    //       label: t("multimediaSubItems.mariamVideos"),
    //     },
    //   ],
    // },
    // {
    //   href: `/${locale}/mediaPresence`,
    //   label: t("mediaPresence"),
    //   type: "link",
    // },
    {
      href: `/${locale}/workshops`,
      label: t("opportunitiesSubItems.workshops"),
      type: "link",
    },

    {
      href: `/${locale}/goodIntern`,
      label: t("opportunitiesSubItems.theGoodIntern"),
      type: "link",
    },
    {
      // label: t("contact"),
      label: t("involved"),
      type: "dropdown",
      items: [
        { href: `/${locale}/contact`, label: t("contact") },

        {
          href: `/${locale}/contact/share-news`,
          label: t("contactSubItems.shareGoodNews"),
        },
        {
          href: `/${locale}/contact/partner`,
          label: t("contactSubItems.beOurPartner"),
        },
        {
          href: `/${locale}/#newsletter`,
          label: t("newsletter"),
        },
      ],
    },
    // {
    //   label: t("aboutSubItems.partners"),
    //   type: "dropdown",
    //   items: [],
    // },
  ];

  // Fetch article categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/article-categories`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setArticleCategories(data.categories || []);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, [locale]);

  return (
    <header
      className={`fixed top-0 z-50 w-full  transition-all duration-500 ease-in-out ${
        scrolled ? "backdrop-blur-md bg-background/60" : "bg-transparent"
      }`}
    >
      <div dir={isRTL ? "rtl" : "ltr"} className="container mx-auto ">
        <div className="flex items-center px-4 sm:px-6 lg:px-8 justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <div
              className={`relative transition-all duration-500 ease-in-out ${
                scrolled
                  ? "w-16 h-16 md:h-20 md:w-24 lg:h-24 lg:w-28"
                  : "w-24 h-20 md:h-32 md:w-36 lg:h-40 lg:w-44"
              }`}
            >
              <Image
                alt="The Good News Logo"
                fill
                className="object-cover"
                src={"/logos/TGN_LOGOS_PNG-03.png"}
              ></Image>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse ">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.type === "link" ? (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group ${
                      locale === "ar" ? "font-header-ar" : "font-header-en"
                    } ${pathname === item.href ? "text-foreground" : ""}`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hot-pink transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <>
                    <button
                      className={`text-sm font-medium transition-colors hover:text-foreground flex items-center gap-1 ${
                        locale === "ar" ? "font-header-ar" : "font-header-en"
                      } ${
                        item.type === "dropdown" &&
                        item.items.some((subItem) => pathname === subItem.href)
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.items?.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${
                              locale === "ar"
                                ? "font-body-ar text-right"
                                : "font-body-en text-left"
                            } ${
                              pathname === subItem.href
                                ? "text-foreground bg-muted"
                                : "text-muted-foreground"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <Button variant="ghost" size="icon" asChild className="h-9 w-9">
              <Link href={getLocalizedPath()}>
                <Globe className="h-4 w-4" />
                <span className="sr-only">Change language</span>
              </Link>
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${locale}/account`}
                      className="flex items-center"
                    >
                      <Settings className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4" />
                      {t("account")}
                    </Link>
                  </DropdownMenuItem>
                  {userRole === "user" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/${locale}/subscribe`}
                        className="flex items-center"
                      >
                        <span className="mr-2 rtl:mr-0 rtl:ml-2">⭐</span>
                        {t("subscribe")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="flex items-center text-red-600">
                    <LogOut className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" asChild>
                  <Link href={`/${locale}/auth/login`}>{t("login")}</Link>
                </Button>
                <Button
                  asChild
                  className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow hover:shadow-lg"
                >
                  <Link href={`/${locale}/auth/signup`}>{t("signup")}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 sm:px-6 lg:px-8 w-full bg-cream border-t py-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              {/* <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder={t("search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rtl:pl-4 rtl:pr-10"
                />
              </div> */}

              {/* Mobile Navigation Links */}
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.type === "link" ? (
                    <Link
                      href={item.href}
                      className={`text-sm font-medium py-2 block transition-colors ${
                        locale === "ar"
                          ? "font-header-ar text-right"
                          : "font-header-en text-left"
                      } ${
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <button
                        className={`text-sm font-medium py-2 flex items-center justify-between w-full transition-colors ${
                          locale === "ar"
                            ? "font-header-ar text-right"
                            : "font-header-en text-left"
                        } ${
                          item.type === "dropdown" &&
                          item.items.some(
                            (subItem) => pathname === subItem.href
                          )
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => {
                          const element = document.getElementById(
                            `mobile-dropdown-${index}`
                          );
                          if (element) {
                            element.classList.toggle("hidden");
                          }
                        }}
                      >
                        {item.label}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <div
                        id={`mobile-dropdown-${index}`}
                        className="hidden pl-4 rtl:pl-0 rtl:pr-4 space-y-2 mt-2"
                      >
                        {item.items?.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={`text-sm py-1 block transition-colors ${
                              locale === "ar"
                                ? "font-body-ar text-right"
                                : "font-body-en text-left"
                            } ${
                              pathname === subItem.href
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href={`/${locale}/auth/login`}>{t("login")}</Link>
                  </Button>
                  <Button
                    asChild
                    className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow"
                  >
                    <Link href={`/${locale}/auth/signup`}>{t("signup")}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
