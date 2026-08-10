"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
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
  href?: string;
  label: string;
  children?: NavSubItem[];
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
      items: [
        {
          href: `/${locale}/articles`,
          label: locale === "ar" ? "كل المقالات" : "All Articles",
        },
        ...articleCategories.map((cat) => ({
          href: `/${locale}/articles?category=${cat.slug}`,
          label: locale === "ar" ? cat.titleAr : cat.titleEn,
        })),
      ],
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
          label: t("projects"),
          children: [
            {
              href: `/${locale}/the-good-project`,
              label: t("projectsSubItems.theGoodProject"),
            },
            {
              href: `/${locale}/forseHelwa`,
              label: t("opportunitiesSubItems.forsaHelwa"),
            },
          ],
        },
        {
          href: `/${locale}/about/partners`,
          label: t("aboutSubItems.partners"),
        },
        {
          href: `/${locale}/about/ourFounder`,
          label: t("aboutSubItems.ourFounder"),
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
      href: `/${locale}/the-good-space`,
      label: "The Good Space",
      type: "link",
    },

    {
      // label: t("contact"),
      label: t("involved"),
      type: "dropdown",
      items: [
        {
          href: `/${locale}/contact/partner`,
          label: t("contactSubItems.beOurPartner"),
        },
        {
          href: `/${locale}/contact/share-news`,
          label: t("contactSubItems.shareGoodNews"),
        },
        { href: `/${locale}/contact`, label: t("contact") },
        {
          href: `/${locale}/the-good-project/join`,
          label: "The Good Project",
        },
        // {
        //   href: `/${locale}/#newsletter`,
        //   label: t("newsletter"),
        // },
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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
        pathname.includes("/the-good-space") ? "theme-good-space" : ""
      } ${
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
                className="object-contain"
                src={pathname.includes("/the-good-space") ? "/goodSpace/1.png" : "/logos/TGN_LOGOS_PNG-03.png"}
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
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      pathname.includes("/the-good-space") ? "bg-primary" : "bg-hot-pink"
                    }`} />
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
                        {item.items?.map((subItem, subIndex) =>
                          subItem.children && subItem.children.length ? (
                            <div key={subIndex} className="px-4 py-2 group/sub">
                              <button
                                className={`text-xs font-semibold text-muted-foreground mb-1 w-full flex items-center justify-between hover:text-foreground transition-colors ${
                                  locale === "ar"
                                    ? "font-body-ar text-right"
                                    : "font-body-en text-left"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const element = document.getElementById(
                                    `desktop-sub-dropdown-${index}-${subIndex}`
                                  );
                                  const icon = document.getElementById(
                                    `desktop-sub-icon-${index}-${subIndex}`
                                  );
                                  if (element) {
                                    element.classList.toggle("hidden");
                                  }
                                  if (icon) {
                                    icon.classList.toggle("rotate-180");
                                  }
                                }}
                              >
                                {subItem.label}
                                <ChevronDown
                                  id={`desktop-sub-icon-${index}-${subIndex}`}
                                  className="h-3 w-3 transition-transform duration-200"
                                />
                              </button>
                              <div
                                id={`desktop-sub-dropdown-${index}-${subIndex}`}
                                className="hidden space-y-1 mt-1"
                              >
                                {subItem.children.map((child, childIndex) => (
                                  <Link
                                    key={childIndex}
                                    href={child.href || "#"}
                                    className={`block px-2 py-1 text-sm rounded transition-colors hover:bg-cream hover:text-foreground ${
                                      locale === "ar"
                                        ? "font-body-ar text-right"
                                        : "font-body-en text-left"
                                    } ${
                                      pathname === child.href
                                        ? "text-foreground bg-muted"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              key={subIndex}
                              href={subItem.href || "#"}
                              className={`block px-4 py-2 text-sm transition-colors hover:bg-cream hover:text-foreground ${
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
                          )
                        )}
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
                  {/* {userRole === "user" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/${locale}/subscribe`}
                        className="flex items-center"
                      >
                        <span className="mr-2 rtl:mr-0 rtl:ml-2">⭐</span>
                        {t("subscribe")}
                      </Link>
                    </DropdownMenuItem>
                  )} */}
                  <DropdownMenuItem
                    className="flex items-center text-red-600"
                    onSelect={() => signOut({ callbackUrl: `/${locale}` })}
                  >
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
                  className={`button-glow hover:shadow-lg ${
                    pathname.includes("/the-good-space") 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-gradient-to-r from-hot-pink to-bright-yellow"
                  }`}
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
          <div className="md:hidden px-4 sm:px-6 lg:px-8 w-full bg-background border-t py-4 animate-slide-up">
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
                        {item.items?.map((subItem, subIndex) =>
                          subItem.children && subItem.children.length ? (
                            <div key={subIndex}>
                              <button
                                className={`text-xs font-semibold text-muted-foreground mb-1 w-full flex items-center justify-between ${
                                  locale === "ar"
                                    ? "font-body-ar text-right"
                                    : "font-body-en text-left"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const element = document.getElementById(
                                    `mobile-sub-dropdown-${index}-${subIndex}`
                                  );
                                  if (element) {
                                    element.classList.toggle("hidden");
                                  }
                                }}
                              >
                                {subItem.label}
                                <ChevronDown className="h-3 w-3" />
                              </button>
                              <div
                                id={`mobile-sub-dropdown-${index}-${subIndex}`}
                                className="hidden pl-3 rtl:pl-0 rtl:pr-3 space-y-1"
                              >
                                {subItem.children.map((child, childIndex) => (
                                  <Link
                                    key={childIndex}
                                    href={child.href || "#"}
                                    className={`text-sm py-1 block transition-colors ${
                                      locale === "ar"
                                        ? "font-body-ar text-right"
                                        : "font-body-en text-left"
                                    } ${
                                      pathname === child.href
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              key={subIndex}
                              href={subItem.href || "#"}
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
                          )
                        )}
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
                    className={`button-glow ${
                      pathname.includes("/the-good-space") 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-gradient-to-r from-hot-pink to-bright-yellow"
                    }`}
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
